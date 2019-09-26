import dotenv from "dotenv"
import path from "path"
dotenv.config({path: path.resolve(__dirname, ".env")})

import { adjectives, nouns } from "./words";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport"
import jwt from "jsonwebtoken";


export const generateSecret = () => {
	const randumNumber = Math.floor(Math.random() * adjectives.length);
	return `${adjectives[randumNumber]}${nouns[randumNumber]}`
}

const sendMail = (email) => {
	const options = {
		auth: {
			api_user: process.env.SENDGRID_USERNAME,
			api_key: process.env.SENDGRID_PASSWORD
		}
	}

	var client = nodemailer.createTransport(sgTransport(options));
	return client.sendMail(email);

};

export const sendSecretMail = (address, secret) => {
	const email = {
		from: "noggong@gamil.com",
		to: address,
		subject: "Login secret for Prismagram",
		html: `Hello! Your login secret is <b>${secret}</b>.<br/> Copy paste on the app/website to log in`
	}

	return sendMail(email )
}

export const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);
