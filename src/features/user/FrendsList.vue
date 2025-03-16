<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const users = ref([]);

const friends = ref([]);

const fetchFriends = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/friends/list", {
            headers: { Authorization: `Bearer ${token}` },
        });

        friends.value = response.data;
    } catch (error) {
        console.error("Ошибка загрузки списка друзей:", error);
    }
};

// Удаление друга
const removeFriend = async (friendId) => {
  try {
    const token = localStorage.getItem("token");

    await axios.delete(`http://localhost:3000/friends/remove/${friendId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Убираем удалённого друга из списка
    friends.value = friends.value.filter(friend => friend.id !== friendId);
    alert("Пользователь удалён из друзей!");
  } catch (error) {
    console.error("Ошибка удаления друга:", error);
    alert("Не удалось удалить друга");
  }
};

// Функция перехода на страницу пользователя
const goToUserProfile = (userId) => {
    router.push(`/user/frends/${userId}`);
};





onMounted(fetchFriends);
</script>

<template>
    <div class="friend">
        <h2 class="friend__title">Мои друзья</h2>
        <div class="items">
            <div class="item" v-for="friend in friends" :key="friend.id">
                <img class="item__avatar" src="@/assets/images/bc-auth.jpg" alt="">
                <div class="item-info">
                    <div>
                        <h3>{{ friend.name }}</h3>
                        <p>@{{ friend.login }}</p>
                    </div>
                </div>
                <div class="buttons">
                    <button @click="goToUserProfile(friend.id)">Перейти</button>
                <button @click="removeFriend(friend.id)">Удалить</button>
                </div>
                
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.friend {
    background-color: #222;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 1rem;
    padding: 2rem;
    max-width: 1322px;
    width: 100%;

    &__title {
        font-weight: 600;
        font-size: 26px;
        line-height: 106%;
        letter-spacing: -0.01em;
        margin-bottom: 2rem;
    }
}

.items {
    display: flex;
    flex-direction: column;
    row-gap: 2rem;
}

.item {

    display: flex;
    align-items: center;
    column-gap: 0.6rem;
    border-bottom: 1px solid #191919;
    padding-bottom: 1rem;
    //max-width: 1255px;
    width: 100%;

    &__avatar {
        width: 80px;
        height: 80px;
        border-radius: 100%;
    }

    &-info {
        display: flex;
        align-items: center;
        justify-content: space-between;

        div {

            h3 {
                font-weight: 500;
                font-size: 22px;
            }

            p {
                font-weight: 400;
                font-size: 1rem;
            }
        }
    }

    .buttons {
        display: flex;
        align-items: center;
        column-gap: 1rem;
        button {
           font-weight: 500;
        font-size: 16px;
        line-height: 125%;
        letter-spacing: -0.01em;
        border: 1px solid #327ce2;
        border-radius: 16px;
        padding: 12px 32px;
        background-color: rgba(255, 255, 255, 0.1); 
        }
        position: absolute;
        right: 420px;
        
    }

}
</style>
