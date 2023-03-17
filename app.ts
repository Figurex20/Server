import express from 'express';
import cors from 'cors';
import path from 'path';
import { routerIncomes } from './src/routes/income.routes';
import { routerUsers } from './src/routes/user.routes';

const app = express();

app.set('port', process.env.PORT || 4001);
// app.set('pkg', pkg);
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use('/api/income', routerIncomes);
app.use('/api/user', routerUsers);

export { app };
