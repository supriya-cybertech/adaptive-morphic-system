export const generateSphere = (count, radius) => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
        const i3 = i * 3
        const phi = Math.acos(-1 + (2 * i) / count)
        const theta = Math.sqrt(count * Math.PI) * phi

        positions[i3 + 0] = radius * Math.cos(theta) * Math.sin(phi)
        positions[i3 + 1] = radius * Math.sin(theta) * Math.sin(phi)
        positions[i3 + 2] = radius * Math.cos(phi)
    }
    return positions
}

export const generateHeart = (count, spread) => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
        const i3 = i * 3
        const t = Math.random() * Math.PI * 2

        // Parametric Heart equations
        // x = 16sin^3(t)
        // y = 13cos(t) - 5cos(2t) - 2cos(3t) - cos(4t)

        const x = 16 * Math.pow(Math.sin(t), 3)
        const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)
        const z = (Math.random() - 0.5) * 5 * spread // Thickness

        // Scale down
        positions[i3 + 0] = x * 0.3
        positions[i3 + 1] = y * 0.3
        positions[i3 + 2] = z
    }
    return positions
}

export const generateGalaxy = (count, radius, branches) => {
    const positions = new Float32Array(count * 3)
    const spin = 1

    for (let i = 0; i < count; i++) {
        const i3 = i * 3

        // Power curve to concentrate particles in center
        const r = Math.pow(Math.random(), 3) * radius
        const spinAngle = r * spin
        const branchAngle = (i % branches) / branches * Math.PI * 2

        const randomX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.5
        const randomY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.5
        const randomZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.5

        positions[i3 + 0] = Math.cos(branchAngle + spinAngle) * r + randomX
        positions[i3 + 1] = randomY * 2 // More vertical spread
        positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * r + randomZ
    }
    return positions
}

export const generateFlower = (count, r) => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
        const i3 = i * 3
        // Simple flower using polar coordinates
        const angle = (i / count) * Math.PI * 2 * 5 // 5 petals
        const radius = r * (0.5 + 0.5 * Math.sin(5 * angle))

        positions[i3 + 0] = Math.cos(angle) * radius
        positions[i3 + 1] = Math.sin(angle) * radius
        positions[i3 + 2] = (Math.random() - 0.5) * 2 // Some depth
    }
    return positions
}

export const generateSaturn = (count) => {
    const positions = new Float32Array(count * 3)
    const ringCount = Math.floor(count * 0.7)
    const sphereCount = count - ringCount

    // Ring - flat distribution
    for (let i = 0; i < ringCount; i++) {
        const i3 = i * 3
        const angle = Math.random() * Math.PI * 2
        const radius = 6 + Math.random() * 4 // inner 6, outer 10

        positions[i3 + 0] = Math.cos(angle) * radius
        positions[i3 + 1] = (Math.random() - 0.5) * 0.2 // Thin disk
        positions[i3 + 2] = Math.sin(angle) * radius
    }

    // Sphere
    for (let i = 0; i < sphereCount; i++) {
        const i3 = (ringCount + i) * 3
        const radius = 3
        const phi = Math.acos(-1 + (2 * i) / sphereCount)
        const theta = Math.sqrt(sphereCount * Math.PI) * phi

        positions[i3 + 0] = radius * Math.cos(theta) * Math.sin(phi)
        positions[i3 + 1] = radius * Math.sin(theta) * Math.sin(phi)
        positions[i3 + 2] = radius * Math.cos(phi)
    }
    return positions
}

export const generateExplosion = (count) => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
        const i3 = i * 3
        // Full screen immersive field (Starfield / Warp effect)
        // Spread wide on X/Y to fill aspect ratio, deep on Z for parallax
        positions[i3 + 0] = (Math.random() - 0.5) * 150
        positions[i3 + 1] = (Math.random() - 0.5) * 100
        positions[i3 + 2] = (Math.random() - 0.5) * 100 + 20 // Center around camera z=20 roughly
    }
    return positions
}

export const generateDNA = (count) => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
        const i3 = i * 3
        const t = (i / count) * 4 * Math.PI // 2 full turns
        const radius = 3

        // Double helix: i%2 check splits particles into two strands
        const offset = (i % 2) * Math.PI

        positions[i3 + 0] = Math.cos(t + offset) * radius
        positions[i3 + 1] = (i / count) * 20 - 10 // Height from -10 to 10
        positions[i3 + 2] = Math.sin(t + offset) * radius
    }
    return positions
}

export const generateCube = (count, size) => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
        const i3 = i * 3
        positions[i3 + 0] = (Math.random() - 0.5) * size
        positions[i3 + 1] = (Math.random() - 0.5) * size
        positions[i3 + 2] = (Math.random() - 0.5) * size
    }
    return positions
}
