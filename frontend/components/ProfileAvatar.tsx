'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/stores/useAuthStore';

export default function ProfileAvatar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-9 h-9 rounded-full bg-gradient-to-br from-rose to-plum flex items-center justify-center text-paper font-italiana text-lg transition-transform hover:scale-110"
      >
        {user?.name?.[0]?.toUpperCase() || 'U'}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-12 w-48 glass border border-stone/30 rounded-xl p-2 z-50 animate-fade-in">
            <Link
              href="/profile"
              className="block px-4 py-2.5 rounded-lg hover:bg-canvas transition-colors font-grotesk text-sm"
              onClick={() => setIsOpen(false)}
            >
              Profile
            </Link>
            <Link
              href="/lab"
              className="block px-4 py-2.5 rounded-lg hover:bg-canvas transition-colors font-grotesk text-sm"
              onClick={() => setIsOpen(false)}
            >
              Studio
            </Link>
            <hr className="my-2 border-stone/30" />
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2.5 rounded-lg hover:bg-rose/10 transition-colors font-grotesk text-sm text-rose"
            >
              Sign Out
            </button>
          </div>
        </>
      )}
    </div>
  );
}
