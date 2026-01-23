// ===================================
// 3D Scene Setup with Three.js
// ===================================

(function () {
    // Wait for Three.js to load
    if (typeof THREE === 'undefined') {
        console.warn('Three.js not loaded');
        return;
    }

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });

    const container = document.getElementById('canvas-container');
    if (!container) return;

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    camera.position.z = 8;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Additional light for better visibility
    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.set(-5, 5, 5);
    scene.add(pointLight);

    // Create 3D Question Mark - centered
    function createQuestionMark() {
        const group = new THREE.Group();

        // Top circle part
        const topGeometry = new THREE.TorusGeometry(0.6, 0.25, 16, 32, Math.PI);
        const material = new THREE.MeshStandardMaterial({
            color: 0x2563eb,
            metalness: 0.5,
            roughness: 0.3
        });
        const topPart = new THREE.Mesh(topGeometry, material);
        topPart.rotation.z = -Math.PI / 2;
        topPart.position.set(0, 0.8, 0);
        group.add(topPart);

        // Right vertical stem
        const stemGeometry = new THREE.CylinderGeometry(0.25, 0.25, 0.8, 32);
        const stem = new THREE.Mesh(stemGeometry, material);
        stem.position.set(0.6, 0.4, 0);
        group.add(stem);

        // Bottom curved part
        const bottomCurveGeometry = new THREE.CylinderGeometry(0.25, 0.25, 0.5, 32);
        const bottomCurve = new THREE.Mesh(bottomCurveGeometry, material);
        bottomCurve.position.set(0.2, -0.15, 0);
        group.add(bottomCurve);

        // Dot at bottom
        const dotGeometry = new THREE.SphereGeometry(0.25, 32, 32);
        const dot = new THREE.Mesh(dotGeometry, material);
        dot.position.set(0, -0.8, 0);
        group.add(dot);

        return group;
    }

    const questionMark = createQuestionMark();
    questionMark.position.set(0, 0, 0); // Perfectly centered
    questionMark.scale.set(3, 3, 3); // Make it much bigger and more visible
    scene.add(questionMark);

    // Add small decorative elements that fit the canvas
    const decorElements = [];

    // Create small floating spheres
    function createSmallSphere(color, size) {
        const geometry = new THREE.SphereGeometry(size, 32, 32);
        const material = new THREE.MeshStandardMaterial({
            color: color,
            metalness: 0.6,
            roughness: 0.3
        });
        return new THREE.Mesh(geometry, material);
    }

    // Create small rings
    function createSmallRing(color, radius) {
        const geometry = new THREE.TorusGeometry(radius, 0.05, 16, 32);
        const material = new THREE.MeshStandardMaterial({
            color: color,
            metalness: 0.7,
            roughness: 0.2
        });
        return new THREE.Mesh(geometry, material);
    }

    // Add 6 small spheres around the question mark
    const spherePositions = [
        { x: -3, y: 2, z: -1 },
        { x: 3, y: 1.5, z: -1 },
        { x: -2.5, y: -1.5, z: 1 },
        { x: 2.5, y: -2, z: 1 },
        { x: -1.5, y: 2.5, z: 0.5 },
        { x: 1.5, y: -2.5, z: -0.5 }
    ];

    spherePositions.forEach((pos, index) => {
        const sphere = createSmallSphere(0x60a5fa, 0.15);
        sphere.position.set(pos.x, pos.y, pos.z);
        scene.add(sphere);
        decorElements.push({
            obj: sphere,
            speed: 0.3 + index * 0.1,
            amplitude: 0.2,
            baseY: pos.y
        });
    });

    // Add 3 small rings
    const ringPositions = [
        { x: -3.5, y: 0, z: -0.5 },
        { x: 3.5, y: 0.5, z: -0.5 },
        { x: 0, y: -3, z: 1 }
    ];

    ringPositions.forEach((pos, index) => {
        const ring = createSmallRing(0x06b6d4, 0.3);
        ring.position.set(pos.x, pos.y, pos.z);
        scene.add(ring);
        decorElements.push({
            obj: ring,
            speed: 0.4 + index * 0.15,
            amplitude: 0.15,
            baseY: pos.y
        });
    });

    // Scroll tracking
    let scrollY = 0;
    window.addEventListener('scroll', () => {
        scrollY = window.scrollY;
    });

    // Animation loop
    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        time += 0.01;

        // Fade out on scroll
        const heroSection = document.querySelector('.hero-section');
        const heroHeight = heroSection ? heroSection.offsetHeight : window.innerHeight;
        const scrollProgress = Math.min(scrollY / heroHeight, 1);
        const opacity = 1 - scrollProgress;

        if (container) {
            container.style.opacity = opacity;
        }

        // Smooth continuous rotation for question mark
        questionMark.rotation.y += 0.008;
        questionMark.rotation.x = Math.sin(time * 0.3) * 0.15;
        questionMark.rotation.z = Math.cos(time * 0.2) * 0.05;

        // Animate decorative elements
        decorElements.forEach((elem) => {
            // Gentle floating motion
            elem.obj.position.y = elem.baseY + Math.sin(time * elem.speed) * elem.amplitude;
            // Subtle rotation
            elem.obj.rotation.x += 0.005;
            elem.obj.rotation.y += 0.008;
        });

        // Move camera slightly based on scroll
        camera.position.y = scrollProgress * 2;
        camera.rotation.x = scrollProgress * -0.1;

        renderer.render(scene, camera);
    }

    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

})();
