<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const users = ref([]);
const currentUser = ref(null);
const errorMessage = ref("");
const router = useRouter();

const fetchUsers = async () => {
    try {
        const token = localStorage.getItem("token");

        // Получаем текущего пользователя
        const userResponse = await axios.get("http://localhost:3000/users/me", {
            headers: { Authorization: `Bearer ${token}` },
        });
        currentUser.value = userResponse.data;

        // Получаем список всех пользователей, кроме текущего
        const usersResponse = await axios.get("http://localhost:3000/users/all", {
            headers: { Authorization: `Bearer ${token}` },
        });

        users.value = usersResponse.data.filter(user => user.id !== currentUser.value.id);
    } catch (error) {
        console.error("Ошибка загрузки пользователей:", error);
        errorMessage.value = "Ошибка загрузки пользователей";
    }
};

// Функция перехода на страницу пользователя
const goToUserProfile = (userId) => {
    router.push(`/user/frends/${userId}`);
};

const addFriend = async (friendId) => {
    try {
        const token = localStorage.getItem("token");

        await axios.post(
            "http://localhost:3000/friends/add",
            { friendId },
            { headers: { Authorization: `Bearer ${token}` } }
        );

        alert("Пользователь добавлен в друзья!");
    } catch (error) {
        console.error("Ошибка добавления в друзья:", error);
        alert("Не удалось добавить в друзья");
    }
};

onMounted(fetchUsers);
</script>

<template>
  <div class="all">
    <input v-model="searchQuery" placeholder="Найди друга по интересам..." class="search" required/>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <div class="users">
      <div v-for="user in users" :key="user.id" class="user">
        <img src="@/assets/images/bc-auth.jpg" alt="Аватар" width="50" class="avatar" />
        <div class="text">
          <p>{{ user.name }}</p>
          <p>@{{ user.login }}</p>
        </div>
        <button @click="goToUserProfile(user.id)">Перейти</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.all {
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 12px;
  width: 360px;
  background: #222;

  //position: absolute;
  //top: 80px;
  //right: 30px;
}

.users {
  display: flex;
  flex-direction: column;
  row-gap: 12px;
}

.user {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(78, 115, 190, 0.7);
  border-radius: 16px;
  padding: 12px;
  width: 322px;

  button {
    font-weight: 500;
    font-size: 12px;
    line-height: 167%;
    letter-spacing: -0.02em;
    border: 1px solid #327ce2;
    border-radius: 16px;
    padding: 8px 12px;
  }
}

.text {
  width: 160px;
}

.search {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid #fff;
  border-radius: 16px;
  padding: 10px 12px;
  width: 322px;
  height: 50px;
  margin-bottom: 26px;
  color: #fff;

  &::placeholder {
    font-weight: 400;
    font-size: 15px;
    line-height: 133%;
    letter-spacing: -0.02em;
    color: rgba(255, 255, 255, 0.7);

  }
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 10px;
}
</style>
