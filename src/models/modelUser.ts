import { getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { Role } from './modelRole';
import bcrypt from 'bcryptjs';

@modelOptions({
	schemaOptions: {
		timestamps: true,
		_id: false,
	},
})
class User {
	@prop({ required: true, trim: true, unique: true })
	userName: String;

	@prop({ required: true, trim: true, unique: true })
	email: String;

	@prop({ required: true, trim: true })
	password: String;

	@prop({ required: true, trim: true })
	recoverpassword: String;

	@prop()
	resetPassword: boolean;

	@prop({ type: String, required: true })
	role: String;

	@prop({ type: String, required: true })
	name: String;

	@prop({ type: String, required: true })
	lastname: String;

	@prop({ ref: () => Role })
	roles: Ref<Role>[];

	static async encryptPassword(password: string) {
		const salt = await bcrypt.genSalt(10);
		return bcrypt.hash(password, salt);
	}

	static async comparePassword(password: any, recivePassword: any) {
		return await bcrypt.compare(password, recivePassword);
	}
}

const urerModel = getModelForClass(User);

export { urerModel };
