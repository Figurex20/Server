import { Response, Request } from 'express';
import { utils } from '../middlewares/utils';
import { userModel } from '../models/modelUser';
import { roleModel } from '../models/modelRole';

export const createRoles = async () => {
	try {
		const countRole = await roleModel.estimatedDocumentCount();

		if (countRole > 0) return;

		await Promise.all([
			new roleModel({ name: 'user' }).save(),
			new roleModel({ name: 'moderator' }).save(),
			new roleModel({ name: 'admin' }).save(),
		]);
		console.log('success in creating roles');
	} catch (error) {
		let result = (error as DOMException).message;
		console.log(result);
	}
};

export const createUserAdmin = async () => {
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

		const roles = 'admin';

		const foundRoles = await roleModel.find({ name: roles });
		userAdmin.roles = foundRoles;

		await userAdmin.save();

		console.log('success in creating admin user');
	} catch (error) {
		let result = (error as DOMException).message;
		console.log(result);
	}
};
