'use client';

import React, { useEffect, useState } from 'react';
import JobCard from '../JobCard/JobCard';
import IJobList from './JobList.types';

export const JobList = ({ jobList }: IJobList) => {
  const [likedList, setLikedList] = useState<string[]>(() => {
    const storedLikedList = localStorage.getItem('likedList');
    return storedLikedList ? JSON.parse(storedLikedList) : [];
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('likedList', JSON.stringify(likedList));
    }
  }, [likedList]);

  const handleToggleFav = (jobId: string) => {
    if (likedList.includes(jobId)) {
      window.dispatchEvent(new Event('storage'));
      setLikedList(likedList.filter((id) => id !== jobId));
    } else {
      setLikedList((prevLikedList) => [...prevLikedList, jobId]);
    }
  };

  return (
    <div className='home__jobs-wrapper'>
      {jobList?.map((job) => (
        <JobCard
          key={job.job_id}
          job={job}
          likedList={likedList}
          handleToggleFav={handleToggleFav}
        />
      ))}
    </div>
  );
};
