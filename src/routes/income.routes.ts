import { Router } from 'express';
// import { authjwt } from '../middlewares';

// const { Token } = authjwt;

import { IncomeController } from '../controllers/income.controllers';
import { AuthMiddleware } from '../middlewares/authorization';

const routerIncomes = Router();

routerIncomes
	.route('/')
	.get(AuthMiddleware.requireAuth, IncomeController.getIncomes)
	.post(IncomeController.createIncome);
// .post([Token.verifyToken, Token.isModerator], IncomeController.createIncome);

routerIncomes.route('/:id').get(AuthMiddleware.requireAuth, IncomeController.getIncome);
// .get([AuthMiddleware.requireAuth, Token.isModerator], IncomeController.getIncome)
// .delete([AuthMiddleware.requireAuth, Token.isAdmin], IncomeController.deleteIncome)
// .put([AuthMiddleware.requireAuth, Token.isModerator], IncomeController.updateIncome);

export { routerIncomes };
