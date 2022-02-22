import {
	Lab_to_sRGB,
	naive_sRGB_to_CMYK,
	sRGB_to_HSL,
	sRGB_to_HWB,
	Lab_to_LCH,
	Lab_to_OKLab,
	Lab_to_ProPhoto,
	Lab_to_a98rgb,
	Lab_to_r2020,
	Lab_to_P3,
	Lab_to_OKLCH,
} from 'src/assets/utilities';
import BaseColor from 'src/classes/base_color';
import A98Color from 'src/classes/spaces/a98';
import CMYKColor from 'src/classes/spaces/cmyk';
import HSLColor from 'src/classes/spaces/hsl';
import HWBColor from 'src/classes/spaces/hwb';
import LCHColor from 'src/classes/spaces/lch';
import OKLabColor from 'src/classes/spaces/oklab';
import OKLCHColor from 'src/classes/spaces/oklch';
import P3Color from 'src/classes/spaces/p3';
import ProPhotoColor from 'src/classes/spaces/pro_photo';
import Rec2020Color from 'src/classes/spaces/r2020';
import RGBColor from 'src/classes/spaces/rgb';

class LabColor extends BaseColor {
	_l = 0;

	_a = 0;

	_b = 0;

	get l() {
		return this._l;
	}

	set l(val) {
		this._l = val;
	}

	get a() {
		return this._a;
	}

	set a(val) {
		this._a = val;
	}

	get b() {
		return this._b;
	}

	set b(val) {
		this._b = val;
	}

	get lightness() {
		return this._l;
	}

	set lightness(val) {
		this._l = val;
	}

	constructor(lightness, a, b) {
		super('lab');

		this._l = lightness;
		this._a = a;
		this._b = b;
	}

	toRGB() {
		const [r, g, b] = Lab_to_sRGB(this.components);
		return new RGBColor(r, g, b);
	}

	toP3() {
		const [r, g, b] = Lab_to_P3(this.components);
		return new P3Color(r, g, b);
	}

	toRec2020() {
		const [r, g, b] = Lab_to_r2020(this.components);
		return new Rec2020Color(r, g, b);
	}

	toA98() {
		const [r, g, b] = Lab_to_a98rgb(this.components);
		return new A98Color(r, g, b);
	}

	toProPhoto() {
		const [r, g, b] = Lab_to_ProPhoto(this.components);
		return new ProPhotoColor(r, g, b);
	}

	toCMYK() {
		const [c, m, y, k] = naive_sRGB_to_CMYK(Lab_to_sRGB(this.components));
		return new CMYKColor(c, m, y, k);
	}

	toHSL() {
		const [h, s, l] = sRGB_to_HSL(Lab_to_sRGB(this.components));
		return new HSLColor(h, s, l);
	}

	toHWB() {
		const [h, w, b] = sRGB_to_HWB(Lab_to_sRGB(this.components));
		return new HWBColor(h, w, b);
	}

	toOKLab() {
		const [l, a, b] = Lab_to_OKLab(this.components);
		return new OKLabColor(l, a, b);
	}

	toLCH() {
		const [l, c, h] = Lab_to_LCH(this.components);
		return new LCHColor(l, c, h);
	}

	toOKLCH() {
		const [l, c, h] = Lab_to_OKLCH(this.components);
		return new OKLCHColor(l, c, h);
	}

	toString(precision = 2) {
		return `lab(${this.components.map((c) => c.toFixed(precision).replace('.00', '')).join(', ')})`;
	}

	toObject() {
		return {
			l: this._l,
			a: this._a,
			b: this._b,
		};
	}
}

export default LabColor;
