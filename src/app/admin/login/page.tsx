import { login } from "./actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; from?: string }>;
}) {
  const params = await searchParams;
  const error = params.error === "1";
  const from = params.from ?? "/admin";

  return (
    <div className="min-h-screen flex items-center justify-center bp-grid px-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2 justify-center mb-8">
          <span className="w-2 h-2 rounded-sm bg-rust" />
          <span className="font-serif font-extrabold text-xl">
            ra<span className="text-rust">io</span> journal
          </span>
        </div>
        <form
          action={login}
          className="bg-white border border-border rounded-lg p-8 shadow-sm"
        >
          <input type="hidden" name="from" value={from} />
          <label
            htmlFor="password"
            className="block text-xs font-mono uppercase tracking-wider text-ink-sub mb-2"
          >
            Admin password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoFocus
            required
            className="w-full border border-border rounded-md px-3 py-2.5 font-mono text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-rust/40 focus:border-rust"
          />
          {error ? (
            <p className="text-sm text-rust-deep mb-4">
              Wrong password. Try again.
            </p>
          ) : null}
          <button
            type="submit"
            className="w-full bg-rust hover:bg-rust-deep text-cream font-semibold text-sm rounded-md py-2.5 transition-colors cursor-pointer"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
