// available on JavaScript only

export const typeOf = o => {
	const str = Object.prototype.toString(o);
	return (str == "[object Object]") ? o.constructor : str;
};
