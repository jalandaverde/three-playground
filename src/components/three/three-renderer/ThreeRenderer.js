import React, { Children, Component, PureComponent } from 'react';
import { func, object } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
const THREE = window.THREE;

class ThreeRenderer extends Component {
    static childContextTypes = {
        threejs: object
    }
    
    state = {
        width: 0,
        hieght: 0,
    }

    getChildContext() {
        return {
            threejs: {
                registerScene: this.registerScene,
                registerCamera: this.registerCamera,
                getCamera: this.getCamera,
                getCanvas: this.getCanvas,
                ...this.state
            }
        }
    }
    
    constructor(props) {
        super(props);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;        
        this.mouse = new THREE.Vector2();
        this.root = React.createRef();
    }
    
    handleMouseMove = (event) => {
        this.mouse.x = ( event.clientX / this.canvas.clientWidth ) * 2 - 1;
	    this.mouse.y = - ( event.clientY / this.canvas.clientHeight ) * 2 + 1;
    }

    handleMouseClick = () => {
        this.intersects[0].object.material.color.set( 0xff0000 );
    }

    componentDidMount() {
        this.canvas = this.renderer.domElement;
        this.canvas.addEventListener('mousemove', this.handleMouseMove);
        this.canvas.addEventListener('click', this.handleMouseClick);
        this.root.current.appendChild(this.renderer.domElement);
        

        this.setState({
            width: this.canvas.clientWidth,
            height: this.canvas.clientHeight
        });

        const raycaster = new THREE.Raycaster();
        
        this.renderer.setAnimationLoop(() => {
            if(this.scene && this.camera) {
                this.renderer.render(this.scene, this.camera);
                raycaster.setFromCamera( this.mouse, this.camera );

                this.intersects = 
                    raycaster.intersectObjects( this.scene.children, true );
            }
        });
        this.forceUpdate();
    }

    componentDidUpdate() {
        this.renderer.setSize(this.state.width, this.state.height);
    }
    getCamera = () => this.camera;
    getCanvas = () => this.renderer.domElement;
    getWidth = () => this.renderer.domElement.clientHeight;
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
        
        '& canvas': {
            width: '100%',
            height: '100%',
        }
    }
}

export default withStyles(styles)(ThreeRenderer);