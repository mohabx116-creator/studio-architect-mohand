import { createFileRoute } from "@tanstack/react-router";
import { Reorder } from "framer-motion";
import { Download, Eye, EyeOff, File, GripVertical, Image, LogOut, Plus, RotateCcw, Save, Trash2, Upload } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { categories, type Category, type PortfolioContent, type PortfolioFile, type PortfolioProject, type PortfolioSection } from "@/data/portfolio";
import { isAdminAuthenticated, setAdminAuthenticated, usePortfolioContent } from "@/hooks/usePortfolioContent";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin | Muhand Portfolio" },
      { name: "description", content: "Local content management panel for Muhand El-Nady portfolio." },
    ],
  }),
  component: AdminPage,
});

const ADMIN_PASSWORD = "admin123";

function AdminPage() {
  const [authenticated, setAuthenticatedState] = useState(false);

  useEffect(() => {
    setAuthenticatedState(isAdminAuthenticated());
  }, []);

  if (!authenticated) {
    return <LoginPanel onSuccess={() => setAuthenticatedState(true)} />;
  }

  return <Dashboard onLogout={() => {
    setAdminAuthenticated(false);
    setAuthenticatedState(false);
  }} />;
}

function LoginPanel({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== ADMIN_PASSWORD) {
      setError("Wrong password. Default password is admin123.");
      return;
    }
    setAdminAuthenticated(true);
    onSuccess();
  };

  return (
    <>
      <Header />
      <main className="container-luxe flex min-h-screen items-center justify-center pt-24">
        <form onSubmit={submit} className="w-full max-w-md border border-border bg-background p-8">
          <p className="eyebrow text-muted-foreground">Studio CMS</p>
          <h1 className="mt-3 font-display text-4xl">Admin access</h1>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">Use this panel to edit sections, reorder the landing page, manage projects and attach files. Change the password before production.</p>
          <label className="mt-8 block">
            <span className="eyebrow text-muted-foreground">Password</span>
            <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" className="mt-2 w-full border-b border-border bg-transparent py-3 outline-none transition-colors focus:border-accent" autoFocus />
          </label>
          {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
          <button className="mt-8 w-full bg-foreground px-6 py-4 text-sm uppercase tracking-wider text-background transition-colors hover:bg-accent hover:text-accent-foreground">Enter admin</button>
        </form>
      </main>
      <Footer />
    </>
  );
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const portfolio = usePortfolioContent();
  const { content, updateContent, updateSection, updateProject, resetContent } = portfolio;
  const [tab, setTab] = useState<"sections" | "profile" | "projects" | "files">("sections");
  const visibleCount = content.sections.filter((section) => section.visible).length;

  return (
    <>
      <Header />
      <main className="min-h-screen pt-28">
        <section className="container-luxe">
          <div className="flex flex-col gap-6 border-b border-border pb-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow text-muted-foreground">Admin Dashboard</p>
              <h1 className="mt-3 font-display text-5xl">Portfolio control room</h1>
              <p className="mt-4 max-w-2xl text-sm text-muted-foreground">{visibleCount} visible sections / {content.projects.length} projects / {content.files.length} uploaded files.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={resetContent} className="inline-flex items-center gap-2 border border-border px-4 py-3 text-xs uppercase tracking-wider transition-colors hover:border-destructive hover:text-destructive">
                <RotateCcw className="h-4 w-4" /> Reset
              </button>
              <button onClick={onLogout} className="inline-flex items-center gap-2 bg-foreground px-4 py-3 text-xs uppercase tracking-wider text-background transition-colors hover:bg-accent hover:text-accent-foreground">
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {(["sections", "profile", "projects", "files"] as const).map((item) => (
              <button key={item} onClick={() => setTab(item)} className={`px-4 py-2 text-xs uppercase tracking-wider transition-colors ${tab === item ? "bg-accent text-accent-foreground" : "border border-border text-muted-foreground hover:text-foreground"}`}>
                {item}
              </button>
            ))}
          </div>

          <div className="mt-8">
            {tab === "sections" && <SectionsPanel content={content} updateContent={updateContent} updateSection={updateSection} />}
            {tab === "profile" && <ProfilePanel content={content} updateContent={updateContent} />}
            {tab === "projects" && <ProjectsPanel content={content} updateContent={updateContent} updateProject={updateProject} />}
            {tab === "files" && <FilesPanel content={content} updateContent={updateContent} />}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function SectionsPanel({ content, updateContent, updateSection }: { content: PortfolioContent; updateContent: (updater: (content: PortfolioContent) => PortfolioContent) => void; updateSection: (id: PortfolioSection["id"], patch: Partial<PortfolioSection>) => void }) {
  const ordered = useMemo(() => [...content.sections].sort((a, b) => a.order - b.order), [content.sections]);

  const reorder = (next: PortfolioSection[]) => {
    updateContent((current) => ({
      ...current,
      sections: next.map((section, index) => ({ ...section, order: index })),
    }));
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <Reorder.Group axis="y" values={ordered} onReorder={reorder} className="space-y-4">
        {ordered.map((section) => (
          <Reorder.Item key={section.id} value={section}>
            <article className="border border-border bg-background p-5">
              <div className="flex items-center gap-3">
                <GripVertical className="h-5 w-5 cursor-grab text-muted-foreground" />
                <div className="flex-1">
                  <p className="eyebrow text-muted-foreground">{section.label}</p>
                  <h2 className="mt-1 font-display text-2xl">{section.title}</h2>
                </div>
                <button onClick={() => updateSection(section.id, { visible: !section.visible })} className="p-2 transition-colors hover:text-accent" aria-label="Toggle section visibility">
                  {section.visible ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5 text-muted-foreground" />}
                </button>
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <Field label="Eyebrow" value={section.eyebrow} onChange={(value) => updateSection(section.id, { eyebrow: value })} />
                <Field label="Title" value={section.title} onChange={(value) => updateSection(section.id, { title: value })} />
                <TextField label="Body" value={section.body} onChange={(value) => updateSection(section.id, { body: value })} className="md:col-span-2" />
              </div>
            </article>
          </Reorder.Item>
        ))}
      </Reorder.Group>
      <aside className="h-fit border border-border bg-muted/35 p-5">
        <p className="eyebrow text-muted-foreground">Drag and Drop</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Drag section cards by the grip icon to reorder the landing page. Toggle the eye icon to hide or show a section for visitors.</p>
      </aside>
    </div>
  );
}

function ProfilePanel({ content, updateContent }: { content: PortfolioContent; updateContent: (updater: (content: PortfolioContent) => PortfolioContent) => void }) {
  const updateProfile = (patch: Partial<PortfolioContent["profile"]>) => updateContent((current) => ({ ...current, profile: { ...current.profile, ...patch } }));

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Name" value={content.profile.name} onChange={(value) => updateProfile({ name: value })} />
        <Field label="Title" value={content.profile.title} onChange={(value) => updateProfile({ title: value })} />
        <Field label="Location" value={content.profile.location} onChange={(value) => updateProfile({ location: value })} />
        <Field label="Email" value={content.profile.email} onChange={(value) => updateProfile({ email: value })} />
        <Field label="Phone" value={content.profile.phone} onChange={(value) => updateProfile({ phone: value })} />
        <Field label="LinkedIn" value={content.profile.linkedin} onChange={(value) => updateProfile({ linkedin: value })} />
        <TextField label="Tagline" value={content.profile.tagline} onChange={(value) => updateProfile({ tagline: value })} className="md:col-span-2" />
        <UploadBox label="Profile photo" accept="image/*" onFile={(file) => updateProfile({ image: file.url })} />
        <UploadBox label="Hero image" accept="image/*" onFile={(file) => updateProfile({ heroImage: file.url })} />
        <UploadBox label="CV PDF" accept=".pdf,application/pdf" onFile={(file) => updateProfile({ cvUrl: file.url })} />
      </div>
      <aside className="space-y-4">
        <img src={content.profile.image} alt={content.profile.name} className="aspect-[4/5] w-full object-cover" />
        <img src={content.profile.heroImage} alt="Hero preview" className="aspect-video w-full object-cover" />
        {content.profile.cvUrl && (
          <a href={content.profile.cvUrl} download className="inline-flex w-full items-center justify-center gap-2 border border-border px-4 py-3 text-xs uppercase tracking-wider hover:border-accent hover:text-accent">
            <Download className="h-4 w-4" /> Current CV
          </a>
        )}
      </aside>
    </div>
  );
}

function ProjectsPanel({ content, updateContent, updateProject }: { content: PortfolioContent; updateContent: (updater: (content: PortfolioContent) => PortfolioContent) => void; updateProject: (slug: string, patch: Partial<PortfolioProject>) => void }) {
  const addProject = () => {
    const slug = `project-${Date.now()}`;
    updateContent((current) => ({
      ...current,
      projects: [
        ...current.projects,
        {
          slug,
          title: "New Project",
          category: "Residential",
          location: "Egypt",
          year: new Date().getFullYear(),
          area: "0 m2",
          description: "Project description",
          materials: ["Concrete"],
          cover: current.profile.heroImage,
          images: [current.profile.heroImage],
          featured: false,
          files: [],
        },
      ],
    }));
  };

  const removeProject = (slug: string) => {
    updateContent((current) => ({ ...current, projects: current.projects.filter((project) => project.slug !== slug) }));
  };

  return (
    <div>
      <button onClick={addProject} className="mb-6 inline-flex items-center gap-2 bg-accent px-4 py-3 text-xs uppercase tracking-wider text-accent-foreground">
        <Plus className="h-4 w-4" /> Add project
      </button>
      <div className="space-y-6">
        {content.projects.map((project) => (
          <article key={project.slug} className="grid gap-5 border border-border p-5 lg:grid-cols-[14rem_minmax(0,1fr)]">
            <div>
              <img src={project.cover} alt={project.title} className="aspect-[4/5] w-full object-cover" />
              <UploadBox label="Cover image" accept="image/*" onFile={(file) => updateProject(project.slug, { cover: file.url, images: [file.url, ...project.images] })} />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Title" value={project.title} onChange={(value) => updateProject(project.slug, { title: value })} />
              <label>
                <span className="eyebrow text-muted-foreground">Category</span>
                <select value={project.category} onChange={(event) => updateProject(project.slug, { category: event.target.value as Category })} className="mt-2 w-full border-b border-border bg-transparent py-3 outline-none focus:border-accent">
                  {categories.filter((category) => category !== "All").map((category) => <option key={category}>{category}</option>)}
                </select>
              </label>
              <Field label="Location" value={project.location} onChange={(value) => updateProject(project.slug, { location: value })} />
              <Field label="Year" value={String(project.year)} onChange={(value) => updateProject(project.slug, { year: Number(value) || new Date().getFullYear() })} />
              <Field label="Area" value={project.area} onChange={(value) => updateProject(project.slug, { area: value })} />
              <Field label="Materials comma separated" value={project.materials.join(", ")} onChange={(value) => updateProject(project.slug, { materials: value.split(",").map((item) => item.trim()).filter(Boolean) })} />
              <TextField label="Description" value={project.description} onChange={(value) => updateProject(project.slug, { description: value })} className="md:col-span-2" />
              <label className="flex items-center gap-3 text-sm">
                <input type="checkbox" checked={Boolean(project.featured)} onChange={(event) => updateProject(project.slug, { featured: event.target.checked })} />
                Featured on home page
              </label>
              <UploadBox label="Add gallery images / CAD / Revit / PDF" accept="image/*,.pdf,.rvt,.dwg,.dxf" onFile={(file) => updateProject(project.slug, {
                images: file.type === "image" ? [...project.images, file.url] : project.images,
                files: file.type === "image" ? project.files : [...(project.files ?? []), file],
              })} />
              <button onClick={() => removeProject(project.slug)} className="inline-flex items-center justify-center gap-2 border border-border px-4 py-3 text-xs uppercase tracking-wider transition-colors hover:border-destructive hover:text-destructive">
                <Trash2 className="h-4 w-4" /> Delete project
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function FilesPanel({ content, updateContent }: { content: PortfolioContent; updateContent: (updater: (content: PortfolioContent) => PortfolioContent) => void }) {
  const addFile = (file: PortfolioFile) => updateContent((current) => ({ ...current, files: [file, ...current.files] }));
  const removeFile = (id: string) => updateContent((current) => ({ ...current, files: current.files.filter((file) => file.id !== id) }));

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <div>
        <UploadBox label="Drag files here or click to upload" accept="image/*,.pdf,.rvt,.dwg,.dxf" onFile={addFile} large />
        <div className="mt-6 space-y-3">
          {content.files.map((file) => (
            <div key={file.id} className="flex items-center gap-4 border border-border p-4">
              {file.type === "image" ? <Image className="h-5 w-5 text-accent" /> : <File className="h-5 w-5 text-muted-foreground" />}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm">{file.name}</p>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{file.type} / {formatBytes(file.size)}</p>
              </div>
              <a href={file.url} download={file.name} className="p-2 hover:text-accent"><Download className="h-4 w-4" /></a>
              <button onClick={() => removeFile(file.id)} className="p-2 hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
            </div>
          ))}
        </div>
      </div>
      <aside className="h-fit border border-border bg-muted/35 p-5">
        <p className="eyebrow text-muted-foreground">Supported</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Images, PDF CVs, Revit files (.rvt), AutoCAD files (.dwg, .dxf). This local version stores uploads in the browser, so use a backend storage service before production.</p>
      </aside>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label>
      <span className="eyebrow text-muted-foreground">{label}</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full border-b border-border bg-transparent py-3 outline-none transition-colors focus:border-accent" />
    </label>
  );
}

function TextField({ label, value, onChange, className = "" }: { label: string; value: string; onChange: (value: string) => void; className?: string }) {
  return (
    <label className={className}>
      <span className="eyebrow text-muted-foreground">{label}</span>
      <textarea value={value} onChange={(event) => onChange(event.target.value)} rows={4} className="mt-2 w-full resize-none border border-border bg-transparent p-3 outline-none transition-colors focus:border-accent" />
    </label>
  );
}

function UploadBox({ label, accept, onFile, large }: { label: string; accept: string; onFile: (file: PortfolioFile) => void; large?: boolean }) {
  const [dragging, setDragging] = useState(false);

  const handleFiles = async (files: FileList | File[]) => {
    const file = files[0];
    if (!file) return;
    onFile(await toPortfolioFile(file));
  };

  return (
    <label
      onDragOver={(event) => {
        event.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(event) => {
        event.preventDefault();
        setDragging(false);
        void handleFiles(event.dataTransfer.files);
      }}
      className={`mt-4 flex cursor-pointer flex-col items-center justify-center border border-dashed p-4 text-center transition-colors ${large ? "min-h-56" : "min-h-24"} ${dragging ? "border-accent bg-accent/10" : "border-border hover:border-accent"}`}
    >
      <Upload className="mb-3 h-5 w-5 text-accent" />
      <span className="text-sm">{label}</span>
      <span className="mt-1 text-xs text-muted-foreground">{accept.replaceAll(",", " / ")}</span>
      <input type="file" accept={accept} className="hidden" onChange={(event) => void handleFiles(event.target.files ?? [])} />
    </label>
  );
}

async function toPortfolioFile(file: File): Promise<PortfolioFile> {
  return {
    id: `${Date.now()}-${file.name}`,
    name: file.name,
    size: file.size,
    type: getFileType(file.name, file.type),
    url: await readFile(file),
  };
}

function readFile(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function getFileType(name: string, mime: string): PortfolioFile["type"] {
  const lower = name.toLowerCase();
  if (mime.startsWith("image/")) return "image";
  if (lower.endsWith(".pdf")) return "pdf";
  if (lower.endsWith(".rvt")) return "revit";
  if (lower.endsWith(".dwg") || lower.endsWith(".dxf")) return "cad";
  return "other";
}

function formatBytes(bytes: number) {
  if (!bytes) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / 1024 ** index).toFixed(index === 0 ? 0 : 1)} ${units[index]}`;
}
