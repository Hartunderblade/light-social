<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const posts = ref([]);
const loading = ref(true);

const fetchPosts = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:3000/posts/news", {
      headers: { Authorization: `Bearer ${token}` },
    });
    posts.value = response.data;
  } catch (error) {
    console.error("Ошибка при загрузке постов:", error);
  } finally {
    loading.value = false;
  }
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString();
};

onMounted(fetchPosts);
</script>

<template>
<!--  <div class="post-list">-->
<!--    <h2>Посты по вашей категории</h2>-->

<!--    <div v-if="loading" class="loading">Загрузка...</div>-->
<!--    <div v-else-if="posts.length === 0" class="no-posts">Нет постов в вашей категории</div>-->

<!--    <div v-for="post in posts" :key="post.id" class="post">-->
<!--      <div class="post-header">-->
<!--        <img :src="post.avatar || '/default-avatar.png'" alt="Аватар" class="avatar">-->
<!--        <div>-->
<!--          <h3>{{ post.name }}</h3>-->
<!--          <span class="timestamp">{{ formatDate(post.created_at) }}</span>-->
<!--        </div>-->
<!--      </div>-->
<!--      <h4 class="post-title">{{ post.title }}</h4>-->
<!--      <p class="post-content">{{ post.content }}</p>-->
<!--      <img v-if="post.image" :src="post.image" alt="Изображение поста" class="post-image">-->
<!--    </div>-->
<!--  </div>-->


    <div class="content">
        <div class="news">
            <h1 class="news__title">Новостная лента</h1>
          <div v-if="loading" class="loading">Загрузка...</div>
          <div v-else-if="posts.length === 0" class="no-posts">Нет постов в вашей категории</div>
            <div  v-for="post in posts" :key="post.id" class="post">
                <div class="profile">
                    <!-- <img src="profile.jpg" alt="Аватар"> -->
                    <div class="profile__avatar"></div>
                    <div class="profile-info">
                        <p class="profile-info__name">{{ post.name }}</p>
                        <div class="profile-info__category">{{ post.category }}</div>
                    </div>
                </div>
                <div class="post-content">
                    <p class="post-content__text">{{ post.content }}</p>
                    <img class="post-content__img" :src="post.image"
                        alt="Теннисные ракетки на корте">
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.news {
    background-color: #222;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 1rem;
    padding: 2rem;
    width: 1320px;

    margin: 86px 0;

    &__title {
        font-weight: 600;
        font-size: 26px;
        line-height: 106%;
        letter-spacing: -0.01em;
        margin-bottom: 46px;
    }
}

.post {
  margin-top: 4rem;
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
            width: 1256px;
            height: 721px;
            border-radius: 12px;
        }
    }
}

.profile {
    display: flex;
    align-items: center;
    column-gap: 1rem;
    margin-bottom: 2rem;

    &__avatar {
        width: 88px;
        height: 88px;
        border: 1px solid red;
        border-radius: 100%;
    }

    &-info {
        &__name {
            font-weight: 500;
            font-size: 30px;
            margin-bottom: 6px;
        }

        &__category {
            font-weight: 400;
            font-size: 14px;
            background-color: rgba(255, 255, 255, 0.1);
            border: 1px solid #327ce2;
            border-radius: 18px;
            padding: 5px 17px;
            //width: 74px;
            color: #fff;
        }
    }
}

@media (max-width: 320px) {
    .news {
        border-radius: 16px;
        padding: 12px;
        width: 297px;
      margin: 4rem 0;

        &__title {
            margin-bottom: 28px;
        }
    }

    .post-content__text {
        font-size: 12px;
        margin-bottom: 10px;
    }

    .post-content__img {
        border-radius: 6px;
        width: 273px;
        height: 240px;
    }

    .profile {
        column-gap: 12px;
        margin-bottom: 1rem;
    
        &__avatar {
            width: 48px;
            height: 48px;
        }
    
        &-info {
            &__name {
                font-size: 14px;
            }
    
            &__category {
                font-size: 8px;
                border-radius: 18px;
                padding: 5px 16px;
                width: 56px;
            }
        }
    }
}
</style>
