import Link from 'next/link';
import Image from 'next/image';
import { SearchBar } from '../SearchBar';
import { CustomButton } from '../CustomButton';

export const Header = () => {
  return (
    <header className='w-full z-10 flex justify-between'>
      <nav className='flex gap-4'>
        <Link href='/' className='nav-link'>
          <Image
            src='/next.svg'
            alt='Logo'
            width={118}
            height={18}
            className='object-contain'
          />
        </Link>
        <Link href='/jobs' className='nav-link'>
          <h2 className='job-card__content-title'>Jobs</h2>
        </Link>
        <Link href='/liked' className='nav-link'>
          <h2 className='job-card__content-title'>Liked</h2>
        </Link>
      </nav>
      <Link href='/create-profile'>
        <CustomButton
          title='Create Profile'
          containerStyles='bg-primary-blue rounded-full'
        />
      </Link>
    </header>
  );
};
