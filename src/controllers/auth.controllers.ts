import jwt from 'jsonwebtoken';
import { secretWotds } from '../config';
import { userModel } from '../models/modelUser';
import { roleModel } from '../models/modelRole';
import { Response, Request } from 'express';
import { serialize } from 'cookie';

export class AuthController {
	static signUp = async (req: Request, res: Response) => {
		// const { userName, email, password, role, name, lastname, confirmPassword } = req.body;

		// const equalPassword = password === confirmPassword;

		// if (!equalPassword) {
		// 	return res.status(400).json({ message: 'the passwords are not the same' });
		// }

		// const UserAlreadyExists = userModel.findOne({ userName });

		// if (!UserAlreadyExists) {
		// 	return res.status(400).json({ message: 'User duplicated' });
		// }

		try {
			// 	const newUser = new userModel({
			// 		userName,
			// 		email,
			// 		role,
			// 		name,
			// 		lastname,
			// 		password: await userModel.encryptPassword(password),
			// 	});

			// 	if (role === 'admin') {
			// 		const roles = ['admin', 'moderator'];
			// 		const foundRoles = await roleModel.find({ name: { $in: roles } });
			// 		if (!foundRoles) throw Error('Something went wrong with role admin and role moderator');
			// 		newUser.roles = foundRoles.map((role) => role._id);
			// 	}

			// 	if (role === 'moderator') {
			// 		const roles = ['moderator'];
			// 		const foundRoles = await roleModel.find({ name: { $in: roles } });
			// 		if (!foundRoles) throw Error('Something went wrong with role moderator');
			// 		newUser.roles = foundRoles.map((role) => role._id);
			// 	}

			// 	if (role === 'user') {
			// 		const roles = ['user'];
			// 		const foundRoles = await roleModel.find({ name: { $in: roles } });
			// 		if (!foundRoles) throw Error('Something went wrong with role user');
			// 		newUser.roles = foundRoles.map((role) => role._id);
			// 	}

			// 	const saveUser = await newUser.save();
			const token = jwt.sign({ id: 'pepe' }, secretWotds.LOGIN, {
				expiresIn: 84600, // 24h
			});

			return res.status(200).json({ message: 'Succes to create User', newUser: token });
			// return res.status(200).json({ message: 'Succes to create User', newUser: saveUser });
		} catch (error) {
			let result = (error as DOMException).message;
			return res.status(404).json({ message: result });
		}
	};

	static signNin = async (req: Request, res: Response) => {
		const userFound = await userModel.findOne({ userName: req.body.userName }).populate('roles');

		if (!userFound) return res.status(404).json({ message: 'User no found' });

		const userPassword = String(userFound.password);

		const matchPassword = await userModel.comparePassword(req.body.password, userPassword);

		if (!matchPassword) return res.status(401).json({ token: null, message: 'Invalid Password' });

		const token = jwt.sign({ userFound }, secretWotds.LOGIN, {
			expiresIn: 84600, // 24h
		});
		const serealized = serialize("userLogin", token, {
			httpOnly: true,
			sameSite: false,
			secure:false,
			maxAge: 1000 * 60 * 60 * 24 * 30,
		})

		res.cookie("login2", serealized )

		res.json({
			// token,
			user: userFound,
			// role: userFound.role,
			// user: userFound.userName,
			// id: userFound._id,
			// resetPassword: userFound.resetPassword,
		});
	};
}
