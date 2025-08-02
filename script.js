function createParticleSystem() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-system';
    document.body.appendChild(particleContainer);

    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        particleContainer.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 20000);
    }

    setInterval(createParticle, 500);
}


function initMagneticCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'magnetic-cursor';
    cursor.innerHTML = '<div class="cursor-dot"></div><div class="cursor-ring"></div>';
    document.body.appendChild(cursor);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`;
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    
    document.querySelectorAll('.ripple-effect, .btn-primary, .btn-secondary').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
        });
    });
}


function initEnhancedScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, index * 100); 
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });
}


function createAdvancedRipple(element, e) {
    const rippleCount = 3;
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < rippleCount; i++) {
        setTimeout(() => {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            
            const size = Math.max(rect.width, rect.height) * (1 + i * 0.3);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.animationDelay = i * 0.1 + 's';
            
            element.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        }, i * 100);
    }
}


function initParallaxEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax-element');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}


function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}


function initFloatingElements() {
    document.querySelectorAll('.floating-element').forEach((element, index) => {
        element.style.animationDelay = (index * 0.5) + 's';
        element.style.animation = 'float 6s ease-in-out infinite';
    });
}


let audioVisualizer = {
    context: null,
    analyser: null,
    source: null,
    isPlaying: false,
    
    init() {
        try {
            this.context = new (window.AudioContext || window.webkitAudioContext)();
            this.analyser = this.context.createAnalyser();
            this.analyser.fftSize = 256;
        } catch (e) {
            console.warn('Audio context not supported');
        }
    },
    
    connectAudio(audioElement) {
        if (this.context && this.analyser) {
            this.source = this.context.createMediaElementSource(audioElement);
            this.source.connect(this.analyser);
            this.analyser.connect(this.context.destination);
            this.startVisualization();
        }
    },
    
    startVisualization() {
        const canvas = document.getElementById('visualizer-canvas');
        const ctx = canvas.getContext('2d');
        const bufferLength = this.analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        
        const animate = () => {
            if (this.isPlaying) {
                requestAnimationFrame(animate);
            }
            
            this.analyser.getByteFrequencyData(dataArray);
            
            ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            const barWidth = (canvas.width / bufferLength) * 2.5;
            let barHeight;
            let x = 0;
            
            for (let i = 0; i < bufferLength; i++) {
                barHeight = (dataArray[i] / 255) * canvas.height;
                
                const hue = (i / bufferLength) * 360;
                ctx.fillStyle = `hsla(${hue}, 70%, 60%, 0.8)`;
                
                ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
                x += barWidth + 1;
            }
        };
        
        this.isPlaying = true;
        animate();
    }
};


function init3DCardEffects() {
    document.querySelectorAll('.card-3d').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });
}


function initPageTransitions() {
    const transitionOverlay = document.createElement('div');
    transitionOverlay.className = 'page-transition';
    transitionOverlay.innerHTML = '<div class="transition-content"><div class="loader"></div></div>';
    document.body.appendChild(transitionOverlay);
    
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            
            transitionOverlay.classList.add('active');
            
            setTimeout(() => {
                target.scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => {
                    transitionOverlay.classList.remove('active');
                }, 500);
            }, 300);
        });
    });
}


function createMorphingShapes() {
    const shapesContainer = document.createElement('div');
    shapesContainer.className = 'morphing-shapes';
    document.body.appendChild(shapesContainer);
    
    for (let i = 0; i < 5; i++) {
        const shape = document.createElement('div');
        shape.className = 'morph-shape';
        shape.style.position = 'fixed';
        shape.style.width = Math.random() * 200 + 100 + 'px';
        shape.style.height = Math.random() * 200 + 100 + 'px';
        shape.style.left = Math.random() * window.innerWidth + 'px';
        shape.style.top = Math.random() * window.innerHeight + 'px';
        shape.style.background = `hsla(${Math.random() * 360}, 70%, 60%, 0.1)`;
        shape.style.zIndex = '-3';
        shape.style.filter = 'blur(50px)';
        shape.style.animationDelay = Math.random() * 8 + 's';
        shapesContainer.appendChild(shape);
    }
}


function initTeamMemberEffects() {
    document.querySelectorAll('.team-member').forEach(member => {
        member.addEventListener('mouseenter', (e) => {
            createSparkleEffect(e.target);
            member.style.transform = 'scale(1.05) rotateY(5deg)';
        });
        
        member.addEventListener('mouseleave', () => {
            member.style.transform = 'scale(1) rotateY(0deg)';
        });
    });
}

function createSparkleEffect(element) {
    const sparkleCount = 8;
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.position = 'fixed';
        sparkle.style.width = '4px';
        sparkle.style.height = '4px';
        sparkle.style.background = '#ffd700';
        sparkle.style.borderRadius = '50%';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '1000';
        sparkle.style.left = rect.left + Math.random() * rect.width + 'px';
        sparkle.style.top = rect.top + Math.random() * rect.height + 'px';
        sparkle.style.animation = 'sparkle 1s ease-out forwards';
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 1000);
    }
}


function initDynamicGradients() {
    const gradientElements = document.querySelectorAll('.dynamic-gradient');
    
    gradientElements.forEach(element => {
        let hue = Math.random() * 360;
        
        setInterval(() => {
            hue = (hue + 1) % 360;
            element.style.background = `linear-gradient(45deg, 
                hsla(${hue}, 70%, 60%, 0.1), 
                hsla(${(hue + 60) % 360}, 70%, 60%, 0.1))`;
        }, 50);
    });
}


function showLoadingAnimation(element) {
    element.classList.add('shimmer');
    element.style.pointerEvents = 'none';
    
    setTimeout(() => {
        element.classList.remove('shimmer');
        element.style.pointerEvents = 'auto';
    }, 2000);
}


const soundFeedback = {
    sounds: {},
    
    init() {
        
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    },
    
    playTone(frequency, duration = 0.1) {
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
    },
    
    hover() {
        this.playTone(800, 0.05);
    },
    
    click() {
        this.playTone(1000, 0.1);
    }
};


document.addEventListener('DOMContentLoaded', () => {
    
    createParticleSystem();
    initMagneticCursor();
    initEnhancedScrollReveal();
    initParallaxEffects();
    initFloatingElements();
    init3DCardEffects();
    initPageTransitions();
    createMorphingShapes();
    initTeamMemberEffects();
    initDynamicGradients();
    
    
    audioVisualizer.init();
    
    
    try {
        soundFeedback.init();
    } catch (e) {
        console.warn('Audio feedback not supported');
    }
    
    
    document.querySelectorAll('.ripple-effect').forEach(element => {
        element.addEventListener('mouseenter', () => {
            try {
                soundFeedback.hover();
            } catch (e) {}
        });
        
        element.addEventListener('click', () => {
            try {
                soundFeedback.click();
            } catch (e) {}
        });
    });
});


const scrollRevealElements = document.querySelectorAll('.scroll-reveal');

const revealOnScroll = () => {
    scrollRevealElements.forEach((element, index) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 100;
        
        if (elementTop < window.innerHeight - elementVisible) {
            setTimeout(() => {
                element.classList.add('revealed');
            }, index * 150); 
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();


document.querySelectorAll('.ripple-effect').forEach(element => {
    element.addEventListener('click', function(e) {
        createAdvancedRipple(this, e);
    });
});


const artists = {
    sarah: {
        name: 'Sarah Johnson',
        role: 'Electronic Producer',
        bio: 'Sarah specializes in creating immersive electronic soundscapes that blend organic textures with digital precision. Her work has been featured in international film festivals and commercial campaigns.'
    },
    alex: {
        name: 'Alex Morgan',
        role: 'Ambient Composer',
        bio: 'Alex crafts atmospheric compositions that transport listeners to otherworldly realms. With a background in classical music and sound design, he creates unique auditory experiences for meditation and relaxation.'
    },
    david: {
        name: 'David Liu',
        role: 'Sound Designer',
        bio: 'David is a master of audio engineering and sound design, working with major film studios and game developers. His expertise in spatial audio and immersive sound creates captivating listening experiences.'
    },
    emma: {
        name: 'Emma Roberts',
        role: 'Audio Engineer',
        bio: 'Emma brings technical excellence to every project, ensuring pristine audio quality and optimal mixing. Her precision and attention to detail make her a sought-after engineer in the industry.'
    }
};


document.querySelectorAll('.team-member').forEach(member => {
    member.addEventListener('click', () => {
        const memberKey = member.dataset.member;
        const artistData = artists[memberKey];
        
        
        showLoadingAnimation(member);
        
        setTimeout(() => {
            document.getElementById('popup-name').textContent = artistData.name;
            document.getElementById('popup-role').textContent = artistData.role;
            document.getElementById('popup-bio').textContent = artistData.bio;
            
            const avatar = document.getElementById('popup-avatar');
            avatar.className = 'w-20 h-20 rounded-full mx-auto mb-6 artist-avatar flex items-center justify-center text-lg font-medium';
            avatar.textContent = artistData.name.split(' ').map(n => n[0]).join('');
            
            document.getElementById('team-popup').classList.add('active');
        }, 500);
    });
});

document.getElementById('close-popup').addEventListener('click', () => {
    document.getElementById('team-popup').classList.remove('active');
});

document.getElementById('team-popup').addEventListener('click', (e) => {
    if (e.target === document.getElementById('team-popup')) {
        document.getElementById('team-popup').classList.remove('active');
    }
});


document.querySelectorAll('.visualization-mode').forEach(mode => {
    mode.addEventListener('click', function() {
        document.querySelectorAll('.visualization-mode').forEach(m => m.classList.remove('active'));
        this.classList.add('active');
        
        const modeType = this.dataset.mode;
        changeVisualizationMode(modeType);
        
        
        showLoadingAnimation(this);
    });
});


const uploadZone = document.getElementById('upload-zone');
const audioFile = document.getElementById('audio-file');
const audioControls = document.getElementById('audio-controls');


uploadZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadZone.classList.add('dragover');
});

uploadZone.addEventListener('dragleave', () => {
    uploadZone.classList.remove('dragover');
});

uploadZone.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadZone.classList.remove('dragover');
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleAudioFile(files[0]);
    }
});

audioFile.addEventListener('change', function(e) {
    if (e.target.files.length > 0) {
        handleAudioFile(e.target.files[0]);
    }
});

function handleAudioFile(file) {
    if (file.type.startsWith('audio/')) {
        document.getElementById('track-name').textContent = file.name;
        audioControls.classList.remove('opacity-0', 'pointer-events-none');
        audioControls.classList.add('opacity-100', 'pointer-events-auto');
        
        
        const audio = new Audio(URL.createObjectURL(file));
        audioVisualizer.connectAudio(audio);
        
        
        startVisualizer();
    } else {
        alert('Please select a valid audio file.');
    }
}


let scene, camera, renderer, audioContext, analyser;
let particles = [], bars = [], waves = [];
let currentMode = 'spectrum';
let isVisualizerActive = false;
let animationId;

function initVisualizer() {
    const canvas = document.getElementById('visualizer-canvas');
    
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);
    
    
    initSpectrumBars();
    initParticleField();
    initWaveform();
    
    camera.position.z = 30;
}

function initSpectrumBars() {
    const geometry = new THREE.BoxGeometry(0.8, 1, 0.8);
    
    for (let i = 0; i < 64; i++) {
        const material = new THREE.MeshPhongMaterial({
            color: new THREE.Color().setHSL(i / 64, 0.7, 0.6),
            transparent: true,
            opacity: 0.8,
            shininess: 100
        });
        
        const bar = new THREE.Mesh(geometry, material);
        bar.position.x = (i - 32) * 1.2;
        bar.position.y = 0;
        
        scene.add(bar);
        bars.push(bar);
    }
}

function initParticleField() {
    const geometry = new THREE.SphereGeometry(0.1, 8, 8);
    
    for (let i = 0; i < 300; i++) {
        const material = new THREE.MeshPhongMaterial({
            color: new THREE.Color().setHSL(Math.random(), 0.8, 0.6),
            transparent: true,
            opacity: 0.7,
            emissive: new THREE.Color().setHSL(Math.random(), 0.5, 0.1)
        });
        
        const particle = new THREE.Mesh(geometry, material);
        particle.position.x = (Math.random() - 0.5) * 60;
        particle.position.y = (Math.random() - 0.5) * 40;
        particle.position.z = (Math.random() - 0.5) * 40;
        
        particle.userData = {
            originalPosition: particle.position.clone(),
            velocity: new THREE.Vector3(
                (Math.random() - 0.5) * 0.02,
                (Math.random() - 0.5) * 0.02,
                (Math.random() - 0.5) * 0.02
            ),
            rotationSpeed: new THREE.Vector3(
                Math.random() * 0.02,
                Math.random() * 0.02,
                Math.random() * 0.02
            )
        };
        
        scene.add(particle);
        particles.push(particle);
    }
}

function initWaveform() {
    const geometry = new THREE.PlaneGeometry(60, 20, 128, 32);
    const material = new THREE.MeshPhongMaterial({
        color: 0x4a90e2,
        wireframe: true,
        transparent: true,
        opacity: 0.6,
        side: THREE.DoubleSide
    });
    
    const wave = new THREE.Mesh(geometry, material);
    wave.rotation.x = -Math.PI / 4;
    scene.add(wave);
    waves.push(wave);
}

function startVisualizer() {
    if (!isVisualizerActive) {
        document.getElementById('visualizer-canvas').classList.add('active');
        isVisualizerActive = true;
        animate();
    }
}

function stopVisualizer() {
    document.getElementById('visualizer-canvas').classList.remove('active');
    audioControls.classList.add('opacity-0', 'pointer-events-none');
    audioControls.classList.remove('opacity-100', 'pointer-events-auto');
    isVisualizerActive = false;
    
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
}

function animate() {
    if (!isVisualizerActive) return;
    
    animationId = requestAnimationFrame(animate);
    
    const time = Date.now() * 0.001;
    
    
    const audioData = new Array(64).fill(0).map((_, i) => {
        return Math.sin(time * 2 + i * 0.1) * 0.3 + 
               Math.sin(time * 4 + i * 0.05) * 0.2 + 
               Math.random() * 0.1;
    });
    
    updateVisualization(audioData, time);
    
    
    camera.position.x = Math.sin(time * 0.1) * 5;
    camera.position.y = Math.cos(time * 0.15) * 3;
    camera.lookAt(scene.position);
    
    renderer.render(scene, camera);
}

function updateVisualization(audioData, time) {
    switch (currentMode) {
        case 'spectrum':
            updateSpectrum(audioData, time);
            setVisibility(bars, true);
            setVisibility(particles, false);
            setVisibility(waves, false);
            break;
        case 'particles':
            updateParticles(audioData, time);
            setVisibility(bars, false);
            setVisibility(particles, true);
            setVisibility(waves, false);
            break;
        case 'waveform':
            updateWaveform(audioData, time);
            setVisibility(bars, false);
            setVisibility(particles, false);
            setVisibility(waves, true);
            break;
    }
}

function updateSpectrum(audioData, time) {
    bars.forEach((bar, i) => {
        const value = Math.abs(audioData[i]) || 0;
        const targetScale = Math.max(0.1, value * 15);
        
        
        bar.scale.y += (targetScale - bar.scale.y) * 0.1;
        
        
        bar.material.color.setHSL((i / bars.length + time * 0.1) % 1, 0.8, 0.6);
        bar.material.emissive.setHSL((i / bars.length + time * 0.1) % 1, 0.5, value * 0.3);
        
        
        bar.rotation.y = time * 0.5 + i * 0.1;
    });
}

function updateParticles(audioData, time) {
    const avgAmplitude = audioData.reduce((a, b) => a + Math.abs(b), 0) / audioData.length;
    
    particles.forEach((particle, i) => {
        
        particle.position.add(particle.userData.velocity);
        particle.rotation.x += particle.userData.rotationSpeed.x;
        particle.rotation.y += particle.userData.rotationSpeed.y;
        particle.rotation.z += particle.userData.rotationSpeed.z;
        
        
        const scale = 1 + avgAmplitude * 3;
        particle.scale.setScalar(scale);
        
        
        const hue = (time * 0.1 + i * 0.01) % 1;
        particle.material.color.setHSL(hue, 0.8, 0.6);
        particle.material.emissive.setHSL(hue, 0.5, avgAmplitude);
        
        
        if (particle.position.length() > 50) {
            particle.position.copy(particle.userData.originalPosition);
            particle.position.add(new THREE.Vector3(
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20
            ));
        }
    });
}

function updateWaveform(audioData, time) {
    if (waves.length > 0) {
        const wave = waves[0];
        const geometry = wave.geometry;
        const positions = geometry.attributes.position.array;
        
        for (let i = 0; i < positions.length; i += 3) {
            const x = positions[i];
            const z = positions[i + 2];
            const index = Math.floor(((x + 30) / 60) * audioData.length);
            const amplitude = Math.abs(audioData[index]) || 0;
            
            positions[i + 1] = Math.sin(x * 0.1 + time * 2) * amplitude * 15 +
                              Math.cos(z * 0.1 + time * 1.5) * amplitude * 10;
        }
        
        geometry.attributes.position.needsUpdate = true;
        wave.material.color.setHSL((time * 0.1) % 1, 0.8, 0.6);
        wave.material.emissive.setHSL((time * 0.1) % 1, 0.3, 0.2);
        wave.rotation.z = time * 0.1;
    }
}

function setVisibility(objects, visible) {
    objects.forEach(obj => {
        obj.visible = visible;
    });
}

function changeVisualizationMode(mode) {
    currentMode = mode;
    
    
    const canvas = document.getElementById('visualizer-canvas');
    canvas.style.filter = 'blur(5px)';
    
    setTimeout(() => {
        canvas.style.filter = 'blur(0px)';
    }, 300);
}


document.getElementById('play-pause').addEventListener('click', () => {
    const playIcon = document.getElementById('play-icon');
    const isPlaying = playIcon.innerHTML.includes('M6 19h4V5H6v14zm8-14v14h4V5h-4z');
    
    if (isPlaying) {
        playIcon.innerHTML = '<path d="M8 5v14l11-7z"/>';
        audioVisualizer.isPlaying = false;
    } else {
        playIcon.innerHTML = '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>';
        audioVisualizer.isPlaying = true;
    }
});

document.getElementById('stop-visualizer').addEventListener('click', stopVisualizer);

document.getElementById('start-visualizer').addEventListener('click', () => {
    document.getElementById('upload-zone').scrollIntoView({ behavior: 'smooth' });
});


window.addEventListener('resize', () => {
    if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


initVisualizer();


const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navClose = document.getElementById('nav-close');
const overlay = document.getElementById('overlay');
const hamburgerBars = document.querySelectorAll('.hamburger');
const navItems = document.querySelectorAll('.nav-item');
const navLinks = document.querySelectorAll('.nav-link');


function openMenu() {
    overlay.classList.remove('opacity-0', 'invisible');
    overlay.classList.add('opacity-100', 'visible');

    navMenu.classList.remove('translate-x-full');
    navMenu.classList.add('translate-x-0');

    hamburgerBars[0].style.transform = 'rotate(45deg) translate(3px, 3px)';
    hamburgerBars[1].style.opacity = '0';
    hamburgerBars[2].style.transform = 'rotate(-45deg) translate(3px, -3px)';

    setTimeout(() => {
        navItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('show');
            }, index * 100);
        });
    }, 200);

    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    overlay.classList.remove('opacity-100', 'visible');
    overlay.classList.add('opacity-0', 'invisible');

    navMenu.classList.remove('translate-x-0');
    navMenu.classList.add('translate-x-full');

    hamburgerBars[0].style.transform = 'rotate(0deg) translate(0px, 0px)';
    hamburgerBars[1].style.opacity = '1';
    hamburgerBars[2].style.transform = 'rotate(0deg) translate(0px, 0px)';

    navItems.forEach(item => {
        item.classList.remove('show', 'opacity-100', 'translate-x-0');
        item.classList.add('opacity-0', 'translate-x-8');
    });

    document.body.style.overflow = 'auto';
}


navToggle.addEventListener('click', openMenu);
navClose.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);

document.querySelectorAll('#nav-menu a').forEach(link => {
    link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !navMenu.classList.contains('translate-x-full')) {
        closeMenu();
    }
});


navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});


const sectionIds = ['about', 'home', 'visualizer', 'features', 'team', 'pricing'];
const sectionElements = sectionIds.map(id => document.getElementById(id));

function updateNavOnScroll() {
    const scrollY = window.scrollY + window.innerHeight / 3;
    let currentSection = sectionElements[0];

    sectionElements.forEach(section => {
        if (section && section.offsetTop < scrollY) {
            currentSection = section;
        }
    });

    navLinks.forEach(link => {
        const href = link.getAttribute('href').replace('#', '');
        link.classList.remove('active');

        if (href === currentSection.id) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateNavOnScroll);
updateNavOnScroll();