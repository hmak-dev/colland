import {
	OKLCH_to_sRGB,
	naive_sRGB_to_CMYK,
	sRGB_to_HSL,
	sRGB_to_HWB,
	OKLCH_to_P3,
	OKLCH_to_r2020,
	OKLCH_to_ProPhoto,
	OKLCH_to_a98rgb,
	OKLCH_to_Lab,
	OKLCH_to_OKLab,
	OKLCH_to_LCH,
} from 'src/assets/utilities';
import BaseColor from 'src/classes/base_color';
import A98Color from 'src/classes/spaces/a98';
import CMYKColor from 'src/classes/spaces/cmyk';
import HSLColor from 'src/classes/spaces/hsl';
import HWBColor from 'src/classes/spaces/hwb';
import LabColor from 'src/classes/spaces/lab';
import LCHColor from 'src/classes/spaces/lch';
import OKLabColor from 'src/classes/spaces/oklab';
import P3Color from 'src/classes/spaces/p3';
import ProPhotoColor from 'src/classes/spaces/pro_photo';
import Rec2020Color from 'src/classes/spaces/r2020';
import RGBColor from 'src/classes/spaces/rgb';

class OKLCHColor extends BaseColor {
	_l = 0;

	_c = 0;

	_h = 0;

	get h() {
		return this._l;
	}

	set h(val) {
		this._l = val;
	}

	get s() {
		return this._c;
	}

	set s(val) {
		this._c = val;
	}

	get l() {
		return this._h;
	}

	set l(val) {
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
		super('oklch', 'lch');

		this._l = lightness;
		this._c = chroma;
		this._h = hue;
	}

	toRGB() {
		const [r, g, b] = OKLCH_to_sRGB(this.components);
		return new RGBColor(r, g, b);
	}

	toP3() {
		const [r, g, b] = OKLCH_to_P3(this.components);
		return new P3Color(r, g, b);
	}

	toRec2020() {
		const [r, g, b] = OKLCH_to_r2020(this.components);
		return new Rec2020Color(r, g, b);
	}

	toA98() {
		const [r, g, b] = OKLCH_to_a98rgb(this.components);
		return new A98Color(r, g, b);
	}

	toProPhoto() {
		const [r, g, b] = OKLCH_to_ProPhoto(this.components);
		return new ProPhotoColor(r, g, b);
	}

	toCMYK() {
		const [c, m, y, k] = naive_sRGB_to_CMYK(OKLCH_to_sRGB(this.components));
		return new CMYKColor(c, m, y, k);
	}

	toHSL() {
		const [h, s, l] = sRGB_to_HSL(OKLCH_to_sRGB(this.components));
		return new HSLColor(h, s, l);
	}

	toHWB() {
		const [h, w, b] = sRGB_to_HWB(OKLCH_to_sRGB(this.components));
		return new HWBColor(h, w, b);
	}

	toLCH() {
		const [l, c, h] = OKLCH_to_LCH(this.components);
		return new LCHColor(l, c, h);
	}

	toLab() {
		const [l, a, b] = OKLCH_to_Lab(this.components);
		return new LabColor(l, a, b);
	}

	toOKLab() {
		const [l, a, b] = OKLCH_to_OKLab(this.components);
		return new OKLabColor(l, a, b);
	}

	toString(precision = 2) {
		return `oklch(${this.components.map((c) => c.toFixed(precision).replace('.00', '')).join(', ')})`;
	}
}

export default OKLCHColor;
