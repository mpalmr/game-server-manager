import React, { FC } from 'react';
import { Spinner, SpinnerProps } from 'react-bootstrap';

interface Props extends SpinnerProps {
  message?: string;
}

const Loading: FC<Props> = function Loading({ message, ...props }) {
  return (
    <Spinner role="status" {...props}>
      <p className="visibly-hidden">
        {message || 'Loading'}&hellip;
      </p>
    </Spinner>
  );
};

export default Loading;
