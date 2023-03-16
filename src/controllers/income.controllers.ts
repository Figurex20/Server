import { Request, Response } from 'express';
import { incomeModel } from '../models/modelIncome';
import { IPaginateOptions } from 'typegoose-cursor-pagination';

export class IncomeController {
	static getIncomes = async (req: Request, res: Response) => {
		const options: IPaginateOptions = {
			sortField: 'dateEnter',
			sortAscending: false,
			limit: 2,
			next: '',
			previous: '',
		};

		const query = {}; // Your specific query
		const projection = {}; // Your desired projection
		const populate = []; // Your needed population

		//find by onlyEnd
		if (req.query.onlyEnd) {
			const onlyEnd = req.query.onlyEnd;

			if (onlyEnd === 'true') {
				const incomes = await incomeModel.find({ exit: true }, options);
				return res.status(200).json(incomes);
			} else {
				return res.status(400).json({ message: 'the onlyEnd must be true' });
			}
		}

		//find by onlyEnter
		if (req.query.onlyEnter) {
			const onlyEnter = req.query.onlyEnter;

			if (onlyEnter === 'true') {
				const incomes = await incomeModel.find({ exit: 'false' }, options);
				return res.status(200).json(incomes);
			} else {
				return res.status(400).json({ message: 'the onlyEnter must be true' });
			}
		}

		//find by date
		if (req.query.startDate && req.query.endDate) {
			const startDate = req.query.startDate.toString();
			const endDate = req.query.endDate.toString();

			const neWstartDate = new Date(startDate);
			const neWendDate = new Date(endDate);

			const isoStartDate = neWstartDate.toISOString();
			const isoEndDate = neWendDate.toISOString();

			console.log(isoStartDate);
			console.log(isoEndDate);

			const incomes = await incomeModel.find(
				{
					$and: [{ dateEnter: { $gte: isoStartDate } }, { dateEnter: { $lte: isoEndDate } }],
				},
				options
			);

			return res.status(200).json(incomes);
		}

		//find by site
		if (req.query.site) {
			const incomes = await incomeModel.find({ site: req.query.site }, options);
			return res.status(200).json(incomes);
		}

		//find by RDA

		if (req.query.rda) {
			try {
				const incomes = await incomeModel.findPaged(options, { rda: req.query.rda });
				if (incomes.docs.length === 0) throw Error('The RDA does not exist');
				return res.status(200).json(incomes);
			} catch (error) {
				let result = (error as DOMException).message;
				return res.status(404).json({ message: result });
			}
		}

		// normal find
		try {
			const incomes = await incomeModel.findPaged(options, query);
			return res.status(200).json(incomes);
		} catch (error) {
			let result = (error as DOMException).message;
			return res.status(404).json({ message: result });
		}
	};

	// static createIncome = async (req, res) => {
	// 	try {
	// 		const { name, site, whatdo, rda, exit, nameEnter, nameExit, dateEnter, comments } = req.body;

	// 		if (rda.length != 7) {
	// 			return res.status(400).json({ message: 'RDA invalida, tiene que ser de 7 numeros' });
	// 		}

	// 		const newIncome = new Income({
	// 			name,
	// 			site,
	// 			whatdo,
	// 			rda,
	// 			exit,
	// 			nameEnter,
	// 			nameExit,
	// 			dateEnter,
	// 			comments,
	// 		});
	// 		await newincomeModel.save();
	// 		return res.status(201).json({ status: 'Income saved' });
	// 	} catch (error) {
	// 		return res.status(400).json({ message: error.message });
	// 	}
	// };

	// static getIncome = async (req, res) => {
	// 	try {
	// 		const CardIncome = await incomeModel.findById(req.params.id);
	// 		res.status(200).json(CardIncome);
	// 	} catch (error) {
	// 		res.status(404).json({ message: error.message });
	// 	}
	// };

	// static deleteIncome = async (req, res) => {
	// 	try {
	// 		await incomeModel.findByIdAndDelete(req.params.id);
	// 		res.status(200).json({ status: 'Income deleted' });
	// 	} catch (error) {
	// 		res.status(404).json({ message: error });
	// 	}
	// };

	// static updateIncome = async (req, res) => {
	// 	try {
	// 		await incomeModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
	// 		res.status(201).json({ status: 'Income updated' });
	// 	} catch (error) {
	// 		res.status(404).json({ message: error.message });
	// 	}
	// };
}
