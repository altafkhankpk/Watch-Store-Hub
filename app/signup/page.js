"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Link from "next/link";

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const router = useRouter();

  const onSubmit = (data) => {
    console.log("Form Data: ", data);

    if (data) {
      axios.post("/api/auth", data).then((resp) => {
        console.log(resp.data);
        if (resp.data.success) {
          toast.success(resp.data.message);
          router.push('/login')
        } else {
          toast.error(resp.data.message);
        }
      });
    }
  };



  const password = watch("password");

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        background: "linear-gradient(135deg, #6a11cb, #2575fc)",
        minHeight: "100vh",
        padding: "10px",
      }}
    >
      <div
        className="card p-3 shadow-lg border-0"
        style={{
          width: "100%",
          maxWidth: "360px",
          borderRadius: "10px",
          backgroundColor: "#fff",
        }}
      >
        <div className="text-center mb-3">
          <img
            src="https://readymadeui.com/readymadeui.svg"
            alt="logo"
            className="img-fluid mb-2"
            style={{ maxWidth: "80px" }}
          />
          <h5 className="text-dark fw-bold">Create Your Account</h5>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <div className="mb-2">
            <label className="form-label fw-semibold">Email</label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^@]+@[^@]+\.[^@]+$/,
                  message: "Invalid email format",
                },
              })}
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              placeholder="Enter your email"
              style={{ fontSize: "14px", padding: "6px 10px" }}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-2">
            <label className="form-label fw-semibold">Password</label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              placeholder="Create a password"
              style={{ fontSize: "14px", padding: "6px 10px" }}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password.message}</div>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="mb-2">
            <label className="form-label fw-semibold">Confirm Password</label>
            <input
              {...register("cpassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              type="password"
              className={`form-control ${errors.cpassword ? "is-invalid" : ""}`}
              placeholder="Confirm your password"
              style={{ fontSize: "14px", padding: "6px 10px" }}
            />
            {errors.cpassword && (
              <div className="invalid-feedback">{errors.cpassword.message}</div>
            )}
          </div>

          {/* Marital Status Field */}
          <div className="mb-2">
            <label className="form-label fw-semibold">Marital Status</label>
            <select
              {...register("maritalStatus", {
                required: "Marital status is required",
              })}
              className={`form-select ${errors.maritalStatus ? "is-invalid" : ""}`}
              style={{ fontSize: "14px", padding: "6px 10px" }}
            >
              <option value="">Select status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="divorced">Divorced</option>
            </select>
            {errors.maritalStatus && (
              <div className="invalid-feedback">{errors.maritalStatus.message}</div>
            )}
          </div>

          {/* Terms Checkbox */}
          <div className="form-check mb-2">
            <input
              {...register("terms", {
                required: "You must accept the terms and conditions",
              })}
              type="checkbox"
              className="form-check-input"
            />
            <label className="form-check-label small">
              I agree to the{" "}
              <a href="#" className="text-primary text-decoration-none">
                Terms and Conditions
              </a>
            </label>
            {errors.terms && (
              <div className="text-danger small mt-1">{errors.terms.message}</div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-100 fw-bold"
            style={{
              background: "linear-gradient(135deg, #6a11cb, #2575fc)",
              border: "none",
              fontSize: "14px",
              padding: "8px 0",
            }}
          >
            Sign Up
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-dark small mt-2">
          Already have an account?{" "}
          <Link href="/login" className="text-primary text-decoration-none">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
