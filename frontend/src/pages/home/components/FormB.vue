<script setup lang="ts">
import Input from "../../../components/ui/Input.vue";
import Button from "../../../components/ui/Button.vue";
</script>

<template>
  <form class="form" action="">
    <h2>Форма B:</h2>
    <Input placeholder="Имя" />
    <Input placeholder="Фамилия" />
    <Input placeholder="Отчество" />
    <Input placeholder="Дата рождения" />
    <Input placeholder="Логин" />
    <Input placeholder="Email" />
    <Button>Отправить</Button>
  </form>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
</style>
