import IJobDetails from '@/utils/jobDetails.type';
import { MouseEventHandler } from 'react';

export default interface IJobCard {
  key: string;
  job: IJobDetails;
  likedList: string[];
  handleToggleFav: (jobId: string) => void;
}
