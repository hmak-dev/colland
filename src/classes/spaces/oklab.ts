import {
	OKLab_to_sRGB,
	naive_sRGB_to_CMYK,
	sRGB_to_HSL,
	sRGB_to_HWB,
	OKLab_to_OKLCH,
	OKLab_to_LCH,
	OKLab_to_Lab,
	OKLab_to_P3,
	OKLab_to_r2020,
	OKLab_to_a98rgb,
	OKLab_to_ProPhoto,
} from 'src/assets/utilities';
import BaseColor from 'src/classes/base_color';
import A98Color from 'src/classes/spaces/a98';
import CMYKColor from 'src/classes/spaces/cmyk';
import HSLColor from 'src/classes/spaces/hsl';
import HWBColor from 'src/classes/spaces/hwb';
import LabColor from 'src/classes/spaces/lab';
import LCHColor from 'src/classes/spaces/lch';
import OKLCHColor from 'src/classes/spaces/oklch';
import P3Color from 'src/classes/spaces/p3';
import ProPhotoColor from 'src/classes/spaces/pro_photo';
import Rec2020Color from 'src/classes/spaces/r2020';
import RGBColor from 'src/classes/spaces/rgb';

class OKLabColor extends BaseColor {
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
		super('oklab', 'lab');

		this._l = lightness;
		this._a = a;
		this._b = b;
	}

	toRGB() {
		const [r, g, b] = OKLab_to_sRGB(this.components);
		return new RGBColor(r, g, b);
	}

	toP3() {
		const [r, g, b] = OKLab_to_P3(this.components);
		return new P3Color(r, g, b);
	}

	toRec2020() {
		const [r, g, b] = OKLab_to_r2020(this.components);
		return new Rec2020Color(r, g, b);
	}

	toA98() {
		const [r, g, b] = OKLab_to_a98rgb(this.components);
		return new A98Color(r, g, b);
	}

	toProPhoto() {
		const [r, g, b] = OKLab_to_ProPhoto(this.components);
		return new ProPhotoColor(r, g, b);
	}

	toCMYK() {
		const [c, m, y, k] = naive_sRGB_to_CMYK(OKLab_to_sRGB(this.components));
		return new CMYKColor(c, m, y, k);
	}

	toHSL() {
		const [h, s, l] = sRGB_to_HSL(OKLab_to_sRGB(this.components));
		return new HSLColor(h, s, l);
	}

	toHWB() {
		const [h, w, b] = sRGB_to_HWB(OKLab_to_sRGB(this.components));
		return new HWBColor(h, w, b);
	}

	toLab() {
		const [l, a, b] = OKLab_to_Lab(this.components);
		return new LabColor(l, a, b);
	}

	toLCH() {
		const [l, c, h] = OKLab_to_LCH(this.components);
		return new LCHColor(l, c, h);
	}

	toOKLCH() {
		const [l, c, h] = OKLab_to_OKLCH(this.components);
		return new OKLCHColor(l, c, h);
	}

	toString(precision = 2) {
		return `oklab(${this.components.map((c) => c.toFixed(precision).replace('.00', '')).join(', ')})`;
	}

	toObject() {
		return {
			l: this._l,
			a: this._a,
			b: this._b,
		};
	}
}

export default OKLabColor;
