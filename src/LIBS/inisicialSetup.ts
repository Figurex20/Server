import { Response, Request } from 'express';
import { utils } from '../middlewares/utils';
import { userModel } from '../models/modelUser';
import { roleModel } from '../models/modelRole';

export const createRoles = async (req: Request, res: Response) => {
	try {
		const countRole = await roleModel.estimatedDocumentCount();

		if (countRole > 0) return;

		const roles = await Promise.all([
			new roleModel({ name: 'user' }).save(),
			new roleModel({ name: 'moderator' }).save(),
			new roleModel({ name: 'admin' }).save(),
		]);
	} catch (error) {
		let result = (error as DOMException).message;
		return res.status(404).json({ message: result });
	}
};

export const createUserAdmin = async (req: Request, res: Response) => {
	try {
		const countUser = await userModel.estimatedDocumentCount();

		if (countUser > 0) return;

		const userAdmin = new userModel({
			userName: 'ccr-cr',
			email: 'ccr-cr@claro.cr',
			password: await userModel.encryptPassword('Claro+2023'),
			role: 'admin',
			name: 'ccr',
			lastname: 'ccr',
		});

		const roles = ['admin', 'moderator'];

		const foundRoles = await userModel.find({ name: { $in: roles } });
		userAdmin.roles = foundRoles.map((role) => role._id);

		await userAdmin.save();

		console.log('success in creating admin user');

		// console.log(userAdmin);
	} catch (error) {
		let result = (error as DOMException).message;
		return res.status(404).json({ message: result });
	}
};
