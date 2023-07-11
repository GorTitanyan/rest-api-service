import userService from '../services/user.service.js';

const getUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, name, surname, email, birthday } = await userService.getUserId(id);
    res.json({username, name, surname, email, birthday });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve user ID' });
  }
};

const updateUser = async (req,res) => {
  try{
    const id = req.user.id
    const {username, name, surname, email, birthday} = req.body
    const updatedUser = await userService.updateUser(username,name,surname,email,birthday,id)
    res.json({message:"user updated",})    
  }catch(err){
    console.log(err, "SOMETHING");

      res.status(500).json({error: "Failed to update user!"})
  }
}

const logout = async (req, res) => {
  try {
    console.log(req.user);
    const { id } = req.user;
    await userService.invalidateToken(id);
    res.json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to logout' });
  }
};

export default {
  getUserId,
  updateUser,
  logout,
};
