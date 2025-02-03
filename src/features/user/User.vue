<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navigation from '@/widgets/UserNavigation.vue';
</script>

<template>
    <div class="wrapper">
        <Navigation/>
        <div class="exit">
            <div></div>
            <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L7 7L13 1" stroke="white" stroke-width="1.17474" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
        </div>
        <RouterView/>
    </div>
</template>

<style scoped lang="scss">
.exit {
    display: flex;
    align-items: center;
    column-gap: 12px;

    position: absolute;
    right: 1.8rem;
    top: 1rem;

    div {
        width: 58px;
        height: 58px;
        border-radius: 100%;
        background-color: #fff;
    }

    
}

@media (max-width: 320px) {
    .exit {   
        right: 12px;
        top: 20px;
    
        div {
            width: 32px;
            height: 32px;
        }
    
        
    }
}
</style>