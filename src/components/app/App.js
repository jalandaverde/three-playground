import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import List from './components/List';
import Room from './components/room';

import ThreeRenderer from '../three/three-renderer';
import PerspectiveCamera from '../three/camera';
import OrbitControls from '../three/controls';
import AmbientLight, { SpotLight, PointLight } from '../three/lights';
import Scene from '../three/scene';
import Mesh from '../three/mesh';

import paint from './assets/paint-normal.jpg';

const THREE = window.THREE;

const tloader = new THREE.TextureLoader();

const floor = new THREE.PlaneGeometry(600,600);
const material = new THREE.MeshStandardMaterial( {color: 0xffffff, side: THREE.DoubleSide} );

const cube = new THREE.BoxGeometry(20,20,20);


const skyGeo = new THREE.BoxGeometry(300,300,300);
const skyMaterial =  new THREE.MeshPhongMaterial( {color: 0xa0a0a0, side: THREE.BackSide } );
const sky = new THREE.Mesh(skyGeo, skyMaterial);
// 0x36454f

var sphereGeometry = new THREE.SphereBufferGeometry( 5, 32, 32 );
var sphereMaterial = new THREE.MeshStandardMaterial( { color: 0xff0000 } );
var sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
sphere.castShadow = true; //default is false
sphere.receiveShadow = false; //default
// const sofaMaterial = new THREE.MeshPhongMaterial( {map: tloader.load('http://localhost:8080/sofa.jpg'), normalMap: tloader.load('http://localhost:8080/sofa-bump.jpg')} );

var planeGeometry = new THREE.PlaneBufferGeometry( 1200, 600, 32, 32 );
var planeMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff } )
var plane = new THREE.Mesh( planeGeometry, planeMaterial );
plane.receiveShadow = true;

const App = ({ classes }) => (
    <div className={classes.root}>
        <ThreeRenderer>
            <PerspectiveCamera />
            <OrbitControls />
            <Scene background={0xf0f0f0}>
                <AmbientLight color={0xffffff} intensity={0.70}/>
                <PointLight color={0xffffff} intensity={0.70} distance={600} decay={2} castShadow />
                <Mesh
                    obj="http://localhost:8080/sofa.obj"
                    position={[0, 0, 50]}
                />
                {/*<Mesh
                    mesh={plane}
                    rotation={[ -90 * Math.PI / 180, 0, 0 ]}
                />*/}
                {/*<Mesh mesh={sky}/>*/}
                <Room width={1000} height={1000} depth={1000} />
            </Scene>
        </ThreeRenderer>
    </div>
);

const styles = {
    root: {
        height: '100vh',
        width: '100vw',
        display: 'flex',
    },
    list: {
        width: '300px',
        outline: '1px solid'
    }
}
export default withStyles(styles)(App);

// import React, { Component } from 'react';
// 
// class App extends Component {
//   render() {
//     return (
//     );
//   }
// }

