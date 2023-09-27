import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 8000;
const secret = String(process.env.SECRET_KEY);
const round = Number(process.env.SALT_ROUND);
const mj_api_key = String(process.env.MJ_APIKEY_PUBLIC);
const mj_secret_key = String(process.env.MJ_APIKEY_PRIVATE);
const subscribe_email_key = String(process.env.SUBSCRIBE_EMAIL_KEY);
const POSTGRES_USER = String(process.env.POSTGRES_USER);
const POSTGRES_HOST = String(process.env.POSTGRES_HOST);
const POSTGRES_PASSWORD = String(process.env.POSTGRES_PASSWORD);
const POSTGRES_DATABASE = String(process.env.POSTGRES_DATABASE);
const POSTGRES_PORT = Number(process.env.POSTGRES_PORT);
const whatsapp_id = String(process.env.WHATSAPP_ID);
const whatsapp_pass = String(process.env.WHATSAPP_PASSWORD);
const Token = String(process.env.JWT_TOKEN);
const Zoom_api = String(process.env.ZOOM_API_KEY);
const Zoom_sec = String(process.env.ZOOM_SEC_KEY);

const db = new Sequelize(POSTGRES_DATABASE, POSTGRES_USER, POSTGRES_PASSWORD, {
	host: POSTGRES_HOST,
	port: POSTGRES_PORT,
	dialect: 'postgres',
	logging: false
});

export const config = {
	db,
	server: { port: SERVER_PORT },
	secret,
	round,
	mj_api_key,
	mj_secret_key,
	subscribe_email_key,
	whatsapp_id,
	whatsapp_pass,
	Token,
	Zoom_api,
	Zoom_sec
};
