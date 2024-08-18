'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

import { CustomButton } from '../CustomButton';
import { useCallback, useEffect, useState } from 'react';

export const Header = () => {
  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState(pathname.slice(1));
  const [isRecomendation, setIsRecomendation] = useState(false);

  useEffect(() => {
    const userJobTitle = localStorage.getItem('userData');
    if (userJobTitle) setIsRecomendation(true);

    if (pathname !== currentPath) {
      setCurrentPath(pathname.slice(1));
    }
  }, [currentPath, pathname]);

  const handleLogOut = useCallback(() => {
    localStorage.removeItem('userData');
    setIsRecomendation(false);
  }, []);

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
            priority={true}
          />
        </Link>
        <Link href='/jobs' className='nav-link'>
          <h2 className='job-card__content-title'>Jobs</h2>
        </Link>
        <Link href='/liked' className='nav-link'>
          <h2 className='job-card__content-title'>Liked</h2>
        </Link>
      </nav>
      {!isRecomendation ? (
        <div className='flex'>
          {currentPath !== 'login' && (
            <Link href='/login'>
              <CustomButton
                title='Log in'
                containerStyles='bg-primary-blue rounded-full'
              />
            </Link>
          )}
          {currentPath !== 'create-profile' && (
            <Link href='/create-profile'>
              <CustomButton
                title='Create Profile'
                containerStyles='bg-primary-blue rounded-full'
              />
            </Link>
          )}
        </div>
      ) : (
        <Link href='/jobs'>
          <CustomButton
            title='Log Out'
            containerStyles='bg-primary-blue rounded-full'
            handleClick={handleLogOut}
          />
        </Link>
      )}
    </header>
  );
};
