<script setup>
import { ref, onMounted } from "vue";
import {useRoute, useRouter} from "vue-router";
import axios from "axios";

const route = useRoute();
const friendId = route.params.id; // ID друга из URL
const messages = ref([]); // Список сообщений
const newMessage = ref(""); // Новое сообщение
const currentUser = ref(null); // Текущий пользователь
const messagesContainer = ref(null);

const user = ref(null);
const errorMessage = ref("");

const isFriend = ref(false);


// Функция для форматирования времени (HH:mm)
const formatTime = (timestamp) => {
  if (!timestamp) return ""; // Защита от undefined
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const fetchUserProfile = async () => {
  try {
    const token = localStorage.getItem("token");
    const userId = route.params.id;

    // Получаем информацию о пользователе
    const userResponse = await axios.get(`http://localhost:3000/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    user.value = userResponse.data;

    // Проверяем, является ли этот пользователь другом
    const friendResponse = await axios.get(`http://localhost:3000/friends/check/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    isFriend.value = friendResponse.data.isFriend;

  } catch (error) {
    console.error("Ошибка загрузки профиля пользователя:", error);
    errorMessage.value = "Ошибка загрузки данных пользователя";
  }
};

// Получение ID текущего пользователя
const fetchCurrentUser = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:3000/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    currentUser.value = response.data;
  } catch (error) {
    console.error("Ошибка загрузки текущего пользователя:", error);
  }
};

// Загрузка сообщений
const fetchMessages = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`http://localhost:3000/messages/${friendId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    messages.value = response.data.map(msg => ({
      ...msg,
      formattedTime: formatTime(msg.created_at) // Форматируем время
    }));

  } catch (error) {
    console.error("Ошибка загрузки сообщений:", error);
  }
};

// Отправка сообщения
const sendMessage = async () => {
  if (!newMessage.value.trim()) return;

  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
        "http://localhost:3000/messages/send",
        {
          receiverId: friendId,
          content: newMessage.value,
        },
        { headers: { Authorization: `Bearer ${token}` } }
    );

    if (response.data) {
      messages.value.push({
        id: response.data.id, // ID сообщения
        sender_id: currentUser.value.id,
        receiver_id: friendId,
        content: newMessage.value,
        formattedTime: formatTime(response.data.created_at), // Берем `created_at` из ответа
      });

      newMessage.value = ""; // Очищаем поле ввода
    }
  } catch (error) {
    console.error("Ошибка отправки сообщения:", error);
  }
};


onMounted(() => {
  fetchCurrentUser();
  fetchMessages();
  fetchUserProfile();
  sendMessage();
});

</script>

<template>
  <div style="margin-top: 3rem;" class="chat-container">
    <div v-if="user" class="chat-header">
      <img src="@/assets/images/bc-auth.jpg" class="avatar" width="100" alt="Аватар">
      <div class="user-info">
        <h2 style="font-size: 1.8rem">{{ user.name }}</h2>
        <p>@{{ user.login }}</p>
      </div>
    </div>

    <div class="chat-messages">
      <div
          v-for="message in messages"
          :key="message.id"
          :class="['message', message.sender_id === currentUser?.id ? 'sent' : 'received']"
      >
        <div v-if="message.sender_id !== currentUser?.id" class="avatar-small"></div>
        <div class="message-bubble">
          <p>{{ message.content }}</p>
          <span class="timestamp">{{ message.formattedTime }}</span>
        </div>
      </div>
    </div>

    <div class="chat-input">
      <input v-model="newMessage" type="text" placeholder="Начните печатать..." />
      <button @click="sendMessage" class="send-button">
        <svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M2.32816 2.3259L3.51514 8.9115H10.839C11.462 8.9115 11.9671 9.39883 11.9671 10C11.9671 10.6012 11.462 11.0885 10.839 11.0885H3.51514L2.32816 17.6741L20.8856 10L2.32816 2.3259ZM1.42128 10L0.0298591 2.28007C-0.0826259 1.65598 0.12666 1.0181 0.590875 0.570172C1.17415 0.00737042 2.05378 -0.156094 2.81196 0.157439L22.9707 8.49374C23.5951 8.75198 24 9.34445 24 10C24 10.6555 23.5951 11.248 22.9707 11.5063L2.81196 19.8425C2.05378 20.1561 1.17415 19.9926 0.590875 19.4299C0.12666 18.9819 -0.0826262 18.344 0.0298591 17.7199L1.42128 10Z"
              fill="#8E8E93"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.me {
  text-align: right;
  color: blue;
}

.friend {
  text-align: left;
  color: green;
}

.chat-container {
  border: 1px solid rgba(255, 255, 255, 0.1);
border-radius: 16px;
padding: 64px;
width: 1111px;
//height: 1022px;
background-color: #222;
position: relative;

}

.chat-header {
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #333;
  padding-bottom: 12px;
  margin-bottom: 12px;

  .avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
  }

  .user-info {
    margin-left: 12px;

    h2 {
      font-size: 1rem;
      margin: 0;
    }

    p {
      font-size: 0.8rem;
      color: #bbb;
    }
  }
}

.chat-messages {
  display: flex;
  flex-direction: column;
  gap: 10px;

  .message {
    display: flex;
    align-items: center;
    

    &.received {
      .avatar-small {
        width: 16px;
        height: 16px;
        background: #00f;
        border-radius: 50%;
        margin-right: 8px;
      }
    }

    &.sent {
      justify-content: flex-end;
    }

    .message-bubble {
      border-radius: 16px;
padding: 16px;
background-color: #292b32;
display: flex;
align-items: center;
justify-content: space-between;
column-gap: 1rem;
//position: relative;

      .timestamp {
        font-size: 0.7rem;
        color: #888;
        //position: absolute;
        //bottom: 2px;
        //right: 6px;
      }
    }
  }
}

.chat-input {
  display: flex;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.3);
border-radius: 16px;
padding: 22px 20px;
width: 983px;
position: absolute;
bottom: 64px;

  input {
    flex-grow: 1;
    background: transparent;
    border: none;
    outline: none;
    color: white;
    padding: 8px;
  }

  .send-button {
    background: none;
    border: none;
    color: #bbb;
    cursor: pointer;
    padding: 4px;

    &:hover {
      color: white;
    }

    .icon {
      width: 20px;
      height: 20px;
    }
  }
}

@media (max-width: 768px) {
  .chat-container {
    padding: 16px;
    max-width: 100%;
    height: 100vh;
  }

  .chat-header {
    padding-bottom: 8px;
  }

  .chat-messages {
    max-height: calc(100% - 120px);
  }

  .chat-input {
    padding: 10px;
  }

  .message-bubble {
    max-width: 85%;
  }
}
</style>
