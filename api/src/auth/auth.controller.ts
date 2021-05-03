const ACCESS_TOKEN_SECRET = '5364a7d7726d73e11c719e799959e335e951c75d2ba4369c2209fcdd1b31e25d6800e3e762f32aaa287fc7c35707daf98da44aaf2668cba1b43d40d2b7f807cd';
const REFRESH_TOKEN_SECRET = '4abd7f34bf6c51f695902499f65da49d3fd9cc825c7baae18d9c16b44742ac663913f7dd439db08f82d7a9bd78d77598a949cf48e36ef5e0f31e3d92e0a26534';
import bcrypt from 'bcrypt';
import { IUsuario, Usuario } from "../usuario/usuario.schema";
import { IRefreshToken, RefreshToken } from "./refreshToken.schema";
import jwt from 'jsonwebtoken';
import { Query } from 'mongoose';
import { Request, Response, NextFunction } from 'express';

export const checkUserPassword = async (email: string, contrasenia: string): Promise<IUsuario | null> => {
    try {
        let resultado: IUsuario | null = null;
        const usuario = await Usuario.findOne({ email });
        if (usuario && usuario.password) {
            let matchPassword = false;
            matchPassword = await bcrypt.compare(contrasenia, usuario.password);
            if (matchPassword) {
                resultado = new Usuario({
                    _id: usuario._id,
                    email: usuario.email,
                    isActive: usuario.isActive,
                    rol: usuario.rol
                });
            }
        }
        return resultado;
    } catch (error) {
        return null;
    }
};

export const saveRefreshToken = (token: string): Promise<IRefreshToken> => {
    return new RefreshToken({ token }).save();
};

export const deleteRefreshToken = (token: string): Query<{ ok?: number | undefined; n?: number | undefined; } & { deletedCount?: number | undefined; }, IRefreshToken, {}> => {
    return RefreshToken.deleteOne({ token });
};

export const verifyAccessToken = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
        const authHeader = req.headers['authorization'];
        if (authHeader) {
            const accessToken = authHeader.split(' ')[1];
            if (accessToken) {
                const usuario = await jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
                req.body.user = usuario;
                next();
            } else {
                res.status(403).json({ title: 'ERROR!', message: 'AccessToken is null.'});
            }
        } else {
            res.status(403).json({ title: 'ERROR!', message: 'autHeader is null.'});
        }
        return res;
    } catch (error) {
        return res.status(403).json({ title: 'ERROR!', message: 'Token invalido.'});
    }
};

export const verifyRefreshToken = (refreshToken: string): string | object => {
    return jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
};
