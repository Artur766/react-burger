import style from './loader.module.css';
import { FC } from 'react';
import { LoaderSvg } from './loader.svg';

interface ILoaderSizes {
  small: number;
  medium: number;
  large: number;
}

const loaderSizes: ILoaderSizes = {
  small: 16,
  medium: 32,
  large: 60
};

interface ILoader {
  inverse?: boolean
  size: "medium" | "large" | "small"
}

export const Loader: FC<ILoader> = ({ size, inverse = false }) => {
  const loaderColor = inverse ? '#fff' : '#3C39EC';

  const wrapperStyleKey: string = 'wrapper_' + size;

  return (
    <div className={style[wrapperStyleKey]} >
      <LoaderSvg color={loaderColor} size={loaderSizes[size]} />
    </div>
  );
};