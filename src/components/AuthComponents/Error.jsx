function ErrorMessage({ error }) {
  const message =
    error instanceof globalThis.Error
      ? error.message
      : "An unknown error occurred.";

  return (
    <main
      role="alert"
      className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-8 text-slate-200"
    >
      <section className="w-full max-w-md rounded-2xl border border-rose-400/20 bg-slate-900 p-7 shadow-2xl shadow-black/20 sm:p-8">
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-rose-400/20 bg-rose-400/10 text-rose-300">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4m0 4h.01M10.3 3.9 1.8 18.6A1.6 1.6 0 0 0 3.2 21h17.6a1.6 1.6 0 0 0 1.4-2.4L13.7 3.9a2 2 0 0 0-3.4 0Z"
            />
          </svg>
        </span>
        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-rose-300">
          Connection issue
        </p>
        <h1 className="mt-2 text-xl font-semibold tracking-tight">
          Unable to load employee data
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-400">
          Make sure JSON Server is running with{" "}
          <code className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-slate-200">
            npm run server
          </code>{" "}
          and then refresh the page.
        </p>
        <p className="mt-4 border-t border-slate-800 pt-4 text-xs leading-5 text-slate-500">
          Details: {message}
        </p>
      </section>
    </main>
  );
}

export default ErrorMessage;
