import { ReactNode } from 'react';

type MessageProps = {
  children: ReactNode;
};

export default function ErrorMessage({ children }: MessageProps) {
  return (
    <p className=' bg-red-100 py-2 text-red-800 text-center font-semibold'>
      {children}
    </p>
  );
}
