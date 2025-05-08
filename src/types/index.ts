export type Category = {
  id: string;
  name: string;
  icon: string;
}

type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];

export type Expense = {
  id: string
  name: '',
  price: 0,
  category: '',
  date: Value
}

export type DraftExpense = Omit<Expense, 'id'>