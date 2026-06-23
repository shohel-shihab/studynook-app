"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
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

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectTo =
    searchParams.get("redirect") || "/";

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] =
    useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const result =
        await authClient.signIn.email({
          email,
          password,
        });

      if (result?.error) {
        setError(result.error.message);
        toast.error(
          result.error.message ||
            "Invalid email or password"
        );
        return;
      }

      toast.success("Login successful");

      router.push(redirectTo);
      router.refresh();
    } catch (err) {
      setError("Invalid email or password");
      toast.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);

      await authClient.signIn.social({
        provider: "google",
        callbackURL: redirectTo,
      });
    } catch {
      toast.error("Google login failed");
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
            Welcome Back
          </h1>

          <p className="mt-2 text-gray-500">
            Login to continue using StudyNook
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Form */}
        <Form
          className="flex flex-col gap-5"
          onSubmit={handleLogin}
        >
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

          <TextField
            isRequired
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 6) {
                return "Password must be at least 6 characters";
              }

              return null;
            }}
          >
            <Label>Password</Label>
            <Input placeholder="Enter password" />
            <FieldError />
          </TextField>

          <Button
            type="submit"
            color="primary"
            size="lg"
            className="w-full"
            isLoading={loading}
          >
            Login
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

        {/* Google Login */}
        <Button
          variant="bordered"
          size="lg"
          className="w-full"
          onPress={handleGoogleLogin}
          isLoading={googleLoading}
        >
          Continue with Google
        </Button>

        {/* Register Link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-teal-700 hover:underline"
          >
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
}