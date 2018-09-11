import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import List from './components/List';


import ThreeRenderer from '../three-renderer';
import PerspectiveCamera from '../camera';
import OrbitControls from '../controls';
import AmbientLight, { SpotLight, PointLight } from '../lights';
import Scene from '../scene';
import Mesh from '../mesh';

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

var planeGeometry = new THREE.PlaneBufferGeometry( 600, 600, 32, 32 );
var planeMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff } )
var plane = new THREE.Mesh( planeGeometry, planeMaterial );
plane.receiveShadow = true;

const App = ({ classes }) => (
    <div className={classes.root}>
        <List className={classes.list}/>
        <ThreeRenderer>
            <PerspectiveCamera />
            <OrbitControls />
            <Scene>
                <AmbientLight color={0xffffff} intensity={0.50}/>
                <PointLight color={0xffffff} intensity={0.90} distance={300} decay={2} castShadow />
                <Mesh
                    obj="http://localhost:8080/sofa.obj"
                    position={[0, 0, 50]}
                />
                <Mesh mesh={sphere} position={[0, 10, 0]}/>
                <Mesh
                    mesh={plane}
                    rotation={[ -90 * Math.PI / 180, 0, 0 ]}
                />
                <Mesh mesh={sky}/>
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

