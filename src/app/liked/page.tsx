'use client';

import { getSpecificJobs } from '@/api/jobs.api';
import JobCard from '@/components/JobCard/JobCard';
import { JobList } from '@/components/JobList';
import IJobDetails from '@/utils/jobDetails.type';
import React, { useEffect, useState } from 'react';

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

  const fetchJobData = async () => {
    try {
      setIsLoading(true);
      const data = await getSpecificJobs(likedList.join(', '));
      setJobList(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to fetch job data:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // if (likedList.length !== 0) {
    //   fetchJobData();
    // }
  }, []);

  useEffect(() => {
    const listenStorageChange = () => {
      if (
        JSON.parse(localStorage.getItem('likedList') || '[]')?.length !==
        likedList.length
      ) {
        setJobList(() => {
          const currentLikedList = JSON.parse(
            localStorage.getItem('likedList') || '[]'
          );
          const temp = jobList.filter((job) =>
            currentLikedList.includes(job.job_id)
          );
          return temp;
        });
      }
    };

    window.addEventListener('storage', listenStorageChange);
    return () => window.removeEventListener('storage', listenStorageChange);
  }, []);

  return (
    <main className='overflow-hidden pt-12'>
      {jobList.length !== 0 ? (
        <JobList jobList={jobList} />
      ) : (
        <h2 className='job-card__content-title text-center'>
          You have no liked jobs yet
        </h2>
      )}
    </main>
  );
}
