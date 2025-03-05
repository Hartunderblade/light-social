<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const posts = ref([]);

const fetchPosts = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/posts/user", {
            headers: { Authorization: `Bearer ${token}` },
        });

        posts.value = response.data;
    } catch (error) {
        console.error("Ошибка при загрузке постов:", error);
    }
};

onMounted(fetchPosts);
</script>

<template>
  <div class="posts-container">
    <h2>Лента постов</h2>

    <div v-if="posts.length === 0">Нет постов</div>

    <div v-for="post in posts" :key="post.id" class="post-card">
      <img v-if="post.image" :src="post.image" alt="Изображение поста" class="post-image" />
      <!-- <h3>{{ post.category }}</h3> -->
      <h3>{{ post.title }}</h3>
      <p>{{ post.content }}</p>
      <p>{{ post.text }}</p>
      <small>Дата: {{ new Date(post.created_at).toLocaleString() }}</small>
      <p class="date">{{ new Date(post.created_at).toLocaleString() }}</p>
    </div>
  </div>
</template>

<style scoped>
</style>
