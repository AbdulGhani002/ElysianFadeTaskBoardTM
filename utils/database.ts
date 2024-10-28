import { MongoClient } from 'https://deno.land/x/mongo@v0.29.0/mod.ts';

let db;

export const connectToDatabase = async () => {
  if (db) return db;

  const client = new MongoClient();
  await client.connect(Deno.env.get('MONGODB_URI'));
  db = client.database('ElysianFadeTaskBoardTM');
  return db;
};
