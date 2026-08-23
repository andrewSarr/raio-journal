import { getDictionary, Locale } from "@/lib/i18n";

export function SiteFooter({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <footer className="border-t border-border mt-20">
      <div className="max-w-3xl mx-auto px-6 py-10 flex flex-wrap items-center justify-between gap-4 text-sm text-ink-sub">
        <span>{dict.footerNote}</span>
        <div className="flex gap-5">
          <a
            href="https://github.com/andrewSarr/raio"
            target="_blank"
            rel="noopener"
            className="hover:text-ink"
          >
            {dict.githubLink}
          </a>
          <a
            href="https://andrewsarr.github.io/raio-landing/"
            target="_blank"
            rel="noopener"
            className="hover:text-ink"
          >
            {dict.landingLink}
          </a>
        </div>
      </div>
    </footer>
  );
}
