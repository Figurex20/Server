import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { secretWotds } from '../config';

export class AuthMiddleware {
	static requireAuth = (req: Request, res: Response, next: NextFunction) => {
		const authHeader: String | undefined = req.headers.authorization;

		if (!authHeader) return res.status(401).json({ message: 'Unauthorized' });

		const token = authHeader.split(' ')[1];

		if (!token) return res.status(401).json({ message: 'Unauthorized' });

		jwt.verify(token, secretWotds.LOGIN, (err, user) => {
			if (err) return res.status(401).json({ message: 'Unauthorized' });
			console.log(user);

			next();
		});
	};
}
