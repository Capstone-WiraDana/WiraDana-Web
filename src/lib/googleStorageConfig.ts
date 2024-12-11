import { Storage } from '@google-cloud/storage';
import path from 'path';
import 'dotenv/config';

const keyFile = path.resolve(String(process.env.GCP_PATH_SA));

const storage = new Storage({
  keyFilename: keyFile,
  projectId: String(process.env.PROJECT_ID),
});

export default storage;
