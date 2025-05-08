import { formatCurrency } from '../helpers';

type DisplayAmountProps = {
  label?: string;
  amount: number;
};

export default function DisplayAmount({ label, amount }: DisplayAmountProps) {
  return (
    <p className=' text-2xl font-semibold text-gray-600 text-center md:font-bold md:text-3xl lg:text-4xl'>
      {label && `${label}:`} {''}
      <span className=' font-bold text-emerald-500 md:font-extrabold'>
        {formatCurrency(amount)}
      </span>
    </p>
  );
}
