import fs from 'fs-extra';
import path from 'path';

export const loadImageToBase64 = async (filePath: string) =>
  (
    await fs.readFile(path.resolve(__dirname, '..', filePath), 'base64')
  ).replace(/^data:image\/\w+;base64,/, '');
