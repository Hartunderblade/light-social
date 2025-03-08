<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const posts = ref([]);
const errorMessage = ref("");

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
  <div list>
    <div v-if="posts.length === 0">Нет постов</div>
<div v-for="post in posts" :key="post.id" class="post">

    

      <div class="user" >
          <img class="user__avatar" src="/src/assets/images/bc-auth.jpg" alt="Аватар">
          <div class="user-info">
              <p class="user-info__name">{{ post.name }}</p>
              <div style="width: 100px;" class="user-info__category">{{ post.category_name || "Без категории" }}</div>
          </div>
          <button class="user__redactor">
              <img src="@/assets/images/icons/edit.svg" alt="Редактировать пост" />
          </button>
      </div>
      <div>
        <div class="post-content">
          <p class="post-content__text">{{ post.content }}</p>
          <img class="post-content__img" v-if="post.image" :src="post.image" alt="Изображение поста">
      </div>
      </div>
  </div>


  </div>
  
  <!-- <div class="post-list">
    <h2>Мои посты</h2>

    <div v-if="posts.length === 0">Нет постов</div>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

    <div v-for="post in posts" :key="post.id" class="post">

      <div class="user-info">
        <img v-if="post.avatar" :src="post.avatar" alt="Аватар" class="avatar" />
        <p class="username">{{ post.name }}</p>
      </div>
      
      <h3>{{ post.title }}</h3>
      <p>{{ post.content }}</p>
      
      <p><strong>Категория:</strong> {{ post.category_name || "Без категории" }}</p>
      
      <img v-if="post.image" :src="post.image" alt="Изображение поста" class="post-image" />
      
      <p class="date">{{ new Date(post.created_at).toLocaleString() }}</p>
    </div>
  </div> -->
</template>

<style scoped lang="scss">
.post {
  border: 1px solid rgba(255, 255, 255, 0.1);
border-radius: 24px;
padding: 47px 23px;
max-width: 1319px;
background: #222;
margin-top: 2rem;
  &-content {
      &__text {
          font-weight: 400;
          font-size: 21px;
          line-height: 138%;
          letter-spacing: -0.02em;
          max-width: 1256px;
          margin-bottom: 22px;
      }

      &__img {
          max-width: 1256px;
          width: 100%;
          max-height: 721px;
          height: 100%;
          border-radius: 12px;
      }
  }
}

.post-img {
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 8px;
  margin-top: 10px;
  
}

.user {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  position: relative;
    &__avatar {
      width: 66px;
      height: 66px;
        border-radius: 100%;
    }
  
    &-info {
      margin-left: 1rem;
        &__name {
          font-weight: 500;
          font-size: 29px;
            margin-bottom: 6px;
        }
  
        &__category {
          font-weight: 400;
          font-size: 14px;
          color: #327ce2;
          border: 1px solid #327ce2;
          border-radius: 18px;
          padding: 4px 16px;
          text-align: center;
        }
    }
  
    &__redactor {
      position: absolute;
      right: 0;
      top: 0;
    }
  }
</style>
