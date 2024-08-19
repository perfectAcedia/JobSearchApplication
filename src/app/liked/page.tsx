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
          You have no liked jobs yet
        </section>
      ) : (
        <>{jobList?.length !== 0 && <JobList jobList={jobList} />}</>
      )}
    </main>
  );
}
