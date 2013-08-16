/**
 * class Hash < Object
 *
 * This class represents a managed key-value pair store.
 **/
function Hash(data) {
	if (data) {
		this.merge(data);
	}
}
Hash.prototype = {

	empty: function empty() {
		var keys = this.keys(), i = 0, length = keys.length, key;

		for (i; i < length; i++) {
			key = keys[i];
			this[key] = null;
			delete this[key];
		}

		return this;
	},

	exists: function exists(key) {
		return (!this.isReserved(key) && this.hasOwnProperty(key)) ? true : false;
	},

	filter: function filter(callback, context) {
		context = context || this;
		var filteredHash = new Hash();

		for (var key in this) {
			if (this.exists(key) && callback.call(context, key, this[key])) {
				filteredHash.set(key, this[key]);
			}
		}

		return filteredHash;
	},

	forEach: function forEach(callback, context) {
		context = context || this;

		for (var key in this) {
			if (this.exists(key)) {
				callback.call(context, key, this[key]);
			}
		}

		callback = context = null;

		return this;
	},

	get: function get(key) {
		if (this.isReserved(key)) {
			throw new Error("Cannot get reserved property: " + key);
		}
		else {
			return this.hasOwnProperty(key) ? this[key] : null;
		}
	},

	isEmpty: function isEmpty() {
		return this.size() === 0;
	},

	isReserved: function isReserved(key) {
		return this.__proto__.hasOwnProperty(key);
	},

	keys: function keys() {
		var keys = [];

		for (var key in this) {
			if (this.exists(key)) {
				keys.push(key);
			}
		}

		return keys;
	},

	merge: function merge(overrides) {
		if (!overrides) {
			throw new Error("Missing required argument: overrides");
		}

		for (var key in overrides) {
			if (overrides.hasOwnProperty(key)) {
				if (this[key] instanceof Hash && overrides[key] instanceof Object) {
					this[key].merge(overrides[key]);
				}
				else {
					this.set(key, overrides[key]);
				}
			}
		}

		return this;
	},

	set: function set(key, value) {
		if (this.isReserved(key)) {
			throw new Error("Cannot set reserved property: " + key);
		}

		this[key] = value;

		return this;
	},

	size: function size() {
		return this.keys().length;
	},

	toString: function toString() {
		return "[object Hash]";
	}

};