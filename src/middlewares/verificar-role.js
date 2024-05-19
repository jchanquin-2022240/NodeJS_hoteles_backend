export const esSystemAdmin = (req, res, next) => {
    const user = req.usuario;

    if(user.role === "SYSTEM_ADMIN_ROLE") return next();

    return res.status(400).json({
        msg: "No tienes acceso, solo Desarrolladores"
    });
};

export const esAdmin = (req, res, next) => {
    const user = req.usuario;

    if(user.role === "ADMIN_ROLE") return next();

    return res.status(400).json({
        msg: "No tienes acceso, solo Administradores"
    });
};

export const esUser = (req, res, next) => {
    const user = req.usuario;

    if(user.role === "USER_ROLE") return next();

    return res.status(400).json({
        msg: "No tienes acceso, solo Usuarios"
    });
};