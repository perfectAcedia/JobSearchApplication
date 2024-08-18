'use client';

import Image from 'next/image';
import { CustomButton } from '../CustomButton';
import IJobCard from './JobCard.types';
import { useEffect, useState } from 'react';

const JobCard = ({ job, likedList, handleToggleFav }: IJobCard) => {
  const convertTimestampIntoDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString();
  };

  return (
    <div className='job-card group'>
      <div className='job-card__content'>
        <div className='flex justify-between w-full'>
          <h2 className='job-card__content'>{job.job_publisher}</h2>
          <h2>{convertTimestampIntoDate(job.job_posted_at_timestamp)}</h2>
        </div>
        <img
          className='w-auto h-14 self-center'
          src={job.employer_logo}
          alt='Company Logo'
        />
        <h2 className='job-card__content-title'>{job.job_title}</h2>
        <h2 className='job-card__content-title'>
          {job.job_is_remote ? 'Remote' : 'Office'}
        </h2>
        <h2 className='job-card__content-title'>
          {`${job.job_country}, ${job.job_city || ''}`}
        </h2>
        <div className='flex w-full justify-between'>
          <CustomButton
            title='View details'
            containerStyles='bg-sky-400 rounded-full self-center w-[70%]'
          />
          <CustomButton
            icon={true}
            containerStyles='!p-0'
            handleClick={() => handleToggleFav(job.job_id)}
            isLiked={likedList.includes(job.job_id)}
          />
        </div>
      </div>
    </div>
  );
};

export default JobCard;
