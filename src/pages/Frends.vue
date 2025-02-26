<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import UsersList from '@/features/user/UsersList.vue';
import SearchUsers from '@/features/user/SearchUsers.vue';
</script>

<template>
  <div>
    <!-- <UsersList/> -->
    <SearchUsers/>
  </div>
</template>

<style scoped lang="scss">
</style>
