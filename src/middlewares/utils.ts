import { userModel } from '../models/modelUser';
import { Response, Request, NextFunction } from 'express';
import { userNewChangePasswordInterface } from '../interface/changePasswordInterface';

export class utils {
	static newPasswordAmin = async (idUser: string) => {
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

		await userModel.findByIdAndUpdate(idUser, newpassword, { new: true });

		return { status: '200', newpassword: resetPassword };
	};

	static changePassword = async (userPassword: userNewChangePasswordInterface) => {
		// find user by userName

		const userFound = await userModel
			.findOne({ userName: userPassword.data.user })
			.populate('roles');

		if (!userFound) return { message: 'User not found', status: 400 };

		if (userFound.resetPassword === false) {
			// compare password
			const newPassword = String(userFound.password);
			const matchPassword = await userModel.comparePassword(
				userPassword.data.oldPassword,
				newPassword
			);

			// if password not match
			if (!matchPassword) return { message: 'Invalid Old Password', status: 400 };

			const equalPassword = userPassword.data.newPassword === userPassword.data.confirmNewPassword;

			if (!equalPassword) {
				return { message: 'the passwords are not the same', status: 400 };
			}

			const saveNewpassword = {
				password: await userModel.encryptPassword(userPassword.data.newPassword),
			};

			await userModel.findByIdAndUpdate(userPassword.data._id, saveNewpassword, { new: true });

			return { message: 'Password reseted', status: 200 };
		} else {
			const equalPassword = userPassword.data.newPassword === userPassword.data.confirmNewPassword;

			if (!equalPassword) {
				return { message: 'the passwords are not the same', status: 400 };
			}

			const saveNewpassword = {
				password: await userModel.encryptPassword(userPassword.data.newPassword),
				resetPassword: false,
			};

			await userModel.findByIdAndUpdate(userPassword.data._id, saveNewpassword, { new: true });

			return { message: 'Password changed', status: 200 };
		}
	};
}
