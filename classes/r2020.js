import { 
    naive_sRGB_to_CMYK, 
    r2020_to_Lab, 
    r2020_to_LCH, 
    r2020_to_OKLab, 
    r2020_to_OKLCH, 
    r2020_to_sRGB, 
    sRGB_to_a98rgb, 
    sRGB_to_HSL, 
    sRGB_to_HWB, 
    sRGB_to_P3, 
    sRGB_to_ProPhoto 
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
import ProPhotoColor from './prophoto.js';
import RGBColor from './rgb.js';

class Rec2020Color extends Color {
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
        super('rec2020', 'rgb');

        this._r = red;
        this._g = green;
        this._b = blue;
    }


    toRGB() {
        return new RGBColor(...r2020_to_sRGB(this.components));
    }

    toP3() {
        return new P3Color(...sRGB_to_P3(r2020_to_sRGB(this.components)));
    }

    toA98() {
        return new A98Color(...sRGB_to_a98rgb(r2020_to_sRGB(this.components)));
    }

    toProPhoto() {
        return new ProPhotoColor(...sRGB_to_ProPhoto(r2020_to_sRGB(this.components)));
    }

    toCMYK() {
        return new CMYKColor(...naive_sRGB_to_CMYK(r2020_to_sRGB(this.components)));
    }

    toHSL() {
        return new HSLColor(...sRGB_to_HSL(r2020_to_sRGB(this.components)));
    }

    toHWB() {
        return new HWBColor(...sRGB_to_HWB(r2020_to_sRGB(this.components)));
    }

    toLab() {
        return new LabColor(...r2020_to_Lab(this.components));
    }

    toOKLab() {
        return new OKLabColor(...r2020_to_OKLab(this.components));
    }

    toLCH() {
        return new LCHColor(...r2020_to_LCH(this.components));
    }

    toOKLCH() {
        return new OKLCHColor(...r2020_to_OKLCH(this.components));
    }


    toString(precision = 2) {
        return `color(rec2020 ${this.components.map((c) => c.toFixed(precision).replace('.00', '')).join(' ')})`;
    }
}



Color.fromRec2020 = (red, green, blue) => {
    return new Rec2020Color(red, green, blue);
};



export default Rec2020Color;