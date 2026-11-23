import { useState } from "react";
import { useData } from "../../contexts/DataContext";
import ErrorMessage from "./Error";
import Loading from "./Loading";

function Login() {
  const { data, setUser, loading, error } = useData();
  const { employees = [] } = data ?? {};
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  if (loading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;

  function handleSubmitForm(e) {
    e.preventDefault();
    setLoginError("");

    const selectedUser = employees.find(
      (emp) => emp.email.toLowerCase() === email.trim().toLowerCase(),
    );

    if (!selectedUser || selectedUser.password !== password) {
      setLoginError("Email or password is incorrect.");
      return;
    }

    setUser({
      id: selectedUser.id,
      name: selectedUser.name,
      email: selectedUser.email,
      role: selectedUser.role,
    });
    setEmail("");
    setPassword("");
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 px-4 py-8">
      <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-800 p-6 text-white shadow-2xl sm:p-8">
        <form
          className="flex flex-col gap-5"
          onSubmit={(e) => handleSubmitForm(e)}
        >
          <h1 className="text-center text-3xl font-extrabold tracking-tight">
            Login Form
          </h1>
          {loginError && (
            <p role="alert" className="text-sm text-rose-300">
              {loginError}
            </p>
          )}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-slate-200"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              required
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              className="w-full rounded-lg border border-slate-600 bg-slate-900 px-4 py-3 text-white placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-slate-200"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              required
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              className="w-full rounded-lg border border-slate-600 bg-slate-900 px-4 py-3 text-white placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
            />
          </div>
          <button
            type="submit"
            className="mt-2 w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-800 active:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
export default Login;
