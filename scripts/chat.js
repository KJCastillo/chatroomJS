class Chatroom {
    //OOP, pass parameters below
    constructor(room, username){
        this.room = room;
        this.username = username;
        this.chats = db.collection("chats");
        this.unsub;
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
    getChats(callback){
       this.unsub = this.chats
        .where('room', '==', this.room)
        .orderBy('created_at')
        //use Snapshot for real time events, docChanges returns an array for all the changes
        //forEach to cycle thru array and do something with each change
        .onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if(change.type === "added"){
                    //update UI
                    callback(change.doc.data())
                }
            })
        })
    }
    updateName(username){
        this.username = username;
        localStorage.setItem('username', username)
    }
    updateRoom(room){
        this.room = room;
        console.log('room updated')
        if(this.unsub){
            this.unsub();
        }
    }
}