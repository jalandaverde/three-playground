import React from 'react';
import Mesh from '../../../three/mesh';

const THREE = window.THREE;

// const material = new THREE.MeshStandardMaterial( {color: 0xffffff, side: THREE.DoubleSide} );
// const skyGeo = new THREE.BoxGeometry(300,300,300);
// const skyMaterial =  new THREE.MeshPhongMaterial( {color: 0xa0a0a0, side: THREE.BackSide } );
// const sky = new THREE.Mesh(skyGeo, skyMaterial);
// 
// const cube = new THREE.BoxGeometry(20,20,20);

const Room = ({ width, height, depth, ...props}) => {
    const geometry = new THREE.BoxGeometry(width, height, depth);
    geometry.translate(0,height/2,0)
    const material = new THREE.ShadowMaterial( {color: 0xf0f0ff, side: THREE.DoubleSide} );
    const mesh = new THREE.Mesh(geometry, material);
    mesh.receiveShadow = true
    return (
        <Mesh mesh={mesh} {...props} />
    )
}

export default Room;