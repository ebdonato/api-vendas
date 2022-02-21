import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

export const uploadDirectory = path.resolve(__dirname, '..', '..', 'uploads');

export default {
    directory: uploadDirectory,
    storage: multer.diskStorage({
        destination: uploadDirectory,
        filename(request, file, callback) {
            const hash = crypto.randomBytes(10).toString('hex');

            const filename = `${hash}-${file.originalname}`;

            callback(null, filename);
        },
    }),
};
