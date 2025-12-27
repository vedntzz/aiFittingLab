'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    // TODO: Implement NextAuth Google login
    console.log('Google login clicked');
    setTimeout(() => {
      router.push('/wall');
    }, 1500);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Visual Side */}
      <div className="relative bg-canvas flex items-center justify-center overflow-hidden">
        {/* Floating Shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-96 h-96 rounded-full bg-rose/20 blur-[100px] -top-24 -left-24 animate-pulse" />
          <div className="absolute w-80 h-80 rounded-full bg-sage/20 blur-[100px] -bottom-24 -right-12 animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute w-72 h-72 rounded-full bg-ocean/20 blur-[100px] top-1/2 left-1/3 animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-12 max-w-xl">
          <h1 className="font-editorial text-6xl md:text-7xl lg:text-8xl mb-8 leading-[0.9]">
            Where Fashion
            <br />
            Meets Algorithm
          </h1>
          <p className="font-grotesk text-sm uppercase tracking-[2px] text-ink/60">
            Digital Atelier Since 2024
          </p>
        </div>
      </div>

      {/* Form Side */}
      <div className="flex items-center justify-center px-8 py-12 lg:px-16">
        <div className="w-full max-w-md animate-fade-in">
          <div className="mb-12">
            <h2 className="font-italiana text-4xl mb-3">Welcome Back</h2>
            <p className="font-grotesk text-sm text-ink/60">
              Sign in to continue your creative journey
            </p>
          </div>

          {/* Google Sign In */}
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full px-6 py-4 bg-paper border border-stone rounded-xl font-grotesk text-sm font-medium flex items-center justify-center gap-3 hover:border-copper hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-6"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            {isLoading ? 'Signing in...' : 'Continue with Google'}
          </button>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-stone" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-paper px-4 text-silk font-grotesk">
                Or explore as guest
              </span>
            </div>
          </div>

          {/* Guest Access */}
          <Link href="/wall">
            <button className="w-full py-3 border border-stone rounded-xl font-grotesk text-sm font-medium hover:border-copper hover:bg-canvas transition-all">
              Browse Without Account
            </button>
          </Link>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-stone text-center">
            <p className="font-grotesk text-sm text-ink/60">
              New to Thread?{' '}
              <Link
                href="/signup"
                className="text-ink border-b border-stone hover:border-copper transition-colors"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
