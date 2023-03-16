import { plugin, getModelForClass, modelOptions, prop, index } from '@typegoose/typegoose';
import paginationPlugin, { PaginateModel } from 'typegoose-cursor-pagination';

@plugin(paginationPlugin)
@index({ dateEnter: 1 })
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

const incomeModel = getModelForClass(Income) as PaginateModel<Income, typeof Income>;

export { incomeModel };
