<template>
    <div class="chat">
      <h3>Чат с</h3>

        <MessageInput @sendMessage="sendMessage" />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import MessageInput from "@/widgets/MessageInput.vue";
  </script>
  
  <style scoped>
  .chat {
    width: 500px;
    padding: 20px;
  }
  
  .messages {
    max-height: 300px;
    overflow-y: auto;
  }
  
  .message {
    padding: 5px;
  }
  
  input[type="text"] {
    width: 80%;
  }
  </style>
  