import { urerModel } from '../models/modelUser';
import jwt from 'jsonwebtoken';
import config from '../config';
import { roleModel } from '../models/modelRole';

export class AuthController {
	// static signUp = async (req, res) => {
	// 	try {
	// 		// recive data from body
	// 		const { userName, email, password, role, name, lastname, confirmPassword } = req.body;
	// 		const equalPassword = password === confirmPassword;
	// 		if (!equalPassword) {
	// 			return res.status(400).json({ message: 'the passwords are not the same' });
	// 		}
	// 		const UserAlreadyExists = User.findOne({ userName });
	// 		if (!UserAlreadyExists) {
	// 			return res.status(400).json({ message: 'User duplicated' });
	// 		}
	// 		// create new user
	// 		const newUser = new User({
	// 			userName,
	// 			email,
	// 			role,
	// 			name,
	// 			lastname,
	// 			password: await User.encryptPassword(password),
	// 		});
	// 		if (role === 'admin') {
	// 			const roles = ['admin', 'moderator'];
	// 			const foundRoles = await Role.find({ name: { $in: roles } });
	// 			newUser.roles = foundRoles.map((role) => role._id);
	// 		}
	// 		if (role === 'moderator') {
	// 			const roles = ['moderator'];
	// 			const foundRoles = await Role.find({ name: { $in: roles } });
	// 			newUser.roles = foundRoles.map((role) => role._id);
	// 		}
	// 		if (role === 'user') {
	// 			const roles = ['user'];
	// 			const foundRoles = await Role.find({ name: { $in: roles } });
	// 			newUser.roles = foundRoles.map((role) => role._id);
	// 		}
	// 		// save user in DB
	// 		const saveUser = await newUser.save();
	// 		// create token
	// 		const token = jwt.sign({ id: saveUser._id }, config.SECRET, {
	// 			expiresIn: 84600, // 24h
	// 		});
	// 		res.status(200).json({ token });
	// 	} catch (error) {
	// 		res.status(400).json({ message: 'Someting goes wrong in signUp', error: error });
	// 	}
	// };
	// static signNin = async (req, res) => {
	// 	try {
	// 		// find user by userName
	// 		const userFound = await User.findOne({ userName: req.body.userName }).populate('roles');
	// 		// if user not exist
	// 		if (!userFound) return res.status(404).json({ message: 'User no found' });
	// 		// compare password
	// 		const matchPassword = await User.comparePassword(req.body.password, userFound.password);
	// 		// if password not match
	// 		if (!matchPassword) return res.status(401).json({ token: null, message: 'Invalid Password' });
	// 		// create token
	// 		const token = jwt.sign({ id: userFound }, config.SECRET, {
	// 			expiresIn: 84600, // 24h
	// 		});
	// 		// send token
	// 		res.json({
	// 			token,
	// 			role: userFound.role,
	// 			user: userFound.userName,
	// 			id: userFound._id,
	// 			resetPassword: userFound.resetPassword,
	// 		});
	// 		//2ql(-0y;)zoyb<¿py¡
	// 	} catch (error) {
	// 		res.status(404).json({ message: error.message });
	// 	}
	// };
}
