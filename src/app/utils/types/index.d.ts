declare interface IAddUserActionPayload {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}

declare interface IFetchUserActionPayload {
  userId: string;
}

declare interface IUpdateUserActionPayload {
  userId: string;
  data: Partial<{ email: string; password: string }>;
}

declare interface IDeleteUserActionPayload {
  userId: string;
}

declare interface ILinkUserActionPayload {
  email: string;
  password: string;
}

declare type TExpenseCategory = {
  id: string;
  name: string;
  description: string;
};

declare type TExpenditure = {
  id: string;
  categoryId: string;
  amount: string;
  description: string;
  date: string;
};

declare type TPlayers = {
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

declare interface IUser {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}

type IUserWithoutSensitiveData = Omit<IUser, "password">;

declare interface ILoginActionPayload {
  user: IUser;
  navigate: NavigateFunction;
}

declare type TSalary = {
  id: string;
  playerId: string;
  playerName?: string;
  amount: number;
  datePaid: string;
};

declare enum EToastType {
  info = "info",
  success = "success",
  error = "error",
  warn = "warn",
}

declare type TToastType = keyof typeof EToastType;

declare interface IToast {
  title?: string;
  status?: TToastType;
  autoClose?: false;
  message: string;
}
