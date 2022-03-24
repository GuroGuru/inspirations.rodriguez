class Renderer {
    constructor() {
        this.gl = document
            .getElementById( 'canvas' )
            .getContext( 'webgl' );

        this.materials = {};
        this.geometries = {};

        this.currentShader = null;
        this.currentGeometry = null;
    }

    render( entities ) {        

        this.gl.clearColor( 0.75, 0.85, 0.8, 1.0 );
	    this.gl.clear( this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT );

        entities.forEach( entity => { 
            if ( !this.materials[ entity.material.id ] ) {
                this.materials[ entity.material.id ] = RenderUtils.createProgramInfo( this.gl, entity.material );
            }
            
            if ( !this.geometries[ entity.geometry.id ] ) {
                this.geometries[ entity.geometry.id ] = RenderUtils.createBufferInfo( this.gl, entity.geometry );
            }
            
            if ( this.currentGeometry != entity.geometry.id ) {
                RenderUtils.setAttributes( 
                    this.gl,
                    this.materials[ entity.material.id ], 
                    this.geometries[ entity.geometry.id ] 
                );
                this.currentGeometry = entity.geometry.id
            }   

            if ( this.currentShader != entity.material.id ) {
                this.gl.useProgram( this.materials[ entity.material.id ].program );
                this.currentShader = entity.material.id
            }

            RenderUtils.setUniforms( 
                this.gl, 
                this.materials[ entity.material.id ], 
                entity.uniforms 
            );

            this.gl.drawArrays( this.gl.TRIANGLES, 0, entity.geometry.numComponents ); 
        } );
    }
}
