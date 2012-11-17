/*
 * The cal-ender Project (http://cal-ender.org)
 *
 * cal-ender JavaScript library
 * Version 0.0.1
 *
 * Requires Moment.js (http://momentjs.com/)
 *
 * Copyright (C) 2012 Philipp Emanuel Weidmann (pew@worldwidemann.com)
 * Released under the terms of the MIT License
 */

function gregorianDateDifference(date1, date2) {
	var date1 = moment(date1);
	var date2 = moment(date2);
	return date2.diff(date1, 'days');
}

function calEnderNewYear(year) {
	var weekdays = new Array();
	for (var i = 1; i <= 7; i++) {
		// Weekday of day i in March
		weekdays.push(moment(new Date(year, 2, i)).day());
	}
	// Find Monday
	return new Date(year, 2, weekdays.indexOf(1) + 1);
}

function gregorianToCalEnderYear(date) {
	if (gregorianDateDifference(date,
	    calEnderNewYear(date.getFullYear())) > 0) {
		return date.getFullYear() - 1;
	} else {
		return date.getFullYear();
	}
}

function calEnderToDayNumber(calEnderDate) {
	return calEnderDate[0] + (28 * (calEnderDate[1] - 1));
}

// Works only when both dates are in the same year
function calEnderDateDifference(calEnderDate1, calEnderDate2) {
	return calEnderToDayNumber(calEnderDate2) - calEnderToDayNumber(calEnderDate1);
}

function dayNumberToCalEnder(dayNumber, year) {
	return [((dayNumber-1) % 28) + 1,
		 Math.floor((dayNumber-1) / 28) + 1,
		 year];
}

function gregorianDatePlus(date, days) {
	return moment(date).add('days', days).toDate();
}

// Works only when date and shifted date are in the same year
function calEnderDatePlus(calEnderDate, days) {
	return dayNumberToCalEnder(calEnderToDayNumber(calEnderDate) + days, calEnderDate[2]);
}

function gregorianToCalEnder(date) {
	var calEnderYear = gregorianToCalEnderYear(date);
	var dayShift = gregorianDateDifference(calEnderNewYear(calEnderYear), date);
	return calEnderDatePlus([1, 1, calEnderYear], dayShift);
}

function calEnderToGregorian(calEnderDate) {
	var dayShift = calEnderDateDifference([1, 1, calEnderDate[2]], calEnderDate);
	return gregorianDatePlus(calEnderNewYear(calEnderDate[2]), dayShift);
}

function getCurrentCalEnderDate() {
	return gregorianToCalEnder(moment(new Date()).startOf('day').toDate());
}

function formatCalEnderDate(calEnderDate) {
	var formattedDate = calEnderDate[0] + "-";
	switch (calEnderDate[1]) {
	case  1: formattedDate += "E"; break;
	case  2: formattedDate += "Li"; break;
	case  3: formattedDate += "Ung"; break;
	case  4: formattedDate += "Fras"; break;
	case  5: formattedDate += "Gowas"; break;
	case  6: formattedDate += "Tostol"; break;
	case  7: formattedDate += "Saistim"; break;
	case  8: formattedDate += "Mernam"; break;
	case  9: formattedDate += "Daven"; break;
	case 10: formattedDate += "Ples"; break;
	case 11: formattedDate += "Jor"; break;
	case 12: formattedDate += "Nu"; break;
	case 13: formattedDate += "A"; break;
	}
	formattedDate += ("-" + calEnderDate[2]);
	return formattedDate;
}

