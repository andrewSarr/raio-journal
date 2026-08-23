import Link from "next/link";
import { getDictionary, Locale } from "@/lib/i18n";

export function SiteHeader({
  locale,
  switchHref,
}: {
  locale: Locale;
  /** Full path to this same page in the other language. */
  switchHref: string;
}) {
  const dict = getDictionary(locale);
  const home = locale === "fr" ? "/fr" : "/";

  return (
    <header className="border-b border-border bg-cream/85 backdrop-blur sticky top-0 z-10">
      <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href={home}
          className="flex items-center gap-2 font-serif font-extrabold text-lg"
        >
          <span className="w-2 h-2 rounded-sm bg-rust" />
          ra<span className="text-rust">io</span>{" "}
          <span className="font-sans font-medium text-ink-sub text-sm ml-1">
            {dict.tagline}
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href={switchHref}
            hrefLang={locale === "fr" ? "en" : "fr"}
            className="text-sm font-mono font-semibold border-1.5 border-border rounded-full px-2.5 py-1 text-ink-sub hover:text-ink hover:border-ink"
          >
            {dict.langSwitchLabel}
          </Link>
          <a
            href="https://github.com/andrewSarr/raio"
            target="_blank"
            rel="noopener"
            className="text-sm font-medium border-2 border-ink rounded-md px-3 py-1.5 hover:bg-cream-panel"
          >
            {dict.githubLink} &nearr;
          </a>
        </div>
      </div>
    </header>
  );
}
