<script setup>
import { ref, onMounted, defineProps, defineEmits } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import EditProfile from "@/features/user/EditProfile.vue";
import SettingsUser from "@/widgets/SettingsUser.vue";
import AddPost from "@/widgets/AddPost.vue";
import ListPostsUser from "@/widgets/ListPostsUser.vue";

const router = useRouter();
const user = ref(null);
const errorMessage = ref("");

const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const fetchUserData = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const response = await axios.get("http://localhost:3000/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });

    user.value = response.data;
  } catch (error) {
    errorMessage.value = "Ошибка загрузки данных профиля";
  }
};

onMounted(fetchUserData);
</script>

<template>
  <div v-if="user" class="profile">
    <div class="blocks">
      <div style="position:relative;" class="left">
        <img :src="user.avatar" alt="Аватар" v-if="user.avatar" class="avatar" >
        <div class="name">
          <p class="name__full">{{ user.full_name }}</p>
          <p class="name__login">@{{ user.login }}</p>
        </div>
        <div class="categories">
          <p class="category">{{ user.category }}</p>
        </div>
        <SettingsUser @click="openModal"/>
        <EditProfile :isOpen="isModalOpen" @close="closeModal"/>
      </div>
      <div class="right">
        <AddPost/>
      </div>
    </div>
    
<div>
  
  <div  class="post">
      <div class="user" >
          <img class="user__avatar" src="@/assets/images/defolt-img.jpg" alt="Аватар">
          <div class="user-info">
              <p class="user-info__name">Имя</p>
              <div style="width: 100px;" class="user-info__category">Категория</div>
          </div>
          <button class="user__redactor">
              <img src="@/assets/images/icons/edit.svg" alt="Редактировать пост" />
          </button>
      </div>
      <div>
        <div class="post-content">
          <p class="post-content__text">еукст</p>
          <img class="post-content__img" src=""
              alt="Теннисные ракетки на корте">
      </div>
      </div>
  </div>
  <ListPostsUser/>
</div>
</div>
</template>

<style scoped lang="scss">

.profile {
  margin-top: 5rem;
}

.blocks {
  display: flex;
  column-gap: 1rem;
}

.avatar {
  border-radius: 100%;
  width: 100px;
  height: 100px;
  margin-right: 1rem;
}
.left {
  border: 1px solid rgba(255, 255, 255, 0.2);
border-radius: 16px;
padding: 2rem 2rem;
width: 1105px;
display: flex;
align-items: center;
background: #222;
position: relative;
}

.name {
  &__full {
    font-weight: 500;
    font-size: 26px;
  }

  &__login {
    font-weight: 400;
    font-size: 16px;
  }
}

.categories {
  margin-left: 3rem;
  display: flex;
  align-items: center;
  column-gap: 1.2rem;
}

.category {
  font-weight: 400;
color: #327ce2;
border: 1px solid #327ce2;
border-radius: 18px;
padding: 4px 16px;
}

.setting {
  position: absolute;
  right: 2rem;
  top: 2rem;
}

.user {
display: flex;
align-items: center;
margin-bottom: 2rem;
position: relative;
  &__avatar {
      border-radius: 100%;
  }

  &-info {
    margin-left: 1rem;
      &__name {
        font-weight: 500;
        font-size: 29px;
          margin-bottom: 6px;
      }

      &__category {
        font-weight: 400;
        font-size: 14px;
        color: #327ce2;
        border: 1px solid #327ce2;
        border-radius: 18px;
        padding: 5px 16px;
        width: 78px;
      }
  }

  &__redactor {
    position: absolute;
    right: 0;
    top: 0;
  }
}

.post {
  border: 1px solid rgba(255, 255, 255, 0.1);
border-radius: 24px;
padding: 47px 23px;
width: 1319px;
background: #222;
margin-top: 2rem;
  &-content {
      &__text {
          font-weight: 400;
          font-size: 21px;
          line-height: 138%;
          letter-spacing: -0.02em;
          max-width: 1256px;
          margin-bottom: 22px;
      }

      &__img {
          width: 1256px;
          height: 721px;
          border-radius: 12px;
      }
  }
}


.post-img {
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 8px;
  margin-top: 10px;
}

@media (max-width: 320px) {
  .blocks {
    display: block;
  }

  .avatar {
    border-radius: 100%;
    width: 60px;
    height: 60px;
    margin-right: 0;
  }

  .left {
    padding: 12px 0;
    max-width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: inherit;
    text-align: center;
    margin-bottom: 0.4rem;
  }
  .name {
    &__full {
      font-size: 1.1rem;
    }

    &__login {
      font-weight: 400;
      font-size: 1rem;
    }
  }

  .categories {
    margin-left: 0;
    display: flex;
    align-items: center;
    column-gap: 0.8rem;
  }

  .category {
    font-weight: 400;
    font-size: 14px;
    color: #327ce2;
    border: 1px solid #327ce2;
    border-radius: 18px;
    padding: 4px 10px;
    margin-top: 0.4rem;
  }

  .setting {
    display: block;
  }

  .add {
    padding: 1rem;
    width: 300px;
    height: 88px;
    text-align: center;

    svg {
      width: 2rem;
      height: 2rem;
    }

    p {
      font-weight: 400;
      font-size: 14px;
      margin-top: 0.2rem;
    }
  }

  .post {
    border-radius: 1rem;
    padding: 1rem;
    width: 300px;
    background: #222;
    margin-top: 2rem;
    &-content {
      &__text {
        font-size: 18px;
        line-height: 138%;
        letter-spacing: -0.02em;
        max-width: 273px;
        margin-bottom: 1rem;
      }

      &__img {
        width: 273px;
        height: 272px;
        border-radius: 6px;
      }
    }
  }

  .user {
    display: flex;
    align-items: center;
    margin-bottom: 1.4rem;
    position: relative;
    &__avatar {
      width: 3rem;
      height: 3rem;
    }

    &-info {
      margin-left: 0.8rem;
      &__name {
        font-weight: 500;
        font-size: 1rem;
        margin-bottom: 6px;
      }
    }

    &__redactor {
      position: absolute;
      right: 0;
      top: 0;

      img {
        width: 1.4rem;
        height: 1.4rem;
      }
    }
  }
}

</style>
