import { describe, test, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

const dbPath = path.resolve(__dirname, '../src/lib/library/icoglyphsDB.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

const ids = new Set();
const allAliases = new Set();

// 🔧 Mets ici l'ID à tester, ou null pour tout tester
const targetId = null; // ex: 'icoglyph-camera'

const filteredData = targetId ? db.svgData.filter((ig) => ig.id === targetId) : db.svgData;

for (const ig of filteredData) {
	const idLabel = ig.id;

	describe(`Tests for ig with id: ${idLabel}`, () => {
		test('aliases is array of strings', () => {
			expect(Array.isArray(ig.aliases)).toBe(true);
			ig.aliases.forEach((alias) => expect(typeof alias).toBe('string'));
		});

		test('path is array of strings', () => {
			expect(Array.isArray(ig.path)).toBe(true);
			ig.path.forEach((p) => expect(typeof p).toBe('string'));
		});

		test('tags is array of strings (optional)', () => {
			if (ig.tags !== undefined) {
				expect(Array.isArray(ig.tags)).toBe(true);
				ig.tags.forEach((tag) => expect(typeof tag).toBe('string'));
			}
		});

		test('categories is array of strings (optional)', () => {
			if (ig.categories !== undefined) {
				expect(Array.isArray(ig.categories)).toBe(true);
				ig.categories.forEach((cat) => expect(typeof cat).toBe('string'));
			}
		});

		test('id is unique string', () => {
			expect(typeof ig.id).toBe('string');
			expect(ids.has(ig.id)).toBe(false);
			ids.add(ig.id);
		});

		test('is_public is boolean', () => {
			expect(typeof ig.is_public).toBe('boolean');
		});

		test('aliases are globally unique', () => {
			ig.aliases.forEach((alias) => {
				expect(allAliases.has(alias)).toBe(false);
				allAliases.add(alias);
			});
		});
	});
}
