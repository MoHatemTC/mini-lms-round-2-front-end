import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";

const registerSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log("Register data:", data);
    // Route to appropriate dashboard
    if (data.email.toLowerCase().includes("admin")) {
      navigate("/admin");
    } else {
      navigate("/learner");
    }
  };

  return (
    <Card className="w-full border-none shadow-none bg-transparent lg:bg-card lg:border lg:shadow-soft p-0 lg:p-4">
      <CardHeader className="px-0 lg:px-6 pt-0 lg:pt-6">
        <CardTitle className="text-3xl font-bold">Create an account</CardTitle>
        <CardDescription className="text-base mt-2">
          Start your learning journey today
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0 lg:px-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-text-secondary" />
              <Input
                id="name"
                placeholder="John Doe"
                className="pl-10"
                error={!!errors.name}
                {...register("name")}
              />
            </div>
            {errors.name && (
              <p className="text-sm text-danger mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-text-secondary" />
              <Input
                id="email"
                placeholder="you@example.com"
                className="pl-10"
                error={!!errors.email}
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-danger mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-text-secondary" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                className="pl-10 pr-10"
                placeholder="••••••••"
                error={!!errors.password}
                {...register("password")}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-text-secondary hover:text-text-primary transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-danger mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-text-secondary" />
              <Input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                className="pl-10"
                placeholder="••••••••"
                error={!!errors.confirmPassword}
                {...register("confirmPassword")}
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-danger mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-12 text-base mt-2"
            isLoading={isSubmitting}
          >
            Create account
          </Button>
        </form>

        <div className="mt-8 text-center text-sm">
          <span className="text-text-secondary">Already have an account? </span>
          <Link
            to="/auth/login"
            className="font-semibold text-primary hover:text-primary-hover transition-colors"
          >
            Log in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
