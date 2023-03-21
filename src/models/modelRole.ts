import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose';

export class Role {
	@prop({ type: String })
	name: String;
}

const roleModel = getModelForClass(Role);

export { roleModel };
