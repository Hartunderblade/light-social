<script setup>
import { ref, onMounted, defineProps, defineEmits } from "vue";
const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};
</script>

<template>
    <button style="position: absolute; right: 1.8rem; top: 1.8rem;" class="content" @click="openModal">
        <img class="content__settings" src="@/assets/images/icons/settings.svg">
    </button>
</template>

