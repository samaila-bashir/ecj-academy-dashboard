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
