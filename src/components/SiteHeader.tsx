import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-cream/85 backdrop-blur sticky top-0 z-10">
      <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-serif font-extrabold text-lg"
        >
          <span className="w-2 h-2 rounded-sm bg-rust" />
          ra<span className="text-rust">io</span>{" "}
          <span className="font-sans font-medium text-ink-sub text-sm ml-1">
            journal
          </span>
        </Link>
        <a
          href="https://github.com/andrewSarr/raio"
          target="_blank"
          rel="noopener"
          className="text-sm font-medium border-2 border-ink rounded-md px-3 py-1.5 hover:bg-cream-panel"
        >
          GitHub &nearr;
        </a>
      </div>
    </header>
  );
}
