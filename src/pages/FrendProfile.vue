<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const route = useRoute();
const router = useRouter();
const user = ref(null);
const posts = ref([]);
const errorMessage = ref("");
const isFriend = ref(false);

const fetchUserProfile = async () => {
  try {
    const token = localStorage.getItem("token");
    const userId = route.params.id;

    // Получаем информацию о пользователе
    const userResponse = await axios.get(`http://localhost:3000/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    user.value = userResponse.data;

    // Получаем посты пользователя (с категорией)
    const postsResponse = await axios.get(`http://localhost:3000/posts/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    posts.value = postsResponse.data;

    // Проверяем, является ли этот пользователь другом
    const friendResponse = await axios.get(`http://localhost:3000/friends/check/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    isFriend.value = friendResponse.data.isFriend;

    console.log("Загруженные посты:", posts.value);

  } catch (error) {
    console.error("Ошибка загрузки профиля пользователя:", error);
    errorMessage.value = "Ошибка загрузки данных пользователя";
  }
};

// Добавление в друзья
const addFriend = async () => {
  try {
    const token = localStorage.getItem("token");
    const userId = route.params.id;

    await axios.post(
        "http://localhost:3000/friends/add",
        { friendId: userId },
        { headers: { Authorization: `Bearer ${token}` } }
    );

    isFriend.value = true;
    alert("Пользователь добавлен в друзья!");

  } catch (error) {
    console.error("Ошибка добавления в друзья:", error);
    alert("Не удалось добавить в друзья");
  }
};

// Удаление из друзей
const removeFriend = async () => {
  try {
    const token = localStorage.getItem("token");
    const userId = route.params.id;

    await axios.delete(`http://localhost:3000/friends/remove/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    isFriend.value = false;
    alert("Пользователь удалён из друзей!");
  } catch (error) {
    console.error("Ошибка удаления из друзей:", error);
    alert("Не удалось удалить из друзей");
  }
};

// Открытие чата
const openChat = () => {
  router.push(`/user/chat/${route.params.id}`);
};

onMounted(fetchUserProfile);
</script>

<template>
  <div class="profile">
    <div v-if="user" class="left">
      <div style="display: flex; align-items: center;">
        <img src="@/assets/images/bc-auth.jpg" class="avatar" width="100" alt="Аватар">
        <div class="name">
        <p class="name__full">{{ user.name }}</p>
        <p class="name__login">{{ user.login }}</p>
      </div>
      <div class="categories">
        <p class="category">{{ user.category }}</p>
      </div>
      </div>
      
      <div class="buttons" style="display: flex; column-gap: 1rem;">
        <button @click="openChat" class="buttons__chat">Написать</button>
        <div class="buttons-add">
          <!-- Кнопка добавления/удаления из друзей -->
          <button v-if="!isFriend" @click="addFriend">Добавить</button>
          <button v-else @click="removeFriend" class="remove-btn">Удалить</button>
        </div>
      </div>
    </div>
    <div class="list">
      <div style="font-size: 3rem; font-weight:500;" v-if="posts.length === 0">Нет постов</div>
      <div v-for="post in posts" :key="post.id" class="post">
        <div class="user">
          <img class="user__avatar" src="/src/assets/images/bc-auth.jpg" alt="Аватар">
          <div class="user-info">
            <p class="user-info__name">{{ user.name }}</p>
            <div style="width: 100px;" class="user-info__category">{{ post.category }}</div>
          </div>
        </div>
        <div>
          <div class="post-content">
            <p class="post-content__text">{{ post.content }}</p>
            <img class="post-content__img" v-if="post.image" :src="post.image" alt="Изображение поста">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.profile {
  width: 100%;
}

.blocks {
  display: flex;
  column-gap: 1rem;
}

.avatar {
  border-radius: 100%;
  width: 100px;
  height: 100px;
  margin-right: 1rem;
}

.left {
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 2rem 2rem;
  max-width: 1318px;
  width: 100%;
  background: #222;
  position: relative;
  height: 164px;
  margin-top: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.name {
  &__full {
    font-weight: 500;
    font-size: 26px;
  }

  &__login {
    font-weight: 400;
    font-size: 16px;
  }
}

.categories {
  margin-left: 3rem;
  display: flex;
  align-items: center;
  column-gap: 1.2rem;
}

.category {
  font-weight: 400;
  color: #327ce2;
  border: 1px solid #327ce2;
  border-radius: 18px;
  padding: 4px 16px;
}

.buttons {
  &__chat {
    font-weight: 500;
    font-size: 18px;
    line-height: 111%;
    letter-spacing: -0.01em;
    background-color: rgba(16, 84, 222, 0.04);
    border: 1px solid #1054de;
    border-radius: 16px;
    padding: 12px 48px;
  }

  &-add {
    button {
      font-weight: 500;
font-size: 18px;
line-height: 111%;
letter-spacing: -0.01em;
background-color: rgba(78, 115, 190, 0.1);
border: 1px solid #be4e50;
border-radius: 16px;
padding: 12px 48px;
    }
  }
}

.setting {
  position: absolute;
  right: 2rem;
  top: 2rem;
}

.add {
  background: #222;
  border: 2px dashed rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 26px 16px;
  width: 198px;
  height: 164px;
  text-align: center;

  p {
    font-weight: 400;
    font-size: 18px;
    margin-top: 0.4rem;
  }
}

.user {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  position: relative;

  &__avatar {
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
      padding: 5px 16px;
      width: 78px;
    }
  }

  &__redactor {
    position: absolute;
    right: 0;
    top: 0;
  }
}

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
      width: 1256px;
      height: 721px;
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
