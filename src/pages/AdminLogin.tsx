import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Lock } from "lucide-react";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the page from reloading
    const loginDetails = { username, password };
    setError(null); // Clear previous errors

    try {
      const result = await axios.post(
        `${import.meta.env.VITE_APP_API_ENDPOINT}/auth/login`,
        loginDetails
      );

      // On success, save the JWT and navigate
      localStorage.setItem("jwt", result.data.token);
      navigate("/admin/dashboard");
    } catch (error: any) {
      // Handle errors and set the error message
      const message =
        error.response?.data || "An error occurred. Please try again.";
      setError(message);
    }
  };

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
        <form
          className="space-y-4"
          onSubmit={handleSubmit}
          //   action="/api/admin/login"
        >
          <div className="space-y-2">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="text"
              placeholder="admin-user"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          <button type="submit" className="w-full">
            Sign In
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          <a href="/forgot-password" className="underline">
            Forgot your password?
          </a>
        </p>
      </div>
    </div>
  );
}
