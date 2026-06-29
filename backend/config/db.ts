import mongoose from 'mongoose';
import { config } from './environment';

export const connectDB = async () => {
	try {
		await mongoose.connect(config.mongodb.uri, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true
		});
		console.log('MongoDB Connected...');
	} catch (err: any) {
		console.error(err.message);
		process.exit(1);
	}
};
