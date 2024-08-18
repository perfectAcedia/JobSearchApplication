import Image from 'next/image';
import { FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';

import { ICustomButton } from './CustomButton.types';

export const CustomButton = ({
  title,
  icon,
  containerStyles,
  handleClick,
  isLiked,
}: ICustomButton) => {
  return (
    <button
      disabled={false}
      type={'button'}
      className={`custom-btn ${containerStyles}`}
      onClick={handleClick}
    >
      {title && <span className='flex-1 font-bold text-l'>{title}</span>}
      {icon &&
        (isLiked ? (
          <FaHeart className='w-10 h-10' />
        ) : (
          <FiHeart className='w-10 h-10' />
        ))}
    </button>
  );
};
