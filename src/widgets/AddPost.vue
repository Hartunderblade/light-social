<script setup>
import { ref } from 'vue';
import CreatePost from "@/features/user/CreatePost.vue";

const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};
</script>

<template>
    <div>
        <button @click="openModal" class="add">
            <svg width="46" height="45" viewBox="0 0 46 45" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.0001 3.38776L23.0001 41.6124M3.88761 22.5001L42.1123 22.5001" stroke="#327CE2" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <p>Добавить пост</p>
        </button>
        <CreatePost :isOpen="isModalOpen" @close="closeModal"/>
    </div>
</template>

<style scoped lang="scss">
.add {
    background: #222;
    border: 2px dashed rgba(255, 255, 255, 0.2);
    border-radius: 16px;
    padding: 26px 16px;
    width: 198px;
    height: 164px;
    text-align: center;
  
    p {
      font-weight: 400;
      font-size: 18px;
      margin-top: 0.4rem;
    }
  }
</style>