var path = require("path");
var fs = require("fs");
var ui5ToES6 = require("@ui5/to-es6");

module.exports = function() {
	"use strict";
	return {
		name: "ui5",
		resolveId: function(source) {
			if (source.startsWith("sap/ui/demo/todo/") || source.endsWith("__Component-preload__")) {
				return source;
			}
			 if (source.startsWith("sap/")) {
				return {id: source, external: true};
			}
			return null;
		},
		load: function(id) {
			if (id.startsWith("sap/ui/demo/todo/")) {
				return fs.readFileSync(
					path.join(__dirname, "webapp", id.substr("sap/ui/demo/todo/".length) + ".js"), {encoding: "utf8"}
				);
			}
			return null;
		},
		transform: function(code, id) {
			var transformed = ui5ToES6(code, { id });
			return transformed;
		},
		renderChunk: function(code, chunk, options) {
			chunk.code = "sap.ui." + code;
			return chunk;
		}
	};
};
