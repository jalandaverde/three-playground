import React, { PureComponent } from 'react';
const THREE = window.THREE;

class AmbientLight extends PureComponent {
    constructor(props) {
        super(props);
        const { color, intensity } = props;
        this.light = new THREE.AmbientLight(color, intensity);
    }
    componentDidMount() {
        const { scene } = this.props;
        scene.add(this.light);
    }

    render() {
        return null;
    }

}

export default AmbientLight;