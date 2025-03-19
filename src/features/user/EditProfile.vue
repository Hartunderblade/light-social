<script setup>
import { ref, defineProps, defineEmits, onMounted } from "vue";
import axios from "axios";

const props = defineProps({ isOpen: Boolean, user: Object });
const emit = defineEmits(["close", "update"]);

const name = ref(props.user?.name || "");
const login = ref(props.user?.login || "");
const selectedCategory = ref(props.user?.category || "");
const newPassword = ref("");
const avatar = ref(null);
const message = ref("");
const errorMessage = ref("");
const categories = ref([]);

const close = () => emit("close");

// Получаем список категорий
const fetchCategories = async () => {
  try {
    const response = await axios.get("http://localhost:3000/categories/");
    categories.value = response.data;
  } catch (error) {
    console.error("Ошибка при загрузке категорий:", error);
  }
};

// Обновление профиля
const updateProfile = async () => {
  try {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("name", name.value);
    formData.append("login", login.value);
    formData.append("category", selectedCategory.value);
    if (newPassword.value) formData.append("password", newPassword.value);
    if (avatar.value) formData.append("avatar", avatar.value);

    await axios.put("http://localhost:3000/users/update", formData, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
    });

    message.value = "Профиль успешно обновлен!";
    emit("update");
    setTimeout(() => close(), 1500);
  } catch (error) {
    errorMessage.value = "Ошибка при обновлении профиля";
    console.error(error);
  }
};

// Удаление профиля
const deleteProfile = async () => {
  if (!confirm("Вы уверены, что хотите удалить аккаунт? Это действие необратимо!")) return;
  try {
    const token = localStorage.getItem("token");
    await axios.delete("http://localhost:3000/users/delete", {
      headers: { Authorization: `Bearer ${token}` },
    });

    alert("Профиль удален");
    localStorage.removeItem("token");
    window.location.href = "/login";
  } catch (error) {
    errorMessage.value = "Ошибка при удалении профиля";
    console.error(error);
  }
};

// Обработка загрузки аватара
const handleAvatarUpload = (event) => {
  avatar.value = event.target.files[0];
};

onMounted(fetchCategories);
</script>

<template>
  <div v-if="isOpen" class="modal-overlay">
    <div class="modal-content">
      <h2 style="font-weight: 700;
font-size: 18px;
line-height: 133%;
letter-spacing: -0.02em;
text-align: center;
color: #fff; border: 1px solid rgba(255, 255, 255, 0.1);
border-radius: 16px; background: #222; padding: 1.4rem 0; margin-bottom: 1rem;">Редактировать профиль</h2>
      <div style="padding: 1.4rem 1.4rem; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; background: #222; display: flex; flex-direction: column; align-items: center;">
        <div style="margin-bottom: 1rem;">
          <input class="avatar" type="file" @change="handleAvatarUpload"/>
        </div>
        <div style="display: flex; flex-direction: column; row-gap: 1rem; width: 100%;">
          <label>Редактировать имя</label>
          <input v-model="name" style="font-weight: 400; font-size: 1.2rem; line-height: 91%; letter-spacing: -0.01em; border: 1px solid #fff; border-radius: 10px; padding: 18px 16px; background: rgba(255, 255, 255, 0.1); width: 100%; color: white;" type="text" placeholder="Имя"/>
        </div>

        <div style="width: 100%; margin-top: 1rem; margin-bottom: 1rem;">
          <select v-model="selectedCategory" class="auth__input">
            <option disabled value="">Выберите категорию</option>
            <option v-for="category in categories" :key="category.id" :value="category.name">
              {{ category.name }}
            </option>
          </select>
        </div>


        <div style="display: flex; flex-direction: column; row-gap: 1rem; width: 100%">
          <label>Изменить пароль</label>
          <input v-model="newPassword" style="color: white; border: 1px solid #fff; border-radius: 10px; padding: 18px 16px; width: 100%; background: rgba(255, 255, 255, 0.1);" placeholder="Ный пароль" type="password"/>
        </div>
        <div style="width: 100%; display: flex; flex-direction: column; row-gap: 1rem; margin-top: 1rem;">
          <label>Изменить логин</label>
          <input v-model="login" style="color: white; width: 100%;; border: 1px solid #fff; border-radius: 10px; padding: 18px 16px; background: rgba(255, 255, 255, 0.1);" placeholder="Новый логин" type="text"/>
        </div>
        <div style="display: flex; flex-direction: column; row-gap: 1rem; width: 100%;">
          <button @click="updateProfile" class="save">Сохранить</button>
          <button @click="deleteProfile" class="delete">Удалить профиль</button>
        </div>


        <p v-if="message" class="success">{{ message }}</p>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      </div>

    </div>
  </div>
</template>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.modal-content {
  background: #161616;
  padding: 3rem;
  border-radius: 32px;
  max-width: 800px;
  width: 100%;
  //display: flex;
  //flex-direction: column;
}

.save {
  font-weight: 600; font-size: 15px; line-height: 133%; letter-spacing: -0.02em; color: #fff; background: #327ce2; border-radius: 8px; padding: 10px 16px; margin-top: 1.6rem; width: 100%;
}

.delete {
  font-weight: 600; font-size: 15px; line-height: 133%; letter-spacing: -0.02em; color: #fff; background: rgba(255, 255, 255, 0.1); border: 1px solid #327ce2; border-radius: 8px; padding: 10px 16px; width: 100%;
}

select {
  font-weight: 400;
  font-size: 16px;
  color: #2e2e2e;
  border: 1px solid #fff;
  border-radius: 10px;
  padding: 18px 16px;
  width: 100%;
  background: rgba(255, 255, 255, 0.2);

  option {
    color: #1d1d1d;
  }


}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 100%;
  background-color: #327ce2;
}

@media (max-width: 320px) {
}
</style>