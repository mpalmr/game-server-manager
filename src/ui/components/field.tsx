import React, { ReactNode, FC } from 'react';
import type { FieldError } from 'react-hook-form';
import { Form, Col } from 'react-bootstrap';

interface Props {
  children: ReactNode;
  className?: string;
  controlId: string;
  label?: string;
  error?: FieldError;
  xs?: number;
  md?: number;
}

const Field: FC<Props> = function Field({
  children,
  className,
  controlId,
  label,
  error,
  xs = 12,
  md = 6,
}) {
  return (
    <Form.Group as={Col} className={className} controlId={controlId} xs={xs} md={md}>
      {label && (
        <Form.Label>{label}</Form.Label>
      )}

      {children}

      {error && (
        <Form.Text className="text-danger">{error.message}</Form.Text>
      )}
    </Form.Group>
  );
};

export default Field;
