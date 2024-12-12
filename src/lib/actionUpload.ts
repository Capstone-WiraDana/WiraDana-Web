'use server';
import storage from './googleStorageConfig';
import 'dotenv/config';

const bucketName = String(process.env.GCP_BUCKET_NAME) || 'wiradana-bucket';

export const uploadPhoto = async (
  form: FormData,
  newFileName: string,
): Promise<boolean> => {
  try {
    const file = form.get('file') as File;
    if (!file) throw new Error('No file provided...');
    if (file.size < 1) throw new Error('File is empty...');

    const buffer = await file.arrayBuffer();
    const folderPath = 'uploads/users/';
    const filePath = `${folderPath}${newFileName}`;

    await storage.bucket(bucketName).file(filePath).save(Buffer.from(buffer));

    return true;
  } catch (err: any) {
    console.error('Error uploading file:', err);
    return false;
  }
};
