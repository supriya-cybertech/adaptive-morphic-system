import * as THREE from 'three'
import vertexShader from '../shaders/vertex.glsl?raw'
import fragmentShader from '../shaders/fragment.glsl?raw'
import { generateSphere, generateHeart, generateGalaxy, generateFlower, generateSaturn, generateExplosion, generateDNA, generateCube } from './shapes.js'

export class ParticleSystem {
    constructor(scene) {
        this.scene = scene
        this.count = 8000 // Default particle count

        this.geometry = null
        this.material = null
        this.points = null

        // Morph targets
        this.currentPositions = new Float32Array(this.count * 3)
        this.targetPositions = new Float32Array(this.count * 3)

        // Initialize
        this.init()
    }

    init() {
        // Geometry
        this.geometry = new THREE.BufferGeometry()

        const positions = new Float32Array(this.count * 3)
        const colors = new Float32Array(this.count * 3)
        const scales = new Float32Array(this.count)

        // Randomize speed for each particle to create organic transition
        this.speeds = new Float32Array(this.count)

        const color1 = new THREE.Color('#00FFFF') // Vivid Cyan
        const color2 = new THREE.Color('#0066FF') // Electric Blue

        for (let i = 0; i < this.count; i++) {
            // Initial random positions
            // Initial positions - Sphere distribution for "concentrated center" feel
            const r = Math.pow(Math.random(), 3) * 15 // Cube power for center concentration
            const theta = Math.random() * Math.PI * 2
            const phi = Math.acos(2 * Math.random() - 1)

            positions[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta)
            positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
            positions[i * 3 + 2] = r * Math.cos(phi)

            // Save to current & target
            this.currentPositions[i * 3 + 0] = positions[i * 3 + 0]
            this.currentPositions[i * 3 + 1] = positions[i * 3 + 1]
            this.currentPositions[i * 3 + 2] = positions[i * 3 + 2]

            this.targetPositions[i * 3 + 0] = positions[i * 3 + 0]
            this.targetPositions[i * 3 + 1] = positions[i * 3 + 1]
            this.targetPositions[i * 3 + 2] = positions[i * 3 + 2]

            // Colors
            const mixedColor = color1.clone().lerp(color2, Math.random())
            colors[i * 3 + 0] = mixedColor.r
            colors[i * 3 + 1] = mixedColor.g
            colors[i * 3 + 2] = mixedColor.b

            // Scales
            scales[i] = Math.random()

            // Speed: Medium smooth (0.01 to 0.03)
            this.speeds[i] = 0.01 + Math.random() * 0.02
        }

        this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        this.geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3))
        this.geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1))

        // Material
        this.material = new THREE.ShaderMaterial({
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexColors: true,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms: {
                uTime: { value: 0 },
                uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
                uSize: { value: 100.0 }
            }
        })

        // Points
        this.points = new THREE.Points(this.geometry, this.material)
        this.scene.add(this.points)
    }

    update(time) {
        this.material.uniforms.uTime.value = time

        const positions = this.geometry.attributes.position.array

        for (let i = 0; i < this.count; i++) {
            const i3 = i * 3
            const lerpFactor = this.speeds[i] // Use individual speed

            // Lerp current position to target position
            positions[i3 + 0] += (this.targetPositions[i3 + 0] - positions[i3 + 0]) * lerpFactor
            positions[i3 + 1] += (this.targetPositions[i3 + 1] - positions[i3 + 1]) * lerpFactor
            positions[i3 + 2] += (this.targetPositions[i3 + 2] - positions[i3 + 2]) * lerpFactor
        }

        this.geometry.attributes.position.needsUpdate = true

        // Rotate entire system slowly
        this.points.rotation.y = time * 0.015 // Medium rotation
    }

    morphTo(shapeName, params = {}) {
        console.log(`Morphing to: ${shapeName}`)
        let newPositions = []

        switch (shapeName) {
            case 'heart':
                newPositions = generateHeart(this.count, 0.4) // spread
                break
            case 'sphere':
                newPositions = generateSphere(this.count, 6) // radius
                break
            case 'galaxy':
                newPositions = generateGalaxy(this.count, 5, 5) // radius, branches
                break
            case 'flower':
                newPositions = generateFlower(this.count, 7) // petals
                break
            case 'saturn':
                newPositions = generateSaturn(this.count)
                break
            case 'explosion':
                newPositions = generateExplosion(this.count)
                break
            case 'dna':
                newPositions = generateDNA(this.count)
                break
            case 'cube':
                newPositions = generateCube(this.count, 6)
                break
            default:
                newPositions = generateSphere(this.count, 6)
        }

        // Update target positions
        for (let i = 0; i < this.count * 3; i++) {
            this.targetPositions[i] = newPositions[i]
        }
    }

    setParticleCount(count) {
        // Re-initialize (expensive, handle carefully)
        // For now, simpler to just hide excess or cap max
    }
}
