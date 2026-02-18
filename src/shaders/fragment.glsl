varying vec3 vColor;

void main() {
    // Circular particle
    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
    if(distanceToCenter > 0.5) discard;
    
    // Soft glow falloff
    float strength = 0.05 / distanceToCenter - 0.1;
    
    gl_FragColor = vec4(vColor, strength);
}
