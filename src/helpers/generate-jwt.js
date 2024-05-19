import jwt from 'jsonwebtoken';

export const generarJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(
            payload,
            process.env.SECRETORPRIVATEKEY,
            {
                expiresIn: '500h'
            },
            (err, token) => {
                if (err) {
                    console.error(err);
                    reject('No se pudo generar el token');
                } else {
                    resolve(token);
                }
            }
        )
    });
}