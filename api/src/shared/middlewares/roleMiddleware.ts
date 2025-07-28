import { Request, Response, NextFunction } from 'express';

export function isAdmin(req: Request, res: Response, nextFunction: NextFunction) {
  const user = req.user;
  const role = req.user?.role;

  if (!user || role !== "admin") {
    res.status(403).json({ error: 'Acesso negado.' });
    return;
  }

  nextFunction();
}
