<script setup>
import AdminNavigation from '@/widgets/AdminNavigation.vue';

import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const categories = ref([]);
const newCategory = ref("");
const message = ref("");

const fetchCategories = async () => {
  try {
    const res = await axios.get("http://localhost:3000/categories");
    categories.value = res.data;
  } catch (err) {
    message.value = "Ошибка загрузки категорий";
  }
};

const addCategory = async () => {
  if (!newCategory.value.trim()) return;
  try {
    await axios.post("http://localhost:3000/categories", { name: newCategory.value }, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    newCategory.value = "";
    fetchCategories();
  } catch (err) {
    message.value = "Ошибка при добавлении категории";
  }
};

const updateCategory = async (id, name) => {
  const newName = prompt("Новое название категории:", name);
  if (!newName || newName.trim() === name) return;
  try {
    await axios.put(`http://localhost:3000/categories/${id}`, { name: newName }, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    fetchCategories();
  } catch (err) {
    message.value = "Ошибка при редактировании категории";
  }
};

const deleteCategory = async (id) => {
  if (!confirm("Вы уверены, что хотите удалить категорию?")) return;
  try {
    await axios.delete(`http://localhost:3000/categories/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    fetchCategories();
  } catch (err) {
    message.value = "Ошибка при удалении категории";
  }
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  router.push("/");
};

onMounted(fetchCategories);
</script>

<template>
  <div class="wrapper">
    <AdminNavigation/>
  <div class="admin">
    <h2 class="admin__title">Админ панель</h2>
    <div class="content">
      <input v-model="newCategory" class="content__input" type="text" placeholder="Добавить категорию">
      <button style="font-weight: 500;
font-size: 15px;
line-height: 133%;
letter-spacing: -0.02em; background: rgba(255, 255, 255, 0.1); text-align: center; border: 1px solid #327ce2;
border-radius: 8px;
padding: 16px 26px;
margin-top: 1rem;
width: 100%;" @click="addCategory">Добавить</button>
      <div class="categoryes" v-for="category in categories" :key="category.id">
        <div class="category">
          <div class="category-count">
            <span class="category-count__number">{{ category.id }}</span>
            <p class="category-count__category">{{ category.name }}</p>
          </div>
          <div class="category-icons">
            <button @click="() => updateCategory(category.id, category.name)">
              <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="49.9997" height="50.0001" rx="24.9999" fill="#191919" />
                <path d="M35.6094 19.2284L30.7715 14.3905L13.7821 31.3798L18.62 36.2178L35.6094 19.2284Z" stroke="white" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M16.1793 33.8208L18.5928 36.2335L15.2961 37.1168L12 38.0001L12.8833 34.704L13.7665 31.4073L16.1793 33.8208Z" stroke="white" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M38 16.8379L33.1621 12L30.7708 14.3913L35.6087 19.2292L38 16.8379Z" stroke="white" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
          </button>
          <button @click="() => deleteCategory(category.id)">
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect y="3.05176e-05" width="50" height="50" rx="25" fill="#191919" />
              <path d="M14.998 19.4285L16.998 38.0001H32.998L34.998 19.4285" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M27.623 30.6877V22.5627" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M22.373 30.6877V22.5627" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M12 15.7144H20M20 15.7144L20.6686 13.231C20.8634 12.5075 21.5633 12.0001 22.3664 12.0001H27.6336C28.4367 12.0001 29.1366 12.5075 29.3314 13.231L30 15.7144M20 15.7144H30M30 15.7144H38" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
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

.page {
  display: flex;
  column-gap: 60px;
}

.admin {
  background-color: #222;
  border: 1px solid rgba(255, 255, 255, 0.1);
border-radius: 1rem;
padding: 2rem;
width: 1319px;
//margin-top: 88px;
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
    }
  }
}
</style>