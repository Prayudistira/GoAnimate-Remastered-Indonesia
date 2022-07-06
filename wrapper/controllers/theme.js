/**
 * theme routes
 */
// modules
const assert = require("node:assert");
const httpz = require("httpz");
const path = require("path");
// vars
const folder = path.join(__dirname, "../", process.env.THEME_FOLDER);
// stuff
const fUtil = require("../utils/fileUtil");

// create the group
const group = new httpz.Group();

group
	// list
	.route("POST", "/goapi/getThemeList/", async (req, res) => {
		const xmlPath = path.join(folder, "themelist.xml");
		const zip = await fUtil.zippy(xmlPath, "themelist.xml");
		res.setHeader("Content-Type", "application/zip");
		res.end(zip);
	})
	// load
	.route("POST", "/goapi/getTheme/", async (req, res) => {
		const id = req.body.themeId;
		assert(id, "Missing one or more fields.");

		const xmlPath = path.join(folder, `${id}.xml`);
		const zip = await fUtil.zippy(xmlPath, "theme.xml");
		res.setHeader("Content-Type", "application/zip");
		res.end(zip);
	});

module.exports = group;