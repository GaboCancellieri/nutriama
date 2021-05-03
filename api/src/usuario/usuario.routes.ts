import { Router, Request, Response } from "express";
import * as usuarioController from './usuario.controller';
import { verifyAccessToken } from '../auth/auth.controller';
import { IUsuario } from "./usuario.schema";
import { IError } from "../shared/IError";
const router = Router();

  /**
 * @swagger
 * /api/usuario:
 *  get:
 *    description: Use to request all users.
 *    tags: 
 *    - Usuario
 *    parameters:
 *      '200': 
 *        description: A successful request.
 *        schema:
 *          $ref: '#/definitions/Usuario'
 *      '404': 
 *        description: Usuarios is empty.
 *        schema:
 *          $ref: '#/definitions/Error'
 */
router.get("/api/usuario", verifyAccessToken, async (req: Request, res: Response): Promise<Response> => {
    try {
        const usuarios: IUsuario[] | null = await usuarioController.getUsuarios();
        return res.status(200).json(usuarios);
      } catch (error) {
        return res.status(404).json({ title: 'ERROR!', message: 'Usuarios is empty.'});
      }
  }
);

/**
 * @swagger
 * /api/usuario:
 *  post:
 *    description: Use to create a new User.
 *    tags: 
 *    - Usuario
 *    parameters:
 *    - name: email
 *      in: body
 *      description: Email of the User.
 *      required: true
 *      schema:
 *        type: string
 *    - name: contrasenia
 *      in: body
 *      description: Password of the User.
 *      required: true
 *      schema:
 *        type: string
 *    - name: rol
 *      in: body
 *      description: indicates if the user is an admin.
 *      required: true
 *      schema:
 *        type: boolean
 *    - name: isActive
 *      in: body
 *      description: Status of the user(ative/no active).
 *      required: true
 *      schema:
 *        type: boolean
 *    responses:
 *      '201': 
 *        description: The new user was created.
 *        schema:
 *          $ref: '#/definitions/Usuario'
 *      '409': 
 *        description: Usuario cant be created.
 *        schema:
 *          $ref: '#/definitions/Error'
 */
router.post("/api/usuario", verifyAccessToken, async (req: Request, res: Response): Promise<Response> => {
    try {
      if (req.body.user.rol === 'admin') {
        let {email, password, rol, isActive } = req.body;
        let usuario: IUsuario | null;
        if(!email) {
          res.status(400).json({ title: "ERROR!", message: "Bad Request (email)."});
        } else if (!password) {
          res.status(400).json({ title: "ERROR!", message: "Bad Request (contraseña)."});
        } else if (rol === undefined) {
          res.status(400).json({ title: "ERROR!", message: "Bad Request (rol)."});
        } else if(isActive === undefined) {
          res.status(400).json({ title: "ERROR!", message: "Bad Request (isActive)."});
        } else {
          usuario = await usuarioController.createUsuario(email, password, rol, isActive);
          if (usuario) {
            res.status(201).json({_id: usuario._id, email: usuario.email, isActive: usuario.isActive, rol: usuario.rol });
          }
        }
      }
      else{
        res.status(403).json({ title: 'ERROR!', message: 'the user is not admin.'});
      }
      return res;
    } catch (error) {
        return res.status(409).json({ title: 'ERROR!', message: 'Ya existe un usuario con este email o localidad.'});
      }
  }
);

  /**
 * @swagger
 * /api/usuario:
 *  patch:
 *    description: Use to patch an User.
 *    tags: 
 *    - Usuario
 *    parameters:
 *    - name: idUsuario
 *      in: body
 *      description: ID of the User.
 *      required: true
 *      schema:
 *        type: string
 *    - name: contrasenia
 *      in: body
 *      description: Password of the User.
 *      required: true
 *      schema:
 *        type: string
 *    - name: rol
 *      in: body
 *      description: Indicates if the user is an admin.
 *      required: true
 *      schema:
 *        type: boolean
 *    - name: isActive
 *      in: body
 *      description: Status of the user(ative/no active).
 *      required: true
 *      schema:
 *        type: boolean
 *    responses:
 *      '200': 
 *        description: Usuario has been patched.
 *        schema:
 *          $ref: '#/definitions/Usuario'
 *      '304': 
 *        description: Usuario cant be patched.
 *        schema:
 *          $ref: '#/definitions/Error'
 */

router.patch("/api/usuario/:id", verifyAccessToken, async (req: Request, res: Response): Promise<Response> => {
    try {
      if (req.body.user.rol === 'admin') {
        const idUsuario: string = req.params.id;
        const usuario: IUsuario | null = await usuarioController.updateUsuario(idUsuario, req.body);
        if (usuario) {
          res.status(200).json({_id: usuario._id, email: usuario.email, isActive: usuario.isActive, rol: usuario.rol });
        } 
      }
      else{
        res.status(403).json({ title: 'ERROR!', message: 'the user is not admin.'});
      }
      return res;
    } catch (error) {
        return res.status(304).json({ title: 'ERROR!', message: 'Usuario cant be patched.'});
      }
  }
);

router.patch("/api/changePass/usuario", verifyAccessToken, async (req: Request, res: Response): Promise<Response> => {
  try {
    
    if (req.body.user.isActive) {
      const idUsuario: string = req.body.user._id;
      const result: any = await usuarioController.changePassword(idUsuario, req.body.lastPass, req.body.newPass);
      if (result && result.title) {
        res.status(400).json({ title: result.title, message: result.message });
      } else if (result && result._id) {
        res.status(200).json({ email: result.email, isActive: result.isActive, rol: result.rol, solicitud: result.solicitud, emailOp: result.emailOp});
      }
    }
    else {
      res.status(403).json({ title: 'ERROR!', message: 'the user is not admin.'});
    }
    return res;
  } catch (error) {
    return res.status(304).json({ title: 'ERROR!', message: 'Usuario cant be patched.'});
  }
}
);

  /**
 * @swagger
 * /api/usuario:
 *  delete:
 *    description: Use to delete an User.
 *    tags: 
 *    - Usuario
 *    parameters:
 *    - name: idUsuario
 *      in: body
 *      description: ID of the User.
 *      required: true
 *      schema:
 *        type: string
 *    responses:
 *      '200': 
 *        description: User has been deleted.
 *        schema:
 *          $ref: '#/definitions/Usuario'
 *      '404': 
 *        description: User cant be deleted.
 *        schema:
 *          $ref: '#/definitions/Error'
 */

router.delete("/api/usuario/:id", verifyAccessToken, async (req: Request, res: Response): Promise<Response> => {
    try {
      if (req.body.user.rol === 'admin') {
        const idUsuario: string = req.params.id;
        const usuario: IUsuario | null = await usuarioController.deleteUsuario(idUsuario);
        if (usuario) {
          res.status(200).json({ _id: usuario._id, email: usuario.email, isActive: usuario.isActive, rol: usuario.rol });
        }
      }
      else{
       res.status(403).json({ title: 'ERROR!', message: 'the user is not admin.'});
      }
      return res;
      } catch (error) {
        return res.status(404).json({ title: 'ERROR!', message: 'Usuario cant be deleted.'});
      }
  }
);

export default router;