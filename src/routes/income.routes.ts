import { Router } from 'express';
// import { authjwt } from '../middlewares';

// const { Token } = authjwt;

import { IncomeController } from '../controllers/income.controllers';
import { AuthMiddleware } from '../middlewares/authorization';

const routerIncomes = Router();

routerIncomes
	.route('/')
	.get(IncomeController.getIncomes)
	.post(AuthMiddleware.requireAuthModerator, IncomeController.createIncome);

routerIncomes
	.route('/:id')
	.get(AuthMiddleware.requireAuthAdmin, IncomeController.getIncome)
	.delete(AuthMiddleware.requireAuthAdmin, IncomeController.deleteIncome)
	.put(AuthMiddleware.requireAuthAdmin, IncomeController.updateIncome);

export { routerIncomes };
