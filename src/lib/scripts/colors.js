const fs = require('fs');

const generate = async () => {
	fs.readFile('src/config/theme.json', (err, data) => {
		if (err) throw err;
		const result = JSON.parse(data);
		let string = null;
		if (result.colors) {
			string = `
            $color-primary: ${result.colors.primary};
            $color-secondary: ${result.colors.secondary};
            $color-success: ${result.colors.success};
            $color-danger: ${result.colors.danger};
            $color-warning: ${result.colors.warning};
			$color-info: ${result.colors.info};
			$color-info: ${result.colors.info};
			$color-tertiary: ${result.colors.tertiary};
            `;
			fs.writeFileSync('src/styles/_colors.scss', string, 'utf8');

			string = `
            const colors = {
                colorPrimary:'${result.colors.primary}',
                colorSecondary: '${result.colors.secondary}',
                colorSuccess: '${result.colors.success}',
                colorDanger: '${result.colors.danger}',
                colorWarning: '${result.colors.warning}',
				colorInfo: '${result.colors.info}',
				colorTertiary: '${result.colors.tertiary}'
            }
        
            export default colors
            
            `;

			fs.writeFileSync('src/lib/constants/colors.js', string, 'utf8');
		}

		if (result.login) {
			string = '';
			result.login.forEach(color => {
				string += `$${color.name}:${color.value};`;
			});
			fs.writeFileSync('src/styles/_login-colors.scss', string, 'utf8');
		}
	});
};

generate();
