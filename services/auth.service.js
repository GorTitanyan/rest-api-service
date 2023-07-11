import bcrypt from 'bcrypt';
import utils from '../utils/utils.js';
import userAdapter from '../adapters/user.adapter.js';
import tokensAdapter from '../adapters/tokens.adapter.js';
import jwt from 'jsonwebtoken';
import { refreshTokenSecretKey } from '../env.dev.js';

const signup = async (identifier, password) => {
  const { username, name, surname, email, birthday } = identifier;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = email
    ? await userAdapter.findUserByEmail(email)
    : await userAdapter.findUserByUsername(username);

  if (existingUser) {
    throw new Error(
      `User with the provided ${
        email ? 'email' : 'phone number'
      } already exists`,
    );
  }

  const user = await userAdapter.signup(username, name, surname, email,birthday, hashedPassword);

  const tokens = {
    bearerToken: await utils.generateBearerToken(user.id),
    refreshToken: await utils.generateRefreshToken(user.id),
  };

  await tokensAdapter.createToken(user.id, tokens.bearerToken);

  return tokens;
};

const signin = async (username, email, password) => {
  try {
    let user;
    if (email) {
      user = await userAdapter.findUserByEmail(email);
    } else {
      user = await userAdapter.findUserByUsername(username);
    }

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('Invalid credentials');
    }

    const tokens = {
      bearerToken: await utils.generateBearerToken(user.id),
      refreshToken: await utils.generateRefreshToken(user.id),
    };

    await tokensAdapter.createToken(user.id, tokens.bearerToken);

    return tokens;
  } catch (error) {
    throw new Error(error);
  }
};

const refreshBearerToken = async refreshToken => {
  try {
    const decoded = jwt.verify(refreshToken, refreshTokenSecretKey);

    if (!decoded || !decoded.id) {
      throw new Error('Invalid refresh token');
    }

    const user = await userAdapter.findUserById(decoded.id);

    if (!user) {
      throw new Error('User not found');
    }

    const bearerToken = await utils.generateBearerToken(user.id);
    await tokensAdapter.createToken(user.id, bearerToken);

    return {
      bearerToken,
      refreshToken: await utils.generateRefreshToken(user.id),
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

export default {
  signup,
  signin,
  refreshBearerToken,
};
