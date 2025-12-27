'use client';

import { useState } from 'react';
import Link from 'next/link';
import FashionCard from '@/components/FashionCard';
import { Post } from '@/types';

// Mock user data
const mockUser = {
  id: 'user-1',
  name: 'Sophia Laurent',
  username: 'sophialaurent',
  email: 'sophia@example.com',
  image: '',
  bio: 'Digital fashion designer and creative director specializing in AI-generated haute couture. Exploring the intersection of technology and traditional craftsmanship.',
  createdAt: new Date().toISOString(),
};

const tabs = ['All Works', 'Collections', 'Drafts', 'Saved'];

const generateMockPost = (id: number): Post => ({
  id: `post-${id}`,
  userId: mockUser.id,
  user: mockUser,
  imageUrl: '',
  title: ['Ethereal Collection', 'Urban Zen', 'Noir Architecture', 'Rose Gold Future'][id % 4],
  tags: [],
  likes: Math.floor(Math.random() * 1000),
  saves: Math.floor(Math.random() * 500),
  isLiked: false,
  isSaved: false,
  isAiGenerated: true,
  createdAt: new Date().toISOString(),
});

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('All Works');
  const [posts] = useState<Post[]>(Array.from({ length: 12 }, (_, i) => generateMockPost(i)));

  const stats = [
    { label: 'Creations', value: '1,247' },
    { label: 'Views', value: '84.3K' },
    { label: 'Collections', value: '523' },
    { label: 'AI Score', value: '98%' },
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-[1400px] mx-auto px-10 py-12">
        {/* Profile Header */}
        <div className="grid grid-cols-[180px_1fr_auto] gap-12 items-start mb-20 animate-fade-in">
          {/* Avatar */}
          <div className="w-44 h-44 rounded-full bg-gradient-to-br from-rose to-plum flex items-center justify-center">
            <span className="font-italiana text-7xl text-paper">
              {mockUser.name[0]}
            </span>
          </div>

          {/* Details */}
          <div className="pt-5">
            <h1 className="font-italiana text-5xl mb-2">{mockUser.name}</h1>
            <p className="text-base text-ink/60 mb-6">@{mockUser.username}</p>
            <p className="text-base leading-relaxed text-ink/80 max-w-2xl mb-10">
              {mockUser.bio}
            </p>

            {/* Stats */}
            <div className="flex gap-12">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-italiana text-4xl mb-1">{stat.value}</div>
                  <div className="font-grotesk text-[11px] uppercase tracking-wider text-ink/60">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-5 space-y-3">
            <Link href="/lab">
              <button className="btn-primary w-48">Open Studio</button>
            </Link>
            <button className="btn-secondary w-48">Edit Profile</button>
            <button className="btn-secondary w-48">Export Portfolio</button>
          </div>
        </div>

        {/* Gallery Navigation */}
        <div className="border-b border-stone/30 mb-12">
          <div className="flex gap-12">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative pb-5 font-grotesk text-xs uppercase tracking-wider transition-all ${
                  activeTab === tab
                    ? 'text-ink'
                    : 'text-ink/40 hover:text-ink/70'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-copper" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        {posts.length > 0 ? (
          <div
            style={{
              columnCount: 3,
              columnGap: '24px',
            }}
          >
            {posts.map((post) => (
              <FashionCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full border-2 border-stone/30 flex items-center justify-center">
              <span className="text-3xl">✨</span>
            </div>
            <h3 className="font-italiana text-2xl mb-3">No creations yet</h3>
            <p className="text-sm text-ink/60 mb-8 font-grotesk">
              Start creating in the AI Fitting Lab
            </p>
            <Link href="/lab">
              <button className="btn-primary">Open Studio</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
