import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';

const authenticate = (req: Request | any, res: Response, next: NextFunction) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader?.split(' ')[1];

	if (token === null) return res.sendStatus(401);
	else {
		jwt.verify(token!, config.secret, (err: any, user: any) => {
			if (err) {
				return res.sendStatus(403);
			} else {
				req.user = user;
				next();
			}
		});
	}
};

export const adminAuthenticate = (req: Request | any, res: Response, next: NextFunction) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader?.split(' ')[1];
	if (token === null) return res.sendStatus(401);
	else {
		jwt.verify(token!, config.secret, (err: any, user: any) => {
			if (err) {
				return res.sendStatus(403);
			} else {
				if (user.name === 'admin') {
					req.user = user;
					next();
				} else {
					return res.sendStatus(403);
				}
			}
		});
	}
};

export default authenticate;
