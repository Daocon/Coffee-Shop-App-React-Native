export const isValidEmail = stringEmail =>
  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(stringEmail);

export const isValidPassword = stringPassword =>
  /^[^\s]{8,10}$/.test(stringPassword);

export const isValidName = stringName =>
  /^[^\d]+$/.test(stringName.trim()) &&
  stringName.trim() !== '' &&
  stringName.trim().length >= 3;

export const isValidRePassword = (password, rePassword) =>
  password == rePassword;

export const isValidPhoneNumber = phoneNumber =>
  /^0[0-9]{9}$/.test(phoneNumber);
