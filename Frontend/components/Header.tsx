'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/stores/useAuthStore';
import SearchBar from './SearchBar';
import ProfileAvatar from './ProfileAvatar';

export default function Header() {
  const pathname = usePathname();
  const { isAuthenticated } = useAuthStore();

  const navLinks = [
    { href: '/wall', label: 'Discover' },
    { href: '/collections', label: 'Collections' },
    { href: '/designers', label: 'Designers' },
    { href: '/trends', label: 'Trends' },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-stone/30">
      <div className="max-w-[1800px] mx-auto px-10 py-5 flex items-center justify-between">
        {/* Logo */}
        <Link href="/wall" className="relative">
          <span className="font-italiana text-3xl tracking-[4px]">THREAD</span>
          <span className="absolute -top-1 -right-6 font-grotesk text-xs font-semibold text-copper">
            .AI
          </span>
        </Link>

        {/* Center Navigation */}
        <div className="flex gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative font-grotesk text-xs uppercase tracking-wider transition-colors ${
                isActive(link.href) ? 'text-copper' : 'text-ink hover:text-copper'
              }`}
            >
              {link.label}
              {isActive(link.href) && (
                <span className="absolute -bottom-1 left-0 w-full h-px bg-copper" />
              )}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-6">
          <SearchBar />
          <Link href="/lab">
            <button className="btn-primary">Virtual Studio</button>
          </Link>
          {isAuthenticated ? (
            <ProfileAvatar />
          ) : (
            <Link href="/login">
              <button className="btn-secondary">Sign In</button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
