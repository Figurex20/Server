import { Router } from 'express';

import { AuthController } from '../controllers/auth.controllers';
// const { verifyToken, isAdmin } = authjwt;
//[verifyToken, isAdmin]
const routerUsers = Router();

routerUsers.post('/signup', AuthController.signUp);
// routerUsers.post('/signin', AuthController.signNin);

export { routerUsers };
