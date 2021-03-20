import env from "env-var";
import dotenv from "dotenv";
import { resolve } from "path";

// Setup
dotenv.config({
	path: resolve(process.cwd(), "..", ".env"),
});

// Environment Varaibles
export const APP_PORT = env.get("APP_PORT").required().asPortNumber();
export const API_ENDPOINT = env.get("API_ENDPOINT").required().asString();
export const HOST = env.get("HOST").required().asString();
export const IMAGES_DIR = env.get("IMAGES_DIR").required().asString();
export const SERVER_PORT = env.get("SERVER_PORT").required().asPortNumber();

// Common

// Server
export const SERVER_URL = `${HOST}:${SERVER_PORT}`;

// App

// Api
export const API_URL = `${HOST}:${APP_PORT}/${API_ENDPOINT}`;
export const API_URL_ALBUMS = `${API_URL}/albums`;
export const API_URL_IMAGES = `${API_URL}/images`;
