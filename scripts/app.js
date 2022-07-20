//dom queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');

//add new chat
newChatForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
    .then(() => newChatForm.reset())
    .catch(err => console.log(err))
    //addChat is an async method in chat.js, .then to wait resolve
});

//class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general', 'kevin');

//get chats & render
chatroom.getChats(data => chatUI.render(data));