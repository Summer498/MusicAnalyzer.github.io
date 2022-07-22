export const typeOf = o => {
	const str = Object.prototype.toString(o);
	if (str != "[object Object]") { return str; }
	return o.constructor;
};
Object.prototype.isTheType = function (typeName) { return typeOf(this) == typeOf(typeName()); };
