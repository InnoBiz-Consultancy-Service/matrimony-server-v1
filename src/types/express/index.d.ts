import 'express';
import { AuthUser } from '../../middlewares/checkAuth';

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}
