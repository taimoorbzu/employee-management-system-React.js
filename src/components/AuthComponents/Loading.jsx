function Loading() {
  return (
    <main
      role="status"
      aria-live="polite"
      className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-8 text-slate-200"
    >
      <div className="w-full max-w-sm rounded-2xl border border-slate-700 bg-slate-900 p-8 text-center shadow-2xl shadow-black/20">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-blue-400/20 bg-blue-400/10">
          <span className="h-6 w-6 animate-spin rounded-full border-2 border-blue-300/30 border-t-blue-400" />
        </span>
        <h1 className="mt-5 text-lg font-semibold">Preparing your workspace</h1>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          Loading employee and task data. This should only take a moment.
        </p>
      </div>
    </main>
  );
}

export default Loading;
