<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
const isLogin = ref(true);
const isModalOpen = ref(false);

const router = useRouter();

const openModal = (loginMode) => {
    isLogin.value = loginMode;
    isModalOpen.value = true;
};

const closeModal = () => {
    isModalOpen.value = false;
};

////////////////////////////////////


const full_name = ref("");
const username = ref("");
const email = ref("");
const category = ref("");
const categories = ref([]);
const password = ref("");
const consent = ref(false);
const avatar = ref(null);
const message = ref("");

// const categories = ref([
//   { id: 1, name: "Спорт" },
//   { id: 2, name: "Музыка" },
//   { id: 3, name: "Рисование" },
// ]);

const handleFileUpload = (event) => {
  avatar.value = event.target.files[0];
};

const errors = ref({
  full_name: "",
  username: "",
  email: "",
  category: "",
  password: "",
  confirmPassword: "",
  consent: "",
});

// Валидация email
const isValidEmail = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value));

// Валидация пароля (мин. 6 символов, буквы и цифры)
const isValidPassword = computed(() => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password.value));

// Валидация всей формы перед отправкой
const validateForm = () => {
  let valid = true;
  errors.value = {}; // Очистка ошибок перед проверкой

  if (!full_name.value) {
    errors.value.full_name = "Имя обязательно";
    valid = false;
  }

  if (!username.value) {
    errors.value.username = "Логин обязателен";
    valid = false;
  }

  if (!email.value) {
    errors.value.email = "Почта обязательна";
    valid = false;
  } else if (!isValidEmail.value) {
    errors.value.email = "Неверный формат почты";
    valid = false;
  }

  if (!category.value) {
    errors.value.category = "Выберите категорию";
    valid = false;
  }

  if (!password.value) {
    errors.value.password = "Пароль обязателен";
    valid = false;
  } else if (!isValidPassword.value) {
    errors.value.password = "Пароль должен содержать минимум 6 символов, включая буквы и цифры";
    valid = false;
  }

//   if (!confirmPassword.value) {
//     errors.value.confirmPassword = "Подтвердите пароль";
//     valid = false;
//   } else if (confirmPassword.value !== password.value) {
//     errors.value.confirmPassword = "Пароли не совпадают";
//     valid = false;
//   }

  if (!consent.value) {
    errors.value.consent = "Необходимо согласие на обработку данных";
    valid = false;
  }

  return valid;
};


const register = async () => {
    if (!validateForm()) return;
  if (!consent.value) {
    message.value = "Вы должны согласиться с обработкой данных.";
    return;
  }

  const formData = new FormData();
  formData.append("full_name", full_name.value);
  formData.append("username", username.value);
  formData.append("email", email.value);
  formData.append("category", category.value);
  formData.append("password", password.value);
  formData.append("consent", consent.value);
  if (avatar.value) {
    formData.append("avatar", avatar.value);
  }

  try {
    const res = await axios.post("http://localhost:3000/register", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    message.value = res.data.message;
  } catch (err) {
    message.value = err.response?.data?.message || "Ошибка регистрации";
  }
};


const login = async () => {
  try {
    const res = await axios.post("http://localhost:3000/login", {
      username: username.value,
      password: password.value,
    });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.role);

    if (res.data.role === "admin") {
      router.push("/admin");
    } else {
      router.push("/user/profile");
    }
  } catch (err) {
    message.value = err.response?.data?.message || "Ошибка входа";
  }
};

const fetchCategories = async () => {
  try {
    const res = await axios.get("http://localhost:3000/categories");
    categories.value = res.data;
  } catch (err) {
    console.error("Ошибка загрузки категорий");
  }
};

onMounted(fetchCategories);


</script>

