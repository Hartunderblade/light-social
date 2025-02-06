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
            <RouterLink active-class="active" to="/admin" ><img src="@/assets/images/icons/home.svg"></RouterLink>
        </div>
        <button @click="logout">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.4958 21H6.5C5.39543 21 4.5 19.8487 4.5 18.4286V5.57143C4.5 4.15127 5.39543 3 6.5 3H13.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M16 15.5L19.5 12L16 8.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M9.5 11.9958H19.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            <!-- <img class="content__settings" src="@/assets/images/icons/settings.svg"> -->
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

    //position: fixed;
}

.sidebar .active {
    //position: relative;
    //display: inline-block;
}

.sidebar .active img {
    border: 1px solid white;
    padding: 1rem;
    border-radius: 10px;
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

    &__settings {
        margin-top: 460px;
    }


    
}

button {
    
}

@media (max-width: 320px) {
    .sidebar {
        display: flex;
        justify-content:space-between ;
        //flex-direction:row;
        border-radius: 16px;
        padding: 12px 52px;
        width: 296px;
        height: 50px;
    
        position: absolute;
        bottom: 0;
    }

    .content {
        display: flex;
        flex-direction: row;
        align-items: center;
        column-gap: 28px;

        margin-top: 0;
    
        img {
            width: 26px;
        }
    
        &__logo {
            margin-bottom: 3rem;
        }
    
        &__settings {
            display: none;
            margin-top: 0;
        }
    }

    .content__logo {
        display: none;
    }
}
</style>