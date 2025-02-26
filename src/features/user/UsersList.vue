<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const users = ref([]);
const message = ref("");
const errorMessage = ref("");

const fetchUsers = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:3000/users", {
      headers: { Authorization: `Bearer ${token}` },
    });
    users.value = response.data;
  } catch (error) {
    console.error("Ошибка при загрузке пользователей:", error);
    errorMessage.value = "Ошибка при загрузке пользователей";
  }
};

const addFriend = async (friendId) => {
  try {
    const token = localStorage.getItem("token");
    await axios.post(
      "http://localhost:3000/users/add-friend",
      { friendId },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    message.value = "Пользователь добавлен в друзья!";
  } catch (error) {
    console.error("Ошибка при добавлении друга:", error);
    errorMessage.value = "Ошибка при добавлении друга";
  }
};

// Загружаем список пользователей при открытии страницы
onMounted(fetchUsers);
</script>

<template>
  <div class="frends">
    <h2 class="frends__title">Мои друзья</h2>
    <p v-if="message" class="success">{{ message }}</p>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <div class="items">
      <div v-for="user in users" :key="user.id" class="item" >
        <div class="user">
          <img class="user__img" :src="user.avatar || '/src/assets/images/defolt-img.jpg'" alt="Аватар">
          <div class="user-text">
            <p class="user-text__name">{{ user.fullName }}</p>
            <p class="user-text__login">@{{ user.login }}</p>
          </div>
        </div>
        <button @click="addFriend(user.id)" class="item__delit">Добавить</button>
      </div>
    </div>
  </div>
  <div class="search">
    <!-- <SearchUsers/> -->
  </div>
</template>

<style scoped lang="scss">
.frends {
  border: 1px solid rgba(255, 255, 255, 0.2);
border-radius: 1rem;
padding: 32px;
width: 1322px;
background: #222;
  &__title {
    font-weight: 600;
    font-size: 26px;
    line-height: 106%;
    letter-spacing: -0.01em;
  }
}

.items {
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
  margin-top: 3rem;
}

.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #191919;
padding: 0px 0px 1rem 0px;
cursor: pointer;

&__delit {
  font-weight: 500;
  font-size: 16px;
  line-height: 125%;
  letter-spacing: -0.01em;
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid #327ce2;
border-radius: 16px;
padding: 12px 32px;
}
}

.user {
  display: flex;
  align-items: center;
  column-gap: 0.8rem;

  &__img {
    width: 58px;
    height: 58px;
    border-radius: 100%;
  }

  &-text {
    &__name {
      font-weight: 500;
font-size: 20px;
    }

    &__login {
      font-weight: 400;
font-size: 1rem;
    }
  }
}
</style>
