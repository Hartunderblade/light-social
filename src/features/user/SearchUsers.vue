<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

const users = ref([]);
const errorMessage = ref("");

// поиск пользователей
const searchQuery = ref("");

const fetchUsers = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:3000/api/users", {
      headers: { Authorization: `Bearer ${token}` },
    });
    users.value = response.data;
  } catch (error) {
    console.error("Ошибка при загрузке пользователей:", error);
    errorMessage.value = "Ошибка при загрузке пользователей";
  }
};

// функция поиска пользователя

const searchUser = computed(() => {
  return users.value.filter((user) => `${user.full_name} ${user.login}`.toLowerCase().includes(searchQuery.value.toLowerCase()));
});

// Переход в профиль пользователя
const goToProfile = (userId) => {
  router.push(`/user/frends/${userId}`);
};

onMounted(fetchUsers);
</script>

<template>
  <div class="all">
    <input v-model="searchQuery" placeholder="Найди друга по интересам..." class="search" required/>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <div v-if="searchUser.length > 0" class="users">
      <div v-for="user in users" :key="user.id" class="user">
        <img :src="user.avatar ? `http://localhost:3000${user.avatar}` : 'src/assets/images/defolt-img.jpg'" alt="Аватар" width="50" class="avatar" v-if="user.avatar" />
        <div class="text">
          <p>{{ user.full_name }}</p>
          <p>@{{ user.login }}</p>
        </div>
        <button @click="goToProfile(user.id)">Перейти</button>
      </div>
    </div>
    <p v-else>Пользователь не найден</p>
    
  </div>
</template>

<style scoped lang="scss">
.all {
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 12px;
  width: 360px;
  background: #222;

  position: absolute;
  top: 80px;
  right: 30px;
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
