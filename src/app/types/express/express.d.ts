// types/express.d.ts (create this file if it doesn't exist)
import 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        name?: string;
        userEmail?: string;
        gender?: string;
        role?: string;
      };
    }
  }
}

export interface AuthRequest extends Express.Request {
  user: {
    userId: string;
    name?: string;
    userEmail?: string;
    gender?: string;
    role?: string;
  };
}