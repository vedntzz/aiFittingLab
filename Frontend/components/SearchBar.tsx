'use client';

import { useState } from 'react';

export default function SearchBar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log('Searching for:', query);
  };

  return (
    <form onSubmit={handleSearch} className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsExpanded(true)}
        onBlur={() => !query && setIsExpanded(false)}
        placeholder="Search styles, designers..."
        className={`transition-all duration-300 px-4 py-2.5 pr-10 bg-canvas border border-transparent rounded-full font-grotesk text-sm focus:outline-none focus:border-copper focus:bg-paper ${
          isExpanded ? 'w-64' : 'w-48'
        }`}
      />
      <button
        type="submit"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-silk hover:text-copper transition-colors"
      >
        🔍
      </button>
    </form>
  );
}
