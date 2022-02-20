import { 
    naive_sRGB_to_CMYK, 
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

class RGBColor extends Color {
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
        super('rgb');

        this._r = red;
        this._g = green;
        this._b = blue;
    }



    toP3() {
        return new P3Color(...sRGB_to_P3(this.components));
    }

    toRec2020() {
        return new Rec2020Color(...sRGB_to_r2020(this.components));
    }

    toA98() {
        return new A98Color(...sRGB_to_a98rgb(this.components));
    }

    toProPhoto() {
        return new ProPhotoColor(...sRGB_to_ProPhoto(this.components));
    }

    toCMYK() {
        return new CMYKColor(...naive_sRGB_to_CMYK(this.components));
    }

    toHSL() {
        return new HSLColor(...sRGB_to_HSL(this.components));
    }

    toHWB() {
        return new HWBColor(...sRGB_to_HWB(this.components));
    }

    toLab() {
        return new LabColor(...sRGB_to_Lab(this.components));
    }

    toOKLab() {
        return new OKLabColor(...sRGB_to_OKLab(this.components));
    }

    toLCH() {
        return new LCHColor(...sRGB_to_LCH(this.components));
    }

    toOKLCH() {
        return new OKLCHColor(...sRGB_to_OKLCH(this.components));
    }


    toString(hex = false, percent = false, precision = 2) {
        if (hex) {
            return `#${this.components.map((c) => Math.round(c * 255).toString(16).padStart(2, '0')).join('')}`;
        }

        if (percent) {
            return `rgb(${this.components.map((c) => `${(c * 100).toFixed(precision).replace('.00', '')}%`).join(', ')})`;
        }

        return `rgb(${this.components.map((c) => Math.round(c * 255)).join(', ')})`;
    }
}



Color.fromHex = (hex) => {
    hex = hex.replace('#', '');
    hex = hex.length === 3 ? hex.replace(/([a-f0-9])/ig, '$1$1') : hex;

    const rgbMatch = /^([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})$/i.exec(hex);

    const red = parseInt(rgbMatch[1], 16) / 255;
    const green = parseInt(rgbMatch[2], 16) / 255;
    const blue = parseInt(rgbMatch[3], 16) / 255;

    return new RGBColor(red, green, blue);
};

Color.fromRGB = (red, green, blue, reference = 255) => {
    red /= reference;
    green /= reference;
    blue /= reference;

    return new RGBColor(red, green, blue);
};



export default RGBColor;