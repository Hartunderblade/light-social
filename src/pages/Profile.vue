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
        <img class="avatar" src="@/assets/images/defolt-img.jpg" alt="Аватар">
        <div class="name">
          <p class="name__full">имя</p>
          <p class="name__login">@имя</p>
        </div>
        <div class="categories">
          <p class="category">категория</p>
        </div>
        <button class="setting">
          <img src="@/assets/images/icons/settings.svg">
        </button>
      </div>
      <div class="right">
        <button class="add">
          <svg width="46" height="45" viewBox="0 0 46 45" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.0001 3.38776L23.0001 41.6124M3.88761 22.5001L42.1123 22.5001" stroke="#327CE2" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <p>Добавить пост</p>
        </button>
      </div>
    </div>
    <CreatePost />
<!--    <CreatePost-->
<!--        :isOpen="isCreatePostOpen"-->
<!--        :categories="categories"-->
<!--        :user="user"-->
<!--        @close="isCreatePostOpen = false"-->
<!--        @save="addPost"-->
<!--    />-->

    <!--   <EditPost
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
</div>
    
  
  </div>
  
</template>

<style scoped lang="scss">

.profile {
  margin-top: 5rem;
}

.blocks {
  display: flex;
  //flex-wrap: wrap;
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
    position: relative;
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
    position: absolute;
    right: 1rem;
    top: 1rem;
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
