export function SiteFooter() {
  return (
    <footer className="border-t border-border mt-20">
      <div className="max-w-3xl mx-auto px-6 py-10 flex flex-wrap items-center justify-between gap-4 text-sm text-ink-sub">
        <span>raio journal &middot; notes from an open-source foundation</span>
        <div className="flex gap-5">
          <a
            href="https://github.com/andrewSarr/raio"
            target="_blank"
            rel="noopener"
            className="hover:text-ink"
          >
            GitHub
          </a>
          <a
            href="https://andrewsarr.github.io/raio-landing/"
            target="_blank"
            rel="noopener"
            className="hover:text-ink"
          >
            Landing page
          </a>
        </div>
      </div>
    </footer>
  );
}
