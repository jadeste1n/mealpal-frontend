import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "@/context";
import { signup } from "@/data";

const Signup = () => {
  const { isAuthenticated, setCheckSession, setIsAuthenticated } = useAuth();

  const [{ userName, email, password, confirmPassword }, setForm] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!userName || !email || !password || !confirmPassword) {
        throw new Error("All fields are required");
      }
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      setLoading(true);
      const res = await signup({ userName, email, password }); // 👈 don't send confirmPassword
      setIsAuthenticated(true);
      setCheckSession(true);
      toast.success(res.success);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated) return <Navigate to="/" />;

  return (
    <form
      className="my-5 md:w-1/2 mx-auto flex flex-col gap-3"
      onSubmit={handleSubmit}
    >
      {/* Username */}
      <label className="input input-bordered flex items-center gap-2">
        <span className="material-symbols-outlined text-sm">person</span>
        <input
          name="userName"
          value={userName}
          onChange={handleChange}
          className="grow"
          placeholder="Username"
        />
      </label>

      {/* Email */}
      <label className="input input-bordered flex items-center gap-2">
        <span className="material-symbols-outlined text-sm">mail</span>
        <input
          name="email"
          type="email"
          value={email}
          onChange={handleChange}
          className="grow"
          placeholder="Email"
        />
      </label>

      {/* Passwords */}
      <div className="flex justify-between gap-2">
        <label className="grow input input-bordered flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">lock</span>
          <input
            name="password"
            type="password"
            value={password}
            onChange={handleChange}
            className="grow"
            placeholder="Password"
          />
        </label>

        <label className="grow input input-bordered flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">lock_reset</span>
          <input
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={handleChange}
            className="grow"
            placeholder="Confirm Password"
          />
        </label>
      </div>

      {/* Link + Submit */}
      <small>
        Already have an account?{" "}
        <Link to="/login" className="text-primary hover:underline">
          Log in!
        </Link>
      </small>

      <button className="btn btn-primary self-center" disabled={loading}>
        Create Account
      </button>
    </form>
  );
};

export default Signup;
