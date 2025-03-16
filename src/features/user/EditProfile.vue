<script setup>
import { ref, onMounted } from "vue";
import { defineProps, defineEmits } from "vue";
import axios from "axios";

defineProps({
  isOpen: Boolean,
});

// const emit = defineEmits(["close"]);

const close = () => {
  emit("close");
};

</script>

<template>
  <div v-if="isOpen" class="modal-overlay">
    <div class="modal-content">
      <h2>Редактировать профиль</h2>
      <div>
        <input class="modal-content__file" type="file" />
        <!-- <img class="preview-avatar" :src="avatarPreview" v-if="avatarPreview" /> -->
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
      <button @click="close">Закрыть</button>
      <button @click="deleteProfile">Удалить профиль</button>

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
  right: 0;
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1;
}

.modal-content {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  z-index: 5;
  border-radius: 32px;
    padding: 1rem;
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


@media (max-width: 320px) {
}
</style>