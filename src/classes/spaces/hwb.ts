import {
	HWB_to_sRGB,
	naive_sRGB_to_CMYK,
	sRGB_to_a98rgb,
	sRGB_to_HSL,
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
import LabColor from 'src/classes/spaces/lab';
import LCHColor from 'src/classes/spaces/lch';
import OKLabColor from 'src/classes/spaces/oklab';
import OKLCHColor from 'src/classes/spaces/oklch';
import P3Color from 'src/classes/spaces/p3';
import ProPhotoColor from 'src/classes/spaces/pro_photo';
import Rec2020Color from 'src/classes/spaces/r2020';
import RGBColor from 'src/classes/spaces/rgb';

class HWBColor extends BaseColor {
	_h = 0;

	_w = 0;

	_b = 0;

	get h() {
		return this._h;
	}

	set h(val) {
		this._h = val;
	}

	get w() {
		return this._w;
	}

	set w(val) {
		this._w = val;
	}

	get b() {
		return this._b;
	}

	set b(val) {
		this._b = val;
	}

	get hue() {
		return this._h;
	}

	set hue(val) {
		this._h = val;
	}

	get white() {
		return this._w;
	}

	set white(val) {
		this._w = val;
	}

	get black() {
		return this._b;
	}

	set black(val) {
		this._b = val;
	}

	constructor(hue, white, black) {
		super('hwb');

		this._h = hue;
		this._w = white;
		this._b = black;
	}

	toRGB() {
		const [r, g, b] = HWB_to_sRGB(this.components);
		return new RGBColor(r, g, b);
	}

	toP3() {
		const [r, g, b] = sRGB_to_P3(HWB_to_sRGB(this.components));
		return new P3Color(r, g, b);
	}

	toRec2020() {
		const [r, g, b] = sRGB_to_r2020(HWB_to_sRGB(this.components));
		return new Rec2020Color(r, g, b);
	}

	toA98() {
		const [r, g, b] = sRGB_to_a98rgb(HWB_to_sRGB(this.components));
		return new A98Color(r, g, b);
	}

	toProPhoto() {
		const [r, g, b] = sRGB_to_ProPhoto(HWB_to_sRGB(this.components));
		return new ProPhotoColor(r, g, b);
	}

	toCMYK() {
		const [c, m, y, k] = naive_sRGB_to_CMYK(HWB_to_sRGB(this.components));
		return new CMYKColor(c, m, y, k);
	}

	toHSL() {
		const [h, s, l] = sRGB_to_HSL(HWB_to_sRGB(this.components));
		return new HSLColor(h, s, l);
	}

	toLab() {
		const [l, a, b] = sRGB_to_Lab(HWB_to_sRGB(this.components));
		return new LabColor(l, a, b);
	}

	toOKLab() {
		const [l, a, b] = sRGB_to_OKLab(HWB_to_sRGB(this.components));
		return new OKLabColor(l, a, b);
	}

	toLCH() {
		const [l, c, h] = sRGB_to_LCH(HWB_to_sRGB(this.components));
		return new LCHColor(l, c, h);
	}

	toOKLCH() {
		const [l, c, h] = sRGB_to_OKLCH(HWB_to_sRGB(this.components));
		return new OKLCHColor(l, c, h);
	}

	toString(precision = 2) {
		const [h, w, b] = this.components;

		return `hwb(${h.toFixed(precision).replace('.00', '')}, ${(w * 100).toFixed(precision).replace('.00', '')}, ${(
			b * 100
		)
			.toFixed(precision)
			.replace('.00', '')})`;
	}

	toObject() {
		return {
			h: this._h,
			w: this._w * 100,
			b: this._b * 100,
		};
	}
}

export default HWBColor;
