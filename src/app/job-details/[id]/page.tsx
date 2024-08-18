/* eslint-disable @next/next/no-img-element */
'use client';

import IJobDetails from '@/utils/jobDetails.type';
import { useParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';

import Test from '@/utils/jobList.json';
import convertTimestampIntoDate from '@/utils/convertTimestampIntoDate';
import { getSpecificJobs } from '@/api/jobs.api';
import { CustomButton } from '@/components/CustomButton';

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState<IJobDetails>(Test.data[0] as IJobDetails);
  const [isLoading, setIsLoading] = useState(false);

  const fetchJobData = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getSpecificJobs(decodeURIComponent(id as string));
      setJob(data[0]);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to fetch job data:', error);
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    // fetchJobData();
  }, [fetchJobData]);

  return (
    <main className='overflow-hidden pt-12 flex flex-col items-center'>
      {isLoading ? (
        <section className='text-black text-xl font-bold self-center'>
          Loading...
        </section>
      ) : (
        <>
          <h1 className='text-4xl font-extrabold'>{job.job_title}</h1>
          <div className='flex gap-1'>
            <p>Piblished by {job.job_publisher}</p>
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
        </>
      )}
    </main>
  );
}
