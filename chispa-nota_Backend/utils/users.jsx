const users =[];

// Añadir usuarios a la lista

const addUser = ({name, userId,roomId,host,presenter})=>{
  const user ={name,userId,roomId,host,presenter};
  users.push(user);
  return users.filter((user)=>user.roomId===roomId);
};

//Quitar usuario de la lista

const removeUser = (id)=>{
  const index = users.findIndex((user)=>user.userId===id);
  if(index!==-1){
    return users.splice(index,1)[0];
  }
};

//Obtener usuario de la lista

const getUser = (id)=>{
  return users.find((user)=>user.userId===id);
}

//Obtener todos los usuarios de la lista de la sala

const getUsersInRoom = (roomId)=>{
  return users.filter((user)=>user.roomId===roomId);
};

module.exports={
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
};