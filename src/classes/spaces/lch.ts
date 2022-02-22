import {
	LCH_to_sRGB,
	naive_sRGB_to_CMYK,
	sRGB_to_HSL,
	sRGB_to_HWB,
	LCH_to_Lab,
	LCH_to_r2020,
	LCH_to_P3,
	LCH_to_ProPhoto,
	LCH_to_a98rgb,
	LCH_to_OKLCH,
	LCH_to_OKLab,
} from 'src/assets/utilities';
import BaseColor from 'src/classes/base_color';
import HSLColor from 'src/classes/spaces/hsl';
import HWBColor from 'src/classes/spaces/hwb';
import LabColor from 'src/classes/spaces/lab';
import OKLabColor from 'src/classes/spaces/oklab';
import OKLCHColor from 'src/classes/spaces/oklch';
import P3Color from 'src/classes/spaces/p3';
import ProPhotoColor from 'src/classes/spaces/pro_photo';
import Rec2020Color from 'src/classes/spaces/r2020';
import RGBColor from 'src/classes/spaces/rgb';
import CMYKColor from './cmyk';
import A98Color from './a98';

class LCHColor extends BaseColor {
	_l = 0;

	_c = 0;

	_h = 0;

	get l() {
		return this._l;
	}

	set l(val) {
		this._l = val;
	}

	get c() {
		return this._c;
	}

	set c(val) {
		this._c = val;
	}

	get h() {
		return this._h;
	}

	set h(val) {
		this._h = val;
	}

	get lightness() {
		return this._l;
	}

	set lightness(val) {
		this._l = val;
	}

	get chroma() {
		return this._c;
	}

	set chroma(val) {
		this._c = val;
	}

	get hue() {
		return this._h;
	}

	set hue(val) {
		this._h = val;
	}

	constructor(lightness, chroma, hue) {
		super('lch');

		this._l = lightness;
		this._c = chroma;
		this._h = hue;
	}

	toRGB() {
		const [r, g, b] = LCH_to_sRGB(this.components);
		return new RGBColor(r, g, b);
	}

	toP3() {
		const [r, g, b] = LCH_to_P3(this.components);
		return new P3Color(r, g, b);
	}

	toRec2020() {
		const [r, g, b] = LCH_to_r2020(this.components);
		return new Rec2020Color(r, g, b);
	}

	toA98() {
		const [r, g, b] = LCH_to_a98rgb(this.components);
		return new A98Color(r, g, b);
	}

	toProPhoto() {
		const [r, g, b] = LCH_to_ProPhoto(this.components);
		return new ProPhotoColor(r, g, b);
	}

	toCMYK() {
		const [c, m, y, k] = naive_sRGB_to_CMYK(LCH_to_sRGB(this.components));
		return new CMYKColor(c, m, y, k);
	}

	toHSL() {
		const [h, s, l] = sRGB_to_HSL(LCH_to_sRGB(this.components));
		return new HSLColor(h, s, l);
	}

	toHWB() {
		const [h, w, b] = sRGB_to_HWB(LCH_to_sRGB(this.components));
		return new HWBColor(h, w, b);
	}

	toLab() {
		const [l, a, b] = LCH_to_Lab(this.components);
		return new LabColor(l, a, b);
	}

	toOKLab() {
		const [l, a, b] = LCH_to_OKLab(this.components);
		return new OKLabColor(l, a, b);
	}

	toOKLCH() {
		const [l, c, h] = LCH_to_OKLCH(this.components);
		return new OKLCHColor(l, c, h);
	}

	toString(precision = 2) {
		return `lch(${this.components.map((c) => c.toFixed(precision).replace('.00', '')).join(', ')})`;
	}

	toObject() {
		return {
			l: this._l,
			c: this._c,
			h: this._h,
		};
	}
}

export default LCHColor;
