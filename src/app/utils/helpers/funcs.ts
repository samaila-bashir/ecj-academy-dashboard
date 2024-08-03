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
