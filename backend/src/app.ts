import express, { Application } from 'express';
import { MongoClient, Db } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';
import charactersRouter, { setDB } from './routes/characters';

dotenv.config();

const app: Application = express();
const port: number = 3000;


const url: any = process.env.MONGO_URL
const dbName: string = 'GOT-app';

let db: Db;

// Connect to MongoDB Atlas
const connectDB = async (): Promise<void> => {
  try {
    const client = await MongoClient.connect(url);
    db = client.db(dbName);
    setDB(db);
    console.log('Connected to Database');
  } catch (error) {
    console.error('Error connecting to database:', error);
    process.exit(1);
  }
};

app.use(cors()); // Enable CORS
app.use('/api', charactersRouter);

app.listen(port, async () => {
  await connectDB();
  console.log(`App listening at http://localhost:${port}`);
});
