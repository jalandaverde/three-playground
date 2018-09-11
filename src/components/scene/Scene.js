import React, { Children, PureComponent } from "react";
import { compose } from "recompose";
import { object } from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const THREE = window.THREE;

class Scene extends PureComponent {
    static contextTypes = {
        threejs: object
    };
    constructor(props) {
        super(props);
        this.scene = this.scene = new THREE.Scene();
    }
    componentDidMount() {
        const { registerScene } = this.context.threejs;
        // this.scene.add(new THREE.AxesHelper(1000,1000, 1000));
        registerScene(this.scene);
    }

    render() {
        return Children.map(this.props.children, child =>
            React.cloneElement(child, { scene: this.scene })
        );
    }
}
const styles = {};

export default Scene;

// import React, { PureComponent } from "react";
// import { compose, toClass } from "recompose";
// import { withStyles } from "@material-ui/core/styles";
//
// const THREE = window.THREE;
//
// class Scene extends PureComponent {
//     constructor(props) {
//         super(props);
//         this.canvas = React.createRef();
//         this.scene = new THREE.Scene();
//     }
//     animate = () => {
//         requestAnimationFrame(this.animate);
//         this.renderer.render(this.scene, this.camera);
//     };
//
//     buildCamera = ({ aspect, far, fov, near, type }) => {
//         switch (type) {
//             case "array":
//             case "cube":
//             case "orthographic":
//             case "perspective":
//             default:
//                 return new THREE.PerspectiveCamera(fov, aspect, near, far);
//         }
//     };
//
//     componentDidMount() {
//         const canvas = this.canvas.current;
//
//         this.renderer = new THREE.WebGLRenderer({ canvas });
//         this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
//         this.renderer.setPixelRatio(window.devicePixelRatio);
//
//         // this.scene = new THREE.Scene();
//
//         this.camera = this.buildCamera({
//             aspect: canvas.clientWidth / canvas.clientHeight,
//             type: "perspective",
//             far: 1000,
//             near: 0.1,
//             fov: 50
//         });
//
//         this.camera.position.set(0, 10, 50);
//         this.camera.lookAt(0, 0, 0);
//
//         this.light = new THREE.AmbientLight(0xcccccc, 0.5);
//         this.scene.add(this.light);
//
//         requestAnimationFrame(this.animate);
//         // this.scene.add(new THREE.AxesHelper(5000));
//         // this.forceUpdate();
//         console.log("Scene:componentDidMount",this.scene)
//     }
//
//     componentDidUpdate() {
//
//     }
//
//     render() {
//         console.log("Scene:render",this.scene)
//
//         const { classes } = this.props;
//         const scene = this.scene;
//
//         const children = React.Children.map(this.props.children, child => {
//             const newc = React.cloneElement(child, { scene, other: scene, stuff: 'hey' });
//             // console.log(newc);
//             return newc;
//         });
//         // console.log("old-children",this.props.children);
//         // console.log("children", children);
//         return (
//             <div className={classes.root}>
//                 <canvas className={classes.canvas} ref={this.canvas} />
//                 {children}
//             </div>
//         );
//     }
// }
//
// const styles = {
//     root: {
//         width: "100%",
//         height: "100%",
//         display: "flex"
//     },
//     canvas: {
//         alignSelf: "center",
//         margin: "0 auto",
//         width: "800px",
//         height: "450px"
//     }
// };
// export default compose(withStyles(styles))(Scene);
