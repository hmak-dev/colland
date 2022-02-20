// utility functions for color conversions
// needs conversions.js

import {
    lin_sRGB,
    gam_sRGB,
    lin_sRGB_to_XYZ,
    XYZ_to_lin_sRGB,
    lin_P3,
    gam_P3,
    lin_P3_to_XYZ,
    XYZ_to_lin_P3,
    lin_2020,
    gam_2020,
    lin_2020_to_XYZ,
    XYZ_to_lin_2020,
    D65_to_D50,
    D50_to_D65,
    XYZ_to_Lab,
    Lab_to_XYZ,
    Lab_to_LCH,
    LCH_to_Lab,
    gam_ProPhoto,
    XYZ_to_lin_ProPhoto,
    lin_ProPhoto,
    lin_ProPhoto_to_XYZ,
    gam_a98rgb,
    XYZ_to_lin_a98rgb,
    lin_a98rgb_to_XYZ,
    lin_a98rgb,
    OKLCH_to_OKLab,
    OKLab_to_XYZ,
    OKLab_to_OKLCH,
    XYZ_to_OKLab,
} from './conversions.js'

export { Lab_to_LCH, LCH_to_Lab, OKLab_to_OKLCH, OKLCH_to_OKLab } from './conversions.js'

export function LCH_to_OKLab(LCH) {
    return XYZ_to_OKLab(Lab_to_XYZ(LCH_to_Lab(LCH)));
}
export function LCH_to_OKLCH(LCH) {
    return OKLab_to_OKLCH(LCH_to_OKLab(LCH));
}
export function OKLCH_to_Lab(OKLCH) {
    return XYZ_to_Lab(OKLab_to_XYZ(OKLCH_to_OKLab(OKLCH)));
}
export function OKLCH_to_LCH(OKLCH) {
    return Lab_to_LCH(XYZ_to_Lab(OKLab_to_XYZ(OKLCH_to_OKLab(OKLCH))));
}

export function Lab_to_OKLab(Lab) {
    return XYZ_to_OKLab(Lab_to_XYZ(Lab));
}
export function Lab_to_OKLCH(Lab) {
    return OKLab_to_OKLCH(Lab_to_OKLab(Lab));
}
export function OKLab_to_LCH(OKLab) {
    return Lab_to_LCH(XYZ_to_Lab(OKLab_to_XYZ(OKLab)));
}
export function OKLab_to_Lab(OKLab) {
    return XYZ_to_Lab(OKLab_to_XYZ(OKLab));
}


export function contrast(RGB1, RGB2) {
    // return WCAG 2.1 contrast ratio
    // https://www.w3.org/TR/WCAG21/#dfn-contrast-ratio
    // for two sRGB values
    // given as arrays of 0.0 to 1.0

    var L1 = sRGB_to_luminance(RGB1);
    var L2 = sRGB_to_luminance(RGB2);

    if (L1 > L2) {
        return (L1 + 0.05) / (L2 + 0.05);
    }
    
    return (L2 + 0.05) / (L1 + 0.05);
}


export function sRGB_to_luminance(RGB) {
    // convert an array of gamma-corrected sRGB values
    // in the 0.0 to 1.0 range
    // to linear-light sRGB, then to CIE XYZ
    // and return luminance (the Y value)

    var XYZ = lin_sRGB_to_XYZ(lin_sRGB(RGB));
    return XYZ[1];
}

export function sRGB_to_Lab(RGB) {
    // convert an array of gamma-corrected sRGB values
    // in the 0.0 to 1.0 range
    // to linear-light sRGB, then to CIE XYZ,
    // then adapt from D65 to D50,
    // then convert XYZ to CIE Lab

    return XYZ_to_Lab(D65_to_D50(lin_sRGB_to_XYZ(lin_sRGB(RGB))));
}

export function Lab_to_sRGB(Lab) {
    return gam_sRGB(XYZ_to_lin_sRGB(D50_to_D65(Lab_to_XYZ(Lab))));
}

