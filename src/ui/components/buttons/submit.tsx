import React, { FC } from 'react';
import { Button, ButtonProps } from 'react-bootstrap';

const SubmitButton: FC<ButtonProps> = function SubmitButton({ children, ...props }) {
  return (
    <Button type="submit" {...props}>
      {children || 'Submit'}
    </Button>
  );
};

export default SubmitButton;
