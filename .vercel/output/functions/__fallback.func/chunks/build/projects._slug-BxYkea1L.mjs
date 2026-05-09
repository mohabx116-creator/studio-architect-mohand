import { W as jsxRuntimeExports } from "./server-CLcWzaCz.mjs";
import { z as Route2, p as projects, H as Header, R as Reveal, d as Link, F as Footer, y as createLucideIcon } from "./router-BW_0vjuV.mjs";
import { A as ArrowRight } from "./arrow-right-r19rl1Sp.mjs";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
const __iconNode = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode);
function ProjectPage() {
  const {
    project
  } = Route2.useLoaderData();
  const idx = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(idx + 1) % projects.length];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative h-[80svh] min-h-[520px] overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: project.cover, alt: project.title, className: "h-full w-full object-cover", fetchPriority: "high" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-black/20 to-black/70" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 bottom-0 container-luxe pb-16 text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow text-white/70", children: project.category }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 font-display text-5xl md:text-7xl max-w-4xl", children: project.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-white/80", children: project.location })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-luxe py-24 md:py-32 grid md:grid-cols-12 gap-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { className: "md:col-span-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "space-y-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Meta, { label: "Year", value: String(project.year) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Meta, { label: "Location", value: project.location }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Meta, { label: "Area", value: project.area }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Meta, { label: "Typology", value: project.category })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { className: "md:col-span-8", delay: 0.1, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow text-muted-foreground", children: "Project Notes" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 font-display text-2xl md:text-3xl leading-[1.3]", children: project.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow text-muted-foreground", children: "Materials" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-4 flex flex-wrap gap-2", children: project.materials.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "px-4 py-2 border border-border text-xs tracking-wider uppercase", children: m }, m)) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "container-luxe space-y-6 md:space-y-10 pb-32", children: project.images.map((img, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: i * 0.05, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `overflow-hidden bg-muted ${i % 2 === 0 ? "aspect-[16/9]" : "aspect-[3/2] md:w-2/3 md:ml-auto"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: img, alt: `${project.title} ${i + 1}`, loading: "lazy", className: "h-full w-full object-cover" }) }) }, i)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-luxe py-16 flex items-center justify-between gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/projects", className: "inline-flex items-center gap-2 text-sm tracking-wider uppercase hover:text-accent transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
          " All projects"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/projects/$slug", params: {
          slug: next.slug
        }, className: "group text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow text-muted-foreground", children: "Next project" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 font-display text-2xl md:text-3xl group-hover:text-accent transition-colors inline-flex items-center gap-3", children: [
            next.title,
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-5 w-5 transition-transform group-hover:translate-x-1" })
          ] })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
function Meta({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "eyebrow text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "mt-2 font-display text-xl", children: value })
  ] });
}
export {
  ProjectPage as component
};
