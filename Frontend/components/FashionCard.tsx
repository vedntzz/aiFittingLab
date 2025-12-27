'use client';

import { useState } from 'react';
import { Post } from '@/types';
import Link from 'next/link';

interface FashionCardProps {
  post: Post;
}

export default function FashionCard({ post }: FashionCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [isSaved, setIsSaved] = useState(post.isSaved);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    // TODO: Call API to like/unlike
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
    // TODO: Call API to save/unsave
  };

  return (
    <article
      className="break-inside-avoid mb-6 cursor-pointer transition-transform hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-2xl bg-canvas">
        {/* AI Tag */}
        {post.isAiGenerated && (
          <div className="absolute top-3 left-3 z-10 px-3 py-1.5 bg-copper/90 backdrop-blur-sm text-paper rounded-full font-grotesk text-[10px] font-semibold uppercase tracking-wider">
            AI Gen
          </div>
        )}

        {/* Action Buttons */}
        {isHovered && (
          <div className="absolute top-3 right-3 z-10 flex gap-2 animate-fade-in">
            <button
              onClick={handleLike}
              className="w-8 h-8 glass rounded-full flex items-center justify-center hover:scale-110 transition-transform"
            >
              {isLiked ? '❤️' : '🤍'}
            </button>
            <button
              onClick={handleSave}
              className="w-8 h-8 glass rounded-full flex items-center justify-center hover:scale-110 transition-transform"
            >
              {isSaved ? '📌' : '📍'}
            </button>
            <button className="w-8 h-8 glass rounded-full flex items-center justify-center hover:scale-110 transition-transform">
              ↗️
            </button>
          </div>
        )}

        {/* Image */}
        <div
          className="w-full bg-gradient-to-br from-rose via-lavender to-sage"
          style={{ paddingBottom: `${Math.random() * 40 + 60}%` }}
        >
          {/* TODO: Replace with actual image */}
        </div>

        {/* Overlay */}
        {isHovered && (
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent flex flex-col justify-end p-5 animate-fade-in">
            <h3 className="text-paper font-editorial text-base mb-1">
              {post.title || 'Untitled'}
            </h3>
            <Link
              href={`/profile/${post.user.username}`}
              className="text-stone text-xs font-grotesk hover:text-copper transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              by @{post.user.username || post.user.name}
            </Link>
          </div>
        )}

        {/* Try-On Button */}
        {isHovered && (
          <Link href="/lab">
            <button className="absolute bottom-5 left-5 right-5 py-3 bg-paper border border-ink rounded-lg font-grotesk text-xs font-medium uppercase tracking-wider hover:bg-ink hover:text-paper transition-all animate-fade-in">
              Try On
            </button>
          </Link>
        )}
      </div>
    </article>
  );
}
