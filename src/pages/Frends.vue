<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import FrendsList from '@/features/user/FrendsList.vue';
import SearchUsers from '@/features/user/SearchUsers.vue';
</script>

<template>
  <div>
    <!-- <UsersList/> -->
    <!-- <FrendsList/> -->
    <SearchUsers/>
  </div>
</template>

<style scoped lang="scss">
</style>
