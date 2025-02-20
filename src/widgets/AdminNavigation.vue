<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { ref } from 'vue';
import { useRouter } from "vue-router";

const router = useRouter();

const logout = () => {
//   localStorage.removeItem("token");
//   localStorage.removeItem("role");
  router.push("/");
};
</script>

<template>
    <nav class="sidebar">
        <div class="content">
            <img class="content__logo" src="@/assets/images/logo-point.png" alt="">
            <RouterLink active-class="active" to="/admin"><img src="@/assets/images/icons/home.svg"></RouterLink>
        </div>
        <button class="logout" @click="logout">
          <img src="@/assets/images/icons/logout.svg">
        </button>
    </nav>
</template>

<style scoped lang="scss">
.sidebar {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #222;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 32px;
    padding: 36px 32px;
    width: 92px;
    height: 920px;
    margin-top: 0.8rem;
}
.content {
    display: flex;
    flex-direction: column;
    row-gap: 2rem;

    img {
        width: 26px;
    }

    &__logo {
        margin-bottom: 3rem;
    }
}

@media (max-width: 320px) {
  .sidebar {
    display: flex;
    flex-direction: row;
    justify-content: center;
    column-gap: 3rem;
    border-radius: 16px;
    padding: 6px 35px;
    width: 296px;
    height: 54px;
    margin-top: 0.8rem;

    position: absolute;
    bottom: 1rem;
  }

  .content {
    display: flex;
    flex-direction: row;
    align-items: center;
    column-gap: 2rem;

    img {
      width: 26px;
    }

    &__logo {
      margin-bottom: 0;
      position: fixed;
      top: 1rem;
      left: 12px;
      width: 40px;
      height: 28px;
    }
  }
}
</style>