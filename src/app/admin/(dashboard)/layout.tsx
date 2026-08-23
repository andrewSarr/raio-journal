import Link from "next/link";
import { logout } from "../login/actions";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border bg-white">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link
              href="/admin"
              className="flex items-center gap-2 font-serif font-extrabold text-lg"
            >
              <span className="w-2 h-2 rounded-sm bg-rust" />
              ra<span className="text-rust">io</span>{" "}
              <span className="text-ink-sub font-sans font-medium text-sm ml-1">
                admin
              </span>
            </Link>
            <nav className="flex items-center gap-5 text-sm font-medium">
              <Link href="/admin" className="text-ink-sub hover:text-ink">
                Posts
              </Link>
              <Link
                href="/admin/subscribers"
                className="text-ink-sub hover:text-ink"
              >
                Subscribers
              </Link>
              <Link
                href="/"
                target="_blank"
                className="text-ink-sub hover:text-ink"
              >
                View site &nearr;
              </Link>
            </nav>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="text-sm text-ink-sub hover:text-ink cursor-pointer"
            >
              Sign out
            </button>
          </form>
        </div>
      </header>
      <main className="flex-1 bg-cream-panel/40">{children}</main>
    </div>
  );
}
