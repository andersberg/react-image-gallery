import imageMapper from "../src/mapImages";

// const path = "/Volumes/Data/images";

(async () => {
	process.env.IMAGES_DIR = "/Volumes/Data/images";
	await imageMapper();
})();
