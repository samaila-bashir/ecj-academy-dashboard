export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const addSpaceBeforeUppercase = (string: string) => {
  return string.replace(/([A-Z])/g, " $1").trim();
};
