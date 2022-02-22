const preview = document.querySelector('.preview');
const spaces = document.querySelector('.spaces');

function createElement(html) {
	const tmp = document.createElement('div');
	tmp.innerHTML = html;
	return tmp.firstChild;
}

const colors = {};

function handleChangeColorChannel(e, space, channel) {
	colors[space.key][channel.key] = +e.target.value;
	const components = Object.values(colors[space.key]);

	console.log(components);
	let newColor = Color[space.generator](...components);

	if (space.key !== 'srgb') {
		newColor = newColor.toRGB();
	}

	generateColors(newColor, space.key, channel.key);
	preview.style.background = newColor.toString();
	console.log(colors);
}

function generateColors(initialColor, spaceKey) {
	colorSpaces.forEach((space) => {
		if (space.key !== spaceKey) {
			const color = (space.key === initialColor.space ? initialColor : initialColor[space.convertor]()).toObject();

			space.channels.forEach((channel) => {
				channel.field.value = color[channel.key];
			});

			colors[space.key] = color;
		}
	});
}

function generateFields() {
	colorSpaces.forEach((space, spaceIndex) => {
		const spaceElement = createElement(`<section></section>`);
		const spaceTitle = createElement(`<h3>${space.name}</h3>`);
		const channelsElement = createElement(`<div class="channels"></div>`);

		space.channels.forEach((channel, channelIndex) => {
			const channelField = createElement(
				`<input 
							class="channel" 
							type="text" 
							placeholder="${channel.abbr}" 
							title="${channel.name}" 
							min="${channel.min}" 
							max="${channel.max}"
						/>`
			);

			channelField.addEventListener('input', (e) => handleChangeColorChannel(e, space, channel));

			channelsElement.appendChild(channelField);

			colorSpaces[spaceIndex].channels[channelIndex].field = channelField;
		});

		spaceElement.appendChild(spaceTitle);
		spaceElement.appendChild(channelsElement);
		spaces.appendChild(spaceElement);
	});
}

generateFields();
generateColors(Color.fromHex('#000'));
