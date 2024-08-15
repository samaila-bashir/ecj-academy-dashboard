export type TExpenseCategory = {
  id: string;
  name: string;
  description: string;
};

export type TExpenditure = {
  id: string;
  categoryId: string;
  amount: string;
  description: string;
  date: string;
};

export type TPlayers = {
  id: string;
  firstName: string;
  lastName: string;
  stateOfOrigin: string;
  email: string;
  phoneNumber: string;
  dob: string;
  homeAddress: string;
  date: string;
};
