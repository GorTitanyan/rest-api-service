import userAdapter from '../adapters/user.adapter.js';
import tokensAdapter from '../adapters/tokens.adapter.js';


import db from '../models/index.model.js';

const UsersModel = db.users;


const getUserId = async id => {
  try {
    const userId = await userAdapter.findUserById(id);
    return userId;
  } catch (error) {
    throw new Error('Failed to retrieve user ID from the adapter');
  }
};


const updateUser = async (username, name, surname, email, birthday, id) => {
  try{
  const user = await userAdapter.findUserById(id)
  console.log(user);
    if(user){ 
        const result = await user.update({
        username: username,
        name: name,
        surname: surname,
        email: email,
        birthday: birthday
      })
    }else{
      throw new Error("Cannot find the user!")
    }
  }catch(err){
    throw new Error("Cannot update the user!")
  }

}

const invalidateToken = async id => {
  try {
    return await tokensAdapter.invalidateToken(id);
  } catch (error) {
    throw new Error(error);
  }
};


export default {
  getUserId,
  updateUser,
  invalidateToken,
};
