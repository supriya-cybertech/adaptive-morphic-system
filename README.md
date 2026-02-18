# Adaptive Morphic System (AMS)

A real-time AI-powered 3D particle morphing engine that uses webcam-based hand gesture recognition to dynamically control particle behavior inside an immersive WebGL environment.

## 🚀 Features

- **Cinematic Experience**: Deep space particle simulation with bloom and post-processing.
- **AI-Powered Hand Tracking**: Real-time gesture recognition using MediaPipe Hands.
- **Dynamic Morphing**: Smooth transitions between complex 3D shapes (Heart, Saturn, Galaxy, DNA, etc.).
- **Interactive Visuals**: Particles react as if they are intelligent cosmic energy.
- **Modern UI**: Glassmorphism control panel for fine-tuning visuals.

## 🛠 Tech Stack

- **Three.js**: High-performance 3D rendering.
- **MediaPipe Hands**: Real-time hand tracking and landmark detection.
- **Vite**: Ultra-fast build tool.
- **GLSL Shaders**: Custom vertex and fragment shaders for particle effects.
- **GSAP**: Smooth animations (optional integration).

## ✋ Gesture Control

| Gesture | Action |
|All Fingers Open | **Saturn Ring** |
| Fist (Closed Hand) | **Sphere (Collapse)** |
| Pinch (Thumb & Index) | **Heart Shape** |
| Neutral / Unknown | **Galaxy Spiral** |

## 📦 Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/adaptive-morphic-system.git
    cd adaptive-morphic-system
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run Development Server:**
    ```bash
    npm run dev
    ```

4.  **Open in Browser:**
    Navigate to `http://localhost:5173` (or the URL shown in terminal).
    **Allow Camera Access** when prompted.

## 🎛 Controls

- **Bloom Strength**: Adjust the intensity of the glow effect.
- **Bloom Radius**: Adjust the spread of the glow.
- **Active Morph**: Manually switch shapes if not using webcam.
- **Reset Camera**: Re-center the view.

## 📄 License

MIT License.
