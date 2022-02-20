import { 
    naive_sRGB_to_CMYK, 
    a98rgb_to_Lab, 
    a98rgb_to_LCH, 
    a98rgb_to_sRGB, 
    sRGB_to_HSL, 
    sRGB_to_HWB, 
    sRGB_to_ProPhoto, 
    sRGB_to_r2020, 
    sRGB_to_P3, 
    a98rgb_to_OKLab, 
    a98rgb_to_OKLCH 
} from '../assets/utilities.js';
import CMYKColor from './cmyk.js';

import Color from './color.js';
import HSLColor from './hsl.js';
import HWBColor from './hwb.js';
import LabColor from './lab.js';
import LCHColor from './lch.js';
import OKLabColor from './oklab.js';
import OKLCHColor from './oklch.js';
import P3Color from './p3.js';
import ProPhotoColor from './prophoto.js';
import Rec2020Color from './r2020.js';
import RGBColor from './rgb.js';

class A98Color extends Color {
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
        super('a98-rgb', 'rgb');

        this._r = red;
        this._g = green;
        this._b = blue;
    }


    toRGB() {
        return new RGBColor(...a98rgb_to_sRGB(this.components));
    }

    toP3() {
        return new P3Color(...sRGB_to_P3(a98rgb_to_sRGB(this.components)));
    }

    toRec2020() {
        return new Rec2020Color(...sRGB_to_r2020(a98rgb_to_sRGB(this.components)));
    }

    toProPhoto() {
        return new ProPhotoColor(...sRGB_to_ProPhoto(a98rgb_to_sRGB(this.components)));
    }

    toCMYK() {
        return new CMYKColor(...naive_sRGB_to_CMYK(a98rgb_to_sRGB(this.components)));
    }

    toHSL() {
        return new HSLColor(...sRGB_to_HSL(a98rgb_to_sRGB(this.components)));
    }

    toHWB() {
        return new HWBColor(...sRGB_to_HWB(a98rgb_to_sRGB(this.components)));
    }

    toLab() {
        return new LabColor(...a98rgb_to_Lab(this.components));
    }

    toOKLab() {
        return new OKLabColor(...a98rgb_to_OKLab(this.components));
    }

    toLCH() {
        return new LCHColor(...a98rgb_to_LCH(this.components));
    }

    toOKLCH() {
        return new OKLCHColor(...a98rgb_to_OKLCH(this.components));
    }


    toString(precision = 2) {
        return `color(a98-rgb ${this.components.map((c) => c.toFixed(precision).replace('.00', '')).join(' ')})`;
    }
}



Color.fromA98 = (red, green, blue) => {
    return new A98Color(red, green, blue);
};



export default A98Color;