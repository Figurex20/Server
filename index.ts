import { app } from './app';
import { connectDB } from './database';
import { incomeModel } from './src/models/modelIncome';
// import express from 'express';
// import path from 'path';
// import cors from 'cors';

app.listen(4000);

const start = async () => {
	await connectDB();

	console.log(`Server on port ${4000}`);
};

start();
