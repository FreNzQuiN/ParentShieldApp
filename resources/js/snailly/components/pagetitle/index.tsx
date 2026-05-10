import { cx } from '@emotion/css';

import { sTitle } from './style';
import { PageTitleProps } from './types';

const PageTitle = ({ title }: PageTitleProps) => {
  return (
      <h1 className={cx(sTitle)}>{title}</h1>
  );
};

export default PageTitle;
