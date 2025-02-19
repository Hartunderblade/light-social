<script setup>
import AdminNavigation from '@/widgets/AdminNavigation.vue';

import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const categories = ref([]);
const message = ref("");
</script>

<template>
  <div class="wrapper">
    <AdminNavigation />
    <div class="admin">
      <h2 class="admin__title">Админ панель</h2>
      <div class="content">
        <input class="content__input" type="text" placeholder="Добавить категорию">
        <button class="content__add">Добавить</button>
        <div class="categoryes">
          <div class="category">
            <div class="category-count">
              <span class="category-count__number">1</span>
              <p class="category-count__category">категория</p>
            </div>
            <div class="category-icons">
              <button>
                <img src="@/assets/images/icons/edit.svg" alt="Редактировать категорию" />
              </button>
              <button>
                <img src="@/assets/images/icons/delit.svg" alt="Удалить категорию" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="nav">
      <p>Админ</p>
      <img src="@/assets/images/defolt-img.jpg" alt="">
    </div>
  </div>

</template>

<style scoped lang="scss">
.nav {
  display: flex;
  align-items: center;
  column-gap: 0.4rem;
  position: absolute;
  right: 30px;
  top: 16px;

  p {
    font-size: 1.3rem;
  }

  img {
    width: 2.6rem;
    height: 2.6rem;
    border-radius: 100%;
  }
}

//.page {
//  display: flex;
//  column-gap: 60px;
//}

.admin {
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 32px;
  width: 100%;
  max-width: 1319px;
  height: 412px;
  background-color: #222;
  margin-top: 80px;
  &__title {
    font-weight: 500;
    font-size: 26px;
    line-height: 106%;
    letter-spacing: -0.01em;
    margin-bottom: 3rem;
  }
}

.content {
  &__input {
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 16px;
    padding: 28px 0 28px 22px;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.1);
    color: #ffff;

    &::placeholder {
      font-weight: 400;
      font-size: 18px;
      line-height: 91%;
      letter-spacing: -0.01em;
      color: rgba(255, 255, 255, 0.7);
    }
  }

  &__add {
    font-weight: 500;
    font-size: 15px;
    line-height: 133%;
    letter-spacing: -0.02em; background: rgba(255, 255, 255, 0.1); text-align: center; border: 1px solid #327ce2;
    border-radius: 8px;
    padding: 16px 26px;
    margin-top: 1rem;
    width: 100%;
  }
}

.categoryes {
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
  margin-top: 2rem;
}

.category {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #a5a9b5;
  padding: 0px 0px 16px 0px;

  &-count {
    display: flex;
    align-items: center;
    column-gap: 324px;

    &__number {
      font-weight: 400;
      font-size: 18px;
      line-height: 111%;
      letter-spacing: -0.01em;
      color: rgba(255, 255, 255, 0.4);
    }

    &__category {
      font-weight: 500;
      font-size: 32px;
      line-height: 62%;
      letter-spacing: -0.01em;
    }
  }

  &-icons {
    display: flex;
    align-items: center;
    column-gap: 1rem;

    button {
      width: 3rem;
      height: 3rem;
      border-radius: 100px;
      background-color: #191919;
    }
  }
}


@media (max-width: 320px) {
  .nav {
    display: flex;
    align-items: center;
    column-gap: 0.4rem;
    position: absolute;
    right: 12px;
    top: 16px;

    p {
      font-size: 1rem;
    }

    img {
      width: 2rem;
      height: 2rem;
    }
  }
  .admin {
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    padding: 12px;
    min-width: 296px;
    height: 100%;
    width: 100%;
    margin-top: 82px;

    &__title {
      font-size: 20px;
      margin-bottom: 2rem;
    }
  }

  .content {
    &__input {
      padding:12px;
      font-size: 14px;

      &::placeholder {
        font-size: 12px;
      }
    }

    &__add {
      font-weight: 500;
      font-size: 14px;
      padding: 12px;
    }
  }

  .categoryes {
    row-gap: 1rem;
  }

  .category {
    padding: 0px 0px 8px 0px;

    &-count {
      display: flex;
      align-items: center;
      column-gap: 60px;

      &__number {
        font-size: 12px;
      }

      &__category {
        font-size: 18px;
      }
    }

    &-icons {
      display: flex;
      align-items: center;
      column-gap: 1rem;

      button {
        width: 18px;
        height: 18px;
        border-radius: 0;
        background-color: rgba(25, 25, 25, 0);

        img {
          width: 18px;
          height: 18px;
        }
      }
    }
  }

}

</style>