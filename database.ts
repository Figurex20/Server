import mongoose from 'mongoose';

const URI = process.env.MONGODB_URI ? process.env.MONGODB_URI : 'mongodb://127.0.0.1/TS';

const connectDB = async () => {
	mongoose.set('strictQuery', false);
	mongoose.connect(URI);

	const connectionDB = mongoose.connection;

	connectionDB.once('open', () => {
		console.log('DB is connected: ', connectionDB.name);
	});
};
export { connectDB };
