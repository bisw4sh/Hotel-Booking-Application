import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:5173",
  },
});

let ids_object = [];
let ids_room = [];

const addID = (id) => {
  ids_object.push(id);
  console.log("addID", ids_object);
};

const addRoomID = (id) => {
  ids_room.push(id);
};
const removeRoomID = (id) => {
  ids_room = ids_room.filter((x) => x !== id);
};

const removeID = (socketId) => {
  ids_object = ids_object.filter((user) => user.userID !== socketId);
  // console.log(ids);
};

io.on("connection", (socket) => {
  console.log("connected");
  socket.on("newUser", (msg) => {
    addID(socket.id);
  });
  console.log(ids_object);
  socket.on("sendSelect", (data) => {
    addRoomID(data);
    io.emit("selected", ids_room);
  });
  socket.on("removeSelect", (data) => {
    removeRoomID(data);
    io.emit("selected", ids_room);
  });

  socket.on("disconnect", () => {
    removeID(socket.id);
    console.log(ids_object);
  });
});

io.listen(5000);
