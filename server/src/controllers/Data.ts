import { NextFunction, Response, Request } from 'express';
import { Op } from 'sequelize';
import fs from 'fs';
import axios from 'axios';
import xlsx from 'xlsx';
import mongoose, { Schema } from 'mongoose';
// @ts-ignore
const XlsxPopulate = require('xlsx-populate');

var Any = new Schema(
	{
		data: {
			type: Array
		},
		month: {
			type: String
		},
		sheet: {
			type: Array
		}
	},
	{
		timestamps: true
	}
);

const Data = mongoose.model('Person', Any);

const SendData = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const filePath = 'E:\\codes\\DM Dashboard\\server\\Aug.xlsx';
		let finalArr: any = [];

		// Check if the file exists
		if (!fs.existsSync(filePath)) {
			console.error('File not found.');
		}
		const workbook = xlsx.readFile(filePath);
		// Assuming you have only one sheet in the Excel file
		const sheetName = workbook.SheetNames[0];
		const sheet = workbook.Sheets[sheetName];
		// Parse the sheet data to JSON
		const jsonData = xlsx.utils.sheet_to_json(sheet);
		jsonData.map((item: any, index: any) => {
			let Heading = item[`__EMPTY`];
			if (item['__EMPTY'] != undefined) {
				if (
					Heading == 'Production' ||
					Heading == 'HM Si' ||
					Heading == 'HM S' ||
					Heading == 'HM Temp' ||
					Heading == 'Quality Index of HM -5MT' ||
					Heading == 'Stack heat loss' ||
					Heading == 'Fuel Rate' ||
					Heading == 'Slag B2' ||
					Heading == 'HBT' ||
					Heading == 'CDI Rate' ||
					Heading == 'Slag Rate' ||
					Heading == 'Flux Rate' ||
					Heading == 'Total Moisture Input' ||
					Heading == 'ETA CO' ||
					Heading == 'CWI' ||
					Heading == 'Quality Index of HM -BF 2' ||
					Heading == 'F2 (Furnace Permeability)' ||
					Heading == 'Sp. Total Fines Input' ||
					Heading == 'COKE MOISTURE' ||
					Heading == 'Total Oxygen'
				) {
					let unit;
					let arr: any = [];

					for (let index = 1; index <= 31; index++) {
						if (index == 1) {
							unit = item[`__EMPTY_${index}`];
						} else {
							arr.push(item[`__EMPTY_${index}`]);
						}
					}

					if (Heading == 'Production' || Heading == 'Quality Index of HM -5MT' || Heading == 'Fuel Rate' || Heading == 'CDI Rate') {
						let obj = {
							values: arr,
							unit: unit,
							name: Heading,
							type: 'MKPI'
						};
						finalArr.push(obj);
					} else {
						let obj = {
							values: arr,
							unit: unit,
							name: Heading,
							type: 'CKPI'
						};
						finalArr.push(obj);
					}
				}
			}
		});
		let dateObj = new Date();
		let month = dateObj.getUTCMonth() + 1; //months from 1-12
		let year = dateObj.getUTCFullYear();

		const newdate = year + '-' + month;

		const exits = await Data.findOne({ month: newdate });
		const filter = { month: newdate };
		const update = { data: finalArr };

		if (exits) {
			const doc = await Data.findOneAndUpdate(filter, update, {
				new: true
			});
			console.log(doc);
		} else {
			const person = await new Data({
				data: finalArr,
				month: newdate,
				sheet: []
			}).save();
		}

		return res.status(200).json(finalArr);
	} catch (error) {
		return res.status(500).json({ message: error });
	}
};

const SendData2 = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const exists = await Data.findOne({ month: req?.body?.month });
		if (exists) {
			return res.status(200).json(exists);
		} else {
			return res.status(500).json({ message: 'Data Not Found' });
		}
	} catch (error) {
		return res.status(500).json({ message: error });
	}
};

const getData = async (req: Request, res: Response, next: NextFunction) => {
	console.log(req.body);
	try {
		let dateObj = new Date();
		let month = dateObj.getUTCMonth() + 1; //months from 1-12
		let year = dateObj.getUTCFullYear();

		const newdate = year + '-' + month;
		const filePath = 'E:\\codes\\DM Dashboard\\server\\sheet.xlsx';
		XlsxPopulate.fromFileAsync(filePath)
			.then(async (workbook: any) => {
				// Assuming you want to update the first sheet in the existing workbook
				const sheet = workbook.sheet(0);

				const exists = await Data.findOne({ month: newdate });
				console.log(exists);
				let sheetArr = exists?.sheet as any[];

				// Define the new data you want to write
				const newData = [...sheetArr, [`${req.body.month} ${req.body.date}`, `${req.body.item}`, `${req.body.reason}`]];
				console.log(newData);

				const filter = { month: newdate };
				const update = { sheet: newData };

				if (exists) {
					const doc = await Data.findOneAndUpdate(filter, update, {
						new: true
					});
				}

				// Update the sheet with new data starting from the second row
				sheet.cell('B6').value(newData);

				// Save the updated workbook back to the same file
				return workbook.toFileAsync(filePath);
			})
			.then(() => {
				console.log(`Data has been updated in ${filePath}`);
				return res.status(200).json({ message: 'success' });
			})
			.catch((err: any) => {
				console.error('Error:', err);
			});
	} catch (error) {
		return res.status(500).json({ message: error });
	}
};

export default {
	SendData,
	SendData2,
	getData
};
