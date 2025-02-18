<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import axios from "axios";

const newMessage = ref('');

</script>

<template>
  <div class="chat-container">
    <div class="chat-header">
      <div class="avatar"></div>
      <div class="user-info">
        <h2>Имя Фамилия</h2>
        <p>@name</p>
      </div>
    </div>
    
    <div class="chat-messages">
      <div class="message received">
        <div class="avatar-small"></div>
        <div class="message-bubble">
          <p>Новое сообщение</p>
          <span class="timestamp">11:31 AM</span>
        </div>
      </div>
      
      <div class="message received">
        <div class="avatar-small"></div>
        <div class="message-bubble">
          <p>Новое сообщение</p>
          <span class="timestamp">11:31 AM</span>
        </div>
      </div>
      
      <div class="message sent">
        <div class="message-bubble">
          <p>Новое сообщение</p>
          <span class="timestamp">11:31 AM</span>
        </div>
      </div>
    </div>
    
    <div class="chat-input">
      <input type="text" placeholder="Начните печатать..." />
      <button class="send-button">
        <svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M2.32816 2.3259L3.51514 8.9115H10.839C11.462 8.9115 11.9671 9.39883 11.9671 10C11.9671 10.6012 11.462 11.0885 10.839 11.0885H3.51514L2.32816 17.6741L20.8856 10L2.32816 2.3259ZM1.42128 10L0.0298591 2.28007C-0.0826259 1.65598 0.12666 1.0181 0.590875 0.570172C1.17415 0.00737042 2.05378 -0.156094 2.81196 0.157439L22.9707 8.49374C23.5951 8.75198 24 9.34445 24 10C24 10.6555 23.5951 11.248 22.9707 11.5063L2.81196 19.8425C2.05378 20.1561 1.17415 19.9926 0.590875 19.4299C0.12666 18.9819 -0.0826262 18.344 0.0298591 17.7199L1.42128 10Z" fill="#8E8E93" />
        </svg>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chat-container {
  border: 1px solid rgba(255, 255, 255, 0.1);
border-radius: 16px;
padding: 64px;
width: 1111px;
//height: 1022px;
background-color: #222;
position: relative;

}

.chat-header {
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #333;
  padding-bottom: 12px;
  margin-bottom: 12px;

  .avatar {
    width: 48px;
    height: 48px;
    background: #0f0;
    border-radius: 50%;
  }

  .user-info {
    margin-left: 12px;

    h2 {
      font-size: 1rem;
      margin: 0;
    }

    p {
      font-size: 0.8rem;
      color: #bbb;
    }
  }
}

.chat-messages {
  display: flex;
  flex-direction: column;
  gap: 10px;

  .message {
    display: flex;
    align-items: center;
    

    &.received {
      .avatar-small {
        width: 16px;
        height: 16px;
        background: #00f;
        border-radius: 50%;
        margin-right: 8px;
      }
    }

    &.sent {
      justify-content: flex-end;
    }

    .message-bubble {
      border-radius: 16px;
padding: 16px;
background-color: #292b32;
display: flex;
align-items: center;
justify-content: space-between;
column-gap: 1rem;
//position: relative;

      .timestamp {
        font-size: 0.7rem;
        color: #888;
        //position: absolute;
        //bottom: 2px;
        //right: 6px;
      }
    }
  }
}

.chat-input {
  display: flex;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.3);
border-radius: 16px;
padding: 22px 20px;
width: 983px;
position: absolute;
bottom: 64px;

  input {
    flex-grow: 1;
    background: transparent;
    border: none;
    outline: none;
    color: white;
    padding: 8px;
  }

  .send-button {
    background: none;
    border: none;
    color: #bbb;
    cursor: pointer;
    padding: 4px;

    &:hover {
      color: white;
    }

    .icon {
      width: 20px;
      height: 20px;
    }
  }
}
</style>
