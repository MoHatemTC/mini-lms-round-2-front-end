import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, Lock, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

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

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <Card className="w-full border-none shadow-none bg-transparent lg:bg-card lg:border lg:shadow-soft p-0 lg:p-4 text-center">
        <CardContent className="pt-8 pb-8 flex flex-col items-center">
          <div className="h-16 w-16 bg-success/10 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="h-8 w-8 text-success" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Password reset successful</h2>
          <p className="text-text-secondary mb-8">
            Your password has been successfully reset. You can now log in with
            your new password.
          </p>
          <Button className="w-full h-12">
            <Link to="/auth/login">Go to Login</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full border-none shadow-none bg-transparent lg:bg-card lg:border lg:shadow-soft p-0 lg:p-4">
      <CardHeader className="px-0 lg:px-6 pt-0 lg:pt-6">
        <CardTitle className="text-3xl font-bold">Set new password</CardTitle>
        <CardDescription className="text-base mt-2">
          Your new password must be different from previously used passwords.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0 lg:px-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="password">New Password</Label>
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
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
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
            Reset Password
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
