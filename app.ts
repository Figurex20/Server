import express from 'express';
import cors from 'cors';
import path from 'path';
import { routerIncomes } from './src/routes/income.routes';
import { routerUsers } from './src/routes/user.routes';
import { createRoles, createUserAdmin } from './src/LIBS/inisicialSetup';
import cookieParse from "cookie-parser"

const app = express();

const initialState = async () => {
	await createRoles();
	await createUserAdmin();
	return;
};

initialState();

app.set('port', process.env.PORT || 4001);
// app.set('pkg', pkg);
app.use(cors());
app.use(cookieParse())
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use('/api/income', routerIncomes);
app.use('/api/user', routerUsers);

app.get('/cookie', (req, res)=>{
	res.cookie("userLogin", "token", {
		maxAge:84600, 
		expires: new Date(), 
		httpOnly: true, 
		sameSite: 'lax',
		path: "/cookie"
	});
    res.send("hello world")
});


export { app };
