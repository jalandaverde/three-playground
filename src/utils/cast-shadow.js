export const castShadow = (mesh, value) => {
    mesh.traverse(node => {
        node.castShadow = value
    })
}