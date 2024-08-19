'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

import convertTimestampIntoDate from '@/utils/convertTimestampIntoDate';
import { useSpecificJobs } from '@/api/jobs.api';
import { CustomButton } from '@/components/CustomButton';

export default function JobDetails() {
  const { id } = useParams();

  const { jobList, isLoading, isError } = useSpecificJobs(
    decodeURIComponent(id as string)
  );

  const job = jobList ? jobList[0] : null; // Get the first job from the list

  if (isLoading) {
    return (
      <main className='overflow-hidden pt-12 flex flex-col items-center'>
        <section className='text-black text-xl font-bold self-center'>
          Loading...
        </section>
      </main>
    );
  }

  if (isError || !job) {
    return (
      <main className='overflow-hidden pt-12 flex flex-col items-center'>
        <section className='text-black text-xl font-bold self-center'>
          Failed to load job details.
        </section>
      </main>
    );
  }

  return (
    <main className='overflow-hidden pt-12 flex flex-col items-center'>
      <h1 className='text-4xl font-extrabold'>{job.job_title}</h1>
      <div className='flex gap-1'>
        <p>Published by {job.job_publisher}</p>
        <p>{job.job_is_remote ? 'Remote' : 'Office'}</p>
        <p>{`${job.job_country}, ${job.job_city || ''}`}</p>
        <p>{convertTimestampIntoDate(job.job_posted_at_timestamp)}</p>
      </div>
      <img
        className='w-auto h-40 self-center'
        src={job.employer_logo}
        alt='Company Logo'
      />
      <div className='flex flex-col w-[50%]'>
        <div className='flex flex-col'>
          {job.job_highlights.Qualifications && (
            <>
              <h2 className='job-card__content-title'>Qualifications:</h2>
              <p>{job.job_highlights.Qualifications}</p>
            </>
          )}
          {job.job_highlights.Responsibilities && (
            <>
              <h2 className='job-card__content-title'>Responsibilities:</h2>
              <p>{job.job_highlights.Responsibilities}</p>
            </>
          )}
          {job.job_highlights.Benefits && (
            <>
              <h2 className='job-card__content-title'>Benefits:</h2>
              <p>{job.job_highlights.Benefits}</p>
            </>
          )}
          <h2 className='job-card__content-title'>Description:</h2>
          <p>{job.job_description}</p>
        </div>
        <Link
          target='_blank'
          className='w-[40%] self-center'
          href={`${job.job_apply_link}`}
        >
          <CustomButton
            containerStyles='bg-primary-blue rounded-full w-full'
            title='Apply'
          />
        </Link>
      </div>
    </main>
  );
}
