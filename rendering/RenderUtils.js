class RenderUtils {
    static createShader( gl, type, source ) {
        const shader = gl.createShader( type );  
        gl.shaderSource( shader, source );  
        gl.compileShader( shader ); 
        return shader;
    }

    static createProgram( gl, vertexShader, fragmentShader ) {
        const program = gl.createProgram();
        gl.attachShader( program, vertexShader );
        gl.attachShader( program, fragmentShader );
        gl.linkProgram( program );
        return program;
    }

    static getAttributes( gl, program, attributes ) {
        const setters = {};
        attributes.forEach( attribute => {
            setters[ attribute.name ] = { 
                location: gl.getAttribLocation( program, attribute.name )
            }
        } );
        return setters;
    }

    static getUniforms( gl, program, uniforms ) {
        const setters = {};
        uniforms.forEach( uniform => { 
            setters[ uniform.name ] = {
                location: gl.getUniformLocation( program, uniform.name ),
                type: uniform.type
            }
        } );
        return setters;
    }

    static createProgramInfo( gl, shader ) {
        const vertexShader = this.createShader( gl, gl.VERTEX_SHADER, shader.vertexShader );
        const fragmentShader = this.createShader( gl, gl.FRAGMENT_SHADER, shader.fragmentShader );        
        const program = this.createProgram( gl, vertexShader, fragmentShader );
        const attributes = this.getAttributes( gl, program, shader.attributes );
        const uniforms = this.getUniforms( gl, program, shader.uniforms );        
        return { program, attributes, uniforms };
    }

    static createBufferInfo( gl, geometry ) {
        const bufferData = [];
        const attribPointers = [];
        
        const arrays = geometry.arrays; 
        Object.keys( arrays ).forEach( arrayName => {
            attribPointers.push( {
                id: arrayName,
                size: geometry.arrays[ arrayName ].length / geometry.numComponents,
                offset: bufferData.flat().length
            } );
            bufferData.push( geometry.arrays[ arrayName ] );
        } );

        const bufferObject = gl.createBuffer();
        gl.bindBuffer( gl.ARRAY_BUFFER, bufferObject );
        gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( bufferData.flat() ), gl.STATIC_DRAW );        
        return { bufferObject, attribPointers };
    }

    static setAttributes( gl, programInfo, bufferInfo ) {          
        bufferInfo.attribPointers.forEach( attribPointer => {
            gl.vertexAttribPointer (
                programInfo.attributes[ attribPointer.id ].location,
                attribPointer.size,
                gl.FLOAT,
                gl.FALSE,
                attribPointer.size * Float32Array.BYTES_PER_ELEMENT,
                attribPointer.offset * Float32Array.BYTES_PER_ELEMENT
            );
            gl.enableVertexAttribArray( programInfo.attributes[ attribPointer.id ].location ); 
        } );
    }

    static setUniforms( gl, programInfo, uniforms ) {
        Object.keys( uniforms ).forEach( uniformName => {
            if ( programInfo.uniforms[ uniformName ].type.includes( 'Matrix' ) ) {
                gl[ 'uniform' + programInfo.uniforms[ uniformName ].type ] (
                    programInfo.uniforms[ uniformName ].location, 
                    gl.FALSE,   
                    uniforms[ uniformName ]
                )
            }
            else {
                gl[ 'uniform' + programInfo.uniforms[ uniformName ].type ] (
                    programInfo.uniforms[ uniformName ].location, 
                    uniforms[ uniformName ]
                )                
            }
        } );
    }
}
