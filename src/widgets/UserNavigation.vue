<script setup>
import { RouterLink, RouterView } from 'vue-router';


</script>

<template>
    <nav class="sidebar">
        <div class="content">
            <img class="content__logo" src="@/assets/images/logo-point.png" alt="">
            <RouterLink to="/user" ><img src="@/assets/images/icons/home.svg"></RouterLink>
            <RouterLink to="/user/profile"><img src="@/assets/images/icons/profile.svg"></RouterLink>
            <RouterLink to="/user/chatList"><img src="@/assets/images/icons/message.svg"></RouterLink>
            <RouterLink to="/user/frends"><img src="@/assets/images/icons/frends.svg"></RouterLink>
        </div>
        <div class="content">
            <img class="content__settings" src="@/assets/images/icons/settings.svg">
        </div>
        <!-- <div class="user">
            <div style="color: red; width: 58px; height: 58px;"></div>
            <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L7 7L13 1" stroke="white" stroke-width="1.17474" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
        </div> -->
    </nav>
</template>

<style scoped lang="scss">
.sidebar {
    display: flex;
    flex-direction: column;
    background-color: #222;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 32px;
    padding: 36px 32px;
    width: 92px;
    height: 920px;

    margin-top: 0.8rem;

    //position: fixed;
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