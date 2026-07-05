import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, loading } = useAuth();

  return (
    <header className="border-b border-base/10 bg-white">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
        <Link to="/" className="font-display font-bold text-base">
          Crisis Compass
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link to="/assistant" className="text-base/70 hover:text-action">
            Assistant
          </Link>
          {!loading && user && (
            <Link to="/profile" className="text-base/70 hover:text-action">
              Profile
            </Link>
          )}
          {!loading && !user && (
            <>
              <Link to="/login" className="text-base/70 hover:text-action">
                Log in
              </Link>
              <Link
                to="/register"
                className="rounded-full bg-action px-3 py-1.5 font-medium text-white hover:bg-action/90"
              >
                Sign up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}