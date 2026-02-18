import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'

export class SceneSetup {
    constructor() {
        this.canvas = document.querySelector('canvas') || document.createElement('canvas')
        if (!document.body.contains(this.canvas)) {
            document.body.appendChild(this.canvas)
        }

        this.initScene()
        this.initCamera()
        this.initRenderer()
        this.initPostProcessing()
        this.handleResize()

        window.addEventListener('resize', this.handleResize.bind(this))
    }

    initScene() {
        this.scene = new THREE.Scene()
        this.scene.background = new THREE.Color(0x000000)
        // Add subtle fog for depth
        this.scene.fog = new THREE.FogExp2(0x000000, 0.002)
    }

    initCamera() {
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        )
        this.camera.position.z = 20
        this.camera.position.y = 2
        this.camera.lookAt(0, 0, 0)
    }

    initRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: false, // Post-processing handles this or we trade off for perf
            powerPreference: "high-performance"
        })
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        this.renderer.setClearColor(0x000000, 1) // Force black clear color
    }

    initPostProcessing() {
        this.composer = new EffectComposer(this.renderer)

        // Render Pass
        const renderPass = new RenderPass(this.scene, this.camera)
        this.composer.addPass(renderPass)

        // Bloom Pass
        this.bloomPass = new UnrealBloomPass(
            new THREE.Vector2(window.innerWidth, window.innerHeight),
            1.5,  // strength
            0.4,  // radius
            0.85  // threshold
        )
        this.composer.addPass(this.bloomPass)
    }

    render() {
        // Subtle camera drift
        const time = performance.now() * 0.0001
        this.camera.position.x = Math.sin(time) * 0.5
        this.camera.position.y = Math.cos(time * 0.8) * 0.5 + 2
        this.camera.lookAt(0, 0, 0)

        this.composer.render()
    }

    handleResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()

        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        this.composer.setSize(window.innerWidth, window.innerHeight)
    }
}
