<script setup>
import { ref, onMounted, defineProps, defineEmits } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import CreatePost from "@/features/user/CreatePost.vue";
import EditPost from "@/features/user/CreatePost.vue";
import EditProfile from "@/features/user/EditProfile.vue";

const router = useRouter();
</script>

<template>
  <div class="profile">
    <div class="blocks">
      <div class="left">
        <img class="avatar" src="" alt="Аватар">
        <div class="name">
          <p class="name__full">имя</p>
          <p class="name__login">@имя</p>
        </div>
        <div class="categories">
          <p class="category">категория</p>
        </div>
        <button @click="isEditProfileOpen = true" class="setting">
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.6838 15C18.6838 12.9653 17.0344 11.3158 14.9996 11.3158C12.9649 11.3158 11.3154 12.9653 11.3154 15C11.3154 17.0347 12.9649 18.6842 14.9996 18.6842C17.0344 18.6842 18.6838 17.0347 18.6838 15Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M11.6294 2.68038C12.486 1.95036 12.9143 1.58535 13.3622 1.3713C14.3979 0.876233 15.6021 0.876233 16.6379 1.3713C17.0857 1.58535 17.514 1.95036 18.3706 2.68038C19.2525 3.43192 20.1487 3.81122 21.3279 3.90531C22.4498 3.99485 23.0108 4.03961 23.4788 4.20492C24.5613 4.58726 25.4127 5.43871 25.7951 6.52119C25.9604 6.9892 26.0052 7.55017 26.0947 8.67211C26.1888 9.85126 26.5681 10.7475 27.3196 11.6294C28.0496 12.486 28.4147 12.9143 28.6287 13.3622C29.1238 14.3979 29.1238 15.6021 28.6287 16.6379C28.4147 17.0857 28.0496 17.514 27.3196 18.3706C26.5524 19.271 26.1869 20.1729 26.0947 21.3279C26.0052 22.4498 25.9604 23.0108 25.7951 23.4788C25.4127 24.5613 24.5613 25.4127 23.4788 25.7951C23.0108 25.9604 22.4498 26.0052 21.3279 26.0947C20.1487 26.1888 19.2525 26.5681 18.3706 27.3196C17.514 28.0496 17.0857 28.4147 16.6379 28.6287C15.6021 29.1238 14.3979 29.1238 13.3622 28.6287C12.9143 28.4147 12.486 28.0496 11.6294 27.3196C10.729 26.5524 9.82713 26.1869 8.67211 26.0947C7.55017 26.0052 6.9892 25.9604 6.52119 25.7951C5.43871 25.4127 4.58726 24.5613 4.20492 23.4788C4.03961 23.0108 3.99485 22.4498 3.90531 21.3279C3.81122 20.1487 3.43192 19.2525 2.68038 18.3706C1.95036 17.514 1.58535 17.0857 1.3713 16.6379C0.876233 15.6021 0.876233 14.3979 1.3713 13.3622C1.58535 12.9143 1.95036 12.486 2.68038 11.6294C3.44763 10.729 3.81314 9.82713 3.90531 8.67211C3.99485 7.55017 4.03961 6.9892 4.20492 6.52119C4.58726 5.43871 5.43871 4.58726 6.52119 4.20492C6.9892 4.03961 7.55017 3.99485 8.67211 3.90531C9.85126 3.81122 10.7475 3.43192 11.6294 2.68038Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>
      <div class="right">
        <button class="add" @click="openCreatePost">
          <svg width="46" height="45" viewBox="0 0 46 45" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.0001 3.38776L23.0001 41.6124M3.88761 22.5001L42.1123 22.5001" stroke="#327CE2" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <p>Добавить пост</p>
        </button>
      </div>
    </div>

    <!-- <CreatePost 
      :isOpen="isCreatePostOpen" 
      :categories="categories"
      :user="user"
      @close="isCreatePostOpen = false"
      @save="addPost"
    />

    <EditPost
      :isOpen="isEditPostOpen"
      :post="editablePost"
      :categories="categories"
      @close="isEditPostOpen = false"
      @update="updatePost"
    /> -->
<div>
  <div  class="post">
      <div class="user" >
          <img class="user__avatar" src="@/assets/images/defolt-img.jpg" alt="Аватар">
          <div class="user__avatar"></div>
          <div class="user-info">
              <p class="user-info__name">Имя</p>
              <div style="width: 100px;" class="user-info__category">Категория</div>
          </div>
          <button class="user__redactor">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24.6094 8.22845L19.7715 3.39053L2.78211 20.3798L7.62004 25.2178L24.6094 8.22845Z" stroke="white" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M5.17933 22.8208L7.59278 25.2335L4.29607 26.1168L1 27.0001L1.88326 23.704L2.76653 20.4073L5.17933 22.8208Z" stroke="white" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M26.9996 5.83792L22.1616 1L19.7703 3.39133L24.6082 8.22925L26.9996 5.83792Z" stroke="white" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
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
</style>
