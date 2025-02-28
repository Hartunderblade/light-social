<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const friends = ref([]);
const currentUserId = localStorage.getItem("userId");

const fetchFriends = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/friends/" + currentUserId);
    friends.value = response.data;
  } catch (error) {
    console.error("Ошибка загрузки друзей:", error);
  }
};

onMounted(fetchFriends);
</script>

<template>
  <div>
    <h2>Мои друзья</h2>
    <ul>
      <li v-for="friend in friends" :key="friend.id">
        <img :src="friend.avatar ? `http://localhost:3000/${friend.avatar}` : '/default-avatar.png'" alt="Аватар" />
        <span>{{ friend.fullName }}</span>
      </li>
    </ul>
  </div>
</template>