export function sRGB_to_LCH(RGB) {
    // convert sRGB to CIE Lab
    // and finally, convert to CIE LCH

    return Lab_to_LCH(sRGB_to_Lab(RGB));
}

export function LCH_to_sRGB(LCH) {
    // convert an array of CIE LCH values
    // to CIE Lab, and then to XYZ,
    // adapt from D50 to D65,
    // then convert XYZ to linear-light sRGB
    // and finally to gamma corrected sRGB
    // for in-gamut colors, components are in the 0.0 to 1.0 range
    // out of gamut colors may have negative components
    // or components greater than 1.0
    // so check for that :)

    return gam_sRGB(XYZ_to_lin_sRGB(D50_to_D65(Lab_to_XYZ(LCH_to_Lab(LCH)))));
}

export function sRGB_to_OKLab(RGB) {
    // convert an array of gamma-corrected sRGB values
    // in the 0.0 to 1.0 range
    // to linear-light sRGB, then to CIE XYZ,
    // then adapt from D65 to D50,
    // then convert XYZ to CIE OKLab

    return XYZ_to_OKLab(D65_to_D50(lin_sRGB_to_XYZ(lin_sRGB(RGB))));
}

export function OKLab_to_sRGB(OKLab) {
    return gam_sRGB(XYZ_to_lin_sRGB(D50_to_D65(OKLab_to_XYZ(OKLab))));
}

export function sRGB_to_OKLCH(RGB) {
    // convert sRGB to CIE OKLab
    // and finally, convert to CIE OKLCH

    return OKLab_to_OKLCH(sRGB_to_OKLab(RGB));
}

export function OKLCH_to_sRGB(OKLCH) {
    // convert an array of CIE OKLCH values
    // to CIE OKLab, and then to XYZ,
    // adapt from D50 to D65,
    // then convert XYZ to linear-light sRGB
    // and finally to gamma corrected sRGB
    // for in-gamut colors, components are in the 0.0 to 1.0 range
    // out of gamut colors may have negative components
    // or components greater than 1.0
    // so check for that :)

    return gam_sRGB(XYZ_to_lin_sRGB(D50_to_D65(OKLab_to_XYZ(OKLCH_to_OKLab(OKLCH)))));
}

export function sRGB_to_P3(RGB) {
    return gam_P3(XYZ_to_lin_P3(lin_sRGB_to_XYZ(lin_sRGB(RGB))));
}

export function P3_to_sRGB(RGB) {
    return gam_sRGB(XYZ_to_lin_sRGB(lin_P3_to_XYZ(lin_P3(RGB))));
}

export function sRGB_to_r2020(RGB) {
    return gam_2020(XYZ_to_lin_2020(lin_sRGB_to_XYZ(lin_sRGB(RGB))));
}

export function r2020_to_sRGB(RGB) {
    return gam_sRGB(XYZ_to_lin_sRGB(lin_2020_to_XYZ(lin_2020(RGB))));
}

export function sRGB_to_ProPhoto(RGB) {
    return gam_ProPhoto(XYZ_to_lin_ProPhoto(lin_sRGB_to_XYZ(lin_sRGB(RGB))));
}

export function ProPhoto_to_sRGB(RGB) {
    return gam_sRGB(XYZ_to_lin_sRGB(lin_ProPhoto_to_XYZ(lin_ProPhoto(RGB))));
}

export function sRGB_to_a98rgb(RGB) {
    return gam_a98rgb(XYZ_to_lin_a98rgb(lin_sRGB_to_XYZ(lin_sRGB(RGB))));
}

export function a98rgb_to_sRGB(RGB) {
    return gam_sRGB(XYZ_to_lin_sRGB(lin_a98rgb_to_XYZ(lin_a98rgb(RGB))));
}



