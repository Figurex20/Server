import { getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { Role } from './modelRole';
import bcrypt from 'bcryptjs';
import { models } from 'mongoose';

@modelOptions({
	schemaOptions: {
		timestamps: true,
	},
})
class User {
	@prop({ required: true, trim: true, unique: true })
	userName: String;

	@prop({ required: true, trim: true, unique: true })
	email: string;

	@prop({ required: true, trim: true })
	password: string;

	@prop({ trim: true })
	recoverpassword: string;

	@prop()
	resetPassword: boolean;

	@prop({ type: String, required: true })
	role: string;

	@prop({ type: String, required: true })
	name: string;

	@prop({ type: String, required: true })
	lastname: string;

	@prop({ ref: () => Role })
	roles: Ref<Role>[];

	static async encryptPassword(password: string) {
		const salt = await bcrypt.genSalt(10);
		return bcrypt.hash(password, salt);
	}

	static async comparePassword(password: string, recivePassword: string) {
		return await bcrypt.compare(password, recivePassword);
	}
}

// const userModel = models.User || getModelForClass(User);
const userModel = getModelForClass(User);

export { userModel };
