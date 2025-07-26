import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'default';

export function autenticar(req: Request, res: Response, nextFunction: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Token não enviado" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    console.log(payload);
    req.user = payload;
    nextFunction();

  } catch (e) {
    res.status(401).json({ error: "Token Inválido" });
    return;
  }

}