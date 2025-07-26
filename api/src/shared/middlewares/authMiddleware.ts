import { Request, Response, NextFunction } from 'express';
import { validarToken } from '@shared/helpers/jwt';

export function autenticar(req: Request, res: Response, nextFunction: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Token não enviado" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = validarToken(token);
    req.user = payload;
    nextFunction();

  } catch (e) {
    res.status(401).json({ error: "Token Inválido" });
    return;
  }

}