export function P3_to_Lab(RGB) {
    // convert an array of gamma-corrected display-p3 values
    // in the 0.0 to 1.0 range
    // to linear-light display-p3, then to CIE XYZ,
    // then adapt from D65 to D50,
    // then convert XYZ to CIE Lab

    return XYZ_to_Lab(D65_to_D50(lin_P3_to_XYZ(lin_P3(RGB))));
}

export function Lab_to_P3(Lab) {
    return gam_P3(XYZ_to_lin_P3(D50_to_D65(Lab_to_XYZ(Lab))));
}

export function P3_to_LCH(RGB) {
    // convert P3 to CIE Lab
    // and finally, convert to CIE LCH

    return Lab_to_LCH(P3_to_Lab(RGB));
}

export function LCH_to_P3(LCH) {
    // convert an array of CIE LCH values
    // to CIE Lab, and then to XYZ,
    // adapt from D50 to D65,
    // then convert XYZ to linear-light display-p3
    // and finally to gamma corrected display-p3
    // for in-gamut colors, components are in the 0.0 to 1.0 range
    // out of gamut colors may have negative components
    // or components greater than 1.0
    // so check for that :)

    return gam_P3(XYZ_to_lin_P3(D50_to_D65(Lab_to_XYZ(LCH_to_Lab(LCH)))));
}



export function P3_to_OKLab(RGB) {
    // convert an array of gamma-corrected display-p3 values
    // in the 0.0 to 1.0 range
    // to linear-light display-p3, then to CIE XYZ,
    // then adapt from D65 to D50,
    // then convert XYZ to CIE OKLab

    return XYZ_to_OKLab(D65_to_D50(lin_P3_to_XYZ(lin_P3(RGB))));
}

export function OKLab_to_P3(OKLab) {
    return gam_P3(XYZ_to_lin_P3(D50_to_D65(OKLab_to_XYZ(OKLab))));
}

export function P3_to_OKLCH(RGB) {
    // convert P3 to CIE OKLab
    // and finally, convert to CIE OKLCH

    return OKLab_to_OKLCH(P3_to_OKLab(RGB));
}

export function OKLCH_to_P3(OKLCH) {
    // convert an array of CIE OKLCH values
    // to CIE OKLab, and then to XYZ,
    // adapt from D50 to D65,
    // then convert XYZ to linear-light display-p3
    // and finally to gamma corrected display-p3
    // for in-gamut colors, components are in the 0.0 to 1.0 range
    // out of gamut colors may have negative components
    // or components greater than 1.0
    // so check for that :)

    return gam_P3(XYZ_to_lin_P3(D50_to_D65(OKLab_to_XYZ(OKLCH_to_OKLab(OKLCH)))));
}



export function r2020_to_Lab(RGB) {
    // convert an array of gamma-corrected rec.2020 values
    // in the 0.0 to 1.0 range
    // to linear-light sRGB, then to CIE XYZ,
    // then adapt from D65 to D50,
    // then convert XYZ to CIE Lab

    return XYZ_to_Lab(D65_to_D50(lin_2020_to_XYZ(lin_2020(RGB))));
}

export function Lab_to_r2020(Lab) {
    return gam_2020(XYZ_to_lin_2020(D50_to_D65(Lab_to_XYZ(Lab))));
}

export function r2020_to_LCH(RGB) {
    // convert sRGB to CIE Lab
    // and finally, convert to CIE LCH

    return Lab_to_LCH(r2020_to_Lab(RGB));
}

export function LCH_to_r2020(LCH) {
    // convert an array of CIE LCH values
    // to CIE Lab, and then to XYZ,
    // adapt from D50 to D65,
    // then convert XYZ to linear-light rec.2020
    // and finally to gamma corrected rec.2020
    // for in-gamut colors, components are in the 0.0 to 1.0 range
    // out of gamut colors may have negative components
    // or components greater than 1.0
    // so check for that :)

    return gam_2020(XYZ_to_lin_2020(D50_to_D65(Lab_to_XYZ(LCH_to_Lab(LCH)))));
}



