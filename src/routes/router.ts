import { app } from '../../app';
import { routerIncomes } from './income.routes';
import { routerUsers } from './user.routes';

app.use('/api/income', routerIncomes);
app.use('/api/user', routerUsers);
