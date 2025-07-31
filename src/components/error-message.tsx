import { ReactNode } from 'react';

type MessageProps = {
  children: ReactNode;
};

export default function ErrorMessage({ children }: MessageProps) {
  return (
    <p className='bg-gray-50 py-2 text-red-500 text-center rounded-md font-semibold'>
      {children}
    </p>
  );
}
