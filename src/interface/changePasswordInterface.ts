export interface userNewChangePasswordInterface {
	option: string;
	data: {
		oldPassword: string;
		newPassword: string;
		confirmNewPassword: string;
		_id: string;
		user: string;
	};
}
