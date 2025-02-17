// import { reactive } from "vue";

// export const useChatStore = () => {
//   const state = reactive({
//     chats: [
//       { id: 1, name: "Чат с другом", messages: [] },
//       { id: 2, name: "Чат с коллегами", messages: [] },
//     ],
//     currentChatId: null,
//   });

//   const selectChat = (id) => {
//     state.currentChatId = id;
//   };

//   const sendMessage = (messageText) => {
//     const chat = state.chats.find((chat) => chat.id === state.currentChatId);
//     if (chat) {
//       const newMessage = {
//         id: chat.messages.length + 1,
//         sender: "User", // Можно заменить на реальное имя
//         text: messageText,
//       };
//       chat.messages.push(newMessage);
//     }
//   };

//   const currentChat = computed(() => {
//     return state.chats.find((chat) => chat.id === state.currentChatId) || {};
//   });

//   return {
//     chats: state.chats,
//     currentChat,
//     selectChat,
//     sendMessage,
//   };
// };


// const socket = new WebSocket("ws://your-websocket-server.com");

// socket.onopen = () => {
//   console.log("Connected to WebSocket server");
// };

// socket.onmessage = (event) => {
//   const message = JSON.parse(event.data);
//   // Обновить состояние чатов с новым сообщением
//   sendMessage(message.text);
// };

// const sendMessage = (messageText) => {
//   const message = {
//     sender: "User",
//     text: messageText,
//   };
//   socket.send(JSON.stringify(message));
// };
