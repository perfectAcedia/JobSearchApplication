'use client';

import { useCallback, useEffect, useState } from 'react';

import { SearchBar } from '@/components/SearchBar';
import { JobList } from '@/components/JobList';
import { useJobList } from '@/api/jobs.api';

interface IHome {
  searchParams: {
    query: string;
  };
}

export default function Jobs({ searchParams }: IHome) {
  const [query, setQuery] = useState(searchParams.query);
  const { jobList, isLoading, isError } = useJobList(query);

  useEffect(() => {
    const userJobTitle = localStorage.getItem('userData');

    if (searchParams.query) {
      setQuery(searchParams.query);
    } else if (userJobTitle) {
      setQuery(userJobTitle);
    }
  }, [searchParams.query]);

  const renderText = useCallback(() => {
    if (isLoading)
      return <section className='section-styles'>Loading...</section>;
    if (isError)
      return <section className='section-styles'>Failed to load jobs</section>;
    if (jobList?.length === 0)
      return <section className='section-styles'>Oops, no results</section>;
    if (!query) {
      return (
        <section className='section-styles'>Enter your job preferences</section>
      );
    }
  }, [jobList, query]);

  return (
    <main className='overflow-hidden'>
      <div className='padding-x padding-y max-width flex flex-col'>
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>Job List</h1>
          <p>Find your perfect job</p>
          <SearchBar />
        </div>

        {renderText()}

        {jobList?.length > 0 && query && <JobList jobList={jobList} />}
      </div>
    </main>
  );
}
