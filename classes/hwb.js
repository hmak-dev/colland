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
    sRGB_to_r2020 
} from '../assets/utilities.js';
import A98Color from './a98.js';
import CMYKColor from './cmyk.js';
import Color from './color.js';
import HSLColor from './hsl.js';
import LabColor from './lab.js';
import LCHColor from './lch.js';
import OKLabColor from './oklab.js';
import OKLCHColor from './oklch.js';
import P3Color from './p3.js';
import ProPhotoColor from './prophoto.js';
import Rec2020Color from './r2020.js';
import RGBColor from './rgb.js';

class HWBColor extends Color {
    _h = 0;
    _w = 0;
    _b = 0;
    

    get h() { return this._h; }
    set h(val) { this._h = val; }

    get s() { return this._w; }
    set s(val) { this._w = val; }

    get l() { return this._b; }
    set l(val) { this._b = val; }

    get hue() { return this._h; }
    set hue(val) { this._h = val; }

    get white() { return this._w; }
    set white(val) { this._w = val; }

    get black() { return this._b; }
    set black(val) { this._b = val; }


    constructor(hue, white, black) {
        super('hwb');

        this._h = hue;
        this._w = white;
        this._b = black;
    }


    toRGB() {
        return new RGBColor(...HWB_to_sRGB(this.components));
    }

    toP3() {
        return new P3Color(...sRGB_to_P3(HWB_to_sRGB(this.components)));
    }

    toRec2020() {
        return new Rec2020Color(...sRGB_to_r2020(HWB_to_sRGB(this.components)));
    }

    toA98() {
        return new A98Color(...sRGB_to_a98rgb(HWB_to_sRGB(this.components)));
    }

    toProPhoto() {
        return new ProPhotoColor(...sRGB_to_ProPhoto(HWB_to_sRGB(this.components)));
    }

    toCMYK() {
        return new CMYKColor(...naive_sRGB_to_CMYK(HWB_to_sRGB(this.components)));
    }

    toHSL() {
        return new HSLColor(...sRGB_to_HSL(HWB_to_sRGB(this.components)));
    }

    toLab() {
        return new LabColor(...sRGB_to_Lab(HWB_to_sRGB(this.components)));
    }

    toOKLab() {
        return new OKLabColor(...sRGB_to_OKLab(HWB_to_sRGB(this.components)));
    }

    toLCH() {
        return new LCHColor(...sRGB_to_LCH(HWB_to_sRGB(this.components)));
    }

    toOKLCH() {
        return new OKLCHColor(...sRGB_to_OKLCH(HWB_to_sRGB(this.components)));
    }


    toString(precision = 2) {
        const [h, w, b] = this.components;

        return `hwb(${h.toFixed(precision).replace('.00', '')}, ${(w * 100).toFixed(precision).replace('.00', '')}, ${(b * 100).toFixed(precision).replace('.00', '')})`;
    }
}



Color.fromHWB = (hue, white, black, reference = 100) => {
    white /= reference;
    black /= reference;

    return new HWBColor(hue, white, black);
};



export default HWBColor;