export type Locale = "en" | "fr";

export const dictionaries = {
  en: {
    tagline: "journal",
    heroEyebrow: "Open source · Rust",
    heroTitle: "Notes from building raio.",
    heroLead:
      "Design decisions, architecture, and progress on an open-source instant-payment foundation in Rust — built for African rails and interoperability.",
    subscribeEmailPlaceholder: "you@example.com",
    subscribeButton: "Subscribe",
    subscribeButtonLoading: "...",
    subscribeSuccess: "You're on the list — thanks.",
    subscribeErrorGeneric: "Something went wrong.",
    subscribeErrorNetwork: "Network error. Try again.",
    subscribeErrorInvalidEmail: "That doesn't look like a valid email.",
    postFooterLead: "Get new posts by email — no spam, unsubscribe anytime.",
    emptyPosts: "No posts published yet — check back soon.",
    githubLink: "GitHub",
    landingLink: "Landing page",
    footerNote: "raio journal · notes from an open-source foundation",
    langSwitchLabel: "FR",
    langSwitchHref: (path: string) => `/fr${path}`,
    dateLocale: "en-US",
  },
  fr: {
    tagline: "journal",
    heroEyebrow: "Open source · Rust",
    heroTitle: "Les coulisses de raio.",
    heroLead:
      "Décisions de conception, architecture, et avancement d'une fondation de paiement instantané open source en Rust — conçue pour les rails africains et l'interopérabilité.",
    subscribeEmailPlaceholder: "vous@exemple.com",
    subscribeButton: "S'abonner",
    subscribeButtonLoading: "...",
    subscribeSuccess: "C'est fait, vous êtes inscrit·e — merci.",
    subscribeErrorGeneric: "Une erreur est survenue.",
    subscribeErrorNetwork: "Erreur réseau. Réessayez.",
    subscribeErrorInvalidEmail: "Cette adresse e-mail ne semble pas valide.",
    postFooterLead:
      "Recevez les nouveaux articles par e-mail — pas de spam, désabonnement à tout moment.",
    emptyPosts: "Aucun article publié pour l'instant — revenez bientôt.",
    githubLink: "GitHub",
    landingLink: "Page d'accueil",
    footerNote: "raio journal · les coulisses d'une fondation open source",
    langSwitchLabel: "EN",
    langSwitchHref: (path: string) => path,
    dateLocale: "fr-FR",
  },
} as const;

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
