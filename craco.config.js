const path = require('path');
module.exports = {
	webpack: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
			'@shared': path.resolve(__dirname, 'src/shared_copied')
		},
		watch: true,
		watchOptions: {}
	}
};
