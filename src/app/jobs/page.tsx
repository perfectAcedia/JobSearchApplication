'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { SearchBar } from '@/components/SearchBar';
import Test from '@/utils/jobList.json';
import IJobDetails from '@/utils/jobDetails.type';
import { JobList } from '@/components/JobList';
import { getJobList } from '@/api/jobs.api';
interface IHome {
  searchParams: {
    query: string;
  };
}

export default function Jobs({ searchParams }: IHome) {
  const [jobList, setJobList] = useState<IJobDetails[]>([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchJobData = async () => {
    try {
      setIsLoading(true);
      const data = await getJobList(searchParams.query);
      setJobList(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to fetch job data:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchParams.query && searchParams.query.length > 0) {
      fetchJobData();
    }
  }, [searchParams]);

  return (
    <main className='overflow-hidden'>
      <div
        className='padding-x padding-y max-width flex flex-col'
        id='discover'
      >
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>Job List</h1>
          <p>Find your perfect job</p>
          <SearchBar setQuerys={setQuery} />
        </div>

        {isLoading ? (
          <section className='text-black text-xl font-bold self-center'>
            Loading...
          </section>
        ) : jobList.length > 0 ? (
          <JobList jobList={jobList} />
        ) : searchParams.query ? (
          <section className='text-black text-xl font-bold self-center'>
            Opps, no results
          </section>
        ) : (
          <section className='text-black text-xl font-bold self-center'>
            Enter your job preferences
          </section>
        )}
      </div>
    </main>
  );
}
