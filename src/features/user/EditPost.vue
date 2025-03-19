<script setup>
import { ref, defineProps, defineEmits, onMounted } from "vue";
import axios from "axios";

const props = defineProps({
  post: Object
});

const emit = defineEmits(["close", "updated"]);

const updatedText = ref(props.post.content);
const updatedTitle = ref(props.post.title);
const updatedCategory = ref(props.post.category_id);
const imageUrl = ref(props.post.image);
const categories = ref([]);

const fetchCategories = async () => {
  try {
    const response = await axios.get("http://localhost:3000/posts/categories");
    categories.value = response.data;
  } catch (error) {
    console.error("Ошибка загрузки категорий:", error);
  }
};

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    imageUrl.value = URL.createObjectURL(file);
  }
};

const updatePost = async () => {
  try {
    const token = localStorage.getItem("token");

    const updatedPost = {
      id: props.post.id,
      title: updatedTitle.value,
      content: updatedText.value,
      category_id: updatedCategory.value,
      image: imageUrl.value
    };

    await axios.put(`http://localhost:3000/posts/${props.post.id}`, updatedPost, {
      headers: { Authorization: `Bearer ${token}` },
    });

    emit("updated", updatedPost);
  } catch (error) {
    console.error("Ошибка при обновлении поста:", error);
    alert("Не удалось обновить пост");
  }
};

onMounted(fetchCategories);
</script>

<template>
  <div class="modal-overlay">
    <div class="modal">
      <h2>Редактировать пост</h2>

      <div style="display: flex; column-gap: 1rem; margin-top: 26px;">
        <textarea style="font-weight: 400; font-size: 16px; color: rgba(255, 255, 255, 0.8); background: #222;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 16px;
    padding: 16px 0 0 32px;
    width: 688px;
    height: 179px;"  class="modal__text" v-model="updatedText" placeholder="Введите текст поста"></textarea>
        <input style="border: 2px dashed rgba(255, 255, 255, 0.2); border-radius: 16px; padding: 51px 16px; width: 235px; height: 179px; background: #222;" type="file" placeholder="Ссылка на изображение (необязательно)" @change="handleImageUpload" />
      </div>


      <select v-model="updatedCategory">
        <option v-for="category in categories" :key="category.id" :value="category.id">
          {{ category.name }}
        </option>
      </select>

<!--      <label>Обновить изображение:</label>-->
<!--      <input style="border: 2px dashed rgba(255, 255, 255, 0.2); border-radius: 16px; padding: 51px 16px; width: 235px; height: 179px; background: #222;" type="file" placeholder="Ссылка на изображение (необязательно)" @change="handleImageUpload" />-->
<!--      <input style="border: 2px dashed rgba(255, 255, 255, 0.2); border-radius: 16px; padding: 51px 16px; width: 235px; height: 179px; background: #222;" v-model="image" placeholder="Ссылка на изображение (необязательно)" />-->
      <img style="border-radius: 16px; max-width: 688px;" v-if="imageUrl" :src="imageUrl" alt="Новое изображение" class="preview-img">

      <div class="buttons">
        <button style="background: #327ce2; border-radius: 16px; padding: 14px 0; font-weight: 500; font-size: 20px;" @click="updatePost">Сохранить</button>
        <button style="font-weight: 500; font-size: 20px; color: #fff; border: 1px solid #327ce2; border-radius: 16px; padding: 14px 0; background: rgba(255, 255, 255, 0.1);" @click="$emit('close')">Закрыть</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  background: #161616;
  border-radius: 32px;
  max-width: 1035px;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 2rem;
}


  select {
    font-weight: 400;
    font-size: 16px;
    color: #e0e0e0;
    border: 1px solid #fff;
    border-radius: 10px;
    padding: 18px 16px;
    width: 370px;
    background: rgba(255, 255, 255, 0.2);
    margin-top: 1rem;
    margin-bottom: 1rem;

    option {
      color: #1d1d1d;
    }


  }


.preview-img {
  max-width: 100%;
  margin-top: 10px;
}

.buttons {
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
}

button {
  padding: 10px;
  cursor: pointer;
}
</style>
