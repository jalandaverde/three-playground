import React, { PureComponent } from "react";
import {
    compose
} from "recompose";
import mime from 'mime';
import { assign, pick, pipe, forIn, omit, tap, map, forEach, entries } from 'lodash/fp';

import * as utils from '../../../utils';


const THREE = window.THREE;

const OBJLoader = {
    load(url, materials) {
        const loader = new THREE.OBJLoader();
        loader.setMaterials(materials);
        return new Promise((resolve, reject) => {
            loader.load(url, resolve, null, reject);
        });
    }
}

const MTLLoader = {
    load(url) {
        const loader = new THREE.MTLLoader();
        return new Promise((resolve, reject) => {
            loader.load(url, resolve, null, reject);
        });
    }
}

class Mesh extends PureComponent {
    constructor(props) {
        super(props);
    }

    fromGeometry = ({ geometry, material }) => {
        if(geometry) {
            return new THREE.Mesh(geometry, material);
        } 
        
        return null;
    }
    
    
    fromUrl = async ({ gltf, obj, mtl }) => {
        if (gltf) {
            
        } else if (obj) {
            const materials = await MTLLoader.load(mtl);
            const object = OBJLoader.load(obj, materials);
            return object;
        } else {
            return null;    
        }
    } 
    
    buildMesh = async ({ mesh, geometry, material, ...props }) => mesh ||
        this.fromGeometry({ geometry, material }) || this.fromUrl(props);

    componentDidMount() {
        const { scene, mesh, obj, ...props} = this.props;
        
        this.mesh = mesh || new THREE.Mesh();
        
        this.fromUrl({ obj }).then(r => r && this.mesh.add(r) && utils.castShadow(this.mesh, true))
        
        pipe([
            pick(['position', 'rotation']),
            entries,
            forEach(([key, value]) => this.mesh[key].set(...value))
        ])(props);
        
        pipe([
            omit(['position', 'rotation']),
            assign(this.mesh)
        ])(props);
        scene.add(this.mesh);
    }
    
    componentWillUnmount() {
        const { scene } = this.props;
        scene.remove(this.object);
    }

    componentDidUpdate(prevProps, prevState) {
        // do stuff
    }
    render() {
        return null;
    }
}
export default Mesh;