export function r2020_to_OKLab(RGB) {
    // convert an array of gamma-corrected rec.2020 values
    // in the 0.0 to 1.0 range
    // to linear-light sRGB, then to CIE XYZ,
    // then adapt from D65 to D50,
    // then convert XYZ to CIE OKLab

    return XYZ_to_OKLab(D65_to_D50(lin_2020_to_XYZ(lin_2020(RGB))));
}

export function OKLab_to_r2020(OKLab) {
    return gam_2020(XYZ_to_lin_2020(D50_to_D65(OKLab_to_XYZ(OKLab))));
}

export function r2020_to_OKLCH(RGB) {
    // convert sRGB to CIE OKLab
    // and finally, convert to CIE OKLCH

    return OKLab_to_OKLCH(r2020_to_OKLab(RGB));
}

export function OKLCH_to_r2020(OKLCH) {
    // convert an array of CIE OKLCH values
    // to CIE OKLab, and then to XYZ,
    // adapt from D50 to D65,
    // then convert XYZ to linear-light rec.2020
    // and finally to gamma corrected rec.2020
    // for in-gamut colors, components are in the 0.0 to 1.0 range
    // out of gamut colors may have negative components
    // or components greater than 1.0
    // so check for that :)

    return gam_2020(XYZ_to_lin_2020(D50_to_D65(OKLab_to_XYZ(OKLCH_to_OKLab(OKLCH)))));
}



export function ProPhoto_to_Lab(RGB) {
    // convert an array of gamma-corrected ProPhoto values
    // in the 0.0 to 1.0 range
    // to linear-light sRGB, then to CIE XYZ,
    // then adapt from D65 to D50,
    // then convert XYZ to CIE Lab

    return XYZ_to_Lab(D65_to_D50(lin_ProPhoto_to_XYZ(lin_ProPhoto(RGB))));
}

export function Lab_to_ProPhoto(Lab) {
    return gam_ProPhoto(XYZ_to_lin_ProPhoto(D50_to_D65(Lab_to_XYZ(Lab))));
}

export function ProPhoto_to_LCH(RGB) {
    // convert sRGB to CIE Lab
    // and finally, convert to CIE LCH

    return Lab_to_LCH(ProPhoto_to_Lab(RGB));
}

export function LCH_to_ProPhoto(LCH) {
    // convert an array of CIE LCH values
    // to CIE Lab, and then to XYZ,
    // adapt from D50 to D65,
    // then convert XYZ to linear-light ProPhoto
    // and finally to gamma corrected ProPhoto
    // for in-gamut colors, components are in the 0.0 to 1.0 range
    // out of gamut colors may have negative components
    // or components greater than 1.0
    // so check for that :)

    return gam_ProPhoto(XYZ_to_lin_ProPhoto(D50_to_D65(Lab_to_XYZ(LCH_to_Lab(LCH)))));
}



export function ProPhoto_to_OKLab(RGB) {
    // convert an array of gamma-corrected ProPhoto values
    // in the 0.0 to 1.0 range
    // to linear-light sRGB, then to CIE XYZ,
    // then adapt from D65 to D50,
    // then convert XYZ to CIE OKLab

    return XYZ_to_OKLab(D65_to_D50(lin_ProPhoto_to_XYZ(lin_ProPhoto(RGB))));
}

export function OKLab_to_ProPhoto(OKLab) {
    return gam_ProPhoto(XYZ_to_lin_ProPhoto(D50_to_D65(OKLab_to_XYZ(OKLab))));
}

export function ProPhoto_to_OKLCH(RGB) {
    // convert sRGB to CIE OKLab
    // and finally, convert to CIE OKLCH

    return OKLab_to_OKLCH(ProPhoto_to_OKLab(RGB));
}

