export const chartColorPalette = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff7f50",
  "#ff69b4",
  "#cd5c5c",
  "#8a2be2",
  "#7fffd4",
  "#ff6347",
];

type RecordWithAmount = {
  amount: string;
};

export const sumAmounts = <T extends RecordWithAmount>(data: T[]): number => {
  return data.reduce((sum, record) => {
    return sum + Number(record.amount);
  }, 0);
};

export const formatAmount = (num: number | string): string => {
  const parsedNumber = typeof num === "string" ? parseFloat(num) : num;

  if (!Number.isFinite(parsedNumber)) {
    throw new Error("Invalid number provided for formatting.");
  }

  // Format the number with two decimal places and thousand separators
  return "₦" + parsedNumber.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const addSpaceBeforeUppercase = (string: string) => {
  return string.replace(/([A-Z])/g, " $1").trim();
};

export const getFireBaseLoginErrorMessage = (code: string): string => {
  switch (code) {
    case "auth/invalid-credential":
      return "Invalid credentials. Please try again.";
    case "auth/user-not-found":
      return "No user found with this email.";
    case "auth/wrong-password":
      return "Incorrect password. Please try again.";
    case "auth/too-many-requests":
      return "Too many unsuccessful login attempts. Please try again later.";
    default:
      return "An unknown error occurred. Please try again.";
  }
};

export const aggregateExpenditureDataByCategory = (
  expenditures: TExpenditure[]
) => {
  const aggregatedData: { category: string; value: number }[] = [];
  const categoryMap: { [category: string]: number } = {};

  expenditures.forEach((expense) => {
    const amount = parseFloat(expense.amount);

    if (isNaN(amount)) {
      console.warn(
        `Invalid amount for expense in category ${expense.category}:`,
        expense.amount
      );
      return;
    }

    if (!categoryMap[expense.category]) {
      categoryMap[expense.category] = 0;
    }
    categoryMap[expense.category] += amount;
  });

  for (const category in categoryMap) {
    if (categoryMap[category] > 0) {
      aggregatedData.push({
        category,
        value: categoryMap[category],
      });
    }
  }

  return aggregatedData;
};

export const processSalaryData = (salaries: TSalary[]) => {
  const monthlyData = salaries.reduce(
    (acc: { [key: string]: number }, { amount, datePaid }) => {
      const [, month, year] = datePaid.split("/");
      const monthYear = `${month}/${year}`;

      if (!acc[monthYear]) {
        acc[monthYear] = 0;
      }

      acc[monthYear] += Number(amount);

      return acc;
    },
    {}
  );

  return Object.entries(monthlyData)
    .map(([month, total]) => ({
      name: month,
      total,
    }))
    .sort((a, b) => {
      const [monthA, yearA] = a.name.split("/");
      const [monthB, yearB] = b.name.split("/");

      const dateA = new Date(`${yearA}-${monthA}-01`);
      const dateB = new Date(`${yearB}-${monthB}-01`);

      return dateA.getTime() - dateB.getTime();
    });
};

export const currencyFormatter = (value: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(value);
};
