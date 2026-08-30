'use client';

import type { ReactNode } from 'react';

export function ConfirmSubmitButton({
  children,
  message,
  className,
  form,
  name,
  type = 'submit',
  value,
}: {
  children: ReactNode;
  message: string;
  className?: string;
  form?: string;
  name?: string;
  type?: 'button' | 'submit' | 'reset';
  value?: string;
}) {
  return (
    <button
      type={type}
      form={form}
      name={name}
      value={value}
      className={className}
      onClick={(event) => {
        if (!window.confirm(message)) {
          event.preventDefault();
        }
      }}
    >
      {children}
    </button>
  );
}
