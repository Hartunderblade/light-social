<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import SearchUsers from '@/features/user/SearchUsers.vue';

const router = useRouter();
const user = ref(null);
const users = ref([]);
const message = ref("");
</script>

<template>
    <div class="applications">
      <h2 class="frends__title">Мои друзья</h2>
      <div class="items">
        <div class="item" >
          <div class="user">
            <img class="user__img" src="" alt="Аватар">
            <div class="user-text">
              <p class="user-text__name">Имя</p>
              <p class="user-text__login">@Логин</p>
            </div>
            <button class="item__delit">Удалить</button>
          </div>
        </div>
      </div>
    </div>
    <div class="frends">
      <h2 class="frends__title">Мои друзья</h2>
      <div class="items">
        <div class="item" >
          <router-link class="user">
            <img class="user__img" src="" alt="Аватар">
            <div class="user-text">
              <p class="user-text__name">Имя</p>
              <p class="user-text__login">@Логин</p>
            </div>
          </router-link>
          <button class="item__delit">Удалить</button>
        </div>
        <div class="item" >
          <router-link class="user">
            <img class="user__img" src="" alt="Аватар">
            <div class="user-text">
              <p class="user-text__name">Имя</p>
              <p class="user-text__login">@Логин</p>
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
  max-width: 1322px;
  width: 100%;
  background: #222;
  margin: 86px 0;
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

@media (max-width: 320px) {
  .frends {
    padding: 12px;
    width: 300px;
    margin-top: 82px;
    &__title {
      font-size: 20px;
    }
  }

  .items {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    margin-top: 2rem;
  }

  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #FFFFFF;
    padding: 0px 0px 10px 0px;
    cursor: pointer;

    &__delit {
      font-size: 12px;
      padding: 6px 12px;
    }
  }

  .user {
    display: flex;
    align-items: center;
    column-gap: 1rem;

    &__img {
      width: 48px;
      height: 48px;
    }

    &-text {
      &__name {
        font-weight: 500;
        font-size: 18px;
      }

      &__login {
        font-weight: 400;
        font-size: 1rem;
      }
    }
  }

  .search {
    display: none;
  }
}
</style>
