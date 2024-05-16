import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonProps } from 'react-bootstrap';

const BackButton: FC<ButtonProps> = function BackButton({ children, ...props }) {
  const navigate = useNavigate();

  return (
    <Button variant="danger" {...props} onClick={() => navigate(-1)}>
      {children || 'Cancel'}
    </Button>
  );
};

export default BackButton;
