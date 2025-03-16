<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import FrendsList from '@/features/user/FrendsList.vue';
import SearchUsers from '@/features/user/SearchUsers.vue';
</script>

<template>
  <div style="width: 100%; display:flex; column-gap: 2rem; margin-top: 3rem;">
    <!-- <UsersList/> -->
    <FrendsList/>
    <SearchUsers/>
  </div>
</template>

<style scoped lang="scss">
</style>
