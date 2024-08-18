'use client';

import { useCallback, useEffect, useState } from 'react';

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
  const [jobList, setJobList] = useState<IJobDetails[]>(
    Test.data as IJobDetails[]
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isRecomendation, setIsRecomendation] = useState(false);

  const fetchJobData = useCallback(
    async (query: string) => {
      try {
        setIsLoading(true);
        const data = await getJobList(query);
        setJobList(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch job data:', error);
        setIsLoading(false);
      }
    },
    [searchParams.query]
  );

  useEffect(() => {
    const userJobTitle = localStorage.getItem('userData');

    if (searchParams.query && searchParams.query.length > 0) {
      // fetchJobData(searchParams.query);
    } else if (userJobTitle) {
      // fetchJobData(userJobTitle);
      setIsRecomendation(true);
    }
  }, [fetchJobData, searchParams]);

  return (
    <main className='overflow-hidden'>
      <div className='padding-x padding-y max-width flex flex-col'>
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>Job List</h1>
          <p>Find your perfect job</p>
          <SearchBar />
        </div>

        {isLoading ? (
          <section className='section-styles'>Loading...</section>
        ) : jobList.length > 0 ? (
          <>
            {isRecomendation && !searchParams.query && (
              <section className='section-styles'>
                Recomended jobs based on your profile
              </section>
            )}
            <JobList jobList={jobList} />
          </>
        ) : searchParams.query ? (
          <section className='section-styles'>Opps, no results</section>
        ) : (
          <section className='section-styles'>
            Enter your job preferences
          </section>
        )}
      </div>
    </main>
  );
}
