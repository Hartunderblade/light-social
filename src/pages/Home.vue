<script setup>

</script>

<template>
<div class="bc">
    <header class="container">
        <nav>
            <div>
                <img class="logo" src="@/assets/images/icons/logo.svg" alt="Light">
            </div>
            <div class="buttons">
                <button class="button logout">Регистрация</button>
                <button class="button login">Вход</button>
            </div>
        </nav>
        <div class="info">
            <div class="text">
                <h1 class="text__title">Здравствуйте!</h1>
                <p class="text__subtitle">Регистрируйтесь в нашей социальной сети и приглашайте друзей. Делитесь яркими впечатлениями и делайте этот мир ярче</p>
                <button class="text__button">Зарегистрироваться</button>
            </div>
            <div class="point">
                <img src="@/assets/images/logo-point.png" />
            </div>
        </div>
    </header>
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
</style>
