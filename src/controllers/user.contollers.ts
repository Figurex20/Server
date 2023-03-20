import { userModel } from '../models/modelUser';
import { Response, Request } from 'express';
import { utils } from '../middlewares/utils';

export class UserController {
	static getAllUsers = async (req: Request, res: Response) => {
		try {
			const users = await userModel.find();
			if (!users) throw Error('Users not found');
			res.status(200).send(users);
		} catch (error) {
			let result = (error as DOMException).message;
			return res.status(404).json({ message: result });
		}
	};

	static getUser = async (req: Request, res: Response) => {
		try {
			const uniqueUser = await userModel.findById(req.params.id);
			if (!uniqueUser) throw Error('User not found');
			res.status(200).json(uniqueUser);
		} catch (error) {
			let result = (error as DOMException).message;
			return res.status(404).json({ message: result });
		}
	};

	static deleteUser = async (req: Request, res: Response) => {
		try {
			await userModel.findByIdAndDelete(req.params.id);
			res.status(200).json({ message: 'User elimited' });
		} catch (error) {
			let result = (error as DOMException).message;
			return res.status(404).json({ message: result });
		}
	};

	static userChangepassword = async (req: Request, res: Response) => {
		try {
			if (req.body.option === 'changePassword') {
				const respond = await utils.changePassword(req.body);
				if (respond.status === 200) {
					return res.status(200).json(respond.message);
				} else {
					return res
						.status(400)
						.json({ status: 'something wrong with changed password', message: respond.message });
				}
			}

			await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
			res.status(200).json({ status: 'User updated' });
		} catch (error) {
			let result = (error as DOMException).message;
			return res.status(404).json({ message: result });
		}
	};
}
