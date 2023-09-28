import style from './loader.module.css';
import { LoaderSvg } from './loader.svg';
import PropTypes from 'prop-types';

const loaderSizes = {
  small: 16,
  medium: 32,
  large: 60
};
export const Loader = ({ size, inverse = false }) => {
  const loaderColor = inverse ? '#fff' : '#3C39EC';

  const wrapperStyleKey = 'wrapper_' + size;
  return (
    <div className={style[wrapperStyleKey]}>
      <LoaderSvg color={loaderColor} size={loaderSizes[size]} />
    </div>
  );
};

Loader.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string.isRequired,
}