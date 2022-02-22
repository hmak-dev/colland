/* eslint-disable no-console, import/no-extraneous-dependencies */
const fs = require('fs/promises');
const path = require('path');
const util = require('util');
const esbuild = require('esbuild');
const exec = util.promisify(require('child_process').exec);

const rootPath = process.cwd();

function bundle(minify = true) {
	return new Promise((resolve, reject) => {
		esbuild
			.build({
				entryPoints: ['./src/index.ts'],
				bundle: true,
				minifySyntax: minify,
				minifyWhitespace: minify,
				format: 'cjs',
				outfile: `./lib/colland${minify ? '.min' : ''}.js`,
			})
			.then(() => resolve())
			.catch((error) => reject(error));
	});
}

async function copyPackageFiles() {
	await fs.copyFile(path.resolve(rootPath, 'LICENSE'), path.resolve(rootPath, 'lib/LICENSE'));
	await fs.copyFile(path.resolve(rootPath, 'README.md'), path.resolve(rootPath, 'lib/README.md'));
	await fs.copyFile(path.resolve(rootPath, '.npmignore'), path.resolve(rootPath, 'lib/.npmignore'));

	const packageJson = JSON.parse(await fs.readFile(path.resolve(rootPath, 'package.json'), 'utf8'));

	delete packageJson.scripts;
	delete packageJson.devDependencies;

	await fs.writeFile(path.resolve(rootPath, 'lib/package.json'), JSON.stringify(packageJson, null, '\t'), 'utf8');
}

(async () => {
	try {
		const libPath = path.resolve(rootPath, 'lib');

		try {
			await fs.stat(libPath);
		} catch {
			await fs.mkdir(libPath);
		}

		console.log('Building...');
		const { stderr: buildError } = await exec('babel src -d lib -x ".ts,.js"', {
			env: { ...process.env, NODE_ENV: 'production' },
		});

		if (buildError) {
			console.log('Build Failed: ', buildError);
			return false;
		}

		if (process.env.NODE_ENV === 'production') {
			console.log('Generating Type Definitions...');
			const { stderr: typesError } = await exec('ttsc');

			if (typesError) {
				console.log('Build Failed: ', typesError);
				return false;
			}
		}

		console.log('Bundling Project...');
		await bundle();
		await bundle(false);

		let bundleContent = await fs.readFile(path.resolve(rootPath, 'lib/colland.js'), 'utf8');
		let minBundleContent = await fs.readFile(path.resolve(rootPath, 'lib/colland.min.js'), 'utf8');

		bundleContent = bundleContent.replace(/;\s*module\.exports\s*[^;]+;/, ';');
		minBundleContent = minBundleContent.replace(/;module.exports[^;]+;/, ';');

		await fs.writeFile(path.resolve(rootPath, 'lib/colland.js'), bundleContent, 'utf8');
		await fs.writeFile(path.resolve(rootPath, 'lib/colland.min.js'), minBundleContent, 'utf8');

		console.log('Copying Package Files...');
		await copyPackageFiles();

		console.log('Build Finished Successfully');

		return true;
	} catch (error) {
		console.log('Build Failed: ', error);
		return false;
	}
})();
