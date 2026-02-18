uniform float uTime;
uniform float uPixelRatio;
uniform float uSize;

attribute float aScale;
attribute vec3 aColor;

varying vec3 vColor;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    
    // Add subtle wave motion - visual "breathing"
    modelPosition.y += sin(uTime + modelPosition.x * 100.0) * 0.2;
    modelPosition.z += cos(uTime + modelPosition.y * 100.0) * 0.2;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;
    
    // Size attenuation
    gl_PointSize = uSize * aScale * uPixelRatio;
    gl_PointSize *= (1.0 / - viewPosition.z);

    vColor = aColor;
}
