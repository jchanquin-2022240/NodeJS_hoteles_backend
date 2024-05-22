import bcryptjs from 'bcryptjs';
import User from '../user/user.model.js';
import { generarJWT } from '../helpers/generate-jwt.js';

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                msg: 'Credenciales incorrectas - El email no existe en la base de datos',
            });
        }

        if (!user.status) {
            return res.status(400).json({
                msg: 'El usuario está deshabilitado en este momento',
            });
        }

        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'La contraseña es incorrecta',
            });
        }

        const token = await generarJWT(user.id);

        res.status(200).json({
            msg: 'Inicio de sesión exitoso, bienvenido:',
            user,
            token
        });

    } catch (e) {
        console.error(e);
        res.status(500).json({
            msg: 'Contacte al administrador',
        });
    }
};