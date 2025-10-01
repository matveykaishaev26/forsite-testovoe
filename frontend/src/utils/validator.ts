export type Validator = (value: string) => true | string;

export const isRequired: Validator = (value) =>
  value === undefined || value === null || value.toString().trim() === "" ? "Поле обязательно" : true;

export const isEmail: Validator = (value) =>
  value === undefined ||
  value === null ||
  !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    value
  )
    ? "Неверный формат email"
    : true;

export const isNumber: Validator = (value) =>
  value === undefined || value === null || !/^\d+$/.test(value) ? "Должно быть числом" : true;

export const pattern =
  (regex: RegExp, message: string): Validator =>
  (value) =>
    !regex.test(value) ? message : true;

export const isPhone: Validator = (value) =>
  value === undefined || !/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(value) ? "формат +7 (XXX) XXX-XX-XX" : true;
export const validateField = (value: string, validators: Validator[]): string => {
  for (const v of validators) {
    const result = v(value);
    if (result !== true) return result;
  }
  return "";
};
