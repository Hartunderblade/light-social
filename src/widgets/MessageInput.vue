<template>
    <div class="message-input">
      <input v-model="message" type="text" placeholder="Введите сообщение" />
      <button @click="sendMessage">Отправить</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  // Локальное состояние для ввода сообщения
  const message = ref("");
  
  const emit = defineEmits(["sendMessage"]);
  
  const sendMessage = () => {
    if (message.value.trim()) {
      emit("sendMessage", message.value);
      message.value = "";
    }
  };
  </script>
  
  <style scoped>
  .message-input {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  input {
    width: 80%;
    padding: 10px;
  }
  
  button {
    padding: 10px;
  }
  </style>
  