<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import { useRoute } from "vue-router";
import { io } from "socket.io-client";
import axios from "axios";
// import jwtDecode from "jwt-decode";
import { jwtDecode } from "jwt-decode";


const route = useRoute();
const friendId = ref(route.params.id); // ID друга
const messages = ref([]);
const newMessage = ref("");
const socket = io("http://localhost:3000");
const userId = ref(null);
const inputRef = ref(null);

// Получаем ID текущего пользователя из токена
const getUserId = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decoded = jwtDecode(token);
    userId.value = decoded.id;
  }
};

// Загружаем историю сообщений
const fetchMessages = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get("http://localhost:3000/messages", {
      params: { userId: userId.value, friendId: friendId.value },
      headers: { Authorization: `Bearer ${token}` },
    });
    messages.value = res.data;
  } catch (error) {
    console.error("Ошибка загрузки сообщений", error);
  }
};

// Отправка сообщения
const sendMessage = async () => {
  if (!newMessage.value.trim()) return;

  const messageData = {
    senderId: userId.value,
    receiverId: friendId.value,
    text: newMessage.value,
    timestamp: new Date().toISOString(),
  };

  socket.emit("sendMessage", messageData);
  messages.value.push({ ...messageData, id: Date.now() }); // Временно добавляем сообщение
  newMessage.value = "";

  await nextTick();
  inputRef.value.focus();
};

// Удаление сообщения
const deleteMessage = (messageId) => {
  socket.emit("deleteMessage", messageId);
};

// Получение новых сообщений в реальном времени
socket.on("receiveMessage", (message) => {
  messages.value.push(message);
});

// Удаление сообщения в реальном времени
socket.on("messageDeleted", (messageId) => {
  messages.value = messages.value.filter((msg) => msg.id !== messageId);
});

onMounted(() => {
  getUserId();
  fetchMessages();
  nextTick(() => inputRef.value?.focus());
});

onUnmounted(() => {
  if (socket) socket.disconnect();
});
</script>

<template>
  <div class="chat-container">
    <h2>Чат</h2>
    <div class="messages">
      <div
        v-for="msg in messages"
        :key="msg.id"
        :class="msg.senderId === userId ? 'my-message' : 'friend-message'"
      >
        <p>{{ msg.text }}</p>
        <span class="time">{{ new Date(msg.timestamp).toLocaleTimeString() }}</span>
        <button v-if="msg.senderId === userId" @click="deleteMessage(msg.id)">Удалить</button>
      </div>
    </div>
    <div class="input-box">
      <input ref="inputRef" v-model="newMessage" placeholder="Напишите сообщение..." />
      <button @click="sendMessage">Отправить</button>
    </div>
  </div>
</template>

<style scoped>
.chat-container {
  max-width: 500px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
}
.messages {
  max-height: 400px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}
.my-message {
  background: #dcf8c6;
  align-self: flex-end;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 5px;
}
.friend-message {
  background: #ececec;
  align-self: flex-start;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 5px;
}
.time {
  font-size: 12px;
  color: gray;
  display: block;
  text-align: right;
}
.input-box {
  display: flex;
  margin-top: 10px;
}
input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
button {
  margin-left: 10px;
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}
button:hover {
  background: #0056b3;
}
</style>
