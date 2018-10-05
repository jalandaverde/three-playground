import React, { PureComponent } from 'react';
import { object } from 'prop-types';

const THREE = window.THREE;

class OrbitControls extends PureComponent {
    static contextTypes = {
        threejs: object
    };

    componentDidMount() {
        const { getCamera, getCanvas} = this.context.threejs;
        const camera = getCamera();
        const canvas = getCanvas();
        this.controls = new THREE.OrbitControls(camera, canvas);
    }
    render() {
        return null;
    }

}

export default OrbitControls;