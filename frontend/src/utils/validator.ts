type Rule<T> = (value: T) => string | null;

class SimpleZodString {
  private rules: Rule<string>[] = [];

  required(msg = "Обязательное поле") {
    this.rules.push((v) => (v ? null : msg));
    return this;
  }

  email(msg = "Неверный email") {
    this.rules.push((v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? null : msg));
    return this;
  }

  phone(msg = "Неверный телефон") {
    this.rules.push((v) => (/^7\d{10}$/.test(v) ? null : msg));
    return this;
  }

  number(msg = "Только цифры") {
    this.rules.push((v) => (/^\d+$/.test(v) ? null : msg));
    return this;
  }

  pattern(fn: (value: string) => boolean, msg: string) {
    this.rules.push((v) => (fn(v) ? null : msg));
    return this;
  }

  validate(value: string) {
    for (const rule of this.rules) {
      const err = rule(value);
      if (err) return err;
    }
    return "";
  }
}

export class SimpleZodSchema<T extends Record<string, any>> {
  private shapeObj: Record<keyof T, SimpleZodString> = {} as any;

  shape(shapeObj: Record<keyof T, SimpleZodString>) {
    this.shapeObj = shapeObj;
    return this;
  }

  validate(values: T) {
    const errors: Record<keyof T, string> = {} as any;
    for (const key in this.shapeObj) {
      errors[key] = this.shapeObj[key].validate(values[key]);
    }
    return errors;
  }
}

export const z = {
  string: () => new SimpleZodString(),
};
