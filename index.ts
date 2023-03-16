import { app } from './app';
import { connectDB } from './database';
import { incomeModel } from './src/models/modelIncome';
// import express from 'express';
// import path from 'path';
// import cors from 'cors';

app.listen(4000);

const newIncome = async () => {
	const income = new incomeModel({
		name: 'ALOSNO',
		site: 'MTR400',
		whatdo: 'hola',
		rda: '7654321',
		exit: false,
		nameEnter: 'CCR',
		// nameExit: 'hola',
		// dateExit: 'hola',
		dateEnter: '2023-03-14T21:14:54.117Z',
		// comments: 'hola',
	});

	await income.save();
	console.log(income);
};

const start = async () => {
	await connectDB();

	console.log(`Server on port ${4000}`);
};

start();
