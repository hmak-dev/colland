import {
	naive_sRGB_to_CMYK,
	sRGB_to_a98rgb,
	sRGB_to_HSL,
	sRGB_to_HWB,
	sRGB_to_Lab,
	sRGB_to_LCH,
	sRGB_to_OKLab,
	sRGB_to_OKLCH,
	sRGB_to_P3,
	sRGB_to_ProPhoto,
	sRGB_to_r2020,
} from 'src/assets/utilities';
import BaseColor from 'src/classes/base_color';
import A98Color from 'src/classes/spaces/a98';
import CMYKColor from 'src/classes/spaces/cmyk';
import HSLColor from 'src/classes/spaces/hsl';
import HWBColor from 'src/classes/spaces/hwb';
import LabColor from 'src/classes/spaces/lab';
import LCHColor from 'src/classes/spaces/lch';
import OKLabColor from 'src/classes/spaces/oklab';
import OKLCHColor from 'src/classes/spaces/oklch';
import P3Color from 'src/classes/spaces/p3';
import ProPhotoColor from 'src/classes/spaces/pro_photo';
import Rec2020Color from 'src/classes/spaces/r2020';

class RGBColor extends BaseColor {
	_r = 0;

	_g = 0;

	_b = 0;

	get r() {
		return this._r;
	}

	set r(val) {
		this._r = val;
	}

	get g() {
		return this._g;
	}

	set g(val) {
		this._g = val;
	}

	get b() {
		return this._b;
	}

	set b(val) {
		this._b = val;
	}

	get red() {
		return this._r;
	}

	set red(val) {
		this._r = val;
	}

	get green() {
		return this._g;
	}

	set green(val) {
		this._g = val;
	}

	get blue() {
		return this._b;
	}

	set blue(val) {
		this._b = val;
	}

	constructor(red, green, blue) {
		super('srgb', 'rgb');

		this._r = red;
		this._g = green;
		this._b = blue;
	}

	toP3() {
		const [r, g, b] = sRGB_to_P3(this.components);
		return new P3Color(r, g, b);
	}

	toRec2020() {
		const [r, g, b] = sRGB_to_r2020(this.components);
		return new Rec2020Color(r, g, b);
	}

	toA98() {
		const [r, g, b] = sRGB_to_a98rgb(this.components);
		return new A98Color(r, g, b);
	}

	toProPhoto() {
		const [r, g, b] = sRGB_to_ProPhoto(this.components);
		return new ProPhotoColor(r, g, b);
	}

	toCMYK() {
		const [c, m, y, k] = naive_sRGB_to_CMYK(this.components);
		return new CMYKColor(c, m, y, k);
	}

	toHSL() {
		const [h, s, l] = sRGB_to_HSL(this.components);
		return new HSLColor(h, s, l);
	}

	toHWB() {
		const [h, w, b] = sRGB_to_HWB(this.components);
		return new HWBColor(h, w, b);
	}

	toLab() {
		const [l, a, b] = sRGB_to_Lab(this.components);
		return new LabColor(l, a, b);
	}

	toOKLab() {
		const [l, a, b] = sRGB_to_OKLab(this.components);
		return new OKLabColor(l, a, b);
	}

	toLCH() {
		const [l, c, h] = sRGB_to_LCH(this.components);
		return new LCHColor(l, c, h);
	}

	toOKLCH() {
		const [l, c, h] = sRGB_to_OKLCH(this.components);
		return new OKLCHColor(l, c, h);
	}

	toString(hex = false, percent = false, precision = 2) {
		if (hex) {
			return `#${this.components
				.map((c) =>
					Math.round(c * 255)
						.toString(16)
						.padStart(2, '0')
				)
				.join('')}`;
		}

		if (percent) {
			return `rgb(${this.components.map((c) => `${(c * 100).toFixed(precision).replace('.00', '')}%`).join(', ')})`;
		}

		return `rgb(${this.components.map((c) => Math.round(c * 255)).join(', ')})`;
	}

	toObject() {
		return {
			r: this._r * 255,
			g: this._g * 255,
			b: this._b * 255,
		};
	}
}

export default RGBColor;
