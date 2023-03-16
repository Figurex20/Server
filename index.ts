import { app } from './app';
import { connectDB } from './database';
import { incomeModel } from './src/models/modelIncome';
// import express from 'express';
// import path from 'path';
// import cors from 'cors';

app.listen(4000);

const newIncome = async () => {
	const income = new incomeModel({
		name: 'hola',
		site: 'hola',
		whatdo: 'hola',
		rda: '1234567',
		exit: false,
		nameEnter: 'hola',
		// nameExit: 'hola',
		// dateExit: 'hola',
		dateEnter: 'hola',
		// comments: 'hola',
	});

	await income.save();
	console.log(income);
};

const start = async () => {
	await connectDB();

	// await newIncome();

	console.log(`Server on port ${4000}`);
};

start();
