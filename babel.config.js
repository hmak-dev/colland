module.exports = (api) => {
	api.cache(true);

	return {
		presets: [
			['@babel/preset-env', { modules: false }],
			['@babel/preset-typescript', { allowDeclareFields: true }],
		],
		plugins: [
			[
				'module-resolver',
				{
					extensions: ['.ts', '.js', '.json'],
					root: ['./'],
					alias: {
						src: './src',
					},
				},
			],
		],
	};
};
