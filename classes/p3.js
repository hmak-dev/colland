import { 
    naive_sRGB_to_CMYK, 
    P3_to_Lab, 
    P3_to_LCH, 
    P3_to_OKLab, 
    P3_to_OKLCH, 
    P3_to_sRGB, 
    sRGB_to_a98rgb, 
    sRGB_to_HSL, 
    sRGB_to_HWB, 
    sRGB_to_ProPhoto, 
    sRGB_to_r2020
} from '../assets/utilities.js';
import A98Color from './a98.js';
import CMYKColor from './cmyk.js';

import Color from './color.js';
import HSLColor from './hsl.js';
import HWBColor from './hwb.js';
import LabColor from './lab.js';
import LCHColor from './lch.js';
import OKLabColor from './oklab.js';
import OKLCHColor from './oklch.js';
import ProPhotoColor from './prophoto.js';
import Rec2020Color from './r2020.js';
import RGBColor from './rgb.js';

class P3Color extends Color {
    _r = 0;
    _g = 0;
    _b = 0;
    

    get r() { return this._r; }
    set r(val) { this._r = val; }

    get g() { return this._g; }
    set g(val) { this._g = val; }

    get b() { return this._b; }
    set b(val) { this._b = val; }

    get red() { return this._r; }
    set red(val) { this._r = val; }

    get green() { return this._g; }
    set green(val) { this._g = val; }

    get blue() { return this._b; }
    set blue(val) { this._b = val; }


    constructor(red, green, blue) {
        super('display-p3', 'rgb');

        this._r = red;
        this._g = green;
        this._b = blue;
    }


    toRGB() {
        return new RGBColor(...P3_to_sRGB(this.components));
    }

    toRec2020() {
        return new Rec2020Color(...sRGB_to_r2020(P3_to_sRGB(this.components)));
    }

    toA98() {
        return new A98Color(...sRGB_to_a98rgb(P3_to_sRGB(this.components)));
    }

    toProPhoto() {
        return new ProPhotoColor(...sRGB_to_ProPhoto(P3_to_sRGB(this.components)));
    }

    toCMYK() {
        return new CMYKColor(...naive_sRGB_to_CMYK(P3_to_sRGB(this.components)));
    }

    toHSL() {
        return new HSLColor(...sRGB_to_HSL(P3_to_sRGB(this.components)));
    }

    toHWB() {
        return new HWBColor(...sRGB_to_HWB(P3_to_sRGB(this.components)));
    }

    toLab() {
        return new LabColor(...P3_to_Lab(this.components));
    }

    toOKLab() {
        return new OKLabColor(...P3_to_OKLab(this.components));
    }

    toLCH() {
        return new LCHColor(...P3_to_LCH(this.components));
    }

    toOKLCH() {
        return new OKLCHColor(...P3_to_OKLCH(this.components));
    }


    toString(precision = 2) {
        return `color(display-p3 ${this.components.map((c) => c.toFixed(precision).replace('.00', '')).join(' ')})`;
    }
}



Color.fromP3 = (red, green, blue) => {
    return new P3Color(red, green, blue);
};



export default P3Color;