<template>
    <div>
        <div class="bc">
            <header v-if="!isModalOpen" class="container">
                <nav>
                    <div>
                        <img class="logo" src="@/assets/images/icons/logo.svg" alt="Light">
                    </div>
                    <div class="buttons">
                        <button class="button logout" @click="openModal(false)">Регистрация</button>
                        <button class="button login" @click="openModal(true)">Вход</button>
                    </div>
                </nav>
                <div class="info">
                    <div class="text">
                        <h1 class="text__title">Здравствуйте!</h1>
                        <p class="text__subtitle">Регистрируйтесь в нашей социальной сети и приглашайте друзей. Делитесь
                            яркими впечатлениями и делайте этот мир ярче</p>
                        <button class="text__button">Зарегистрироваться</button>
                    </div>
                    <div class="point">
                        <img class="point__img" src="@/assets/images/logo-point.png" />
                    </div>
                </div>

            </header>
            <div style="" v-if="isModalOpen" class="modal">
                <div class="auth">
                    <div  class="auth__box">
                        <button class="modal__close" @click="closeModal"><svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M26.0625 2.84931L14.0417 14.8701M14.0417 14.8701L2.02092 26.8909M14.0417 14.8701L2.02081 2.84921M14.0417 14.8701L26.0624 26.8908" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                          </svg></button>
                        <img class="auth__box-logo" src="@/assets/images/icons/logo.svg" alt="Light">
                        <p class="auth__box-subtitle">Социальная сеть</p>
                        <div style="margin: 2.8rem; display: flex; justify-content:space-around;" class="auth__tabs">
                            <button :class="['auth__tab', { 'auth__tab--active': isLogin }]"
                                @click="isLogin = true">Вход</button>
                            <button :class="['auth__tab', { 'auth__tab--active': !isLogin }]"
                                @click="isLogin = false">Регистрация</button>
                        </div>
                        <div v-if="isLogin">
                            <form @submit.prevent="login">
                            <input v-model="username" class="auth__input" type="text" placeholder="Логин" required />
                            <input v-model="password" class="auth__input" type="password" placeholder="Пароль" required />
                            <button class="auth__button">Войти</button>
                            <p class="auth__text">
                                У вас ещё нет аккаунта?
                                <span class="auth__link" @click="isLogin = false">Зарегистрироваться</span>
                            </p>
                        </form>
                        </div>
                        <div v-else>
                            <form @submit.prevent="register">
                                <input class="auth__file" type="file" @change="handleFileUpload" />
                                
                                <input v-model="full_name" class="auth__input" type="text" placeholder="Имя" />
                                <p class="error">{{ errors.full_name }}</p>
                            
                                <input v-model="username" class="auth__input" type="text" placeholder="Логин" />
                                <p class="error">{{ errors.username }}</p>
                            
                                <input v-model="email" class="auth__input" type="email" placeholder="Почта" />
                                <p class="error">{{ errors.email }}</p>
                            
                                <select v-model="category" class="auth__input">
                                  <option disabled value="">Выберите категорию</option>
                                  <option v-for="category in categories" :key="category.id" :value="category.name">
                                    {{ category.name }}
                                  </option>
                                </select>
                                <p class="error">{{ errors.category }}</p>
                            
                                <input v-model="password" class="auth__input" type="password" placeholder="Пароль" />
                                <p class="error">{{ errors.password }}</p>
                            
                                <input v-model="confirmPassword" class="auth__input" type="password" placeholder="Подтвердите пароль" />
                                <p class="error">{{ errors.confirmPassword }}</p>
                            
                                <label class="modal__checkbox">
                                  <input type="checkbox" v-model="consent" />
                                  Согласен на обработку персональных данных
                                </label>
                                <p class="error">{{ errors.consent }}</p>
                            
                                <button type="submit" class="auth__button">Зарегистрироваться</button>
                                <p>{{ message }}</p>
                                <p class="auth__text"> Уже есть аккаунт? <span class="auth__link">Войти</span></p>
                              </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>



    </div>

</template>

<style lang="scss" scoped>
.bc {
    background-image: url(@/assets/images/bc-auth.jpg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
    background: rgba(36, 36, 36, 0.8);
    // position: absolute;
    // left:0;
    // right:0;
}

header {}

nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 0;
}

.modal {
    background: #222;
    border: 1px solid rgba(255, 255, 255, 0.2);
    display: flex;
}

.modal__close {
    position: absolute;
    right: 720px;
}

.buttons {
    display: flex;
    column-gap: 26px;
}

.button {
    font-weight: 500;
    font-size: var(--font-size-text-m-2);
}

.login {
    border: 1px solid #327ce2;
    border-radius: 6px;
    padding: 16px 36px;
    background: rgba(255, 255, 255, 0.1);
}

