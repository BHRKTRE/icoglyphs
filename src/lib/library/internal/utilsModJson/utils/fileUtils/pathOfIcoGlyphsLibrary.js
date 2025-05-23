import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Définir le chemin vers icoglyphsDB.json
const pathOficoglyphsDB = path.resolve(__dirname, '../../../../icoglyphsDB.json');

export default pathOficoglyphsDB;
