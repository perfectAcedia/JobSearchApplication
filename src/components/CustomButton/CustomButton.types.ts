import { MouseEventHandler } from 'react';
import { IconType } from 'react-icons';

export interface ICustomButton {
  title?: string;
  icon?: boolean;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  containerStyles?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  isLiked?: boolean;
}
