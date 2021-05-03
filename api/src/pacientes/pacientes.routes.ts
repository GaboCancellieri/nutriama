import { Router, Request, Response } from 'express';
import { verifyAccessToken } from '../auth/auth.controller';
import * as pacientesController from './pacientes.controller';
import { IPaciente } from "./pacientes.schema";
const router = Router();

router.get("/api/pacientes", verifyAccessToken, async (req: Request, res: Response): Promise<Response> => {
    try {
        const pacientes: IPaciente[] = await pacientesController.getPacientes();
        return res.status(200).json(pacientes);
      } catch (error) {
        return res.status(400).json({ title: 'ERROR!', message: 'Error ocurred while getting pacientes.'});
    }
  }
);
