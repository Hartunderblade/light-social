<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const posts = ref([]);
const errorMessage = ref("");

// Функция загрузки постов
const fetchPosts = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/posts");
    posts.value = response.data;
  } catch (error) {
    errorMessage.value = "Ошибка загрузки постов";
    console.error(error);
  }
};

// Загружаем посты при монтировании компонента
onMounted(fetchPosts);
</script>

<template>
  <div class="posts-container">
    <h2>Лента постов</h2>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <div v-if="posts.length === 0">Нет постов</div>

    <div v-for="post in posts" :key="post.id" class="post-card">
      <img v-if="post.image" :src="`http://localhost:3000${post.image}`" alt="Изображение поста" class="post-image" />
      <h3>{{ post.category }}</h3>
      <p>{{ post.text }}</p>
      <small>Дата: {{ new Date(post.created_at).toLocaleString() }}</small>
    </div>
  </div>
</template>

<style scoped>
</style>
