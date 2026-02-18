import { Hands } from '@mediapipe/hands'
import { Camera } from '@mediapipe/camera_utils'
import { gestureLogic } from './gestureLogic.js'

export class HandTracking {
    constructor(particleSystem) {
        this.particleSystem = particleSystem
        this.videoElement = document.createElement('video')
        this.videoElement.style.display = 'none'
        this.videoElement.style.position = 'absolute'
        this.videoElement.style.top = '-9999px' // Double ensure it's off screen
        this.videoElement.style.left = '-9999px'
        document.body.appendChild(this.videoElement)

        this.hands = new Hands({
            locateFile: (file) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
            }
        })

        this.hands.setOptions({
            maxNumHands: 1,
            modelComplexity: 1,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5
        })

        this.hands.onResults(this.onResults.bind(this))
    }

    async start() {
        const camera = new Camera(this.videoElement, {
            onFrame: async () => {
                await this.hands.send({ image: this.videoElement })
            },
            width: 640,
            height: 480
        })

        // Show loading or permission prompt here if needed
        await camera.start()
    }

    onResults(results) {
        if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
            const landmarks = results.multiHandLandmarks[0]
            // Pass landmarks to logic
            gestureLogic(landmarks, this.particleSystem)
        }
    }
}
