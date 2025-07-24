import { promises as fs } from 'fs';

export class CompactJSONFile {
	constructor(filename) {
		this.filename = filename;
	}

	async read() {
		try {
			const data = await fs.readFile(this.filename, 'utf-8');
			return JSON.parse(data);
		} catch (e) {
			if (e.code === 'ENOENT') return null;
			throw e;
		}
	}

	async write(obj) {
		let json = JSON.stringify(obj, null, 2);

		// Compact arrays of strings (["a", "b", "c"]) into one line
		json = json.replace(
			/\[\s*\n\s*("(?:[^"]|\\")*")(?:,\s*\n\s*"(?:[^"]|\\")*")*\s*\n\s*\]/g,
			(match) => {
				// Remove all newlines and excessive spaces
				const singleLine = match
					.replace(/\n\s*/g, ' ') // newlines to spaces
					.replace(/\s\s+/g, ' ') // collapse spaces
					.replace(/\[\s*/, '[') // clean opening
					.replace(/\s*\]/, ']') // clean closing
					.replace(/,\s*/g, ', '); // space after commas
				return singleLine;
			}
		);

		await fs.writeFile(this.filename, json + '\n');
	}
}
