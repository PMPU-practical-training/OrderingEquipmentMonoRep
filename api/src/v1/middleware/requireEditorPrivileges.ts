import express from 'express';
import { UserDAO } from 'daos/UserDAO/UserDAO';
import { DataAccessException } from 'utils/exception/DataAccessException';
import { BadTokenException } from 'utils/exception/Auth/BadTokenException';
import { UserRole } from 'shared/entities/User/IUser';

const userDAO = new UserDAO();

export async function requireEditorPrivileges(
  _req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> {
  if (res.locals.isAuthenticated) {
    const { role } = await userDAO.getOneByUsername(res.locals.username);
    if (role === UserRole.Editor) {
      next();
    } else {
      throw new DataAccessException("User doesn't have access");
    }
  } else {
    throw new BadTokenException();
  }
}
