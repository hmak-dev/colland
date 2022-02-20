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
    LCH_to_OKLab 
} from '../assets/utilities.js';
import A98Color from './a98.js';
import CMYKColor from './cmyk.js';
import Color from './color.js';
import HSLColor from './hsl.js';
import HWBColor from './hwb.js';
import LabColor from './lab.js';
import OKLabColor from './oklab.js';
import OKLCHColor from './oklch.js';
import P3Color from './p3.js';
import ProPhotoColor from './prophoto.js';
import Rec2020Color from './r2020.js';
import RGBColor from './rgb.js';

class LCHColor extends Color {
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
        super('lch');

        this._l = lightness;
        this._c = chroma;
        this._h = hue;
    }
    

    toRGB() {
        return new RGBColor(...LCH_to_sRGB(this.components));
    }

    toP3() {
        return new P3Color(...LCH_to_P3(this.components));
    }

    toRec2020() {
        return new Rec2020Color(...LCH_to_r2020(this.components));
    }

    toA98() {
        return new A98Color(...LCH_to_a98rgb(this.components));
    }

    toProPhoto() {
        return new ProPhotoColor(...LCH_to_ProPhoto(this.components));
    }

    toCMYK() {
        return new CMYKColor(...naive_sRGB_to_CMYK(LCH_to_sRGB(this.components)));
    }

    toHSL() {
        return new HSLColor(...sRGB_to_HSL(LCH_to_sRGB(this.components)));
    }

    toHWB() {
        return new HWBColor(...sRGB_to_HWB(LCH_to_sRGB(this.components)));
    }

    toLab() {
        return new LabColor(...LCH_to_Lab(this.components));
    }

    toOKLab() {
        return new OKLabColor(...LCH_to_OKLab(this.components));
    }

    toOKLCH() {
        return new OKLCHColor(...LCH_to_OKLCH(this.components));
    }


    toString(precision = 2) {
        return `lch(${this.components.map((c) => c.toFixed(precision).replace('.00', '')).join(', ')})`;
    }
}



Color.fromLCH = (lightness, chroma, hue) => {
    return new LCHColor(lightness, chroma, hue);
};



export default LCHColor;