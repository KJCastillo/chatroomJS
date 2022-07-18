//add new chat documents
//set up a real time listener to get new chats
//update username
//update the chatroom

class Chatroom {
    //OOP, pass parameters below
    constructor(room, username){
        this.room = room;
        this.username = username;
        this.chats = db.collection("chats");
    }
    async addChat(message){
        //format a chat object
        const now = new Date();
        const chat = {
            message: message,
            username: this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        };
        //save the chat document

        const response = await this.chats.add(chat);
        return response;
        //wait for async to resolve then save response to chat collection
    }
}

const chatroom = new Chatroom('gaming', 'kevin');

chatroom.addChat('hey hey')
.then(() => {console.log('chat added')})
.catch(err => console.log(err))
//addChat() returns a promise so .then() made