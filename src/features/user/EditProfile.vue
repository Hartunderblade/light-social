<script setup>
import { ref, defineProps, defineEmits, onMounted } from "vue";
import axios from "axios";

const props = defineProps(["isOpen"]);
const emit = defineEmits(["close"]);

const fullName = ref("");
const login = ref("");
const category = ref("");
const password = ref("");
const fileAvatar = ref(null);
const avatarPreview = ref("");
const categories = ref([]);
const user = ref(null);
const errorMessage = ref("");
const message = ref("");


// Получение данных пользователя
const fetchUserData = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:3000/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });

    user.value = response.data;
    fullName.value = user.value.full_name;
    login.value = user.value.login;
    category.value = user.value.category;
    avatarPreview.value = user.value.avatar;
  } catch (error) {
    errorMessage.value = "Ошибка загрузки данных профиля";
  }
};

// Получение списка категорий
const fetchCategories = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/categories");
    categories.value = response.data;
  } catch (error) {
    errorMessage.value = "Ошибка загрузки категорий";
  }
};

// Обработчик загрузки аватара
const handleFileChange = (event) => {
  fileAvatar.value = event.target.files[0];
  if (fileAvatar.value) {
    const reader = new FileReader();
    reader.onload = (e) => {
      avatarPreview.value = e.target.result;
    };
    reader.readAsDataURL(fileAvatar.value);
  }
};

// Обновление профиля
const updateProfile = async () => {
  const formData = new FormData();
  formData.append("fullName", fullName.value);
  formData.append("login", login.value);
  formData.append("category", category.value);
  if (fileAvatar.value) {
    formData.append("fileAvatar", fileAvatar.value);
  }
  if (password.value) {
    formData.append("password", password.value);
  }

  try {
    const token = localStorage.getItem("token");
    const response = await axios.put("http://localhost:3000/profile", formData, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
    });

    message.value = "Профиль успешно обновлён!";
    user.value = response.data.user;
  } catch (error) {
    errorMessage.value = "Ошибка при обновлении профиля";
  }
};

// Удаление профиля
const deleteProfile = async () => {
  try {
    const token = localStorage.getItem("token");
    await axios.delete("http://localhost:3000/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });

    localStorage.removeItem("token");
    emit("close");
  } catch (error) {
    errorMessage.value = "Ошибка при удалении профиля";
  }
};

// Закрытие модального окна
const closeModal = () => {
  emit("close");
};

// Загружаем данные при открытии модального окна
onMounted(() => {
  fetchCategories();
  fetchUserData();
});
</script>

<template>
  <div v-if="isOpen" class="modal">
    <div class="modal-content">
      <h2>Редактировать профиль</h2>
      <div>
        <input class="modal-content__file" type="file" @change="handleFileChange" />
        <img class="preview-avatar" :src="avatarPreview" v-if="avatarPreview" />
      </div>
      <div>
        <label>Редактировать имя</label>
        <input v-model="fullName" type="text" placeholder="Имя" />
      </div>
      
      <div>
        <select v-model="category" class="auth__input" required>
          <option disabled value="">Выберите категорию</option>
          <option v-for="cat in categories" :key="cat.id" :value="cat.name">
            {{ cat.name }}
          </option>
        </select>
        
      </div>
      <div>
        <label>Изменить пароль</label>
        <input v-model="password" type="password" />
      </div>
      <div>
        <label>Изменить логин</label>
        <input v-model="login" type="text" />
      </div>
      <button @click="updateProfile">Сохранить</button>
      <button @click="closeModal">Закрыть</button>
      <button @click="deleteProfile">Удалить профиль</button>

      <p v-if="message" class="success">{{ message }}</p>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 5;

  &-content {
    border-radius: 32px;
    padding: 1rem;
    width: 100%;
    max-width: 761px;
    background-color: #161616;
    text-align: center;

    h2 {
      font-weight: 700;
      line-height: 133%;
      letter-spacing: -0.02em;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      max-width: 546px;
      text-align: center;
      padding: 20px 0;
    }

    &__file {
      width: 100px;
    height: 100px;
    background-color: #327ce2;
    border-radius: 100%;
    margin-left: 200px;
    margin-bottom: 1rem;
    }
  }
}

input {
  width: 504px;
        margin: 10px 0;
        background: #333;
        color: #fff;
        border: 1px solid #fff;
        border-radius: 14px;
        padding: 24px 0 24px 21px;
        font-size: 18px;
}
</style>