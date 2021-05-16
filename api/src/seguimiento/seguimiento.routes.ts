'use strict';
module.exports = function(app) {
  var seguimiento = require('./seguimiento.controller');

  // Seguimiento Routes
  app.route('/seguimiento/:idPaciente/:fecha')
  .get(seguimiento.getSeguimientosPaciente)

  app.route('/seguimientos')
    .get(seguimiento.getSeguimientos)
    .post(seguimiento.createSeguimiento);

  app.route('/seguimientos/:idSeguimiento')
    .get(seguimiento.getSeguimiento)
    .patch(seguimiento.updateSeguimiento)
    .delete(seguimiento.deleteSeguimiento);

  app.route('/seguimientos/tabla/composicion')
  .get(seguimiento.getTablaComposicion)
};

import { Router, Request, Response } from "express";
import * as seguimientoController from './seguimiento.controller';
import { verifyAccessToken } from "../auth/auth.controller";
const router = Router();

router.get("/seguimiento/:idPaciente/:fecha", verifyAccessToken, async (req: Request, res: Response): Promise<Response> => {
    try {
        const { idPaciente, fecha } = req.params;
        const seguimientosPaciente = await seguimientoController.getSeguimientosPaciente(idPaciente, new Date(fecha));
        return res.status(200).json(seguimientosPaciente);
    } catch (error) {
        return res.status(400).json({ title: "ERROR!", message: "Error al obtener seguimientos de paciente." });
    }
});

router.post("/seguimientos", verifyAccessToken, async (req: Request, res: Response): Promise<Response> => {
    try {
        seguimientoController.getSeguimientos();
        return res;
    } catch (error) {
        return res.status(400).json({ title: "ERROR!", message: "Error durante el loggueo." });
    }
});

router.get("/seguimientos/:idSeguimiento", verifyAccessToken, async (req: Request, res: Response): Promise<Response> => {
    try {
        
        return res;
    } catch (error) {
        return res.status(400).json({ title: "ERROR!", message: "Error durante el loggueo." });
    }
});

router.patch("/seguimientos/:idSeguimiento", verifyAccessToken, async (req: Request, res: Response): Promise<Response> => {
    try {
        
        return res;
    } catch (error) {
        return res.status(400).json({ title: "ERROR!", message: "Error durante el loggueo." });
    }
});

router.delete("/seguimientos/:idSeguimiento", verifyAccessToken, async (req: Request, res: Response): Promise<Response> => {
    try {
        
        return res;
    } catch (error) {
        return res.status(400).json({ title: "ERROR!", message: "Error durante el loggueo." });
    }
});

router.get("/seguimientos/tabla/composicion", verifyAccessToken, async (req: Request, res: Response): Promise<Response> => {
    try {
        
        return res;
    } catch (error) {
        return res.status(400).json({ title: "ERROR!", message: "Error durante el loggueo." });
    }
});
