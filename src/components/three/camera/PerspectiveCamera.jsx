import React, { Component, PureComponent } from 'react';
import { object } from 'prop-types';

const THREE = window.THREE;

class PerspectiveCamera extends Component {
    static contextTypes = {
        threejs: object
    }
    constructor(props) {
        super(props);
        // const { getCanvas } = this.context.threejs;
        // const canvas = getCanvas();
        // const aspect =  canvas.clientWidth / canvas.clientHeight;
        // const far = 1000;
        // const near = 0.1;
        // const fov = 35;
        // this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    }
    componentShouldUpdate() {
        return true;
    }
    componentDidMount() {
        console.log('PerspectiveCamera: componentDidMount')
        const { registerCamera, getWidth, getCanvas, width, height } = this.context.threejs;
        const canvas = getCanvas();
        const aspect =  width/height;//canvas.clientWidth / canvas.clientHeight;
        const far = 8000;
        const near = 0.1;
        const fov = 35;
        this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
        // const canvas = getCanvas();
        // this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
        this.camera.position.set(0, 75, 150);
        this.camera.lookAt(0, 0, 0);
        registerCamera(this.camera);
    }
    componentDidUpdate() {
        const { registerCamera, getWidth, getCanvas, width, height } = this.context.threejs;
        console.log('PerspectiveCamera: componentDidUpdate',width, height)
        this.camera.aspect = width/height;
        this.camera.updateProjectionMatrix();
    }
    render() {
        return null;
    }

}

export default PerspectiveCamera;