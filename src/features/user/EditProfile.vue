.vue
vue
Копировать
Редактировать
<template>
  <div v-if="isOpen" class="modal-overlay">
    <div class="modal">
      <h2>Редактировать профиль</h2>

      <label>Имя:</label>
      <input v-model="updatedName" type="text" placeholder="Введите имя">

      <label>Логин:</label>
      <input v-model="updatedLogin" type="text" placeholder="Введите новый логин">

      <label>Изменить пароль:</label>
      <input v-model="updatedPassword" type="password" placeholder="Введите новый пароль">

      <label>Добавить категорию:</label>
      <select v-model="selectedCategory">
        <option v-for="category in categories" :key="category.id" :value="category.name">
          {{ category.name }}
        </option>
      </select>
      <button @click="addCategory">Добавить категорию</button>

      <div class="selected-categories">
        <span v-for="(category, index) in updatedCategories" :key="index" class="category-tag">
          {{ category }}
          <button @click="removeCategory(index)">x</button>
        </span>
      </div>

      <div class="buttons">
        <button @click="saveProfile">Сохранить</button>
        <button @click="closeModal">Отмена</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from "vue";

const props = defineProps({
  isOpen: Boolean,
  user: Object,
  categories: Array,
});

const emits = defineEmits(["close", "update"]);

const updatedName = ref("");
const updatedLogin = ref("");
const updatedPassword = ref("");
const selectedCategory = ref("");
const updatedCategories = ref([]);

watch(
  () => props.user,
  (newUser) => {
    if (newUser) {
      updatedName.value = newUser.name;
      updatedLogin.value = newUser.login;
      updatedCategories.value = [...newUser.categories];
    }
  },
  { deep: true, immediate: true }
);

const addCategory = () => {
  if (selectedCategory.value && !updatedCategories.value.includes(selectedCategory.value)) {
    updatedCategories.value.push(selectedCategory.value);
    selectedCategory.value = "";
  }
};

const removeCategory = (index) => {
  updatedCategories.value.splice(index, 1);
};

const saveProfile = () => {
  const updatedUser = {
    ...props.user,
    name: updatedName.value,
    login: updatedLogin.value,
    password: updatedPassword.value || props.user.password,
    categories: updatedCategories.value,
  };

  emits("update", updatedUser);
  closeModal();
};

const closeModal = () => {
  emits("close");
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  display: flex;
  flex-direction: column;
}

input, select {
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
}

.buttons {
  display: flex;
  justify-content: space-between;
}

button {
  padding: 10px;
  cursor: pointer;
}

.selected-categories {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.category-tag {
  background: #ddd;
  padding: 5px;
  border-radius: 4px;
}

.category-tag button {
  margin-left: 5px;
  background: red;
  color: white;
  border: none;
  cursor: pointer;
}
</style>