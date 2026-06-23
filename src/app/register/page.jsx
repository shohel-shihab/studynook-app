"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import toast from "react-hot-toast";

import {
  Button,
  Form,
  TextField,
  Label,
  Input,
  FieldError,
} from "@heroui/react";

import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] =
    useState(false);

  const [passwordError, setPasswordError] =
    useState("");

  const [serverError, setServerError] =
    useState("");

  const validatePassword = (password) => {
    if (password.length < 6) {
      return "Password must be at least 6 characters";
    }

    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter";
    }

    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter";
    }

    return "";
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    setPasswordError("");
    setServerError("");

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name");
    const email = formData.get("email");
    const image = formData.get("photoUrl");
    const password = formData.get("password");

    const validationError =
      validatePassword(password);

    if (validationError) {
      setPasswordError(validationError);
      return;
    }

    try {
      setLoading(true);

      const result =
        await authClient.signUp.email({
          name,
          email,
          password,
          image,
        });

      if (result?.error) {
        setServerError(result.error.message);
        toast.error(result.error.message);
        return;
      }

      toast.success(
        "Registration successful! Please login."
      );

      router.push("/login");
    } catch (error) {
      setServerError(
        "Registration failed. Please try again."
      );

      toast.error(
        "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      setGoogleLoading(true);

      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch {
      toast.error("Google sign up failed");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-12">
      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        className="w-full max-w-md rounded-3xl border bg-white p-8 shadow-lg"
      >
        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Create Account
          </h1>

          <p className="mt-2 text-gray-500">
            Join StudyNook today
          </p>
        </div>

        {/* Server Error */}
        {serverError && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
            {serverError}
          </div>
        )}

        <Form
          className="flex flex-col gap-5"
          onSubmit={handleRegister}
        >
          {/* Name */}
          <TextField
            isRequired
            name="name"
          >
            <Label>Full Name</Label>
            <Input placeholder="John Doe" />
            <FieldError />
          </TextField>

          {/* Email */}
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                  value
                )
              ) {
                return "Please enter a valid email";
              }

              return null;
            }}
          >
            <Label>Email</Label>
            <Input placeholder="name@example.com" />
            <FieldError />
          </TextField>

          {/* Photo URL */}
          <TextField
            isRequired
            name="photoUrl"
            validate={(value) => {
              try {
                new URL(value);
                return null;
              } catch {
                return "Please enter a valid image URL";
              }
            }}
          >
            <Label>Photo URL</Label>
            <Input placeholder="https://example.com/photo.jpg" />
            <FieldError />
          </TextField>

          {/* Password */}
          <TextField
            isRequired
            name="password"
            type="password"
          >
            <Label>Password</Label>

            <Input placeholder="Enter password" />

            <FieldError />

            {passwordError && (
              <p className="mt-1 text-sm text-red-500">
                {passwordError}
              </p>
            )}

            <div className="mt-2 text-xs text-gray-500">
              Password must:
              <ul className="ml-4 mt-1 list-disc">
                <li>Be at least 6 characters</li>
                <li>Contain one uppercase letter</li>
                <li>Contain one lowercase letter</li>
              </ul>
            </div>
          </TextField>

          {/* Register Button */}
          <Button
            type="submit"
            color="primary"
            size="lg"
            className="w-full"
            isLoading={loading}
          >
            Register
          </Button>
        </Form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="h-px flex-1 bg-gray-200" />

          <span className="px-3 text-sm text-gray-400">
            OR
          </span>

          <div className="h-px flex-1 bg-gray-200" />
        </div>

        {/* Google Button */}
        <Button
          variant="bordered"
          size="lg"
          className="w-full"
          onPress={handleGoogleRegister}
          isLoading={googleLoading}
        >
          Continue with Google
        </Button>

        {/* Login Link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-teal-700 hover:underline"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}