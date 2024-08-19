import IJobDetails from '@/utils/jobDetails.type';
import axios from 'axios';
import useSWR from 'swr';

const API_KEY = 'eb11aacd1amshd126996db0cbb02p1e0fddjsn9e000f846068';
const API_HOST = 'jsearch.p.rapidapi.com';

const fetcher = (url: string) =>
  axios
    .get(url, {
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': API_HOST,
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
