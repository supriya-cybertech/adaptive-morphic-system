import './style.css'
import { SceneSetup } from './scene/sceneSetup.js'
import { ParticleSystem } from './scene/particleSystem.js'
import { HandTracking } from './gesture/handTracking.js'
import { UIControls } from './ui/controls.js'

class App {
  constructor() {
    this.init()
  }

  async init() {
    // 1. Setup Scene (Renderer, Camera, Post-processing)
    this.sceneSetup = new SceneSetup()

    // 2. Initialize Particle System
    this.particleSystem = new ParticleSystem(this.sceneSetup.scene)

    // 3. Setup Hand Tracking
    this.handTracking = new HandTracking(this.particleSystem)

    // 4. Setup UI
    this.ui = new UIControls(this.particleSystem, this.sceneSetup)

    // 5. Start Animation Loop
    this.animate()

    // 6. Start Camera
    await this.handTracking.start()
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this))

    const time = performance.now() * 0.001

    // Update Particles
    this.particleSystem.update(time)

    // Render Scene with Bloom
    this.sceneSetup.render()
  }
}

new App()
