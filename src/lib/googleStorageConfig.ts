import { Storage } from '@google-cloud/storage';
import path from 'path';
import 'dotenv/config';
import { v4 as uuidv4 } from 'uuid';

const keyFile = path.resolve(String(process.env.GCP_PATH_SA));

export const storage = new Storage();
//   {
//   keyFilename: keyFile,
//   projectId: String(process.env.PROJECT_ID),
// }

const bucketName = process.env.GCP_BUCKET_NAME || 'wiradana-bucket';
const bucket = storage.bucket(bucketName!);

export const uploadToGCS = async (file: File): Promise<string> => {
  const fileName = `${uuidv4()}-${file.name}`;
  const blob = bucket.file(fileName);

  const blobStream = blob.createWriteStream({
    resumable: false,
    metadata: {
      contentType: file.type,
    },
  });

  return new Promise((resolve, reject) => {
    blobStream.on('error', (error) => {
      reject(error);
    });

    blobStream.on('finish', async () => {
      // Remove makePublic() call
      const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
      resolve(publicUrl);
    });

    file
      .arrayBuffer()
      .then((buffer) => {
        blobStream.end(Buffer.from(buffer));
      })
      .catch((error) => reject(error));
  });
};
