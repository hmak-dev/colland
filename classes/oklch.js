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
    OKLCH_to_LCH 
} from '../assets/utilities.js';
import A98Color from './a98.js';
import CMYKColor from './cmyk.js';
import Color from './color.js';
import HSLColor from './hsl.js';
import HWBColor from './hwb.js';
import LabColor from './lab.js';
import LCHColor from './lch.js';
import OKLabColor from './oklab.js';
import P3Color from './p3.js';
import ProPhotoColor from './prophoto.js';
import Rec2020Color from './r2020.js';
import RGBColor from './rgb.js';

class OKLCHColor extends Color {
    _l = 0;
    _c = 0;
    _h = 0;


    get h() { return this._l; }
    set h(val) { this._l = val; }

    get s() { return this._c; }
    set s(val) { this._c = val; }

    get l() { return this._h; }
    set l(val) { this._h = val; }

    get lightness() { return this._l; }
    set lightness(val) { this._l = val; }

    get chroma() { return this._c; }
    set chroma(val) { this._c = val; }

    get hue() { return this._h; }
    set hue(val) { this._h = val; }


    constructor(lightness, chroma, hue) {
        super('oklch', 'lch');

        this._l = lightness;
        this._c = chroma;
        this._h = hue;
    }
    

    toRGB() {
        return new RGBColor(...OKLCH_to_sRGB(this.components));
    }

    toP3() {
        return new P3Color(...OKLCH_to_P3(this.components));
    }

    toRec2020() {
        return new Rec2020Color(...OKLCH_to_r2020(this.components));
    }

    toA98() {
        return new A98Color(...OKLCH_to_a98rgb(this.components));
    }

    toProPhoto() {
        return new ProPhotoColor(...OKLCH_to_ProPhoto(this.components));
    }

    toCMYK() {
        return new CMYKColor(...naive_sRGB_to_CMYK(OKLCH_to_sRGB(this.components)));
    }

    toHSL() {
        return new HSLColor(...sRGB_to_HSL(OKLCH_to_sRGB(this.components)));
    }

    toHWB() {
        return new HWBColor(...sRGB_to_HWB(OKLCH_to_sRGB(this.components)));
    }

    toLCH() {
        return new LCHColor(...OKLCH_to_LCH(this.components));
    }

    toLab() {
        return new LabColor(...OKLCH_to_Lab(this.components));
    }

    toOKLab() {
        return new OKLabColor(...OKLCH_to_OKLab(this.components));
    }


    toString(precision = 2) {
        return `oklch(${this.components.map((c) => c.toFixed(precision).replace('.00', '')).join(', ')})`;
    }
}



Color.fromOKLCH = (lightness, a, b) => {
    return new OKLCHColor(lightness, a, b);
};



export default OKLCHColor;