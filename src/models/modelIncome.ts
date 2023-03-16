import mongoosePaginate from 'mongoose-paginate-v2';
import { plugin, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';

@plugin(mongoosePaginate)
@modelOptions({
	schemaOptions: {
		timestamps: true,
	},
})
class Income {
	@prop({
		type: String,
		required: true,
		trim: true,
	})
	name: String;

	@prop({
		type: String,
		required: true,
		trim: true,
	})
	site: String;

	@prop({
		type: String,
		required: true,
		trim: true,
	})
	whatdo: String;

	@prop({
		type: String,
		required: true,
		trim: true,
		maxlength: 7,
		minlength: 7,
	})
	rda: String;

	@prop({
		type: Boolean,
	})
	exit?: Boolean;

	@prop({
		type: String,
		required: true,
		trim: true,
	})
	nameEnter: String;

	@prop({
		type: String,
		trim: true,
	})
	nameExit?: String;

	@prop({
		type: String,
		trim: true,
	})
	dateExit?: String;

	@prop({
		type: String,
		required: true,
		trim: true,
	})
	dateEnter: String;

	@prop({
		type: String,
		trim: true,
	})
	comments?: String;
}

const incomeModel = getModelForClass(Income);

export { incomeModel };
