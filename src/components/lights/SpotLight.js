import React, { PureComponent } from 'react';
const THREE = window.THREE;

class SpotLight extends PureComponent {
    constructor(props) {
        super(props);
        const { color, intensity } = props;
        this.light = new THREE.SpotLight(color, intensity);
        this.helper = new THREE.SpotLightHelper( this.light );
    }
    componentDidMount() {
        const { scene } = this.props;
        this.light.position.set(0,75,0)
        scene.add(this.light);
        // scene.add(this.helper);
    }

    render() {
        return null;
    }

}

export default SpotLight;