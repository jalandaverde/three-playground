import React, { PureComponent } from 'react';
const THREE = window.THREE;

class PointLight extends PureComponent {
    constructor(props) {
        super(props);
        const { color, intensity, decay, distance } = props;
        this.light = new THREE.PointLight(color, intensity, distance, decay);
    }
    componentDidMount() {
        const { scene, castShadow, helper } = this.props;
        this.light.position.y = 150;
        
        if(castShadow) {
            this.light.castShadow = castShadow;
        }
        // this.light.shadow.mapSize.width = 512;  // default
        // this.light.shadow.mapSize.height = 512; // default
        // this.light.shadow.camera.near = 0.5;       // default
        // this.light.shadow.camera.far = 1000      // default
        
        if(helper) {
            this.helper = new THREE.PointLightHelper( this.light, 3 );
            scene.add(this.helper);
        }
        scene.add(this.light);
    }

    render() {
        return null;
    }

}

export default PointLight;