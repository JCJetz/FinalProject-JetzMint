import ModelViewer from '@metamask/logo';
import React from 'react';


// No funciona :((
export default function MetamaskLogo () {

    // To render with fixed dimensions:
    const viewer = ModelViewer({
        // Dictates whether width & height are px or multiplied
        pxNotRatio: true,
        width: 50,
        height: 40,
        // pxNotRatio: false,
        // width: 0.9,
        // height: 0.9,

        // To make the face follow the mouse.
        followMouse: false,

        // head should slowly drift (overrides lookAt)
        slowDrift: false,
    });

    // add viewer to DOM
    let mainContainer = React.createElement("div", { className: "logo-container" }, viewer.mainContainer);

    return {mainContainer}

}