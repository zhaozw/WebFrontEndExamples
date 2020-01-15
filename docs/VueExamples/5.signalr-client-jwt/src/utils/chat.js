const signalR = require("@aspnet/signalr");

let config = {
    token:""
};
let conneciton = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:5000/chatHub", { accessTokenFactory: () => config.token }).build();

conneciton.on("ReceiveMessage", (user, message) => {
    console.log(`${user}:${message}`);
})
export {
    conneciton,
    config
};
