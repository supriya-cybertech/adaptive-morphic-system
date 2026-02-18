export class UIControls {
    constructor(particleSystem, sceneSetup) {
        this.particleSystem = particleSystem
        this.sceneSetup = sceneSetup

        this.createOverlay()
        this.attachListeners()
    }

    createOverlay() {
        // Remove existing if any
        const existing = document.getElementById('ui-container')
        if (existing) existing.remove()

        const container = document.createElement('div')
        container.id = 'ui-container'
        // Reset default styling for the container to cover full screen for absolute positioning of children
        container.style.position = 'fixed'
        container.style.top = '0'
        container.style.left = '0'
        container.style.width = '100%'
        container.style.height = '100%'
        container.style.pointerEvents = 'none' // Allow clicks through to canvas where not covering
        container.style.zIndex = '10'

        container.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&display=swap');
        
        #ui-container {
            font-family: 'Rajdhani', sans-serif;
            color: #fff;
        }

        .ams-header {
            position: absolute;
            top: 40px;
            left: 40px;
            pointer-events: auto;
        }
        
        .ams-title {
            font-size: 2.5rem;
            font-weight: 700;
            line-height: 1;
            color: #4a9eff;
            text-shadow: 0 0 10px rgba(74, 158, 255, 0.5);
        }
        
        .ams-subtitle {
            font-size: 0.8rem;
            letter-spacing: 2px;
            color: #666;
            margin-top: 5px;
            font-weight: 600;
        }

        .status-panel {
            position: absolute;
            top: 40px;
            right: 40px;
            background: rgba(10, 10, 10, 0.8);
            border: 1px solid rgba(50, 50, 50, 1);
            padding: 10px 20px;
            border-radius: 6px;
            display: flex;
            align-items: center;
            gap: 15px;
            pointer-events: auto;
        }

        .status-label {
            font-size: 0.7rem;
            color: #888;
            letter-spacing: 1px;
        }

        .status-value {
            color: #00ff66;
            font-weight: 700;
            font-size: 0.9rem;
            text-shadow: 0 0 5px rgba(0, 255, 102, 0.5);
        }

        .status-dot {
            width: 8px;
            height: 8px;
            background: #00ff66;
            border-radius: 50%;
            box-shadow: 0 0 8px #00ff66;
            animation: pulse 2s infinite;
        }

        .control-panel {
            position: absolute;
            bottom: 40px;
            left: 40px;
            width: 300px;
            background: rgba(5, 5, 5, 0.9);
            border: 1px solid rgba(40, 40, 40, 1);
            border-radius: 12px;
            padding: 20px;
            pointer-events: auto;
            backdrop-filter: blur(10px);
        }

        .panel-header {
            font-size: 0.8rem;
            font-weight: 700;
            color: #ccc;
            margin-bottom: 20px;
            letter-spacing: 1px;
            border-bottom: 1px solid #222;
            padding-bottom: 10px;
        }

        .control-group {
            margin-bottom: 20px;
        }

        .control-label {
            display: flex;
            justify-content: space-between;
            font-size: 0.7rem;
            color: #888;
            margin-bottom: 8px;
            letter-spacing: 1px;
            font-weight: 600;
        }

        select {
            width: 100%;
            background: rgba(20, 20, 20, 1);
            border: 1px solid #333;
            color: #fff;
            padding: 8px;
            border-radius: 4px;
            font-family: inherit;
            outline: none;
            cursor: pointer;
        }

        input[type="range"] {
            width: 100%;
            height: 4px;
            background: #333;
            border-radius: 2px;
            appearance: none;
            outline: none;
        }

        input[type="range"]::-webkit-slider-thumb {
            appearance: none;
            width: 12px;
            height: 12px;
            background: #4a9eff;
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 0 10px #4a9eff;
        }

        .toggle-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }

        .toggle-switch {
            position: relative;
            width: 40px;
            height: 20px;
            background: #333;
            border-radius: 10px;
            cursor: pointer;
            transition: background 0.3s;
        }

        .toggle-switch.active {
            background: #4a9eff;
        }

        .toggle-knob {
            position: absolute;
            top: 2px;
            left: 2px;
            width: 16px;
            height: 16px;
            background: #fff;
            border-radius: 50%;
            transition: left 0.3s;
        }

        .toggle-switch.active .toggle-knob {
            left: 22px;
        }

        .action-btn {
            width: 100%;
            background: #2b5cff;
            color: white;
            border: none;
            padding: 10px;
            border-radius: 4px;
            font-family: inherit;
            font-weight: 700;
            font-size: 0.8rem;
            letter-spacing: 1px;
            cursor: pointer;
            transition: all 0.2s;
            text-transform: uppercase;
        }

        .action-btn:hover {
            background: #4a7dff;
            box-shadow: 0 0 15px rgba(43, 92, 255, 0.4);
        }

        .footer-info {
            position: absolute;
            bottom: 40px;
            right: 40px;
            text-align: right;
            font-size: 0.6rem;
            color: #444;
            line-height: 1.5;
            pointer-events: auto;
        }

        @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
        }
      </style>

      <div class="ams-header">
        <div class="ams-title" style="display: flex; align-items: center; gap: 15px;">
            <img src="/title-thumb.png" alt="Logo" style="height: 40px; border-radius: 4px; box-shadow: 0 0 10px rgba(74, 158, 255, 0.3);">
            <span>AMS.01</span>
        </div>
        <div class="ams-subtitle" style="margin-left: 55px;">ADAPTIVE MORPHIC SYSTEM</div>
      </div>

      <div class="status-panel">
        <div>
            <div class="status-label">NEURAL LINK STATUS</div>
            <div class="status-value">ACTIVE</div>
        </div>
        <div class="status-dot"></div>
      </div>

      <div class="control-panel">
        <div class="panel-header">SYSTEM PARAMETERS</div>

        <div class="control-group">
            <div class="control-label">
                <span>MORPH TARGET</span>
                <span id="target-display">GALAXY</span>
            </div>
            <select id="morph-select">
                 <option value="galaxy">GALAXY</option>
                 <option value="sphere">SPHERE</option>
                 <option value="heart">HEART</option>
                 <option value="flower">FLOWER</option>
                 <option value="saturn">SATURN</option>
                 <option value="explosion">EXPLOSION</option>
                 <option value="dna">DNA</option>
                 <option value="cube">CUBE</option>
            </select>
        </div>

        <div class="control-group">
            <div class="control-label">
                <span>BLOOM INTENSITY</span>
                <span id="bloom-val">1.5</span>
            </div>
            <input type="range" id="bloom-strength" min="0" max="3" step="0.1" value="1.5">
        </div>

        <div class="toggle-row">
            <div class="control-label" style="margin:0;">AUTO MORPH MODE</div>
            <div class="toggle-switch" id="auto-morph-toggle">
                <div class="toggle-knob"></div>
            </div>
        </div>

        <button class="action-btn" id="reset-btn">RESET CORE ENGINE</button>
      </div>

      <div class="footer-info">
        AMS v1.0.4-build.x64<br>
        PROPRIETARY NEURAL TRACKING INTERFACE<br>
        DO NOT DISCONNECT DURING ACTIVE MORPH
      </div>

      <div id="intro-screen" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #000; display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 1000; transition: opacity 1s; pointer-events: auto;">
          <h1 style="font-size: 4rem; margin-bottom: 2rem; letter-spacing: 0.5rem; color: #fff; font-family: 'Rajdhani', sans-serif;">AMS.01</h1>
          <button id="start-btn" style="padding: 15px 50px; font-family: 'Rajdhani', sans-serif; font-size: 1.2rem; background: transparent; border: 1px solid rgba(74, 158, 255, 0.5); color: #4a9eff; cursor: pointer; border-radius: 4px; letter-spacing: 2px; transition: all 0.3s ease; text-transform: uppercase;">
              Initialize System
          </button>
      </div>
    `
        document.body.appendChild(container)
    }

    attachListeners() {
        // Bloom
        const bloomSlider = document.getElementById('bloom-strength')
        const bloomVal = document.getElementById('bloom-val')

        bloomSlider.addEventListener('input', (e) => {
            const val = parseFloat(e.target.value)
            this.sceneSetup.bloomPass.strength = val
            bloomVal.textContent = val.toFixed(1)
        })

        // Morph Select
        const morphSelect = document.getElementById('morph-select')
        const targetDisplay = document.getElementById('target-display')

        morphSelect.addEventListener('change', (e) => {
            this.particleSystem.morphTo(e.target.value)
            targetDisplay.textContent = e.target.value.toUpperCase()
        })

        // Auto Morph Toggle
        const toggle = document.getElementById('auto-morph-toggle')
        let autoMorph = false
        toggle.addEventListener('click', () => {
            autoMorph = !autoMorph
            toggle.classList.toggle('active')
            // Logic for auto morph could go here
        })

        // Reset Engine
        document.getElementById('reset-btn').addEventListener('click', () => {
            this.particleSystem.morphTo('galaxy')
            morphSelect.value = 'galaxy'
            targetDisplay.textContent = 'GALAXY'

            // Reset camera
            this.sceneSetup.camera.position.set(0, 2, 20)
            this.sceneSetup.camera.lookAt(0, 0, 0)
        })

        // Start Button
        const startBtn = document.getElementById('start-btn')
        const introScreen = document.getElementById('intro-screen')

        startBtn.addEventListener('click', () => {
            introScreen.style.opacity = '0'
            setTimeout(() => {
                introScreen.style.display = 'none'
            }, 1000)
        })

        startBtn.addEventListener('mouseenter', () => {
            startBtn.style.background = 'rgba(74, 158, 255, 0.1)'
            startBtn.style.boxShadow = '0 0 30px rgba(74, 158, 255, 0.2)'
        })

        startBtn.addEventListener('mouseleave', () => {
            startBtn.style.background = 'transparent'
            startBtn.style.boxShadow = 'none'
        })
    }
}
