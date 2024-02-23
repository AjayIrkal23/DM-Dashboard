import express, { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { v4 as uuidv4 } from 'uuid';
import Data from '../controllers/Data';

const router = express.Router();

router.get('/hello', (req, res, next) => res.status(200).json({ message: 'hello vaiii' }));

router.get('/app', Data.SendData);
router.post('/Ucl', Data.SendUcl);
router.post('/app2', Data.SendData2);
router.post('/app3', Data.getData);

export = router;
