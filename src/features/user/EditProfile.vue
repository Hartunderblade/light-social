<template>
  <div class="modal">
    <div class="modal-content">
      <h2>Редактировать профиль</h2>
      <label>Полное имя:</label>
      <input v-model="fullName" type="text" />

      <label>Логин:</label>
      <input v-model="username" type="text" />

      <label>Почта:</label>
      <input v-model="email" type="email" />

      <label>Категории:</label>
      <select v-model="selectedCategories" multiple>
        <option v-for="category in categories" :key="category.id" :value="category.name">
          {{ category.name }}
        </option>
      </select>

      <label>Аватар:</label>
      <input type="file" @change="handleAvatarUpload" />
      <img v-if="previewAvatar" :src="previewAvatar" class="preview-avatar" />

      <button @click="updateProfile">Сохранить</button>
      <button @click="$emit('close')">Отмена</button>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits, onMounted } from "vue";
import axios from "axios";

const emit = defineEmits(["close", "profileUpdated"]);

const fullName = ref("");
const username = ref("");
const email = ref("");
const selectedCategories = ref([]);
const avatar = ref(null);
const previewAvatar = ref("");
const categories = ref([]);

const fetchCategories = async () => {
  try {
    const res = await axios.get("http://localhost:3000/categories");
    categories.value = res.data;
  } catch (error) {
    console.error("Ошибка загрузки категорий", error);
  }
};

const fetchUserProfile = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get("http://localhost:3000/user/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });

    fullName.value = res.data.full_name;
    username.value = res.data.username;
    email.value = res.data.email;
    selectedCategories.value = res.data.categories || [];
    previewAvatar.value = res.data.avatar ? `http://localhost:3000${res.data.avatar}` : "";
  } catch (error) {
    console.error("Ошибка загрузки профиля", error);
  }
};

const handleAvatarUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    avatar.value = file;
    const reader = new FileReader();
    reader.onload = (e) => (previewAvatar.value = e.target.result);
    reader.readAsDataURL(file);
  }
};

const updateProfile = async () => {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("full_name", fullName.value);
  formData.append("username", username.value);
  formData.append("email", email.value);
  formData.append("categories", JSON.stringify(selectedCategories.value));
  if (avatar.value) {
    formData.append("avatar", avatar.value);
  }

  try {
    await axios.put("http://localhost:3000/user/profile", formData, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
    });

    emit("profileUpdated");
    emit("close");
  } catch (error) {
    console.error("Ошибка обновления профиля", error);
  }
};

onMounted(() => {
  fetchCategories();
  fetchUserProfile();
});
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