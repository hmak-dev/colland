import {
	naive_CMYK_to_sRGB,
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
import HSLColor from 'src/classes/spaces/hsl';
import HWBColor from 'src/classes/spaces/hwb';
import LabColor from 'src/classes/spaces/lab';
import LCHColor from 'src/classes/spaces/lch';
import OKLabColor from 'src/classes/spaces/oklab';
import OKLCHColor from 'src/classes/spaces/oklch';
import P3Color from 'src/classes/spaces/p3';
import ProPhotoColor from 'src/classes/spaces/pro_photo';
import Rec2020Color from 'src/classes/spaces/r2020';
import RGBColor from 'src/classes/spaces/rgb';

class CMYKColor extends BaseColor {
	_c = 0;

	_m = 0;

	_y = 0;

	_k = 0;

	get c() {
		return this._c;
	}

	set c(val) {
		this._c = val;
	}

	get m() {
		return this._m;
	}

	set m(val) {
		this._m = val;
	}

	get y() {
		return this._y;
	}

	set y(val) {
		this._y = val;
	}

	get k() {
		return this._k;
	}

	set k(val) {
		this._k = val;
	}

	get cyan() {
		return this._c;
	}

	set cyan(val) {
		this._c = val;
	}

	get magenta() {
		return this._m;
	}

	set magenta(val) {
		this._m = val;
	}

	get yellow() {
		return this._y;
	}

	set yellow(val) {
		this._y = val;
	}

	get black() {
		return this._k;
	}

	set black(val) {
		this._k = val;
	}

	constructor(cyan, magenta, yellow, black) {
		super('cmyk');

		this._c = cyan;
		this._m = magenta;
		this._y = yellow;
		this._k = black;
	}

	toRGB() {
		const [r, g, b] = naive_CMYK_to_sRGB(this.components);
		return new RGBColor(r, g, b);
	}

	toP3() {
		const [r, g, b] = sRGB_to_P3(naive_CMYK_to_sRGB(this.components));
		return new P3Color(r, g, b);
	}

	toRec2020() {
		const [r, g, b] = sRGB_to_r2020(naive_CMYK_to_sRGB(this.components));
		return new Rec2020Color(r, g, b);
	}

	toA98() {
		const [r, g, b] = sRGB_to_a98rgb(naive_CMYK_to_sRGB(this.components));
		return new A98Color(r, g, b);
	}

	toProPhoto() {
		const [r, g, b] = sRGB_to_ProPhoto(naive_CMYK_to_sRGB(this.components));
		return new ProPhotoColor(r, g, b);
	}

	toHSL() {
		const [h, s, l] = sRGB_to_HSL(naive_CMYK_to_sRGB(this.components));
		return new HSLColor(h, s, l);
	}

	toHWB() {
		const [h, w, b] = sRGB_to_HWB(naive_CMYK_to_sRGB(this.components));
		return new HWBColor(h, w, b);
	}

	toLab() {
		const [l, a, b] = sRGB_to_Lab(naive_CMYK_to_sRGB(this.components));
		return new LabColor(l, a, b);
	}

	toOKLab() {
		const [l, a, b] = sRGB_to_OKLab(naive_CMYK_to_sRGB(this.components));
		return new OKLabColor(l, a, b);
	}

	toLCH() {
		const [l, c, h] = sRGB_to_LCH(naive_CMYK_to_sRGB(this.components));
		return new LCHColor(l, c, h);
	}

	toOKLCH() {
		const [l, c, h] = sRGB_to_OKLCH(naive_CMYK_to_sRGB(this.components));
		return new OKLCHColor(l, c, h);
	}

	toString(precision = 2) {
		return `cmyk(${this.components.map((c) => `${(c * 100).toFixed(precision).replace('.00', '')}%`).join(', ')})`;
	}

	toObject() {
		return {
			c: this._c * 100,
			m: this._m * 100,
			y: this._y * 100,
			k: this._k * 100,
		};
	}
}

export default CMYKColor;