export function OKLCH_to_ProPhoto(OKLCH) {
    // convert an array of CIE OKLCH values
    // to CIE OKLab, and then to XYZ,
    // adapt from D50 to D65,
    // then convert XYZ to linear-light ProPhoto
    // and finally to gamma corrected ProPhoto
    // for in-gamut colors, components are in the 0.0 to 1.0 range
    // out of gamut colors may have negative components
    // or components greater than 1.0
    // so check for that :)

    return gam_ProPhoto(XYZ_to_lin_ProPhoto(D50_to_D65(OKLab_to_XYZ(OKLCH_to_OKLab(OKLCH)))));
}




export function a98rgb_to_Lab(RGB) {
    // convert an array of gamma-corrected a98rgb values
    // in the 0.0 to 1.0 range
    // to linear-light sRGB, then to CIE XYZ,
    // then adapt from D65 to D50,
    // then convert XYZ to CIE Lab

    return XYZ_to_Lab(D65_to_D50(lin_a98rgb_to_XYZ(lin_a98rgb(RGB))));
}

export function Lab_to_a98rgb(Lab) {
    return gam_a98rgb(XYZ_to_lin_a98rgb(D50_to_D65(Lab_to_XYZ(Lab))));
}

export function a98rgb_to_LCH(RGB) {
    // convert sRGB to CIE Lab
    // and finally, convert to CIE LCH

    return Lab_to_LCH(a98rgb_to_Lab(RGB));
}

export function LCH_to_a98rgb(LCH) {
    // convert an array of CIE LCH values
    // to CIE Lab, and then to XYZ,
    // adapt from D50 to D65,
    // then convert XYZ to linear-light a98rgb
    // and finally to gamma corrected a98rgb
    // for in-gamut colors, components are in the 0.0 to 1.0 range
    // out of gamut colors may have negative components
    // or components greater than 1.0
    // so check for that :)

    return gam_a98rgb(XYZ_to_lin_a98rgb(D50_to_D65(Lab_to_XYZ(LCH_to_Lab(LCH)))));
}




export function a98rgb_to_OKLab(RGB) {
    // convert an array of gamma-corrected a98rgb values
    // in the 0.0 to 1.0 range
    // to linear-light sRGB, then to CIE XYZ,
    // then adapt from D65 to D50,
    // then convert XYZ to CIE OKLab

    return XYZ_to_OKLab(D65_to_D50(lin_a98rgb_to_XYZ(lin_a98rgb(RGB))));
}

export function OKLab_to_a98rgb(OKLab) {
    return gam_a98rgb(XYZ_to_lin_a98rgb(D50_to_D65(OKLab_to_XYZ(OKLab))));
}

export function a98rgb_to_OKLCH(RGB) {
    // convert sRGB to CIE OKLab
    // and finally, convert to CIE OKLCH

    return OKLab_to_OKLCH(a98rgb_to_OKLab(RGB));
}

export function OKLCH_to_a98rgb(OKLCH) {
    // convert an array of CIE OKLCH values
    // to CIE OKLab, and then to XYZ,
    // adapt from D50 to D65,
    // then convert XYZ to linear-light a98rgb
    // and finally to gamma corrected a98rgb
    // for in-gamut colors, components are in the 0.0 to 1.0 range
    // out of gamut colors may have negative components
    // or components greater than 1.0
    // so check for that :)

    return gam_a98rgb(XYZ_to_lin_a98rgb(D50_to_D65(OKLab_to_XYZ(OKLCH_to_OKLab(OKLCH)))));
}




// this is straight from the CSS Color 4 spec
export function HSL_to_sRGB(HSL) {
    let [hue, sat, light] = HSL;

    hue = hue % 360;

    if (hue < 0) {
        hue += 360;
    }

    function f(n) {
        let k = (n + hue/30) % 12;
        let a = sat * Math.min(light, 1 - light);
        return light - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
    }

    return [f(0), f(8), f(4)];
}

