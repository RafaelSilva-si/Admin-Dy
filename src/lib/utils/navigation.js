import { hist } from '../../App';

export const navigate = param => {
	hist.push(param);
};

export const navigateBack = () => {
	hist.goBack();
};
