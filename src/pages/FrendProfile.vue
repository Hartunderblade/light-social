<script setup>
import { ref, onMounted, defineProps } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

const route = useRoute();
const user = ref(null);
const errorMessage = ref("");

const fetchUserProfile = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/users/${route.params.id}`);
    user.value = response.data;
  } catch (error) {
    console.error("Ошибка при загрузке профиля:", error);
    errorMessage.value = "Ошибка при загрузке профиля";
  }
};

onMounted(fetchUserProfile);

</script>

<template>
  <div v-if="user" class="left">
    <img :src="user.avatar ? `http://localhost:3000${user.avatar}` : 'src/assets/images/defolt-img.jpg'" class="avatar" width="100" alt="Аватар">
    <div class="name">
      <p class="name__full">{{ user.full_name }}</p>
      <p class="name__login">{{ user.login }}</p>
    </div>
    <div class="categories">
      <p class="category">{{ user.category }}</p>
    </div>
    <div class="buttons" style="display: flex; column-gap: 1rem;">
      <button>Написать</button>
      <button @click="addFriend" class="friend-button">
        {{ isFriend ? "Убрать" : "Добавить" }}
      </button>
    </div>
    
  </div>
  <p v-else-if="errorMessage">{{ errorMessage }}</p>
  <p v-else>Загрузка...</p>
</template>

<style scoped lang="scss">

.profile {
  margin-top: 5rem;
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
width: 100%;
display: flex;
align-items: center;
background: #222;
position: relative;
height: 164px;
margin-top: 80px;
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
width: 1319px;
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
</style>
