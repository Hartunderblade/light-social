<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const users = ref([]);
const searchQuery = ref("");
const defaultUsers = ref([]);

// Загружаем всех пользователей
const fetchUsers = async () => {
  try {
    const res = await axios.get("http://localhost:3000/users");
    users.value = res.data;
    // Выбираем 3 случайных пользователя
    defaultUsers.value = res.data.sort(() => 0.5 - Math.random()).slice(0, 3);
  } catch (err) {
    console.error("Ошибка загрузки пользователей");
  }
};

// Фильтруем пользователей по введённому запросу
const filteredUsers = computed(() => {
  if (!searchQuery.value.trim()) {
    return defaultUsers.value; // Показываем дефолтных пользователей
  }
  return users.value.filter(user =>
    user.full_name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Переход в профиль пользователя
const goToUserProfile = (id) => {
  router.push(`/user/frend/${id}`);
};

onMounted(fetchUsers);
</script>

<template>
  <div class="all">
    <input v-model="searchQuery" placeholder="Найди друга по интересам..." class="search" />

    <div class="users">
      <div class="user" v-for="user in filteredUsers" :key="user.id" @click="goToUserProfile(user.id)">
        <img :src="'http://localhost:3000' + user.avatar" alt="Аватар" width="50" class="avatar" />
        <div class="text">
            <p>{{ user.full_name }}</p>
        <p>@{{ user.username }}</p>
        </div>
        
        <button>Перейти</button>
      </div>
    </div>

    <p v-if="!filteredUsers.length">Пользователи не найдены</p>
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
