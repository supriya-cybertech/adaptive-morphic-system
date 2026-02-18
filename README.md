<div align="center">

<img src="public/banner.png" alt="Adaptive Morphic System Banner" width="100%" />

<h1>🌌 Adaptive Morphic System</h1>

<p>
  <strong>A real-time, AI-powered 3D particle morphing engine controlled through webcam-based hand gesture recognition — rendered inside an immersive WebGL environment.</strong>
</p>

<br />

<!-- Badges -->
<p>
  <img src="https://img.shields.io/badge/Three.js-WebGL-black?style=for-the-badge&logo=three.js&logoColor=white" alt="Three.js" />
  <img src="https://img.shields.io/badge/MediaPipe-Hands_AI-blue?style=for-the-badge&logo=google&logoColor=white" alt="MediaPipe" />
  <img src="https://img.shields.io/badge/Vite-Build_Tool-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/GLSL-Shaders-orange?style=for-the-badge&logo=opengl&logoColor=white" alt="GLSL" />
</p>

<p>
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="MIT License" />
  <img src="https://img.shields.io/badge/PRs-Welcome-brightgreen?style=flat-square" alt="PRs Welcome" />
  <img src="https://img.shields.io/badge/FPS-~60-blueviolet?style=flat-square" alt="60 FPS" />
  <img src="https://img.shields.io/badge/Status-Active-success?style=flat-square" alt="Status" />
  <img src="https://img.shields.io/badge/Node.js-v16+-339933?style=flat-square&logo=node.js&logoColor=white" alt="Node.js" />
</p>

<br />

<!-- Demo Preview -->
<img src="public/demo.gif" alt="AMS Live Demo - Gesture morphing in action" width="85%" />

<br /><br />

</div>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Gesture Controls](#gesture-controls)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Control Panel](#control-panel)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Adaptive Morphic System (AMS) bridges AI perception and real-time graphics by turning your hand gestures into a live visual language. Using MediaPipe's hand landmark detection and Three.js-powered WebGL rendering, AMS translates physical gestures into cinematic 3D particle transitions — heart shapes, galaxies, DNA helices, and more — all at ~60 FPS.

<div align="center">
  <img src="public/screenshots/morphs-overview.png" alt="Morph shapes overview: Heart, Saturn Ring, Galaxy Spiral, DNA Helix, Sphere" width="80%" />
  <br />
  <sub>Five distinct morph targets: Heart · Saturn Ring · Galaxy Spiral · DNA Helix · Sphere Collapse</sub>
</div>

---

## Features

- **Cinematic Rendering** — Deep-space particle simulation with bloom, post-processing, and immersive cosmic visuals.
- **AI-Powered Hand Tracking** — Real-time gesture recognition via MediaPipe Hands for natural, intuitive control.
- **Dynamic Morphing** — Smooth transitions between five complex 3D shapes: Heart, Saturn Ring, Galaxy Spiral, DNA Helix, and Sphere Collapse.
- **Custom GLSL Shaders** — Per-particle vertex and fragment effects for fluid, high-performance animation.
- **Glassmorphism UI** — Modern control panel with real-time tuning for bloom, morph state, and camera.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| [Three.js](https://threejs.org/) | High-performance WebGL rendering |
| [MediaPipe Hands](https://mediapipe.dev/) | Real-time hand landmark detection |
| [Vite](https://vitejs.dev/) | Fast development server and bundling |
| GLSL Shaders | Custom particle vertex and fragment effects |
| GSAP *(optional)* | Smooth morphing animation integration |

---

## Architecture

```
┌───────────────────────┐
│      Webcam Input     │
└────────────┬──────────┘
             │
             ▼
┌───────────────────────┐
│  MediaPipe Hands AI   │
│  (Gesture Detection)  │
└────────────┬──────────┘
             │  Landmark Data
             ▼
┌───────────────────────┐
│  Gesture Interpreter  │
│  (State Mapping)      │
└────────────┬──────────┘
             │  Morph State
             ▼
┌───────────────────────┐
│  Particle Morph Engine│
│  (GLSL + Three.js)    │
└────────────┬──────────┘
             │
             ▼
┌───────────────────────┐
│  WebGL Renderer +     │
│  Post-Processing      │
└────────────┬──────────┘
             │
             ▼
        Immersive Canvas
```

**System Workflow:**

1. User enables webcam
2. MediaPipe detects hand landmarks in real time
3. Gesture classifier maps landmarks to a morph state
4. Particle engine recalculates vertex positions for the target shape
5. GLSL shaders animate the transition
6. Bloom and post-processing pipeline renders cinematic output
7. Loop continues at ~60 FPS

---

## Gesture Controls

<div align="center">
  <img src="public/screenshots/gesture-guide.png" alt="Gesture control guide showing hand positions for each morph shape" width="75%" />
  <br />
  <sub>Hand gesture reference guide</sub>
</div>

<br />

| Gesture | Shape Triggered |
|---|---|
| ✋ All fingers open | Saturn Ring |
| ✊ Closed fist | Sphere Collapse |
| 🤏 Thumb + index pinch | Heart Shape |
| ✋ Neutral / unknown | Galaxy Spiral |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v16+
- A modern browser with WebGL and camera access support

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/adaptive-morphic-system.git
cd adaptive-morphic-system

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Navigate to `http://localhost:5173` in your browser and allow camera access when prompted.

---

## Project Structure

```
adaptive-morphic-system/
│
├── public/
│   ├── banner.png              # Header banner image
│   ├── demo.gif                # Demo animation
│   └── screenshots/            # Feature screenshots
├── src/
│   ├── shaders/                # GLSL vertex and fragment shaders
│   ├── components/             # UI and scene components
│   ├── gesture/                # MediaPipe gesture detection and classification
│   ├── morphTargets/           # 3D shape target definitions
│   └── main.js                 # Application entry point
│
├── vite.config.js
├── package.json
└── README.md
```

---

## Control Panel

<div align="center">
  <img src="public/screenshots/control-panel.png" alt="Glassmorphism control panel UI" width="60%" />
  <br />
  <sub>Real-time control panel with glassmorphism styling</sub>
</div>

<br />

| Control | Description |
|---|---|
| Bloom Strength | Adjust glow intensity |
| Bloom Radius | Adjust glow spread |
| Active Morph | Manually switch between shapes |
| Reset Camera | Re-center the scene |

---

## Roadmap

- [ ] Multi-hand gesture combinations
- [ ] AI-based gesture learning and customization
- [ ] WebXR / VR compatibility
- [ ] Audio-reactive particle morphing
- [ ] Mobile performance optimizations

---

## Contributing

Contributions are welcome. For significant changes, please open an issue first to discuss your proposal before submitting a pull request.

---

## License

Distributed under the [MIT License](LICENSE).

---

<div align="center">
  <sub>
    Adaptive Morphic System — a step toward gesture-native immersive interfaces,<br />
    where AI perception and visual computation merge into intuitive digital experiences.
  </sub>
</div>
