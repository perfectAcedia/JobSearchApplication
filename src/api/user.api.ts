import IUser from '@/utils/user.type';
import axios from 'axios';

export async function createUser(data: IUser): Promise<IUser> {
  const options = {
    method: 'POST',
    url: 'https://jobsearchapplicationapi.onrender.com/sign-up',
    data,
  };

  try {
    const response = await axios.request(options);
    return response.data[0];
  } catch (error) {
    throw error;
  }
}

export async function userLogin(data: {
  email: string;
  password: string;
}): Promise<IUser> {
  const options = {
    method: 'POST',
    url: 'https://jobsearchapplicationapi.onrender.com/login',
    data,
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    throw error;
  }
}
