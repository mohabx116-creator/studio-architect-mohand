import { useCallback, useEffect, useMemo, useState } from "react";
import { defaultContent, type PortfolioContent, type PortfolioProject, type PortfolioSection } from "@/data/portfolio";

const STORAGE_KEY = "muhand-portfolio-content-real-cv-v2";
const AUTH_KEY = "muhand-portfolio-admin";

function normalizeContent(content: PortfolioContent): PortfolioContent {
  const byId = new Map(content.sections.map((section) => [section.id, section]));
  const sections = defaultContent.sections.map((fallback) => ({
    ...fallback,
    ...byId.get(fallback.id),
  }));

  return {
    ...defaultContent,
    ...content,
    profile: { ...defaultContent.profile, ...content.profile },
    sections,
    projects: content.projects?.length ? content.projects : defaultContent.projects,
    skills: content.skills?.length ? content.skills : defaultContent.skills,
    experience: content.experience?.length ? content.experience : defaultContent.experience,
    education: content.education?.length ? content.education : defaultContent.education,
    publications: content.publications?.length ? content.publications : defaultContent.publications,
    files: content.files ?? [],
  };
}

function readContent() {
  if (typeof window === "undefined") return defaultContent;

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaultContent;
    return normalizeContent(JSON.parse(stored) as PortfolioContent);
  } catch {
    return defaultContent;
  }
}

export function usePortfolioContent() {
  const [content, setContent] = useState<PortfolioContent>(() => readContent());

  useEffect(() => {
    setContent(readContent());
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    }
  }, [content]);

  const updateContent = useCallback((updater: (content: PortfolioContent) => PortfolioContent) => {
    setContent((current) => normalizeContent(updater(current)));
  }, []);

  const updateSection = useCallback((id: PortfolioSection["id"], patch: Partial<PortfolioSection>) => {
    updateContent((current) => ({
      ...current,
      sections: current.sections.map((section) =>
        section.id === id ? { ...section, ...patch } : section,
      ),
    }));
  }, [updateContent]);

  const updateProject = useCallback((slug: string, patch: Partial<PortfolioProject>) => {
    updateContent((current) => ({
      ...current,
      projects: current.projects.map((project) =>
        project.slug === slug ? { ...project, ...patch } : project,
      ),
    }));
  }, [updateContent]);

  const visibleSections = useMemo(
    () => [...content.sections].filter((section) => section.visible).sort((a, b) => a.order - b.order),
    [content.sections],
  );

  const getSection = useCallback(
    (id: PortfolioSection["id"]) => content.sections.find((section) => section.id === id) ?? defaultContent.sections.find((section) => section.id === id)!,
    [content.sections],
  );

  const resetContent = useCallback(() => {
    setContent(defaultContent);
    if (typeof window !== "undefined") window.localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    content,
    setContent,
    updateContent,
    updateSection,
    updateProject,
    visibleSections,
    getSection,
    resetContent,
  };
}

export function isAdminAuthenticated() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(AUTH_KEY) === "true";
}

export function setAdminAuthenticated(value: boolean) {
  if (typeof window === "undefined") return;
  if (value) window.localStorage.setItem(AUTH_KEY, "true");
  else window.localStorage.removeItem(AUTH_KEY);
}
