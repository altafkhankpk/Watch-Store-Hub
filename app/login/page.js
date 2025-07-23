"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
const router = useRouter()
  const watchAllFields = watch();
  console.log("Watched Fields: ", watchAllFields);

  const onSubmit = (data) => {
    console.log("Form Data: ", data);

    axios
      .post("/api/login", data)
      .then((resp) => {
        console.log("Response Data:", resp.data);
        if (resp.data.success) {
          toast.success(resp.data.message);
          router.push('/home')
        } else {
          toast.error(resp.data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("An error occurred during login.");
      });
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(to bottom, #6a11cb, #2575fc)",
      }}
    >
      <div className="card shadow-lg p-4" style={{ width: "100%", maxWidth: "400px", borderRadius: "15px" }}>
        <div className="text-center mb-4">
          <img
            className="mb-3"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
            style={{ width: "50px" }}
          />
          <h5 className="text-primary">Sign in to your account</h5>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { required: "Email is required" })}
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              placeholder="name@company.com"
            />
            {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
          </div>

          {/* Password Field */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", { required: "Password is required" })}
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              placeholder="••••••••"
            />
            {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="form-check">
              <input
                type="checkbox"
                id="remember"
                {...register("remember")}
                className="form-check-input"
              />
              <label htmlFor="remember" className="form-check-label">
                Remember me
              </label>
            </div>
            <a href="#" className="text-primary text-decoration-none">
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="text-center mt-3">
          Don’t have an account yet?{" "}
          <Link href="/signup" className="text-primary text-decoration-none">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
