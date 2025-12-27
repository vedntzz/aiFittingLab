'use client';

import { useState, useEffect } from 'react';
import FashionCard from '@/components/FashionCard';
import { Post } from '@/types';

// Mock data generator
const generateMockPost = (id: number): Post => ({
  id: `post-${id}`,
  userId: `user-${id % 5}`,
  user: {
    id: `user-${id % 5}`,
    email: `user${id % 5}@example.com`,
    name: ['Marina Volkov', 'Kenji Nakamura', 'Sophia Laurent', 'Alex Chen', 'Zara Williams'][id % 5],
    username: ['marina_ai', 'kenji_cyber', 'sophialaurent', 'alexchen', 'zarawilliams'][id % 5],
    createdAt: new Date().toISOString(),
  },
  imageUrl: '',
  title: ['Ethereal Collection', 'Urban Zen', 'Noir Architecture', 'Rose Gold Future', 'Botanical Armor'][id % 5],
  description: '',
  tags: ['avant-garde', 'minimalist', 'cyberpunk'],
  likes: Math.floor(Math.random() * 1000),
  saves: Math.floor(Math.random() * 500),
  isLiked: false,
  isSaved: false,
  isAiGenerated: Math.random() > 0.3,
  createdAt: new Date().toISOString(),
});

const filters = [
  'All',
  'Avant-Garde',
  'Minimalist',
  'Streetwear',
  'Haute Couture',
  'Sustainable',
  'Cyberpunk',
  'Vintage Revival',
  'Gender Fluid',
  'Neo-Gothic',
];

export default function WallPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  // Load initial posts
  useEffect(() => {
    const initialPosts = Array.from({ length: 20 }, (_, i) => generateMockPost(i));
    setPosts(initialPosts);
  }, []);

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
        !isLoading
      ) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading, page]);

  const loadMore = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const newPosts = Array.from({ length: 10 }, (_, i) =>
        generateMockPost(posts.length + i)
      );
      setPosts((prev) => [...prev, ...newPosts]);
      setPage((prev) => prev + 1);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen">
      {/* Filter Bar */}
      <div className="sticky top-20 z-40 glass border-b border-stone/30 px-10 py-6 overflow-x-auto">
        <div className="flex gap-4 max-w-[1800px] mx-auto">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full font-grotesk text-xs whitespace-nowrap transition-all ${
                activeFilter === filter
                  ? 'bg-ink text-paper'
                  : 'bg-transparent border border-stone hover:border-copper hover:text-copper'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry Grid */}
      <div className="px-10 py-10">
        <div
          className="max-w-[1800px] mx-auto"
          style={{
            columnCount: 5,
            columnGap: '24px',
          }}
        >
          {posts.map((post) => (
            <FashionCard key={post.id} post={post} />
          ))}
        </div>
      </div>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="flex justify-center py-12">
          <div className="flex gap-2">
            <div
              className="w-2 h-2 bg-copper rounded-full animate-pulse"
              style={{ animationDelay: '0s' }}
            />
            <div
              className="w-2 h-2 bg-copper rounded-full animate-pulse"
              style={{ animationDelay: '0.2s' }}
            />
            <div
              className="w-2 h-2 bg-copper rounded-full animate-pulse"
              style={{ animationDelay: '0.4s' }}
            />
          </div>
        </div>
      )}

      {/* Decorative Circles */}
      <div className="fixed top-0 left-0 w-96 h-96 rounded-full bg-rose/10 blur-[120px] pointer-events-none -z-10 animate-pulse" />
      <div
        className="fixed bottom-0 right-0 w-96 h-96 rounded-full bg-ocean/10 blur-[120px] pointer-events-none -z-10 animate-pulse"
        style={{ animationDelay: '1s' }}
      />
    </div>
  );
}
