export const gestureLogic = (landmarks, particleSystem) => {
    // MediaPipe Landmarks: 
    // 0: Wrist
    // 4: Thumb Tip
    // 8: Index Tip
    // 12: Middle Tip
    // 16: Ring Tip
    // 20: Pinky Tip

    const thumbTip = landmarks[4]
    const indexTip = landmarks[8]
    const middleTip = landmarks[12]
    const ringTip = landmarks[16]
    const pinkyTip = landmarks[20]
    const wrist = landmarks[0]

    // Calculate distances
    const pinchDist = distance(thumbTip, indexTip)
    const indexToWrist = distance(indexTip, wrist)
    const middleToWrist = distance(middleTip, wrist)
    const ringToWrist = distance(ringTip, wrist)
    const pinkyToWrist = distance(pinkyTip, wrist)

    // Detect Open Hand (All fingers extended)
    const isHandOpen = indexToWrist > 0.3 && middleToWrist > 0.3 && ringToWrist > 0.3 && pinkyToWrist > 0.3;

    // Detect Fist (All fingers curled)
    const isFist = indexToWrist < 0.2 && middleToWrist < 0.2 && ringToWrist < 0.2 && pinkyToWrist < 0.2;

    // Detect Pinch (Thumb and Index close)
    const isPinch = pinchDist < 0.05;

    // Mapping
    // Use a simple state machine or debounce to prevent rapid switching could be added, 
    // but for now we rely on the dominant gesture.

    if (isPinch) {
        particleSystem.morphTo('heart')
    } else if (isFist) {
        particleSystem.morphTo('sphere') // Collapse/Sphere
    } else if (isHandOpen) {
        // Check spread for Star/Flower?
        // For simplicity, Open Hand -> Saturn
        particleSystem.morphTo('saturn')
    } else {
        // Neutral / Galaxy
        // particleSystem.morphTo('galaxy') // Commented out to prevent overriding UI selection
    }
}

function distance(p1, p2) {
    return Math.sqrt(
        Math.pow(p1.x - p2.x, 2) +
        Math.pow(p1.y - p2.y, 2) +
        Math.pow(p1.z - p2.z, 2)
    )
}
