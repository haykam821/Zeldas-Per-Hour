const debug = require("debug");

const log = {
	data: debug("zeldas-per-hour:data"),
	main: debug("zeldas-per-hour:main"),
};
module.exports = log;
