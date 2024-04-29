import { validarionResults } from 'express-validator';

export const validarCampos = (req, res, next) => {
    const error = validarionResults(req);
    if(!error.isEmpty()){
        return res.status(400).json(error);
    }
}