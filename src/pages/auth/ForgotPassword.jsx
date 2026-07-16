import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, ArrowLeft } from "lucide-react";

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
import { useState } from "react";

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

export default function ForgotPassword() {
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = () => {
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <Card className="w-full border-none shadow-none bg-transparent lg:bg-card lg:border lg:shadow-soft p-0 lg:p-4 text-center">
        <CardContent className="pt-8 pb-8 flex flex-col items-center">
          <div className="h-16 w-16 bg-success/10 rounded-full flex items-center justify-center mb-6">
            <Mail className="h-8 w-8 text-success" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Check your email</h2>
          <p className="text-text-secondary mb-8">
            We sent a password reset link to your email address. Please check
            your inbox.
          </p>
          <Button
            variant="outline"
            className="w-full h-12 text-base font-medium rounded-2xl"
          >
            <Link to="/auth/login">Back to log in</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full border-none shadow-none bg-transparent lg:bg-card lg:border lg:shadow-soft p-0 lg:p-4">
      <CardHeader className="px-0 lg:px-6 pt-0 lg:pt-6">
        <CardTitle className="text-3xl font-bold">Reset Password</CardTitle>
        <CardDescription className="text-base mt-2">
          Enter your email and we'll send you instructions to reset your
          password.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0 lg:px-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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

          <Button
            type="submit"
            className="w-full h-12 text-base mt-2"
            isLoading={isSubmitting}
          >
            Send reset instructions
          </Button>
        </form>

        <div className="mt-8 text-center text-sm">
          <Link
            to="/auth/login"
            className="inline-flex items-center font-medium text-text-secondary hover:text-primary transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to log in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
