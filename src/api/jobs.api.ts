import IJobDetails from '@/utils/jobDetails.type';
import axios from 'axios';
import useSWR from 'swr';



const fetcher = (url: string) =>
  axios
    .get(url, {
      headers: {
        'x-rapidapi-key': process.env.API_KEY,
        'x-rapidapi-host': process.env.API_HOST,
      },
    })
    .then((res) => res.data.data);

export function useJobList(
  query: string,
  page = '1',
  numPages = '20',
  datePosted = 'all'
) {
  const url = `https://jsearch.p.rapidapi.com/search?query=${query}&page=${page}&num_pages=${numPages}&date_posted=${datePosted}`;

  const { data, error } = useSWR(url, fetcher);

  return {
    jobList: data as IJobDetails[],
    isLoading: !error && !data,
    isError: error,
  };
}

export function useSpecificJobs(jobId: string) {
  const url = `https://jsearch.p.rapidapi.com/job-details?job_id=${jobId}&extended_publisher_details=true`;

  const { data, error } = useSWR(url, fetcher);

  return {
    jobList: data as IJobDetails[],
    isLoading: !error && !data,
    isError: error,
  };
}
