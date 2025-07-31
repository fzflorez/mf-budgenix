type ExpenseLabelProps = {
  htmlFor: string;
  children: React.ReactNode;
};

export default function ExpenseLabel({htmlFor, children}: ExpenseLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-base text-gray-200 font-semibold md:text-lg"
    >
      {children}
    </label>
  )
}