export function sRGB_to_HSL(RGB) {
    let [red, green, blue] = RGB;

    let max = Math.max(red, green, blue);
    let min = Math.min(red, green, blue);
    let [hue, sat, light] = [NaN, 0, (min + max)/2];
    let d = max - min;

    if (d !== 0) {
        sat = (light === 0 || light === 1)
            ? 0
            : (max - light) / Math.min(light, 1 - light);

        switch (max) {
            case red:   hue = (green - blue) / d + (green < blue ? 6 : 0); break;
            case green: hue = (blue - red) / d + 2; break;
            case blue:  hue = (red - green) / d + 4;
        }

        hue = hue * 60;
    }

    return [hue, sat, light];
}

export function HWB_to_sRGB(HWB) {
    let [hue, white, black] = HWB;

    if (white + black >= 1) {
        let gray = white / (white + black);
        return [gray, gray, gray];
    }

    let rgb = HSL_to_sRGB([hue, 1, 0.5]);

    for (let i = 0; i < 3; i++) {
        rgb[i] *= (1 - white - black);
        rgb[i] += white;
    }

    return rgb;
}

export function sRGB_to_HWB(RGB) {
    let [red, green, blue] = RGB;

    var [hue] = sRGB_to_HSL(RGB);
    var white = Math.min(red, green, blue);
    var black = 1 - Math.max(red, green, blue);

    return [hue, white, black];
}




// These are the naive algorithms from CS Color 4

export function naive_CMYK_to_sRGB(CMYK) {
    // CMYK is an array of four values
    // in the range [0.0, 1.0]
    // the optput is an array of [RGB]
    // also in the [0.0, 1.0] range
    // because the naive algorithm does not generate out of gamut colors
    // neither does it generate accurate simulations of practical CMYK colors

    var cyan = CMYK[0], magenta = CMYK[1], yellow = CMYK[2], black = CMYK[3];

    var red = 1 - Math.min(1, cyan * (1 - black) + black);
    var green = 1 - Math.min(1, magenta * (1 - black) + black);
    var blue = 1 - Math.min(1, yellow * (1 - black) + black);

    return [red, green, blue];

}

export function naive_sRGB_to_CMYK(RGB) {
    // RGB is an arravy of three values
    // in the range [0.0, 1.0]
    // the output is an array of [CMYK]
    // also in the [0.0, 1.0] range
    // with maximum GCR and (I think) 200% TAC
    // the naive algorithm does not generate out of gamut colors
    // neither does it generate accurate simulations of practical CMYK colors

    var red = RGB[0], green= RGB[1], blue = RGB[2];

    var black = 1 - Math.max(red, green, blue);
    var cyan = (black == 1.0)? 0: (1 - red - black) / (1 - black);
    var magenta = (black == 1.0)? 0: (1 - green - black) / (1 - black);
    var yellow = (black == 1.0)? 0: (1 - blue - black) / (1 - black);

    return [cyan, magenta, yellow, black];
}




// Chromaticity utilities

export function XYZ_to_xy(XYZ) {
    // Convert an array of three XYZ values
    // to x,y chromaticity coordinates

    var X = XYZ[0];
    var Y = XYZ[1];
    var Z = XYZ[2];
    var sum = X+Y+Z;
    return [X/sum, Y/sum];
}

export function xy_to_uv(xy) {
    // convert an x,y chromaticity pair
    // to u*,v* chromaticities

    var x = xy[0];
    var y = xy[1];
    var denom = -2*x + 12*y +3;
    return [4*x / denom, 9*y / denom];
}

export function XYZ_to_uv(XYZ) {
    // Convert an array of three XYZ values
    // to u*,v* chromaticity coordinates

    var X = XYZ[0];
    var Y = XYZ[1];
    var Z = XYZ[2];
    var denom = X + 15*Y +3*Z;
    return [4*X / denom, 9*Y / denom];
}