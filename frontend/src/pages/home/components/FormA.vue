<script setup lang="ts">
import Input from "../../../components/ui/Input.vue";
import Button from "../../../components/ui/Button.vue";
import { computed, reactive } from "vue";
import { type FormAData } from "../../../types";
import { formASchema } from "../../../types/schemas";
import { formatPhone, normalizePhone, filterKey } from "../../../utils/form";
const form = reactive<FormAData>({
  name: "",
  email: "",
  inn: "",
  phone: "",
});

const errors = reactive<Record<keyof FormAData, string>>({
  name: "",
  email: "",
  inn: "",
  phone: "",
});

const validateForm = () => {
  const result = formASchema.validate(form);
  Object.assign(errors, result);
  return Object.values(errors).every((e) => e === "");
};

const submitForm = () => {
  if (validateForm()) {
    alert("Форма валидна!");
  } else {
    console.log("Ошибки:", errors);
  }
};

const onPhoneInput = (e: Event) => {
  errors.email = "";
  const raw = normalizePhone((e.target as HTMLInputElement).value);

  if (!raw.startsWith("7")) {
    form.phone = "7" + raw.slice(0, 10); // всего 11 цифр
  } else {
    form.phone = raw;
  }
};

const isFormInvalid = computed(() => {
  const validationResult = formASchema.validate(form);
  return Object.values(validationResult).some((e) => e !== "");
});
</script>

<template>
  <form @submit.prevent="submitForm" class="form">
    <h2>Форма A:</h2>
    <Input
      v-model="form.name"
      label="Имя"
      placeholder="Иван"
      :error="errors.name"
      @blur="errors.name = formASchema.validate(form).name"
      @input="errors.name = ''"
    />
    <Input
      v-model="form.email"
      label="Email"
      placeholder="ivan@gmail.com"
      :error="errors.email"
      @blur="errors.email = formASchema.validate(form).email"
      @input="errors.email = ''"
    />
    <Input
      v-model="form.inn"
      @keydown="(e: KeyboardEvent) => filterKey(e, 12)"
      label="ИНН"
      placeholder="111111111111"
      :error="errors.inn"
      @blur="errors.inn = formASchema.validate(form).inn"
      type="text"
      inputmode="numeric"
    />

    <Input
      :model-value="formatPhone(form.phone)"
      label="Телефон"
      placeholder="+7 (XXX) XXX-XX-XX"
      :error="errors.phone"
      @blur="errors.phone = formASchema.validate(form).phone"
      @input="onPhoneInput"
      @keydown="(e: KeyboardEvent) => filterKey(e, 18)"
      type="text"
      inputmode="numeric"
    />

    <Button :disabled="isFormInvalid"> Отправить </Button>
  </form>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
</style>
