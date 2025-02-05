<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
const isLogin = ref(true);
const isModalOpen = ref(false);

const openModal = (loginMode) => {
    isLogin.value = loginMode;
    isModalOpen.value = true;
};

const closeModal = () => {
    isModalOpen.value = false;
};

////////////////////////////////////


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
            <div v-if="isModalOpen" class="modal">
                <div class="auth">
                    <div class="auth__box">
                        <button class="modal__close" @click="closeModal">×</button>
                        <img class="auth__box-logo" src="@/assets/images/icons/logo.svg" alt="Light">
                        <p class="auth__box-subtitle">Социальная сеть</p>
                        <div class="auth__tabs">
                            <button :class="['auth__tab', { 'auth__tab--active': isLogin }]"
                                @click="isLogin = true">Вход</button>
                            <button :class="['auth__tab', { 'auth__tab--active': !isLogin }]"
                                @click="isLogin = false">Регистрация</button>
                        </div>
                        <div v-if="isLogin">
                            <form>
                            <input v-model="login" class="auth__input" type="text" placeholder="Логин" required />
                            <input v-model="password" class="auth__input" type="password" placeholder="Пароль" required />
                            <button class="auth__button">Войти</button>
                            <p class="auth__text">
                                У вас ещё нет аккаунта?
                                <span class="auth__link" @click="isLogin = false">Зарегистрироваться</span>
                            </p>
                        </form>
                        </div>
                        <div v-else>
                            <form>
                            <input class="auth__file" type="file" @change="handleFileUpload" />
                            <input v-model="full_name" class="auth__input" type="text" placeholder="Имя" required />
                            <input v-model="login" class="auth__input" type="text" placeholder="Логин" required/>
                            <input v-model="email" class="auth__input" type="email" placeholder="Почта" required/>

                            <select v-model="category" class="modal__input" required>
                                <option disabled value="">Выберите категорию</option>
                                <option v-for="category in categories" :key="category" :value="category">{{ category }}
                                </option>
                            </select>
                            <input v-model="password" class="auth__input" type="password" placeholder="Пароль" required />
                            <input v-model="confirmPassword" class="auth__input" type="password" placeholder="Подтвердите пароль" required  />
                            <label class="modal__checkbox">
                                <input type="checkbox" v-model="consent" required />
                                Согласен на обработку персональных данных
                            </label>

                            <button class="auth__button">Зарегистрироваться</button>
                            <p class="auth__text"> Уже есть аккаунт?<span class="auth__link">Войти</span></p>
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
