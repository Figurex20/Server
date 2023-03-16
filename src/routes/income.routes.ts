import { Router } from 'express';
const routerIncomes = Router();
// import { authjwt } from '../middlewares';

// const { Token } = authjwt;

import { IncomeController } from '../controllers/income.controllers';

routerIncomes.route('/').get(IncomeController.getIncomes);
// .post([Token.verifyToken, Token.isModerator], IncomeController.createIncome);

routerIncomes.route('/:id');
// .get([Token.verifyToken, Token.isModerator], IncomeController.getIncome)
// .delete([Token.verifyToken, Token.isAdmin], IncomeController.deleteIncome)
// .put([Token.verifyToken, Token.isModerator], IncomeController.updateIncome);

export { routerIncomes };
