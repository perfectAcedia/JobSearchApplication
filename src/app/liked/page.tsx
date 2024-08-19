'use client';

import { useEffect, useState } from 'react';
import { JobList } from '@/components/JobList';
import { useSpecificJobs } from '@/api/jobs.api';

export default function Liked() {
  const [likedJobIds, setLikedJobIds] = useState<string[]>([]);
  const { jobList, isLoading, isError } = useSpecificJobs(
    likedJobIds.join(',')
  );

  useEffect(() => {
    const storedLikedList = localStorage.getItem('likedList') || '[]';
    setLikedJobIds(JSON.parse(storedLikedList));
  }, []);

  useEffect(() => {
    const listenStorageChange = () => {
      const currentLikedList = JSON.parse(
        localStorage.getItem('likedList') || '[]'
      );

      const updatedJobList = jobList?.filter((job) =>
        currentLikedList.includes(job.job_id)
      );

      setLikedJobIds(currentLikedList);
    };

    window.addEventListener('storage', listenStorageChange);
    return () => window.removeEventListener('storage', listenStorageChange);
  }, [jobList]);

  return (
    <main className='overflow-hidden pt-12 flex justify-center'>
      {isLoading ? (
        <section className='text-black text-xl font-bold self-center'>
          Loading...
        </section>
      ) : isError ? (
        <section className='text-black text-xl font-bold self-center'>
          Failed to load liked jobs
        </section>
      ) : (
        <>
          {jobList?.length !== 0 ? (
            <JobList jobList={jobList} />
          ) : (
            <h2 className='job-card__content-title text-center'>
              You have no liked jobs yet
            </h2>
          )}
        </>
      )}
    </main>
  );
}
