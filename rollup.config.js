var ui5 = require("./rollup-plugin-ui5");

module.exports = {
	input: "./webapp/Component-preload.js",
	plugins: [ui5()],
	output: [
		{
			file: "dist/Component-preload.js",
			format: "amd"
		}
	]
};
