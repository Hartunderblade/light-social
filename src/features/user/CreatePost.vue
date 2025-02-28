<script setup>
import { ref, onMounted } from "vue";
import { defineProps, defineEmits } from "vue";
import axios from "axios";

defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(["close"]);

const close = () => {
  emit("close");
};

const categories = ref([]);
const selectedCategory = ref("");
const text = ref("");
const imageFile = ref(null);
const imageUrl = ref(null);
const message = ref("");
const errorMessage = ref("");

// Загружаем категории из API
const fetchCategories = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/categories");
    categories.value = response.data;
  } catch (error) {
    console.error("Ошибка загрузки категорий:", error);
  }
};

// Загружаем категории при открытии окна
onMounted(fetchCategories);

// Обработчик загрузки изображения
const handleImageUpload = (event) => {
  const file = event.target.files[0];
  imageFile.value = file;
  imageUrl.value = URL.createObjectURL(file);
};

// Функция сохранения поста
const savePost = async () => {
  try {
    const userId = localStorage.getItem("userId"); // Получаем ID пользователя
    // if (!userId || !selectedCategory.value || !text.value) {
    //   errorMessage.value = "Заполните все поля!";
    //   return;
    // }

    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("category", selectedCategory.value);
    formData.append("text", text.value);
    if (imageFile.value) {
      formData.append("image", imageFile.value);
    }

    await axios.post("http://localhost:3000/api/posts", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    message.value = "Пост успешно создан!";
    errorMessage.value = "";
    text.value = "";
    selectedCategory.value = "";
    imageFile.value = null;
    imageUrl.value = null;

    // Закрываем модальное окно после успешного создания поста
    setTimeout(() => {
      emit("close");
      message.value = "";
    }, 1000);
  } catch (error) {
    console.error("Ошибка при создании поста:", error);
    errorMessage.value = "Ошибка при создании поста";
  }
};
</script>

<template>
    <div v-if="isOpen" class="modal-overlay">
        <div class="modal">
          <h2 class="modal__title">Создание поста</h2>
    
          <div class="category">
            <select v-model="selectedCategory">
              <option disabled value="">Выберите категорию</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.name">
                {{ cat.name }}
              </option>
            </select>
            <p class="category__selected">{{ selectedCategory }}</p>
          </div>
    
          <div style="display: flex; column-gap: 1rem; margin-top: 26px;">
            <textarea class="modal__text" v-model="text" placeholder="Введите текст поста"></textarea>
            <input
              style="border: 2px dashed rgba(255, 255, 255, 0.2); border-radius: 16px; padding: 51px 16px; width: 235px; height: 179px; background: #222;"
              type="file"
              @change="handleImageUpload"
            />
          </div>
    
          <img v-if="imageUrl" :src="imageUrl" alt="Изображение поста" class="preview-img" />
    
          <div class="buttons">
            <button class="buttons__save" @click="savePost">Сохранить</button>
            <button class="buttons__close" @click="close">Отмена</button>
          </div>
    
          <p v-if="message" class="success">{{ message }}</p>
          <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
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

.modal {
    background: #161616;
    padding: 3rem;
    border-radius: 32px;
    width: 1035px;
    display: flex;
    flex-direction: column;

    &__title {
        font-weight: 500;
        font-size: 2rem;
        margin-bottom: 2rem;
    }

    &__text {
        font-weight: 400;
        font-size: 16px;
        color: rgba(255, 255, 255, 0.8);
        background: #222;
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 16px;
        padding: 16px 0 0 32px;
        width: 688px;
        height: 179px;
    }
}

.category {
    select {
        font-weight: 400;
        font-size: 16px;
        color: #e0e0e0;
        border: 1px solid #fff;
        border-radius: 10px;
        padding: 18px 16px;
        width: 370px;
        background: rgba(255, 255, 255, 0.2);

        option {
            color: #1d1d1d;
        }


    }


}

.category__selected {
    font-weight: 500;
    font-size: 14px;
    color: #fff;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid #327ce2;
    border-radius: 18px;
    padding: 6px 16px;
    text-align: center;
    width: 104px;
    margin-top: 1rem;
}

.preview-img {
    max-width: 40%;
    margin-top: 1rem;
}

.buttons {
    display: flex;
    flex-direction: column;
    row-gap: 12px;
    margin-top: 2rem;

    &__save {
        background: #327ce2;
        border-radius: 16px;
        padding: 14px 0;
        width: 940px;
        font-weight: 600;
        font-size: 20px;
        color: #fff;

        &:hover {
            font-weight: 600;
        font-size: 20px;
        color: #fff;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid #327ce2;
        border-radius: 16px;
        padding: 14px 0;
        width: 940px;
        transition: 0.5s;
        }
    }

    &__close {
        font-weight: 600;
        font-size: 20px;
        color: #fff;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid #327ce2;
        border-radius: 16px;
        padding: 14px 0;
        width: 940px;

        &:hover {
            background: #327ce2;
        border-radius: 16px;
        padding: 14px 0;
        width: 940px;
        font-weight: 600;
        font-size: 20px;
        color: #fff;
        transition: 0.5s;
        }
    }
}
</style>