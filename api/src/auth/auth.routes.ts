import { Router, Request, Response } from "express";
import * as authController from './auth.controller';
import jwt from 'jsonwebtoken';
const ACCESS_TOKEN_SECRET = '5364a7d7726d73e11c719e799959e335e951c75d2ba4369c2209fcdd1b31e25d6800e3e762f32aaa287fc7c35707daf98da44aaf2668cba1b43d40d2b7f807cd';
const REFRESH_TOKEN_SECRET = '4abd7f34bf6c51f695902499f65da49d3fd9cc825c7baae18d9c16b44742ac663913f7dd439db08f82d7a9bd78d77598a949cf48e36ef5e0f31e3d92e0a26534';
const router = Router();

router.post("/api/login", async (req: Request, res: Response): Promise<Response> => {
    try {
        const { email, contrasenia } = req.body;
        const usuario = await authController.checkUserPassword(email, contrasenia);
        if (usuario) {
            const usuarioPlainObject = { _id: usuario._id, email: usuario.email, isActive: usuario.isActive, rol: usuario.rol };
            const accessToken = await jwt.sign(usuarioPlainObject, ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
            const refreshToken = await jwt.sign(usuarioPlainObject, REFRESH_TOKEN_SECRET);
            await authController.saveRefreshToken(refreshToken);            
            res.status(200).json({ accessToken, refreshToken });
        } else {
            res.status(401).json({ title: "ERROR!", message: "Usuario o contraseña incorrectos." });
        }
        return res;
    } catch (error) {
        return res.status(400).json({ title: "ERROR!", message: "Error durante el loggueo." });
    }
  }
);

router.post("/api/refresh", async (req: Request, res: Response): Promise<Response> => {
    try {
        const authHeader = req.headers['authorization'];
        if (authHeader) {
            const oldRefreshToken = authHeader.split(' ')[1];
            if(oldRefreshToken) {
                const usuario: any = authController.verifyRefreshToken(oldRefreshToken);
                delete usuario['iat'];
                await authController.deleteRefreshToken(oldRefreshToken);
                const usuarioPlainObject = { _id: usuario._id, email: usuario.email, isActive: usuario.isActive, rol: usuario.rol };
                const accessToken = await jwt.sign(usuarioPlainObject, ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
                const refreshToken = await jwt.sign(usuarioPlainObject, REFRESH_TOKEN_SECRET);
                await authController.saveRefreshToken(refreshToken);            
                res.status(200).json({ accessToken, refreshToken });
            } else {
                res.status(403).json({ title: 'ERROR!', message: 'Refresh Token invalido.'});
            }
        } else {
            res.status(403).json({ title: 'ERROR!', message: 'Refresh Token invalido.'});
        }
        return res;
    } catch (error) {
        return res.status(403).json({ title: 'ERROR!', message: 'Algo salió mal en auth.routes.'});
    }
  }
);

export default router;
