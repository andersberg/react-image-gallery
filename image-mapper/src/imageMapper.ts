import dotenv from "dotenv";
import env from "env-var";
import { accessSync, existsSync, mkdirSync } from "fs";
import mapImages from "./mapImages";
import { verifyPath } from "./utils";

dotenv.config();

const IMAGES_DIRECTORY = env.get("IMAGES_DIRECTORY").required().asString();
console.log("IMAGES_DIRECTORY", IMAGES_DIRECTORY);
const CONFIG_DIRECTORY = env.get("CONFIG_DIRECTORY").required().asString();
console.log("CONFIG_DIRECTORY", CONFIG_DIRECTORY);

function setup() {
	verifyPath(IMAGES_DIRECTORY);
	accessSync(IMAGES_DIRECTORY);

	if (!existsSync(CONFIG_DIRECTORY)) {
		mkdirSync(CONFIG_DIRECTORY, { recursive: true });
		console.log(`Created directory ${CONFIG_DIRECTORY}`);
	}

	verifyPath(CONFIG_DIRECTORY);
	accessSync(CONFIG_DIRECTORY);
}

try {
	setup();
	mapImages(IMAGES_DIRECTORY, CONFIG_DIRECTORY);
} catch (error) {
	console.log(error);
	process.exit(1);
} finally {
	process.exit(0);
}
