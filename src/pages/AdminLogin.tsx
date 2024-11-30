import { Lock } from "lucide-react";

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full px-6 py-8 bg-white shadow-lg rounded-lg">
        <div className="flex flex-col items-center space-y-4 mb-8">
          <div className="p-3 bg-primary/10 rounded-full">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Admin Login</h1>
          <p className="text-muted-foreground text-center">
            Please sign in to access the admin dashboard
          </p>
        </div>
        <form className="space-y-4" action="/api/admin/login">
          <div className="space-y-2">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="admin@example.com"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" required />
          </div>
          <button type="submit" className="w-full">
            Sign In
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          <link href="/forgot-password" className="underline">
            Forgot your password?
          </link>
        </p>
      </div>
    </div>
  );
}
