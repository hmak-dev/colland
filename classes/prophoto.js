import { 
    naive_sRGB_to_CMYK, 
    ProPhoto_to_Lab, 
    ProPhoto_to_LCH, 
    ProPhoto_to_OKLab, 
    ProPhoto_to_OKLCH, 
    ProPhoto_to_sRGB, 
    sRGB_to_a98rgb, 
    sRGB_to_HSL, 
    sRGB_to_HWB, 
    sRGB_to_P3, 
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
import P3Color from './p3.js';
import Rec2020Color from './r2020.js';
import RGBColor from './rgb.js';

class ProPhotoColor extends Color {
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
        super('prophoto-rgb', 'rgb');

        this._r = red;
        this._g = green;
        this._b = blue;
    }


    toRGB() {
        return new RGBColor(...ProPhoto_to_sRGB(this.components));
    }

    toP3() {
        return new P3Color(...sRGB_to_P3(ProPhoto_to_sRGB(this.components)));
    }

    toRec2020() {
        return new Rec2020Color(...sRGB_to_r2020(ProPhoto_to_sRGB(this.components)));
    }

    toA98() {
        return new A98Color(...sRGB_to_a98rgb(ProPhoto_to_sRGB(this.components)));
    }

    toCMYK() {
        return new CMYKColor(...naive_sRGB_to_CMYK(ProPhoto_to_sRGB(this.components)));
    }

    toHSL() {
        return new HSLColor(...sRGB_to_HSL(ProPhoto_to_sRGB(this.components)));
    }

    toHWB() {
        return new HWBColor(...sRGB_to_HWB(ProPhoto_to_sRGB(this.components)));
    }

    toLab() {
        return new LabColor(...ProPhoto_to_Lab(this.components));
    }

    toOKLab() {
        return new OKLabColor(...ProPhoto_to_OKLab(this.components));
    }

    toLCH() {
        return new LCHColor(...ProPhoto_to_LCH(this.components));
    }

    toOKLCH() {
        return new OKLCHColor(...ProPhoto_to_OKLCH(this.components));
    }


    toString(precision = 2) {
        return `color(prophoto-rgb ${this.components.map((c) => c.toFixed(precision).replace('.00', '')).join(' ')})`;
    }
}



Color.fromProPhoto = (red, green, blue) => {
    return new ProPhotoColor(red, green, blue);
};



export default ProPhotoColor;