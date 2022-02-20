import { 
    naive_CMYK_to_sRGB, 
    sRGB_to_a98rgb, 
    sRGB_to_HSL, 
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

class CMYKColor extends Color {
    _c = 0;
    _m = 0;
    _y = 0;
    _k = 0;


    get c() { return this._c; }
    set c(val) { this._c = val; }

    get m() { return this._m; }
    set m(val) { this._m = val; }

    get y() { return this._y; }
    set y(val) { this._y = val; }

    get k() { return this._k; }
    set k(val) { this._k = val; }

    get cyan() { return this._c; }
    set cyan(val) { this._c = val; }

    get magenta() { return this._m; }
    set magenta(val) { this._m = val; }

    get yellow() { return this._y; }
    set yellow(val) { this._y = val; }

    get black() { return this._k; }
    set black(val) { this._k = val; }


    constructor(cyan, magenta, yellow, black) {
        super('cmyk');

        this._c = cyan;
        this._m = magenta;
        this._y = yellow;
        this._k = black;
    }


    toRGB() {
        return new RGBColor(...naive_CMYK_to_sRGB(this.components));
    }

    toP3() {
        return new P3Color(...sRGB_to_P3(naive_CMYK_to_sRGB(this.components)));
    }

    toRec2020() {
        return new Rec2020Color(...sRGB_to_r2020(naive_CMYK_to_sRGB(this.components)));
    }

    toA98() {
        return new A98Color(...sRGB_to_a98rgb(naive_CMYK_to_sRGB(this.components)));
    }

    toProPhoto() {
        return new ProPhotoColor(...sRGB_to_ProPhoto(naive_CMYK_to_sRGB(this.components)));
    }

    toHSL() {
        return new HSLColor(...sRGB_to_HSL(naive_CMYK_to_sRGB(this.components)));
    }

    toHWB() {
        return new HWBColor(...sRGB_to_HWB(naive_CMYK_to_sRGB(this.components)));
    }

    toLab() {
        return new LabColor(...sRGB_to_Lab(naive_CMYK_to_sRGB(this.components)));
    }

    toOKLab() {
        return new OKLabColor(...sRGB_to_OKLab(naive_CMYK_to_sRGB(this.components)));
    }

    toLCH() {
        return new LCHColor(...sRGB_to_LCH(naive_CMYK_to_sRGB(this.components)));
    }

    toOKLCH() {
        return new OKLCHColor(...sRGB_to_OKLCH(naive_CMYK_to_sRGB(this.components)));
    }


    toString(precision = 2) {
        return `cmyk(${this.components.map((c) => `${(c * 100).toFixed(precision).replace('.00', '')}%`).join(', ')})`;
    }
}

Color.fromCMYK = (cyan, magenta, yellow, black, reference = 100) => {
    cyan /= reference;
    magenta /= reference;
    yellow /= reference;
    black /= reference;

    return new CMYKColor(cyan, magenta, yellow, black);
};

export default CMYKColor;