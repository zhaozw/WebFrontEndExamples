const signalR = require("@aspnet/signalr");
let conneciton = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:5000/messageHub").build();
conneciton.on("ReceiveMessage", (user, message) => {
    console.log(`${user}:${message}`);
})
export default conneciton;
