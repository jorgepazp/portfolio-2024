uniform float uTime;
varying vec3 vPosition;
varying vec3 vColor;

void main(){
    gl_FragColor = vec4(vColor,1);
}