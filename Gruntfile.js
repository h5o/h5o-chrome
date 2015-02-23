module.exports = function (grunt) {

	require("time-grunt")(grunt);
	require("load-grunt-tasks")(grunt);

	grunt.initConfig({
		"pkg": grunt.file.readJSON("package.json"),
		"clean": {
			"all": ["dist/**"]
		},
		"copy": {
			"h5o": {
				"src": ["node_modules/h5o/dist/outliner.min.js"],
				"dest": "dist/extension/outliner.min.js"
			},
			"license": {
				"src": ["MIT-LICENSE.TXT"],
				"dest": "dist/extension/MIT-LICENSE.TXT"
			},
			"extension": {
				"expand": true,
				"cwd": 'src/',
				"src": ["**"],
				"dest": "dist/extension/"
			}
		},
		"compress": {
			"extension": {
				"expand": true,
				"cwd": "dist",
				"src": ["extension/**"],
				"options": {
					"archive": "dist/outliner-v<%= pkg.version %>.zip"
				}
			}
		}
	});

	grunt.registerTask("default", "Clean build", ["clean:all", "build"]);

	grunt.registerTask("build", "Build unpacked extension", [ "gen-manifest", "copy:h5o", "copy:extension", "copy:license" ]);

	grunt.registerTask("gen-manifest", function () {

		var manifest = grunt.file.readJSON("manifest.json");
		manifest.version = grunt.config.get("pkg.version");
		grunt.file.write("dist/extension/manifest.json", JSON.stringify(manifest, null, "  "));

	});

};
