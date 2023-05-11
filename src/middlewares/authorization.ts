import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { secretWotds } from '../config';
import { roleModel } from '../models/modelRole';
import { userModel } from '../models/modelUser';

export class AuthMiddleware {
	static requireAuthModerator = async (req: Request, res: Response, next: NextFunction) => {
		// const authHeader: String | undefined = req.headers.authorization;
		const authHeader: String | undefined = req.cookies;

		if (!authHeader) return res.status(401).json({ message: 'Unauthorized' });

		const token = authHeader.split(' ')[1];

		if (!token) return res.status(401).json({ message: 'Unauthorized' });

		const dataToken = jwt.verify(token, secretWotds.LOGIN);

		if (typeof dataToken === 'object') {
			const user = await userModel.findById(dataToken.userFound._id);

			if (!user) return res.status(401).json({ message: 'Unauthorized!' });

			const roles = await roleModel.find({ _id: { $in: user.roles } });

			for (let i = 0; i < roles.length; i++) {
				if (roles[i].name === 'moderator' || roles[i].name === 'admin') {
					next();
					return;
				}
			}

			return res.status(403).json({ message: 'Require Moderator Role!' });
		}
	};
	static requireAuthAdmin = async (req: Request, res: Response, next: NextFunction) => {
		const authHeader: String | undefined = req.headers.authorization;

		if (!authHeader) return res.status(401).json({ message: 'Unauthorized' });

		const token = authHeader.split(' ')[1];

		if (!token) return res.status(401).json({ message: 'Unauthorized' });

		const dataToken = jwt.verify(token, secretWotds.LOGIN);

		if (typeof dataToken === 'object') {
			const user = await userModel.findById(dataToken.userFound._id);

			if (!user) return res.status(401).json({ message: 'Unauthorized!' });

			const roles = await roleModel.find({ _id: { $in: user.roles } });

			for (let i = 0; i < roles.length; i++) {
				if (roles[i].name === 'admin') {
					next();
					return;
				}
			}

			return res.status(403).json({ message: 'Require Moderator Role!' });
		}
	};
}
