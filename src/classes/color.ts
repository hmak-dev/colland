import RGBColor from 'src/classes/spaces/rgb';
import CMYKColor from 'src/classes/spaces/cmyk';
import A98Color from 'src/classes/spaces/a98';
import P3Color from 'src/classes/spaces/p3';
import Rec2020Color from 'src/classes/spaces/r2020';
import ProPhotoColor from 'src/classes/spaces/pro_photo';
import OKLCHColor from 'src/classes/spaces/oklch';
import OKLabColor from 'src/classes/spaces/oklab';
import LCHColor from 'src/classes/spaces/lch';
import LabColor from 'src/classes/spaces/lab';
import HWBColor from 'src/classes/spaces/hwb';
import HSLColor from 'src/classes/spaces/hsl';

class Color {
	static fromHex(hex) {
		let hexCode = hex.replace('#', '');
		hexCode = hexCode.length === 3 ? hexCode.replace(/([a-f0-9])/gi, '$1$1') : hexCode;

		const rgbMatch = /^([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})$/i.exec(hexCode);

		const red = parseInt(rgbMatch[1], 16) / 255;
		const green = parseInt(rgbMatch[2], 16) / 255;
		const blue = parseInt(rgbMatch[3], 16) / 255;

		return new RGBColor(red, green, blue);
	}

	static fromRGB(red, green, blue, reference = 255) {
		const r = red / reference;
		const g = green / reference;
		const b = blue / reference;

		return new RGBColor(r, g, b);
	}

	static fromA98(red, green, blue) {
		return new A98Color(red, green, blue);
	}

	static fromP3(red, green, blue) {
		return new P3Color(red, green, blue);
	}

	static fromRec2020(red, green, blue) {
		return new Rec2020Color(red, green, blue);
	}

	static fromProPhoto(red, green, blue) {
		return new ProPhotoColor(red, green, blue);
	}

	static fromCMYK(cyan, magenta, yellow, black, reference = 100) {
		const c = cyan / reference;
		const m = magenta / reference;
		const y = yellow / reference;
		const k = black / reference;

		return new CMYKColor(c, m, y, k);
	}

	static fromHWB(hue, white, black, reference = 100) {
		const h = hue;
		const w = white / reference;
		const b = black / reference;

		return new HWBColor(h, w, b);
	}

	static fromHSL(hue, saturation, lightness, reference = 100) {
		const h = hue;
		const s = saturation / reference;
		const l = lightness / reference;

		return new HSLColor(h, s, l);
	}

	static fromLCH(lightness, chroma, hue) {
		return new LCHColor(lightness, chroma, hue);
	}

	static fromOKLCH(lightness, a, b) {
		return new OKLCHColor(lightness, a, b);
	}

	static fromLab(lightness, a, b) {
		return new LabColor(lightness, a, b);
	}

	static fromOKLab(lightness, a, b) {
		return new OKLabColor(lightness, a, b);
	}
}

export default Color;
