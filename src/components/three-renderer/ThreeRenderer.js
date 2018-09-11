import React, { Children, PureComponent } from 'react';
import { func, object } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
const THREE = window.THREE;

class ThreeRenderer extends PureComponent {
    static childContextTypes = {
        threejs: object
    }
    
    getChildContext() {
        return {
            threejs: {
                registerScene: this.registerScene,
                registerCamera: this.registerCamera,
                getCamera: this.getCamera,
                getCanvas: this.getCanvas,
            }
        }
    }
    
    constructor(props) {
        super(props)
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.canvas = this.renderer.domElement;
        this.mouse = new THREE.Vector2();
        this.root = React.createRef();
    }
    
    handleMouseMove = (event) => {
        this.mouse.x = ( event.clientX / this.canvas.clientWidth ) * 2 - 1;
	    this.mouse.y = - ( event.clientY / this.canvas.clientHeight ) * 2 + 1;
    }

    handleMouseClick = () => {
        console.log('clicked', this.intersects);
        this.intersects[0].object.material.color.set( 0xff0000 );
    }

    componentDidMount() {
        this.canvas.addEventListener('mousemove', this.handleMouseMove);
        this.canvas.addEventListener('click', this.handleMouseClick);

        this.root.current.appendChild(this.renderer.domElement);
        this.renderer.setSize(800, 450);
        this.renderer.setPixelRatio(window.devicePixelRatio);

        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        
        
        const raycaster = new THREE.Raycaster();
        
        this.renderer.setAnimationLoop(() => {
            if(this.scene && this.camera) {
                this.renderer.render(this.scene, this.camera);
                raycaster.setFromCamera( this.mouse, this.camera );

                this.intersects = 
                    raycaster.intersectObjects( this.scene.children, true );
            }
        });
    }
    getCamera = () => this.camera;
    getCanvas = () => this.renderer.domElement;
    registerCamera = (camera) => {
        this.camera = camera;
    }
    registerScene = (scene) => {
        this.scene = scene;
    }

    render() {
        const { classes, children } = this.props;        
        return (
            <div ref={this.root} className={classes.root}>
                {children}
            </div>
        );
    }

}

const styles ={
    root: {
        alignItems: 'center',
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        width: '100%',
    }
}

export default withStyles(styles)(ThreeRenderer);