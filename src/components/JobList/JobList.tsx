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
    setLikedList((prevState) => {
      if (prevState.includes(jobId)) {
        const updatedLikedList = prevState.filter((id) => id !== jobId);
        localStorage.setItem('likedList', JSON.stringify(updatedLikedList));
        window.dispatchEvent(new Event('storage'));
        return updatedLikedList;
      } else {
        const updatedLikedList = [...prevState, jobId];
        localStorage.setItem('likedList', JSON.stringify(updatedLikedList));
        window.dispatchEvent(new Event('storage'));
        return updatedLikedList;
      }
    });
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
