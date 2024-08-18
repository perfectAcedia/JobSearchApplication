'use client';

import { getSpecificJobs } from '@/api/jobs.api';
import { JobList } from '@/components/JobList';
import IJobDetails from '@/utils/jobDetails.type';
import React, { useCallback, useEffect, useState } from 'react';
import Test from '@/utils/jobList.json';

export default function Liked() {
  const [likedList, setLikedList] = useState<string[]>([]);
  const [jobList, setJobList] = useState<IJobDetails[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedLikedList = localStorage.getItem('likedList') || '[]';
      setLikedList(JSON.parse(storedLikedList));
    }
  }, []);

  const fetchJobData = useCallback(async () => {
    try {
      setIsLoading(true);
      // const data = await getSpecificJobs(likedList.join(', '));
      const temp = (Test.data as IJobDetails[]).filter((job) =>
        likedList.includes(job.job_id)
      );
      setJobList(temp);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to fetch job data:', error);
      setIsLoading(false);
    }
  }, [likedList]);

  useEffect(() => {
    if (likedList.length !== 0) {
      fetchJobData();
    }
  }, [fetchJobData, likedList.length]);

  useEffect(() => {
    const listenStorageChange = () => {
      const currentLikedList = JSON.parse(
        localStorage.getItem('likedList') || '[]'
      );
      setLikedList(currentLikedList);

      // Update the jobList based on the current liked list
      const temp = jobList.filter((job) =>
        currentLikedList.includes(job.job_id)
      );
      setJobList(temp);
    };

    window.addEventListener('storage', listenStorageChange);
    return () => window.removeEventListener('storage', listenStorageChange);
  }, [jobList]);

  // Add this useEffect to ensure jobList is updated when likedList changes
  useEffect(() => {
    if (likedList.length === 0) {
      setJobList([]);
    } else {
      fetchJobData();
    }
  }, [likedList, fetchJobData]);

  return (
    <main className='overflow-hidden pt-12 flex justify-center'>
      {isLoading ? (
        <section className='text-black text-xl font-bold self-center'>
          Loading...
        </section>
      ) : (
        <>
          {jobList.length !== 0 ? (
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
