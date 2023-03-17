import { urerModel } from '../models/modelUser';
import jwt from 'jsonwebtoken';
import { secretWotds } from '../config';
import { roleModel } from '../models/modelRole';
import { Response, Request } from 'express';

export class AuthController {
	static signUp = async (req: Request, res: Response) => {
		const { userName, email, password, role, name, lastname, confirmPassword } = req.body;

		const equalPassword = password === confirmPassword;

		if (!equalPassword) {
			return res.status(400).json({ message: 'the passwords are not the same' });
		}

		const UserAlreadyExists = urerModel.findOne({ userName });

		if (!UserAlreadyExists) {
			return res.status(400).json({ message: 'User duplicated' });
		}

		const newUser = new urerModel({
			userName,
			email,
			role,
			name,
			lastname,
			// password: await urerModel.encryptPassword(password),
		});

		if (role === 'admin') {
			try {
				const roles = ['admin', 'moderator'];
				const foundRoles = await roleModel.find({ name: { $in: roles } });
				if (!foundRoles) throw Error('Something went wrong with role admin and role moderator');
				newUser.roles = foundRoles.map((role) => role._id);
			} catch (error) {
				let result = (error as DOMException).message;
				return res.status(404).json({ message: result });
			}
		}

		if (role === 'moderator') {
			try {
				const roles = ['moderator'];
				const foundRoles = await roleModel.find({ name: { $in: roles } });
				if (!foundRoles) throw Error('Something went wrong with role moderator');
				newUser.roles = foundRoles.map((role) => role._id);
			} catch (error) {
				let result = (error as DOMException).message;
				return res.status(404).json({ message: result });
			}
		}

		if (role === 'user') {
			try {
				const roles = ['user'];
				const foundRoles = await roleModel.find({ name: { $in: roles } });
				if (!foundRoles) throw Error('Something went wrong with role user');
				newUser.roles = foundRoles.map((role) => role._id);
			} catch (error) {
				let result = (error as DOMException).message;
				return res.status(404).json({ message: result });
			}
		}

		const saveUser = await newUser.save();

		const token = jwt.sign({ test: 'test' }, secretWotds.LOGIN, {
			expiresIn: 84600, // 24h
		});

		res.status(200).json({ token });

		return res.status(200).json({ message: token });
	};
}
