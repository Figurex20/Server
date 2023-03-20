import { userModel } from '../models/modelUser';
import { Response, Request, NextFunction } from 'express';

export class utils {
	static newPasswordAmin = async (req: Request, res: Response, next: NextFunction) => {
		let length = 18;

		let base = 'abcdefghijklmnopqrstuvwxyz';
		const numbers = '0123456789';
		const symbols = '.?,;-_¡!¿*%&/()[]{}°|<>';

		base += numbers;
		base += symbols;

		let resetPassword = '';

		for (let i = 0; i < length; i++) {
			let random = Math.floor(Math.random() * base.length);
			resetPassword += base.charAt(random);
		}

		const newpassword = {
			password: await userModel.encryptPassword(resetPassword),
			resetPassword: true,
		};

		await userModel.findByIdAndUpdate(req, newpassword, { new: true });

		return { status: 'Password reseted', newpassword: resetPassword };
	};
}
