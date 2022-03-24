class DefaultMaterial {
    static id = 0;

    static attributes = [ 
        { name: 'aPosition' }, 
        { name: 'aColor' } 
    ];

    static uniforms = [ 
        { name: 'uTint', type: '3fv' },
        { name: 'uBrightness', type: '3fv' },
        { name: 'uMatrixWorld', type: 'Matrix4fv' } 
    ];

    static vertexShader = `
        precision mediump float;

        attribute vec2 aPosition;
        attribute vec3 aColor;
        uniform mat4 uMatrixWorld;
        uniform vec3 uTint;
        uniform vec3 uBrightness;
        varying vec3 vColor;

        void main()
        {
            vColor = aColor * uTint + uBrightness;
            gl_Position = uMatrixWorld * vec4(aPosition, 0.0, 1.0);
        }
    `;

    static fragmentShader = `
        precision mediump float;

        varying vec3 vColor;
        
        void main()
        {
            gl_FragColor = vec4(vColor, 1.0);
        }
    `;
}
