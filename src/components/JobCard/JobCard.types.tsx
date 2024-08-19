import IJobDetails from '@/utils/jobDetails.type';

export default interface IJobCard {
  key: string;
  job: IJobDetails;
  likedList: string[];
  handleToggleFav: (jobId: string) => void;
}
