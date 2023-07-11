import authService from '../services/auth.service.js';

const signup = async (req, res, next) => {
  try {
    const {username, name, surname, email, birthday, password} = req.body;
    if (!email) {
      throw new Error('Email is required');
    }

    const identifier = { username, name, surname, email, birthday };
    const { bearerToken, refreshToken } = await authService.signup(
      identifier,
      password,
    );
    res.json({ bearerToken, refreshToken });
  } catch (error) {
    res.status(500).json({ error: 'Failed to sign up: ' + error.message });
  }
};

const signin = async (req, res, next) => {
  try {
    const { username, email, password }= req.body;
    if (!username && !email) {
      throw new Error('Please provide an email or username!');
    }
    const tokens = await authService.signin(username, email, password);
    res.json(tokens);
  } catch (error) {
    res.status(500).json({ error: 'Failed to sign in: ' + error.message });
  }
};

const refreshBearerToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const { bearerToken } = await authService.refreshBearerToken(refreshToken);
    res.json({ bearerToken });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Failed to refresh bearer token: ' + error.message });
  }
};

export default {
  signup,
  signin,
  refreshBearerToken,
};
