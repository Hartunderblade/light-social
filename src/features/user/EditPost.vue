<template>
  <div v-if="isOpen" class="modal-overlay">
    <div class="modal">
      <h2>Редактировать пост</h2>

      <textarea v-model="updatedText" placeholder="Введите текст поста"></textarea>

      <label>Выберите категорию:</label>
      <select v-model="updatedCategory">
        <option v-for="category in categories" :key="category.id" :value="category.name">
          {{ category.name }}
        </option>
      </select>

      <label>Обновить изображение:</label>
      <input type="file" @change="handleImageUpload">

      <img v-if="imageUrl" :src="imageUrl" alt="Новое изображение" class="preview-img">
      <img v-else-if="post.imageUrl" :src="post.imageUrl" alt="Старое изображение" class="preview-img">

      <div class="buttons">
        <button @click="updatePost">Сохранить</button>
        <button @click="closeModal">Отмена</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from "vue";

const props = defineProps({
  isOpen: Boolean,
  post: Object,
  categories: Array,
});

const emits = defineEmits(["close", "update"]);

const updatedText = ref("");
const updatedCategory = ref("");
const imageUrl = ref(null);
const imageFile = ref(null);

watch(
  () => props.post,
  (newPost) => {
    if (newPost) {
      updatedText.value = newPost.text;
      updatedCategory.value = newPost.category;
      imageUrl.value = newPost.imageUrl || null;
    }
  },
  { deep: true, immediate: true }
);

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    imageFile.value = file;
    imageUrl.value = URL.createObjectURL(file);
  }
};

const updatePost = () => {
  if (!updatedText.value.trim() || !updatedCategory.value) return;

  const updatedPost = {
    ...props.post,
    text: updatedText.value,
    category: updatedCategory.value,
    image: imageFile.value || null,
    imageUrl: imageUrl.value,
  };

  emits("update", updatedPost);
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

textarea {
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
}

.preview-img {
  max-width: 100%;
  margin-top: 10px;
}

.buttons {
  display: flex;
  justify-content: space-between;
}

button {
  padding: 10px;
  cursor: pointer;
}
</style>
