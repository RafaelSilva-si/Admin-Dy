import random from 'faker/lib/random';
import moment from 'moment';

export const randomNum = (min = 0, max = 1000) => random().number({ min, max });

/* eslint-disable no-mixed-operators */
export const removeEmpty = obj => {
	Object.entries(obj).forEach(
		([key, val]) =>
			(val && typeof val === 'object' && removeEmpty(val)) ||
			((val === null ||
				val === '' ||
				val === undefined ||
				val === 'Invalid date') &&
				// eslint-disable-next-line no-param-reassign
				delete obj[key]),
	);

	return obj;
};

export const commaSeparatedString = arrayObjects => {
	let result = '';
	if (arrayObjects) {
		result = Array.prototype.map
			.call(arrayObjects, item => item.name)
			.join(', ');
	}
	return result;
};

export const formatCnpj = cnpj => {
	return cnpj.replace(
		/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,
		'$1.$2.$3/$4-$5',
	);
};

export const formatCpf = cpf => {
	return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');
};

export const formatCnpjCpf = value => {
	const cnpjCpf = value.replace(/\D/g, '');

	if (cnpjCpf.length === 11) {
		return cnpjCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');
	}

	return cnpjCpf.replace(
		/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,
		'$1.$2.$3/$4-$5',
	);
};

export const formatPhone = value => {
	const val = value.replace(/\D/g, '');

	if (val.length === 9) {
		return val.replace(/^([0-9]{5,6})([0-9]{4})/g, '$1-$2');
	}

	return val.replace(/^([0-9]{4,5})([0-9]{4})/g, '$1-$2');
};

export const formatCellPhone = value => {
	return value.replace(/^([0-9]{5,6})([0-9]{4})/g, '$1-$2');
};

export const formatCep = value => {
	return value.replace(/^([\d]{2})\.?([\d]{3})-?([\d]{3})/g, '$1.$2-$3');
};

export const today = () => moment(new Date()).format('DD/MM/YYYY');

export const formatDate = value => moment(value).format('DD/MM/YYYY');

export const formatNumber = num => {
	return num.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1.');
};

const getRandomInt = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateHash = () => {
	const length = 8;
	const timestamp = +new Date();

	const ts = timestamp.toString();
	const parts = ts.split('').reverse();
	let id = '';

	for (let i = 0; i < length; i += 1) {
		const index = getRandomInt(0, parts.length - 1);
		id += parts[index];
	}

	return id;
};

export const numberToPrice = v => {
	if (v === 0) {
		return '0,00';
	}
	let value = v;
	value = parseFloat(value);
	value = value.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
	value = value
		.split('.')
		.join('*')
		.split(',')
		.join('.')
		.split('*')
		.join(',');
	console.log(typeof value)
	return value;
};

export const priceToNumber = v => {
	if (!v) {
		return 0;
	}
	let value = v;
	value = value.split('.').join('');
	value = value.split(',').join('.');
	return Number(value.replace(/[^0-9.]/g, ''));
};

export const getBase64 = file => {
	return new Promise(resolve => {
		let fileInfo;
		let baseURL = "";
		// Make new FileReader
		let reader = new FileReader();

		// Convert the file to base64 text
		reader.readAsDataURL(file);

		// on reader load somthing...
		reader.onload = () => {
			// Make a fileInfo Object
			
			baseURL = reader.result;
			resolve(baseURL);
		};
	});
};

export const getRandomColor = () => {
	const letters = '0123456789ABCDEF';
	let color = {};
	color = {
        aqua: "#00ffff",
        azure: "#f0ffff",
        beige: "#f5f5dc",
        black: "#000000",
        blue: "#0000ff",
        brown: "#a52a2a",
        cyan: "#00ffff",
        darkblue: "#00008b",
        darkcyan: "#008b8b",
        darkgrey: "#a9a9a9",
        darkgreen: "#006400",
        darkkhaki: "#bdb76b",
        darkmagenta: "#8b008b",
        darkolivegreen: "#556b2f",
        darkorange: "#ff8c00",
        darkorchid: "#9932cc",
        darkred: "#8b0000",
        darksalmon: "#e9967a",
        darkviolet: "#9400d3",
        fuchsia: "#ff00ff",
        gold: "#ffd700",
        green: "#008000",
        indigo: "#4b0082",
        khaki: "#f0e68c",
        lightblue: "#add8e6",
        lightcyan: "#e0ffff",
        lightgreen: "#90ee90",
        lightgrey: "#d3d3d3",
        lightpink: "#ffb6c1",
        lightyellow: "#ffffe0",
        lime: "#00ff00",
        magenta: "#ff00ff",
        maroon: "#800000",
        navy: "#000080",
        olive: "#808000",
        orange: "#ffa500",
        pink: "#ffc0cb",
        purple: "#800080",
        violet: "#800080",
        red: "#ff0000",
        silver: "#c0c0c0",
        white: "#ffffff",
        yellow: "#ffff00"
    };

	var keys = Object.keys(color);
	return color[keys[ keys.length * Math.random() << 0]];
	
};

export const getDate = () => {
	const data = new Date();
	const semana = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"];
	const meses = [
			"Janeiro",
			"Fevereiro",
			"Março",
			"Abril",
			"Maio",
			"Junho",
			"Julho",
			"Agosto",
			"Setembro",
			"Outubro",
			"Novembro",
			"Dezembro"
		  ];
	
	return `${semana[data.getDay()]}, ${data.getDate()} de ${meses[data.getMonth()]} de 2022`
}
export const chartColors = size => {
	const arr = [];
	for (let i = 0; i < size; i += 1) {
		arr.push(getRandomColor());
	}
	return arr;
};
