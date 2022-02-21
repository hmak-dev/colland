import {
	HSL_to_sRGB,
	naive_sRGB_to_CMYK,
	sRGB_to_a98rgb,
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
import HWBColor from 'src/classes/spaces/hwb';
import LabColor from 'src/classes/spaces/lab';
import LCHColor from 'src/classes/spaces/lch';
import OKLabColor from 'src/classes/spaces/oklab';
import OKLCHColor from 'src/classes/spaces/oklch';
import P3Color from 'src/classes/spaces/p3';
import ProPhotoColor from 'src/classes/spaces/pro_photo';
import Rec2020Color from 'src/classes/spaces/r2020';
import RGBColor from 'src/classes/spaces/rgb';

class HSLColor extends BaseColor {
	_h = 0;

	_s = 0;

	_l = 0;

	get h() {
		return this._h;
	}

	set h(val) {
		this._h = val;
	}

	get s() {
		return this._s;
	}

	set s(val) {
		this._s = val;
	}

	get l() {
		return this._l;
	}

	set l(val) {
		this._l = val;
	}

	get hue() {
		return this._h;
	}

	set hue(val) {
		this._h = val;
	}

	get saturation() {
		return this._s;
	}

	set saturation(val) {
		this._s = val;
	}

	get lightness() {
		return this._l;
	}

	set lightness(val) {
		this._l = val;
	}

	constructor(hue, saturation, lightness) {
		super('hsl');

		this._h = hue;
		this._s = saturation;
		this._l = lightness;
	}

	toRGB() {
		const [r, g, b] = HSL_to_sRGB(this.components);
		return new RGBColor(r, g, b);
	}

	toP3() {
		const [r, g, b] = sRGB_to_P3(HSL_to_sRGB(this.components));
		return new P3Color(r, g, b);
	}

	toRec2020() {
		const [r, g, b] = sRGB_to_r2020(HSL_to_sRGB(this.components));
		return new Rec2020Color(r, g, b);
	}

	toA98() {
		const [r, g, b] = sRGB_to_a98rgb(HSL_to_sRGB(this.components));
		return new A98Color(r, g, b);
	}

	toProPhoto() {
		const [r, g, b] = sRGB_to_ProPhoto(HSL_to_sRGB(this.components));
		return new ProPhotoColor(r, g, b);
	}

	toCMYK() {
		const [c, m, y, k] = naive_sRGB_to_CMYK(HSL_to_sRGB(this.components));
		return new CMYKColor(c, m, y, k);
	}

	toHWB() {
		const [h, w, b] = sRGB_to_HWB(HSL_to_sRGB(this.components));
		return new HWBColor(h, w, b);
	}

	toLab() {
		const [l, a, b] = sRGB_to_Lab(HSL_to_sRGB(this.components));
		return new LabColor(l, a, b);
	}

	toOKLab() {
		const [l, a, b] = sRGB_to_OKLab(HSL_to_sRGB(this.components));
		return new OKLabColor(l, a, b);
	}

	toLCH() {
		const [l, c, h] = sRGB_to_LCH(HSL_to_sRGB(this.components));
		return new LCHColor(l, c, h);
	}

	toOKLCH() {
		const [l, c, h] = sRGB_to_OKLCH(HSL_to_sRGB(this.components));
		return new OKLCHColor(l, c, h);
	}

	toString(precision = 2) {
		const [h, s, l] = this.components;

		return `hsl(${h.toFixed(precision).replace('.00', '')}, ${(s * 100).toFixed(precision).replace('.00', '')}, ${(
			l * 100
		)
			.toFixed(precision)
			.replace('.00', '')})`;
	}
}

export default HSLColor;
