class icoGlyphConstructor {
	constructor({ name = 'default-name', path = {}, metadata = {}, spec = {} } = {}) {
		this.name = name;

		// Initialize path

		this.path = path;

		// Initialize metadata
		this.metadata = {};

		if (metadata.tags) this.metadata.tags = [...new Set(metadata.tags)];
		if (metadata.categories) this.metadata.categories = metadata.categories;
		if (metadata.publicName) this.metadata.publicName = metadata.publicName;

		// Metadata below will probably not be used
		if (metadata.description) this.metadata.description = metadata.description;
		if (metadata.author) this.metadata.author = metadata.author;
		// Do not create notes if not provided
		if (metadata.notes) {
			this.metadata.notes = {};
			if (metadata.notes.userNote) this.metadata.notes.userNote = metadata.notes.userNote;
			if (metadata.notes.devNote) this.metadata.notes.devNote = metadata.notes.devNote;
		}
		// Remove metadata if it is empty
		if (Object.keys(this.metadata).length === 0) {
			delete this.metadata;
		}

		// Initialize spec
		this.spec = {};

		if (spec.viewBox) this.spec.viewBox = spec.viewBox;

		// Remove spec if it is empty
		if (Object.keys(this.spec).length === 0) {
			delete this.spec;
		}
	}

	toJSON() {
		const json = {
			path: this.path
		};

		// Include metadata only if it exists
		if (this.metadata) json.metadata = this.metadata;

		// Include spec only if it exists
		if (this.spec) json.spec = this.spec;

		return json;
	}
}

module.exports = icoGlyphConstructor;
