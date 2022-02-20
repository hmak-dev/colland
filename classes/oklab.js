import { 
    OKLab_to_sRGB, 
    naive_sRGB_to_CMYK, 
    sRGB_to_HSL, 
    sRGB_to_HWB, 
    OKLab_to_OKLCH,
    OKLab_to_LCH, 
    OKLab_to_Lab, 
    OKLab_to_P3, 
    OKLab_to_r2020, 
    OKLab_to_a98rgb, 
    OKLab_to_ProPhoto
} from '../assets/utilities.js';
import A98Color from './a98.js';
import CMYKColor from './cmyk.js';
import Color from './color.js';
import HSLColor from './hsl.js';
import HWBColor from './hwb.js';
import LabColor from './lab.js';
import LCHColor from './lch.js';
import OKLCHColor from './oklch.js';
import P3Color from './p3.js';
import ProPhotoColor from './prophoto.js';
import Rec2020Color from './r2020.js';
import RGBColor from './rgb.js';

class OKLabColor extends Color {
    _l = 0;
    _a = 0;
    _b = 0;


    get l() { return this._l; }
    set l(val) { this._l = val; }

    get a() { return this._a; }
    set a(val) { this._a = val; }

    get b() { return this._b; }
    set b(val) { this._b = val; }

    get lightness() { return this._l; }
    set lightness(val) { this._l = val; }


    constructor(lightness, a, b) {
        super('oklab', 'lab');

        this._l = lightness;
        this._a = a;
        this._b = b;
    }
    

    toRGB() {
        return new RGBColor(...OKLab_to_sRGB(this.components));
    }

    toP3() {
        return new P3Color(...OKLab_to_P3(this.components));
    }

    toRec2020() {
        return new Rec2020Color(...OKLab_to_r2020(this.components));
    }

    toA98() {
        return new A98Color(...OKLab_to_a98rgb(this.components));
    }

    toProPhoto() {
        return new ProPhotoColor(...OKLab_to_ProPhoto(this.components));
    }

    toCMYK() {
        return new CMYKColor(...naive_sRGB_to_CMYK(OKLab_to_sRGB(this.components)));
    }

    toHSL() {
        return new HSLColor(...sRGB_to_HSL(OKLab_to_sRGB(this.components)));
    }

    toHWB() {
        return new HWBColor(...sRGB_to_HWB(OKLab_to_sRGB(this.components)));
    }

    toLab() {
        return new LabColor(...OKLab_to_Lab(this.components));
    }

    toLCH() {
        return new LCHColor(...OKLab_to_LCH(this.components));
    }

    toOKLCH() {
        return new OKLCHColor(...OKLab_to_OKLCH(this.components));
    }


    toString(precision = 2) {
        return `oklab(${this.components.map((c) => c.toFixed(precision).replace('.00', '')).join(', ')})`;
    }
}



Color.fromOKLab = (lightness, a, b) => {
    return new OKLabColor(lightness, a, b);
};



export default OKLabColor;