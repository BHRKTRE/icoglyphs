import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Définir le chemin vers icoGlyphsLibrary.json
const pathOfIcoGlyphsLibrary = path.resolve(__dirname, '../../../../icoGlyphsLibrary.json');

export default pathOfIcoGlyphsLibrary;
