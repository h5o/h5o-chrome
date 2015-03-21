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
				"expand": true,
				"src": ["MIT-LICENSE.TXT", "README.md"],
				"dest": "dist/extension/"
			},
			"extension": {
				"expand": true,
				"cwd": 'src/',
				"src": ["**"],
				"dest": "dist/extension/"
			},
			"crx": {
				// crx extension has extra permissions and an update URL
				"expand": true,
				"cwd": "dist/extension/",
				"src": ["**"],
				"dest": "dist/extension-standalone/"
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
		},
		"gh-pages": {
			"options": {
				base: "dist",
				add: true,
				repo: "git@github.com:h5o/h5o.github.io.git",
				branch: "master"
			},
			"src": "crx-updates.xml"
		}
	});

	grunt.registerTask("default", "Clean build", ["clean:all", "build", "crx", "compress"]);

	grunt.registerTask("build", "Build unpacked extension", ["gen-manifest", "copy:h5o", "copy:extension", "copy:license", "copy:crx"]);

	grunt.registerTask("crx", "Build the final crx", function () {
		if (!process.env["H5O_CRX"]) return;

		var manifest = grunt.file.readJSON("dist/extension/manifest.json");
		manifest["update_url"] = "https://h5o.github.io/crx-updates.xml";
		manifest["permissions"].push("file://*/*");
		manifest["content_scripts"][0]["matches"].push("file://*/*");
		grunt.file.write("dist/extension-standalone/manifest.json", JSON.stringify(manifest, null, "  "));

		var shelljs = require("shelljs");
		var passphraseEnvVarName = process.env["H5O_CRX_KEY_PASSPHRASE"] ? "H5O_CRX_KEY_PASSPHRASE" : "";
		var res = shelljs.exec(grunt.template.process("./crxmake.sh dist/extension-standalone h5o-chrome.key " + passphraseEnvVarName));
		if (res.code !== 0) {
			grunt.fail.fatal("Failed building the crx");
		}
		shelljs.mv("extension-standalone.crx", grunt.template.process("dist/outliner-v<%= pkg.version %>.crx"));
		grunt.file.write("dist/crx-updates.xml", grunt.template.process(grunt.file.read("./crx-updates.xml.ejs"), {
			data: {
				appId: "dopdihoblkcnhcniellcadnidfmnalmn",
				version: manifest.version,
				downloadLink: "https://github.com/h5o/h5o-chrome/releases/download/" + manifest.version + "/outliner-v" + manifest.version + ".crx"
			}
		}));
	});

	grunt.registerTask("gen-manifest", function () {

		var manifest = grunt.file.readJSON("manifest.json");
		manifest.version = grunt.config.get("pkg.version");
		manifest.author = grunt.config.get("pkg.author");
		grunt.file.write("dist/extension/manifest.json", JSON.stringify(manifest, null, "  "));

	});

	grunt.renameTask("release", "_release");
	grunt.registerTask("release", function () {
		var bump = grunt.option("bump");
		if (bump != "patch" && bump != "minor" && bump != "major") grunt.fail.fatal("Please pass --bump");
		grunt.task.run(["_release:" + bump]);
	});

};
