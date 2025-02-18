<script setup>
import { ref } from "vue";
import Chat from '@/features/user/Chat.vue';
</script>

<template>
  <div class="chat-list">
    <div class="chat-list__title">Все сообщения</div>
    <div class="items">
      <div class="item">
        <div class="user">
          <img class="user__img" src="@/assets/images/defolt-img.jpg" alt="">
          <div class="user-text">
            <p class="user-text__name">Имя Фамилия</p>
            <p class="user-text__login">@name</p>
          </div>
        </div>
        <button class="item__message">Написать</button>
      </div>
    </div>
  </div>
  <!-- <Chat /> -->
</template>

<style scoped lang="scss">
.chat-list {
  background: #191919;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 32px;
  width: 1319px;
  margin-top: 20px;

  &__title {
    font-weight: 600;
    font-size: 26px;
    line-height: 106%;
    letter-spacing: -0.01em;
    color: #fff;
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
  border-bottom: 1px solid rgba(255, 255, 255, 0.4);
padding: 0px 0px 1rem 0px;

&__message {
  font-weight: 500;
font-size: 18px;
line-height: 111%;
letter-spacing: -0.01em;
background: rgba(255, 255, 255, 0.1);
border: 1px solid #327ce2;
border-radius: 16px;
padding: 12px 48px;
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
