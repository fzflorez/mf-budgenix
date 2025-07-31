import { formatCurrency } from '../helpers';

type DisplayAmountProps = {
  label?: string;
  amount: number;
  textColor?: string;
};

export default function DisplayAmount({ label, amount, textColor }: DisplayAmountProps) {
  return (
    <p className='mb-2 flex justify-between items-center font-semibold text-xl md:text-2xl w-full gap-2'>
      {label && `${label}:`}
      <span className={`font-bold text-emerald-400 md:font-extrabold ${textColor}`}>
        {formatCurrency(amount)}
      </span>
    </p>
  );
}
