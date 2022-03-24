const triangle = {
    material: DefaultMaterial,
    geometry: TriangleGeometry,
    uniforms: { 
        uTint: [ 1, 0, 0 ],
        uBrightness: [ 0.5, 0.5, 0.5 ],
        uMatrixWorld: [
            0.5, 0, 0, 0,
            0, 0.5, 0, 0,
            0, 0, 0.5, 0,
            0, 0, 0, 1
        ]
    },
    update() {
        this.uniforms.uMatrixWorld[ 12 ] = Input.mouse.x;
        this.uniforms.uMatrixWorld[ 13 ] = Input.mouse.y;
    }
}

const entities = [ triangle ];
const renderer = new Renderer();

( function animate() {
    requestAnimationFrame( animate );

    entities.forEach( entity => { 
        entity.update();
    } );
    
    renderer.render( entities );
} )();
