'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@headlessui/react';

export const SearchBar = () => {
  const [query, setQuery] = useState('');

  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (query === '') return alert('Please fill in the search bar');

    updateSearchParams(query.toLowerCase().trim());
  };

  const updateSearchParams = (query: string) => {
    const searchParams = new URLSearchParams(window.location.search);

    if (query) {
      searchParams.set('query', query);
    } else {
      searchParams.delete('query');
    }

    const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

    router.push(newPathname);
  };

  return (
    <form className='searchbar' onSubmit={handleSubmit}>
      <Input
        placeholder='Search'
        onChange={(event) => setQuery(event.target.value)}
        className='search__input'
      ></Input>
    </form>
  );
};
