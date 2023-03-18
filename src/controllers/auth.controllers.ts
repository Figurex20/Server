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

		try {
			const newUser = new urerModel({
				userName,
				email,
				role,
				name,
				lastname,
				password: await urerModel.encryptPassword(password),
			});

			if (role === 'admin') {
				const roles = ['admin', 'moderator'];
				const foundRoles = await roleModel.find({ name: { $in: roles } });
				if (!foundRoles) throw Error('Something went wrong with role admin and role moderator');
				newUser.roles = foundRoles.map((role) => role._id);
			}

			if (role === 'moderator') {
				const roles = ['moderator'];
				const foundRoles = await roleModel.find({ name: { $in: roles } });
				if (!foundRoles) throw Error('Something went wrong with role moderator');
				newUser.roles = foundRoles.map((role) => role._id);
			}

			if (role === 'user') {
				const roles = ['user'];
				const foundRoles = await roleModel.find({ name: { $in: roles } });
				if (!foundRoles) throw Error('Something went wrong with role user');
				newUser.roles = foundRoles.map((role) => role._id);
			}

			const saveUser = await newUser.save();

			return res.status(200).json({ message: 'Succes to create User', newUser: saveUser });
		} catch (error) {
			let result = (error as DOMException).message;
			return res.status(404).json({ message: result });
		}
	};

	static signNin = async (req: Request, res: Response) => {
		const userFound = await urerModel.findOne({ userName: req.body.user }).populate('roles');

		if (!userFound) return res.status(404).json({ message: 'User no found' });

		const userPassword = String(userFound.password);

		const matchPassword = await urerModel.comparePassword(req.body.password, userPassword);

		if (!matchPassword) return res.status(401).json({ token: null, message: 'Invalid Password' });

		const token = jwt.sign({ id: userFound }, secretWotds.LOGIN, {
			expiresIn: 84600, // 24h
		});

		res.json({
			token,
			user: userFound,
			// role: userFound.role,
			// user: userFound.userName,
			// id: userFound._id,
			// resetPassword: userFound.resetPassword,
		});
	};
}
