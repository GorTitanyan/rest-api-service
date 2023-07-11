import db from '../models/index.model.js';

const UsersModel = db.users;

const signup = async (username, name, surname, email, birthday, hashedPassword) => {
  if (!email) {
    throw new Error('Email or phoneNumber is required');
  }

  const userData = {
    username,
    name,
    surname,
    ...(email && { email }),
    birthday,
    password: hashedPassword,
  };

  try {
    return await UsersModel.create(userData);
  } catch (error) {
    throw new Error(error);
  }
};

const findUserByEmail = async email => {
  try {
    return await UsersModel.findOne({ where: { email } });
  } catch (error) {
    throw new Error(error);
  }
};




const findUserByUsername = async phoneNumber => {
  try {
    return await UsersModel.findOne({ where: { username } });
  } catch (error) {
    throw new Error(error);
  }
};

const findUserById = async id => {
  try {
    return await UsersModel.findOne({ where: { id } });
  } catch (error) {
    throw new Error(error);
  }
};

export default {
  signup,
  findUserByEmail,
  findUserByUsername,
  findUserById,
};
