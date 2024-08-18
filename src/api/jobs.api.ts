import IJobDetails from '@/utils/jobDetails.type';
import axios from 'axios';

const API_KEY = 'e3f421eb0fmsh7a9ef0cde6d4db8p18b67bjsn31f85d7d3ff4';
const API_HOST = 'jsearch.p.rapidapi.com';

export async function getJobList(
  query: string,
  page = '1',
  numPages = '20',
  datePosted = 'all'
): Promise<IJobDetails[]> {
  const options = {
    method: 'GET',
    url: 'https://jsearch.p.rapidapi.com/search',
    params: {
      query: query,
      page: page,
      num_pages: numPages,
      date_posted: datePosted,
    },
    headers: {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': API_HOST,
    },
  };

  try {
    const response = await axios.request(options);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export async function getSpecificJobs(jobId: string): Promise<IJobDetails[]> {
  const options = {
    method: 'GET',
    url: 'https://jsearch.p.rapidapi.com/job-details',
    params: {
      job_id: jobId,
      extended_publisher_details: 'true',
    },
    headers: {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': API_HOST,
    },
  };

  try {
    const response = await axios.request(options);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
