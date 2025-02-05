<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <nav class="sidebar">
        <div class="content">
            <img class="content__logo" src="@/assets/images/logo-point.png" alt="">
            <RouterLink to="/user" ><img src="@/assets/images/icons/home.svg"></RouterLink>
        </div>
        <div class="content">
            <img class="content__settings" src="@/assets/images/icons/settings.svg">
        </div>
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