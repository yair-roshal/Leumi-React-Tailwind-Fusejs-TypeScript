import { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import { Post } from '@/types';

export interface UseFilteredPosts {
  filteredPosts: Post[];
  handleSearch: (value: string) => void;
  searchTerm: string;
}

export function useFilteredPosts(initialPosts: Post[]): UseFilteredPosts {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(initialPosts);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    setPosts(initialPosts);
  }, [initialPosts]);

  useEffect(() => {
    const fuse = new Fuse(posts, {
      keys: ['title'],
      includeMatches: true,
      threshold: 0.4,
    });

    if (searchTerm === '') {
      setFilteredPosts(posts);
    } else {
      const results: Fuse.FuseResult<Post>[] = fuse.search(searchTerm);
      const filteredData: Post[] = results.map((result) => result.item);
      setFilteredPosts(filteredData);
    }
  }, [searchTerm, posts]);

  const handleSearch = (value: string): void => {
    setSearchTerm(value);
  };

  return { filteredPosts, handleSearch, searchTerm };
}
