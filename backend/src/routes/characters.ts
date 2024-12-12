import { Router, Request, Response } from 'express';
import { Db } from 'mongodb';

const router: Router = Router();
let db: Db;

export const setDB = (database: Db) => {
  db = database;
};

router.get('/characters', async (req: Request, res: Response) => {
  try {
    const characters = await db.collection('GOT-app').find().toArray();
    res.json(characters);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
