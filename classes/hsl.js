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
    sRGB_to_r2020 
} from '../assets/utilities.js';
import A98Color from './a98.js';
import CMYKColor from './cmyk.js';
import Color from './color.js';
import HWBColor from './hwb.js';
import LabColor from './lab.js';
import LCHColor from './lch.js';
import OKLabColor from './oklab.js';
import OKLCHColor from './oklch.js';
import P3Color from './p3.js';
import ProPhotoColor from './prophoto.js';
import Rec2020Color from './r2020.js';
import RGBColor from './rgb.js';

class HSLColor extends Color {
    _h = 0;
    _s = 0;
    _l = 0;


    get h() { return this._h; }
    set h(val) { this._h = val; }

    get s() { return this._s; }
    set s(val) { this._s = val; }

    get l() { return this._l; }
    set l(val) { this._l = val; }

    get hue() { return this._h; }
    set hue(val) { this._h = val; }

    get saturation() { return this._s; }
    set saturation(val) { this._s = val; }

    get lightness() { return this._l; }
    set lightness(val) { this._l = val; }


    constructor(hue, saturation, lightness) {
        super('hsl');

        this._h = hue;
        this._s = saturation;
        this._l = lightness;
    }
    

    toRGB() {
        return new RGBColor(...HSL_to_sRGB(this.components));
    }

    toP3() {
        return new P3Color(...sRGB_to_P3(HSL_to_sRGB(this.components)));
    }

    toRec2020() {
        return new Rec2020Color(...sRGB_to_r2020(HSL_to_sRGB(this.components)));
    }

    toA98() {
        return new A98Color(...sRGB_to_a98rgb(HSL_to_sRGB(this.components)));
    }

    toProPhoto() {
        return new ProPhotoColor(...sRGB_to_ProPhoto(HSL_to_sRGB(this.components)));
    }

    toCMYK() {
        return new CMYKColor(...naive_sRGB_to_CMYK(HSL_to_sRGB(this.components)));
    }

    toHWB() {
        return new HWBColor(...sRGB_to_HWB(HSL_to_sRGB(this.components)));
    }

    toLab() {
        return new LabColor(...sRGB_to_Lab(HSL_to_sRGB(this.components)));
    }

    toOKLab() {
        return new OKLabColor(...sRGB_to_OKLab(HSL_to_sRGB(this.components)));
    }

    toLCH() {
        return new LCHColor(...sRGB_to_LCH(HSL_to_sRGB(this.components)));
    }

    toOKLCH() {
        return new OKLCHColor(...sRGB_to_OKLCH(HSL_to_sRGB(this.components)));
    }


    toString(precision = 2) {
        const [h, s, l] = this.components;

        return `hsl(${h.toFixed(precision).replace('.00', '')}, ${(s * 100).toFixed(precision).replace('.00', '')}, ${(l * 100).toFixed(precision).replace('.00', '')})`;
    }
}



Color.fromHSL = (hue, saturation, lightness, reference = 100) => {
    saturation /= reference;
    lightness /= reference;

    return new HSLColor(hue, saturation, lightness);
};



export default HSLColor;