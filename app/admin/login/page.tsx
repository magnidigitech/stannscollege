import { loginAction } from "./actions";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl border border-slate-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">Admin Portal</h1>
          <p className="mt-2 text-slate-600">Please sign in to manage the website</p>
        </div>
        
        <form action={loginAction} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-slate-700" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="mt-1 block w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 block w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all"
              />
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full rounded-xl bg-blue-900 px-4 py-4 text-lg font-bold text-white transition-all hover:bg-blue-800 active:scale-95"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
