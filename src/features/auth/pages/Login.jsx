import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

import { login, selectLoading, selectError } from '../index';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Label } from '../../../components/ui/Label';
import { Checkbox } from '../../../components/ui/Checkbox';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../components/ui/Card';

const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  rememberMe: z.boolean().optional(),
});

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const loading = useSelector(selectLoading);
  const serverError = useSelector(selectError);
  const [showPassword, setShowPassword] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data) => {
    const resultAction = await dispatch(login(data));
    if (login.fulfilled.match(resultAction)) {
      const { role } = resultAction.payload.user;
      if (role === 'Admin') {
        navigate('/admin/dashboard');
      } else if (role === 'Learner') {
        navigate('/learner/dashboard');
      }
    }
  };

  return (
    <Card className="w-full border-none shadow-none bg-transparent lg:bg-card lg:border lg:shadow-soft p-0 lg:p-4">
      <CardHeader className="px-0 lg:px-6 pt-0 lg:pt-6">
        <CardTitle className="text-3xl font-bold">Welcome back</CardTitle>
        <CardDescription className="text-base mt-2">
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0 lg:px-6">
        {serverError && (
          <div className="mb-4 p-3 rounded bg-red-100 text-red-700 text-sm text-center">
            {serverError}
          </div>
        )}
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
                {...register('email')}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-danger mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link
                to="/forgot-password"
                className="text-sm font-medium text-primary hover:text-primary-hover transition-colors"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-text-secondary" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className="pl-10 pr-10"
                placeholder="••••••••"
                error={!!errors.password}
                {...register('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-text-secondary hover:text-text-primary transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-danger mt-1">{errors.password.message}</p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="rememberMe" {...register('rememberMe')} />
            <Label htmlFor="rememberMe" className="text-sm font-normal cursor-pointer">
              Remember me for 30 days
            </Label>
          </div>

          <Button type="submit" className="w-full h-12 text-base" isLoading={loading}>
            Log in
          </Button>
        </form>

        <div className="mt-8 text-center text-sm">
          <span className="text-text-secondary">Don&apos;t have an account? </span>
          <Link
            to="/register"
            className="font-semibold text-primary hover:text-primary-hover transition-colors"
          >
            Sign up now
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
