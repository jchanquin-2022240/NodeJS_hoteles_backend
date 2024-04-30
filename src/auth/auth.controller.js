import bcryptjs from 'bcryptjs';
import User from '../user/user.model.js';
import { generarJWT } from '../helpers/generate-jwt.js';


export const login = async (req, res) => {

  const { email, password } = req.body;

  try {

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        msg: "Incorrect credentials, Email does not exist in the database",
      });
    }

    if (!user.status) {
      return res.status(400).json({
        msg: "User is disabled at this moment",
      });
    }

    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Password is incorrect",
      });
    }

    const token = await generarJWT(user.id);

    res.status(200).json({
      msg: 'Login Successfull, Welcome:',
      user,
      token
    });

  } catch (e) {
    console.log(e);
    res.status(500).json({
      msg: "Contact administrator",
    });
  }
};