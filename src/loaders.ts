import * as fs from "fs";
import * as path from "path";
import { promisify } from "util";
import { logger } from "./logger";
import { IRouteParams, ISettings } from "./types";

const readDir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);

export const loadRoutes = async (config: ISettings, directory: string, params: IRouteParams) => {
	logger.info("Loading routes...");
	const files = await readDir(directory);

	files
		.filter((file) => file.endsWith(".js") || file.endsWith(".ts"))
		.forEach((file) => {
			require(path.join(directory, file)).default(params);
			logger.info("Loaded route " + file);
		});
};

export const loadConfig = async (file: string): Promise<ISettings> => {
	logger.info("Loading configuration file...");
	const fileData = await readFile(file, "utf8");

	return JSON.parse(fileData);
};
