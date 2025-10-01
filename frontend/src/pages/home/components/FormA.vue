<script setup lang="ts">
import Input from "../../../components/ui/Input.vue";
import Button from "../../../components/ui/Button.vue";
import { computed, reactive } from "vue";
import { validateField, isRequired, isNumber, isPhone, isEmail } from "../../../utils/validator";

interface FormAData {
  name: string;
  email: string;
  inn: string;
  phone: string;
}
const form = reactive<FormAData>({
  name: "",
  phone: "",
  inn: "",
  email: "",
});

const errors = reactive<Record<keyof FormAData, string>>({
  email: "",
  name: "",
  inn: "",
  phone: "",
});

const isFormValid = computed(() => {
  const noErrors = Object.values(errors).every((e) => e === "");
  return noErrors;
});

const submitForm = () => {
  errors.name = validateField(form.name, [isRequired]);
  errors.email = validateField(form.email, [isEmail]);
  errors.inn = validateField(form.inn, [isRequired, isNumber]);
  errors.phone = validateField(form.phone, [isRequired, isPhone]);

  const hasErrors = Object.values(errors).some((e: string) => e !== "");
  if (!hasErrors) alert("Форма невалидна!");
};
</script>

<template>
  <form @submit.prevent="submitForm" class="form" action="">
    <h2>Форма A:</h2>
    {{ JSON.stringify(errors) }}
    <Input
      @blur="errors.name = validateField(form.name, [isRequired])"
      @input="errors.name = ''"
      :error="errors.name"
      label="Имя"
      v-model="form.name"
      placeholder="Иван"
    />
    <Input
      @blur="errors.email = validateField(form.email, [isEmail])"
      :error="errors.email"
      label="Email"
      v-model="form.email"
      placeholder="ivan@gmail.com"
    />

    <Input
      v-model="form.inn"
      :error="errors.inn"
      @blur="errors.inn = validateField(form.inn, [isRequired, isNumber])"
      @input="errors.inn = validateField(form.inn, [isRequired, isNumber])"
      label="ИНН"
      placeholder="111111111111"
    />

    <Input
      v-model="form.phone"
      :error="errors.phone"
      @blur="errors.phone = validateField(form.phone, [isRequired, isPhone])"
      @input="errors.phone = validateField(form.phone, [isRequired, isPhone])"
      label="Телефон"
      placeholder="+7 (XXX) XXX-XX-XX"
    />

    <Button :disabled="isFormValid" type="submit">Отправить</Button>
  </form>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
</style>
