import { getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { Role } from './modelRole';

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
}

const urerModel = getModelForClass(User);

export { urerModel };
