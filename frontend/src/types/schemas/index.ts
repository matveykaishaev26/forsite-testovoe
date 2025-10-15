import type { FormAData } from "..";
import { SimpleZodSchema, z } from "../../utils/validator";

export const formASchema = new SimpleZodSchema<FormAData>().shape({
  name: z.string().required("Введите имя"),
  email: z.string().email(),
  inn: z
    .string()
    .required("Введите ИНН")
    .number()
    .pattern((v) => v.length === 10 || v.length === 12, "ИНН должен быть либо 10 либо 12 цифр"),
  phone: z.string().required("Введите телефон").phone(),
});
