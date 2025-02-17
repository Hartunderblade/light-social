<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import SearchUsers from '@/features/user/SearchUsers.vue';

const router = useRouter();
const user = ref(null);
const users = ref([]);
const message = ref("");

const fetchUsers = async () => {
  try {
    const res = await axios.get("http://localhost:3000/users");
    users.value = res.data;
  } catch (err) {
    message.value = "Ошибка загрузки пользователей";
  }
};




onMounted(() => {
  fetchUsers();
});
</script>

<template>
  <div class="frends">
    <h2 class="frends__title">Мои друзья</h2>
    <div v-for="u in users" :key="u.id" class="items">
      <div class="item" >
        <router-link :to="'/user/frend/' + u.id" class="user">
          <img class="user__img" v-if="u.avatar" :src="'http://localhost:3000' + u.avatar" alt="Аватар">
          <div class="user-text">
            <p class="user-text__name">{{ u.full_name }}</p>
            <p class="user-text__login">@{{ u.username }}</p>
          </div>
        </router-link>
        <button class="item__delit">Удалить</button>
      </div>
    </div>
  </div>
  <div class="search">
    <SearchUsers/>
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
