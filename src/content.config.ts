import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const linkField = z
  .string()
  .refine(
    (value) =>
      value.startsWith("/") ||
      value.startsWith("http://") ||
      value.startsWith("https://") ||
      value.startsWith("mailto:"),
    "Expected an absolute path, a full URL, or a mailto link"
  );

const projects = defineCollection({
  loader: glob({ pattern: "*/projects/**/*.md", base: "./src/content" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    year: z.string(),
    role: z.string(),
    cover: z.string(),
    coverAlt: z.string(),
    tags: z.array(z.string()),
    featured: z.boolean().default(false),
    status: z.string().default("In Progress"),
    github: linkField.optional(),
    demo: linkField.optional(),
    writeup: linkField.optional()
  })
});

const research = defineCollection({
  loader: glob({ pattern: "*/research/**/*.md", base: "./src/content" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    kind: z.enum(["Paper", "Competition", "Report", "Achievement"]),
    venue: z.string(),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    tags: z.array(z.string()),
    featured: z.boolean().default(false)
  })
});

const notes = defineCollection({
  loader: glob({ pattern: "*/notes/**/*.md", base: "./src/content" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    kind: z.enum(["Note", "Tech Record", "Essay", "Summary"]),
    featured: z.boolean().default(false)
  })
});

const about = defineCollection({
  loader: glob({ pattern: "*/about/**/*.md", base: "./src/content" }),
  schema: z.object({
    section: z.enum(["profile", "news", "award", "products", "research", "collaborators"]),
    order: z.number().default(0),
    kicker: z.string(),
    title: z.string(),
    summaryLabel: z.string().optional(),
    backgroundLabel: z.string().optional(),
    keywordsLabel: z.string().optional(),
    summary: z.string().optional(),
    background: z.string().optional(),
    keywords: z.array(z.string()).optional(),
    timeline: z.array(z.object({
      date: z.string(),
      title: z.string(),
      body: z.string().optional(),
      href: linkField.optional(),
      linkLabel: z.string().optional(),
    })).optional(),
    groups: z.array(z.object({
      label: z.string(),
      description: z.string().optional(),
      items: z.array(z.object({
        date: z.string().optional(),
        title: z.string(),
        body: z.string().optional(),
        asset: z.string().optional(),
        href: linkField.optional(),
        linkLabel: z.string().optional(),
      })),
    })).optional(),
    items: z.array(z.object({
      year: z.string().optional(),
      title: z.string(),
      subtitle: z.string().optional(),
      note: z.string().optional(),
      body: z.string().optional(),
      kind: z.string().optional(),
      href: linkField.optional(),
      linkLabel: z.string().optional(),
      links: z.array(z.object({
        label: z.string(),
        href: linkField,
      })).optional(),
    })).optional(),
    subsections: z.array(z.object({
      title: z.string(),
      body: z.string(),
    })).optional(),
  })
});

const pageSection = z.object({
  kicker: z.string(),
  title: z.string(),
  intro: z.string().default(""),
});

const footerContact = z.object({
  label: z.string(),
  value: z.string(),
  href: linkField.optional(),
  kind: z.enum(["phone", "email", "backupEmail", "qq", "wechat", "github", "team"]),
  imageSrc: z.string().optional(),
  imageAlt: z.string().optional(),
});

const pages = defineCollection({
  loader: glob({ pattern: "*/pages/**/*.md", base: "./src/content" }),
  schema: z.object({
    page: z.enum(["home", "about", "contact", "projects", "research", "notes", "gallery"]),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    kicker: z.string().optional(),
    title: z.string().optional(),
    intro: z.string().optional(),
    affiliations: z.array(z.object({
      text: z.string(),
      href: linkField.optional(),
    })).optional(),
    portraitImage: z.string().optional(),
    portraitImageAlt: z.string().optional(),
    cvFile: z.string().optional(),
    hero: z.object({
      kicker: z.string(),
      title: z.string(),
      intro: z.string(),
      note: z.string(),
      visualKicker: z.string(),
      visualImage: z.string(),
      visualImageAlt: z.string(),
      visualTitle: z.string(),
      visualIntro: z.string(),
    }).optional(),
    sections: z.object({
      selectedProjects: pageSection,
      research: pageSection,
      notes: pageSection,
      galleryPreview: pageSection,
    }).optional(),
    contactSections: z.array(z.object({
      kicker: z.string(),
      title: z.string(),
      body: z.string(),
      links: z.array(z.object({
        label: z.string(),
        value: z.string(),
        href: linkField,
      })),
    })).optional(),
    footer: z.object({
      kicker: z.string(),
      note: z.string(),
      tagline: z.string(),
      contacts: z.array(footerContact),
    }).optional(),
    categories: z.array(z.object({
      id: z.string(),
      label: z.string(),
      title: z.string(),
      note: z.string().optional(),
    })).optional(),
  })
});

export const collections = { projects, research, notes, about, pages };
