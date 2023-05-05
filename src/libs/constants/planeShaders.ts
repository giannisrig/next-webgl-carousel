const vertexShader = `
      varying vec2 vUv;
      uniform float uProgress;
      uniform vec2 uZoomScale;
      
      void main() {
        vUv = uv;
        vec3 pos = position;
        float angle = uProgress * 3.14159265 / 2.;
        float wave = cos(angle);
        float c = sin(length(uv - .5) * 15. + uProgress * 12.) * .5 + .5;
        pos.x *= mix(1., uZoomScale.x + wave * c, uProgress);
        pos.y *= mix(1., uZoomScale.y + wave * c, uProgress);
      
        gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );
      }
    `;

const fragmentShader = `
      uniform sampler2D mainTexture;
      uniform sampler2D transparentTexture;
      uniform sampler2D dispTexture;

      uniform vec2 uRes;
      uniform vec2 uZoomScale;
      uniform vec2 uImageRes;

      uniform float dispFactor;
      uniform float effectFactor;
      
      uniform float effectX;
      uniform float effectY;
      uniform float hover;
    
      /*------------------------------
      Background Cover UV
      --------------------------------
      u = basic UV
      s = screensize
      i = image size
      ------------------------------*/
      vec2 CoverUV(vec2 u, vec2 s, vec2 i) {
        float rs = s.x / s.y; // Aspect screen size
        float ri = i.x / i.y; // Aspect image size
        vec2 st = rs < ri ? vec2(i.x * s.y / i.y, s.y) : vec2(s.x, i.y * s.x / i.x); // New st
        vec2 o = (rs < ri ? vec2((st.x - s.x) / 2.0, 0.0) : vec2(0.0, (st.y - s.y) / 2.0)) / st; // Offset
        return u * s / st + o;
      }
    
      varying vec2 vUv;
        void main() {
          vec2 uv = CoverUV(vUv, uRes, uImageRes);
          
          vec3 disp = texture2D(dispTexture, uv).rgb;
          vec2 distortedPosition = vec2(uv.x + effectX * dispFactor * (disp.r*effectFactor), uv.y + effectY * dispFactor * (disp.r*effectFactor));
          vec2 distortedPosition2 = vec2(uv.x - effectX * (1.0 - dispFactor) * (disp.r*effectFactor), uv.y - effectY * (1.0 - dispFactor) * (disp.r*effectFactor));
          vec3 transText = texture2D(transparentTexture, distortedPosition2).rgb;
          vec3 distortedText = texture2D(mainTexture, distortedPosition2).rgb;
          vec3 mainText = texture2D(mainTexture, uv).rgb; //we can use distortedPosition instead of uv
          // if( hover == 0 ){
            vec3 finalTexture = mix(mainText, distortedText, dispFactor);
            gl_FragColor = vec4( finalTexture, 1.0 );
            
            // vec3 finalTexture = mix(mainText, transText, dispFactor);
            // gl_FragColor = vec4( finalTexture, 1.0 );
          
          
          
          
          //Keep
          // vec3 tex = texture2D(mainTexture, uv).rgb;
          // gl_FragColor = vec4( tex, 1.0 );
        }   
    `;

const fragmentShaderHover = `
      uniform sampler2D mainTexture;
      uniform sampler2D transparentTexture;
      uniform sampler2D dispTexture;

      uniform vec2 uRes;
      uniform vec2 uZoomScale;
      uniform vec2 uImageRes;

      uniform float dispFactor;
      uniform float effectFactor;
      
      uniform float effectX;
      uniform float effectY;
      uniform float hover;
    
      /*------------------------------
      Background Cover UV
      --------------------------------
      u = basic UV
      s = screensize
      i = image size
      ------------------------------*/
      vec2 CoverUV(vec2 u, vec2 s, vec2 i) {
        float rs = s.x / s.y; // Aspect screen size
        float ri = i.x / i.y; // Aspect image size
        vec2 st = rs < ri ? vec2(i.x * s.y / i.y, s.y) : vec2(s.x, i.y * s.x / i.x); // New st
        vec2 o = (rs < ri ? vec2((st.x - s.x) / 2.0, 0.0) : vec2(0.0, (st.y - s.y) / 2.0)) / st; // Offset
        return u * s / st + o;
      }
    
      varying vec2 vUv;
        void main() {
          vec2 uv = CoverUV(vUv, uRes, uImageRes);
          
          vec3 disp = texture2D(dispTexture, uv).rgb;
          vec2 distortedPosition = vec2(uv.x + effectX * dispFactor * (disp.r*effectFactor), uv.y + effectY * dispFactor * (disp.r*effectFactor));
          vec2 distortedPosition2 = vec2(uv.x - effectX * (1.0 - dispFactor) * (disp.r*effectFactor), uv.y - effectY * (1.0 - dispFactor) * (disp.r*effectFactor));
          vec3 transText = texture2D(transparentTexture, distortedPosition2).rgb;
          vec3 distortedText = texture2D(mainTexture, distortedPosition2).rgb;
          vec3 mainText = texture2D(mainTexture, uv).rgb; //we can use distortedPosition instead of uv
          // if( hover == 0 ){
          //   vec3 finalTexture = mix(mainText, distortedText, dispFactor);
          //   gl_FragColor = vec4( finalTexture, 1.0 );
            
            vec3 finalTexture = mix(mainText, transText, dispFactor);
            gl_FragColor = vec4( finalTexture, 1.0 );
          
        }   
    `;

const planeShaders = {
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  fragmentShaderHover: fragmentShaderHover,
};

export default planeShaders;
