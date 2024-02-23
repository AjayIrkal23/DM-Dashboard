import { NextFunction, Response, Request } from 'express';
import fs from 'fs';
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
		const filePath = 'E:\\codes\\DM Dashboard\\server\\data.xlsx';
		let finalArr: any = [];

		// Check if the file exists
		if (!fs.existsSync(filePath)) {
			console.error('File not found.');
		}
		const workbook = xlsx.readFile(filePath);
		// Assuming you have only one sheet in the Excel file
		const sheetName = workbook.SheetNames[4];
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
					Heading == 'Total Oxygen' ||
					Heading == 'Al2O3 Input' ||
					Heading == 'Coke CSR'
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
							name: Heading
						};
						finalArr.push(obj);
					} else {
						let obj = {
							values: arr,
							unit: unit,
							name: Heading
						};
						finalArr.push(obj);
					}
				}
			}
		});
		let dateObj = new Date();
		let month = dateObj.getUTCMonth() + 1; //months from 1-12
		let year = dateObj.getUTCFullYear();

		console.log(month);

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

const getVar = (values: any, mean: any) => {
	let sumOfSquaredDifferences = 0;

	for (let index = 0; index < values.length; index++) {
		let num = Number(values[index]);
		let squaredDifference = Math.pow(num - mean, 2);
		sumOfSquaredDifferences += squaredDifference;
	}

	const averageOfSquaredDifferences = sumOfSquaredDifferences / values.length;
	const standardDeviation = Math.sqrt(averageOfSquaredDifferences);

	console.log(values.length);

	return standardDeviation;
};

const SendUcl = async (req: Request, res: Response, next: NextFunction) => {
	console.log(req.body);
	try {
		let dateObj = new Date();
		let month = dateObj.getUTCMonth() + 1; // months from 1-12
		let year = dateObj.getUTCFullYear();
		let oneMean: any, oneUcl: any, oneLcl: any, oneVar: any;
		let twoMean: any, twoUcl: any, twoLcl: any, twoVar: any;

		if (month === 1) {
			// If the current month is January, go back to December of the previous year
			year -= 1;
			month = 12;
		} else if (month === 2) {
			// If the current month is February, go back to January of the current year
			month = 1;
		} else {
			// Otherwise, go back two months
			month -= 1;
		}

		let dateObj1 = new Date();
		let month1 = dateObj1.getUTCMonth() + 1; // months from 1-12
		let year1 = dateObj1.getUTCFullYear();

		if (month1 === 1) {
			// If the current month is January, go back to December of the previous year
			year1 -= 1;
			month1 = 11;
		} else if (month1 == 2) {
			// If the current month is February, go back to January of the current year
			year1 -= 1;
			month1 = 12;
		} else {
			// Otherwise, go back two months
			month1 -= 2;
		}

		const oneMonth = year + '-' + month;
		const twoMonth = year1 + '-' + month1;

		const oneData = await Data.findOne({ month: oneMonth });
		const twoData = await Data.findOne({ month: twoMonth });

		if (oneData) {
			oneData?.data?.map((item: any, i) => {
				if (item.name == req.body.name) {
					console.log(item.values);
					oneMean = item.values.filter((item: any, i: any) => i < 14 && item).reduce((partialSum: any, a: any) => partialSum + Number(a), 0) / (item.values.length / 2);
					oneVar = getVar(
						item.values.filter((item: any, i: any) => {
							if (i < 14 && item > oneMean) {
								return item;
							}
						}),
						oneMean
					);
					oneUcl = oneMean + oneVar * 3;
					oneLcl = oneMean - oneVar * 3;
				}
			});
		}

		if (twoData) {
			twoData?.data?.map((item: any, i) => {
				if (item.name == req.body.name) {
					twoMean =
						item.values
							.filter((item: any, i: any) => {
								if (i <= 14 && item > 0) {
									return item;
								}
							})
							.reduce((partialSum: any, a: any) => partialSum + Number(a), 0) /
						(item.values.length / 2);
					twoVar = getVar(
						item.values.filter((item: any, i: any) => {
							if (i <= 14 && item > oneMean) {
								return item;
							}
						}),
						oneMean
					);
					twoUcl = twoMean + twoVar * 3;
					twoLcl = twoMean - twoVar * 3;
				}
			});
		}
		return res.status(200).json({ mean: twoMean, ucl: twoUcl, lcl: twoLcl });
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
	getData,
	SendUcl
};