.login:hover {
    color: var(--color-text);
    transition: 0.5s;
    background: #327ce2;
}

.info {
    display: flex;
    justify-content: space-between;

    .point {
        margin-top: 64px;

        &__img {
            width: 700px;
            height: 700px;
        }
    }
}

.text {
    margin-top: 202px;

    &__title {
        font-weight: 600;
        font-size: 76px;
        letter-spacing: -0.01em;
    }

    &__subtitle {
        font-weight: 300;
        font-size: 22px;
        max-width: 640px;
        margin-top: 1.2rem;
    }

    &__button {
        font-weight: 600;
        font-size: 26px;
        text-align: center;
        background: #2b2b2b;
        border: 1px solid #fff;
        border-radius: 16px;
        padding: 26px 46px;
        margin-top: 46px;
    }
}

.auth__file {
    width: 100px;
    height: 100px;
    background-color: #327ce2;
    border-radius: 100%;
    margin-left: 200px;
    margin-bottom: 1rem;
}

@media (max-width: 320px) {
    nav {
        padding: 1rem 0;
    }

    .logo {
        width: 90px;
        height: 22px;
    }

    .button {
        font-size: 12px;
    }

    .login {
        padding: 10px 14px;
    }

    .info {
        display: block;

    }

    .point {
        display: none;
    }

    .text {
        margin-top: 83px;
        text-align: center;
        z-index: 1;
        // width:274px;
        // margin: 0 auto;

        &__title {
            font-size: 22px;
        }

        &__subtitle {
            align-items: center;
            max-width: 100%;
            font-size: 1rem;
            margin-top: 1rem;
        }

        &__button {
            font-size: 1rem;
            border-radius: 10px;
            padding: 16px 53px;
            margin-top: 20px;
        }
    }
}


.auth {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #181818;


    &__box {
        background: #222;
        padding: 2rem;
        border-radius: 10px;
        text-align: center;
        color: #fff;
        box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);

        &-logo {
            width: 162px;
            height: 39px;
        }

        &-subtitle {
            font-weight: 300;
            font-size: 19px;
            color: #c2c2c2;
        }
    }

    &__tabs {
        display: flex;
        //justify-content: center;
        align-items: center;
        //margin: 1rem 0;
        border: 1px solid #ffff;
        width: 400px;
        height: 48px;
        border-radius: 12px;

    }

    &__tab {
        background: none;
        font-weight: 500;
        font-size: 18px;
        line-height: 125%;
        //border: 1px solid #fff;
        color: #fff;
        //padding: 0.5rem 1rem;
        margin: 0 5px;
        cursor: pointer;
        border-radius: 5px;
        transition: 0.3s;

        &--active {
            border: 1px solid #fff;
            border-radius: 14px;
            padding: 12px 38px;
            width: 200px;
            height: 48px;
            border-radius: 12px;
        }
    }

    &__input {
        width: 504px;
        margin: 10px 0;
        background: #333;
        color: #fff;
        border: 1px solid #fff;
        border-radius: 14px;
        padding: 24px 0 24px 21px;
        font-size: 18px;

        &::placeholder {
            font-weight: 400;
            font-size: 18px;
            line-height: 125%;
            color: rgba(255, 255, 255, 0.4);
        }
    }

    &__button {
        font-weight: 500;
        font-size: 21px;
        line-height: 125%;
        text-align: center;
        color: #fff;
        border: 1px solid #fff;
        border-radius: 14px;
        padding: 23px 0;
        width: 100%;
        margin-top: 22px;

        &:hover {
            background-color: #327CE2;
            border: 1px solid #327CE2;
            transition: 0.5s;
        }
    }

    &__text {
        margin-top: 10px;
        font-size: 14px;
        color: #aaa;
    }

    &__link {
        color: #007bff;
        cursor: pointer;
    }

    &__preview {
        margin-top: 10px;
        text-align: center;
    }

    &__preview-img {
        max-width: 100px;
        max-height: 100px;
        border-radius: 50%;
    }
}

form {
    display: flex;
    flex-direction: column;

}

.error-message {
    color: red;
    font-size: 12px;
    animation: fadeIn 0.3s ease-in-out;
}

.modal__input:invalid,
.modal__input.error {
    border: 1px solid red;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}
</style>
