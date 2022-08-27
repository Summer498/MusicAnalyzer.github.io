// available on JavaScript only

export const typeOf = o => {
	const str = Object.prototype.toString(o);
	const res =str == "[object Object]" ? o.constructor : str;
	return res;
};
