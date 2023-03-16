import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
@modelOptions({
	schemaOptions: {
		_id: false,
	},
})
export class Role {
	@prop()
	name: String;
}

const roleModel = getModelForClass(Role);

export { roleModel };
