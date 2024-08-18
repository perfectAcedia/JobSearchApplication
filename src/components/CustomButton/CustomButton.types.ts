import { MouseEventHandler } from 'react';
import { IconType } from 'react-icons';

export interface ICustomButton {
  title?: string;
  icon?: boolean;
  containerStyles?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  isLiked?: boolean;
}
