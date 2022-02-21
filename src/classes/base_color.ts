class BaseColor {
	space = '';

	channels = [];

	get components() {
		return this.channels.map((ch) => this[`_${ch}`]);
	}

	constructor(space, channels = undefined) {
		this.space = space;
		this.channels = (channels || space).split('');
	}
}

export default BaseColor;
