import React, { PureComponent } from 'react';
import { object } from 'prop-types';

const THREE = window.THREE;

class PerspectiveCamera extends PureComponent {
    static contextTypes = {
        threejs: object
    }
    constructor(props) {
        super(props);
        const aspect = 800 / 450;
        const far = 1000;
        const near = 0.1;
        const fov = 35;

        this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    }
    componentDidMount() {
        const { registerCamera } = this.context.threejs;
        this.camera.position.set(0, 75, 150);
        this.camera.lookAt(0, 0, 0);
        registerCamera(this.camera);
    }
    render() {
        return null;
    }

}

export default PerspectiveCamera;