import { useData } from "../../contexts/DataContext";

function Header() {
  const { user, setUser } = useData();
  return (
    <header className="mx-auto flex w-full max-w-7xl items-center justify-between rounded-xl border border-slate-700 bg-slate-800 px-5 py-4 shadow-lg sm:px-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-sm font-medium text-slate-400">Welcome back</h1>
        <p className="text-2xl font-semibold tracking-tight text-slate-200 sm:text-3xl">
          {user.name}
        </p>
      </div>
      <button
        type="button"
        onClick={() => setUser(null)}
        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-slate-100 transition-colors hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-800"
      >
        Logout
      </button>
    </header>
  );
}

export default Header;
