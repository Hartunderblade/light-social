<script setup>
import { ref } from 'vue';
import EditProfile from "@/features/user/EditProfile.vue";

const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};

const closeModals = () => {
  isModalOpen.value = false;
};
</script>

<template>
    <div>    
      <button @click="openModal" class="settings"><img src="@/assets/images/icons/settings.svg" alt=""></button>
      <EditProfile :isOpen="isModalOpen" @close="closeModals"/>
    </div>

</template>

<style scoped lang="scss">
.settings {
  position: absolute;
  right: 2rem;
  top: 2rem;
}
</style>