<script setup>
import { ref, onMounted } from "vue";
import AdminNavigation from '@/widgets/AdminNavigation.vue';
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

const categories = ref([]);
const newCategory = ref("");
const errorMessage = ref("");

const editingCategory = ref(null);
const editedCategoryName = ref("");


const fetchCategories = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/categories");
    categories.value = response.data;
  } catch (error) {
    errorMessage.value = "Ошибка загрузки категорий";
  }
};

const addCategory = async () => {
  try {
    await axios.post("http://localhost:3000/api/categories", {
      name: newCategory.value,
    });
    newCategory.value = "";
    fetchCategories();
  } catch (error) {
    errorMessage.value = "Ошибка добавления категории";
  }
};

const startEditing = (category) => {
  editingCategory.value = category.id;
  editedCategoryName.value = category.name;
};

const cancelEditing = () => {
  editingCategory.value = null;
  editedCategoryName.value = "";
};

const updateCategory = async (id) => {
  try {
    await axios.put(`http://localhost:3000/api/categories/${id}`, {
      name: editedCategoryName.value,
    });
    cancelEditing();
    fetchCategories();
  } catch (error) {
    errorMessage.value = "Ошибка обновления категории";
  }
};

const deleteCategory = async (id) => {
  if (!confirm("Вы уверены, что хотите удалить категорию?")) return;

  try {
    await axios.delete(`http://localhost:3000/api/categories/${id}`);
    fetchCategories();
  } catch (error) {
    errorMessage.value = "Ошибка удаления категории";
  }
};

onMounted(fetchCategories);
</script>

<template>
  <div class="wrapper">
    <AdminNavigation />
    <div class="admin">
      <h2 class="admin__title">Админ панель</h2>
      <div class="content">
        <input v-model="newCategory" class="content__input" type="text" placeholder="Добавить категорию">
        <button @click="addCategory" class="content__add">Добавить</button>

        <p v-if="errorMessage">{{ errorMessage }}</p>
        
        <div class="categoryes">
          <div class="category" v-for="category in categories" :key="category.id">
            <template v-if="editingCategory === category.id">
              <input style="background-color: #222; color: #ffff; border: none; outline: none;" v-model="editedCategoryName" />
              <button @click="updateCategory(category.id)"><svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 7.6261L2.60619 9.34779C3.49194 10.2972 3.93481 10.772 4.43113 10.9218C4.86704 11.0534 5.33047 11.0181 5.74589 10.8217C6.21888 10.598 6.59854 10.0606 7.35787 8.98586L13 1" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg></button>
              <button @click="cancelEditing"><svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L8.5 11M1 11L8.5 1" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg></button>
            </template>
            <template v-else>
              <div class="category-count">
                <span class="category-count__number">{{ category.id }}</span>
                <p class="category-count__category">{{ category.name }}</p>
            </div>
              <div class="category-icons">
                <button  @click="startEditing(category)">
                  <img src="@/assets/images/icons/edit.svg" alt="Редактировать категорию" />
                </button>
                <button @click="deleteCategory(category.id)">
                  <img src="@/assets/images/icons/delit.svg" alt="Удалить категорию" />
                </button>
              </div>
            </template>
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