import {
	naive_sRGB_to_CMYK,
	P3_to_Lab,
	P3_to_LCH,
	P3_to_OKLab,
	P3_to_OKLCH,
	P3_to_sRGB,
	sRGB_to_a98rgb,
	sRGB_to_HSL,
	sRGB_to_HWB,
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
import ProPhotoColor from 'src/classes/spaces/pro_photo';
import Rec2020Color from 'src/classes/spaces/r2020';
import RGBColor from 'src/classes/spaces/rgb';

class P3Color extends BaseColor {
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
		super('display-p3', 'rgb');

		this._r = red;
		this._g = green;
		this._b = blue;
	}

	toRGB() {
		const [r, g, b] = P3_to_sRGB(this.components);
		return new RGBColor(r, g, b);
	}

	toRec2020() {
		const [r, g, b] = sRGB_to_r2020(P3_to_sRGB(this.components));
		return new Rec2020Color(r, g, b);
	}

	toA98() {
		const [r, g, b] = sRGB_to_a98rgb(P3_to_sRGB(this.components));
		return new A98Color(r, g, b);
	}

	toProPhoto() {
		const [r, g, b] = sRGB_to_ProPhoto(P3_to_sRGB(this.components));
		return new ProPhotoColor(r, g, b);
	}

	toCMYK() {
		const [c, m, y, k] = naive_sRGB_to_CMYK(P3_to_sRGB(this.components));
		return new CMYKColor(c, m, y, k);
	}

	toHSL() {
		const [h, s, l] = sRGB_to_HSL(P3_to_sRGB(this.components));
		return new HSLColor(h, s, l);
	}

	toHWB() {
		const [h, w, b] = sRGB_to_HWB(P3_to_sRGB(this.components));
		return new HWBColor(h, w, b);
	}

	toLab() {
		const [l, a, b] = P3_to_Lab(this.components);
		return new LabColor(l, a, b);
	}

	toOKLab() {
		const [l, a, b] = P3_to_OKLab(this.components);
		return new OKLabColor(l, a, b);
	}

	toLCH() {
		const [l, c, h] = P3_to_LCH(this.components);
		return new LCHColor(l, c, h);
	}

	toOKLCH() {
		const [l, c, h] = P3_to_OKLCH(this.components);
		return new OKLCHColor(l, c, h);
	}

	toString(precision = 2) {
		return `color(display-p3 ${this.components.map((c) => c.toFixed(precision).replace('.00', '')).join(' ')})`;
	}
}

export default P3Color;
