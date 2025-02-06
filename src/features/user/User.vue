<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import axios from "axios";
import Navigation from '@/widgets/UserNavigation.vue';
import { useRouter } from "vue-router";

const router = useRouter();
const user = ref(null);

const fetchProfile = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
      return;
    }

    const res = await axios.get("http://localhost:3000/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });

    user.value = res.data;
  } catch (err) {
    message.value = "Ошибка загрузки профиля";
    localStorage.removeItem("token");
    router.push("/");
  }
};




const logout = () => {
//   localStorage.removeItem("token");
//   localStorage.removeItem("role");
  router.push("/");
};

onMounted(fetchProfile);
</script>

<template>
    <div class="wrapper">
        <Navigation/>
        <div v-if="user" class="exit">
            <img class="avatar" v-if="user.avatar"  :src="'http://localhost:3000' + user.avatar" alt="Аватар">
            <button @click="logout">
                <svg  width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.4958 21H6.5C5.39543 21 4.5 19.8487 4.5 18.4286V5.57143C4.5 4.15127 5.39543 3 6.5 3H13.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M16 15.5L19.5 12L16 8.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M9.5 11.9958H19.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
            
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

    .avatar {
        width: 40px;
        height: 40px;
        border-radius: 100%;
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