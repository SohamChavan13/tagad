// 3D Effects with Three.js
class ThreeJSScenes {
    constructor() {
        this.scenes = {};
        this.renderers = {};
        this.cameras = {};
        this.animations = {};
        this.init();
    }

    init() {
        // Initialize all 3D scenes
        this.initHeroScene();
        this.initLogoScene();
        this.initServiceCards();
        this.initWhyChooseScene();
        this.initCTAScene();
        this.startAnimationLoop();
    }

    initHeroScene() {
        const container = document.getElementById('hero-bg');
        if (!container) return;

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);

        // Create floating geometric shapes
        const geometries = [
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.SphereGeometry(0.7, 32, 32),
            new THREE.ConeGeometry(0.7, 1.5, 8),
            new THREE.OctahedronGeometry(0.8),
            new THREE.TetrahedronGeometry(0.9)
        ];

        const materials = [
            new THREE.MeshBasicMaterial({ 
                color: 0x06B6D4, 
                transparent: true, 
                opacity: 0.1,
                wireframe: true 
            }),
            new THREE.MeshBasicMaterial({ 
                color: 0x8B5CF6, 
                transparent: true, 
                opacity: 0.1,
                wireframe: true 
            }),
            new THREE.MeshBasicMaterial({ 
                color: 0xF97316, 
                transparent: true, 
                opacity: 0.1,
                wireframe: true 
            })
        ];

        const shapes = [];
        for (let i = 0; i < 15; i++) {
            const geometry = geometries[Math.floor(Math.random() * geometries.length)];
            const material = materials[Math.floor(Math.random() * materials.length)];
            const mesh = new THREE.Mesh(geometry, material);
            
            mesh.position.set(
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20
            );
            
            mesh.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );
            
            shapes.push(mesh);
            scene.add(mesh);
        }

        // Particle system
        const particleGeometry = new THREE.BufferGeometry();
        const particleCount = 100;
        const positions = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 50;
        }
        
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const particleMaterial = new THREE.PointsMaterial({
            color: 0x06B6D4,
            size: 0.05,
            transparent: true,
            opacity: 0.6
        });
        
        const particles = new THREE.Points(particleGeometry, particleMaterial);
        scene.add(particles);

        camera.position.z = 10;

        // Store references
        this.scenes.hero = scene;
        this.cameras.hero = camera;
        this.renderers.hero = renderer;

        // Animation function
        this.animations.hero = () => {
            shapes.forEach((shape, index) => {
                shape.rotation.x += 0.005 + index * 0.001;
                shape.rotation.y += 0.007 + index * 0.001;
                shape.position.y += Math.sin(Date.now() * 0.001 + index) * 0.01;
            });

            particles.rotation.y += 0.002;
            renderer.render(scene, camera);
        };

        // Mouse interaction
        let mouseX = 0, mouseY = 0;
        document.addEventListener('mousemove', (event) => {
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
            
            camera.position.x += (mouseX * 2 - camera.position.x) * 0.05;
            camera.position.y += (mouseY * 2 - camera.position.y) * 0.05;
        });
    }

    initLogoScene() {
        const container = document.getElementById('logo3d');
        if (!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(40, 40);
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);

        // Create animated logo
        const geometry = new THREE.OctahedronGeometry(0.8);
        const material = new THREE.MeshBasicMaterial({
            color: 0x06B6D4,
            wireframe: true,
            transparent: true,
            opacity: 0.8
        });
        
        const logo = new THREE.Mesh(geometry, material);
        scene.add(logo);

        camera.position.z = 3;

        this.scenes.logo = scene;
        this.cameras.logo = camera;
        this.renderers.logo = renderer;

        this.animations.logo = () => {
            logo.rotation.x += 0.01;
            logo.rotation.y += 0.02;
            renderer.render(scene, camera);
        };
    }

    initServiceCards() {
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach((card, index) => {
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
            
            renderer.setSize(60, 60);
            renderer.setClearColor(0x000000, 0);

            // Create service-specific geometry
            let geometry;
            const colors = [0x06B6D4, 0x8B5CF6, 0xF97316, 0x3B82F6, 0x10B981, 0xEF4444];
            
            switch (index % 6) {
                case 0: geometry = new THREE.BoxGeometry(1, 1, 1); break;
                case 1: geometry = new THREE.SphereGeometry(0.7, 16, 16); break;
                case 2: geometry = new THREE.ConeGeometry(0.6, 1.2, 8); break;
                case 3: geometry = new THREE.CylinderGeometry(0.6, 0.6, 1.2, 8); break;
                case 4: geometry = new THREE.OctahedronGeometry(0.8); break;
                case 5: geometry = new THREE.TetrahedronGeometry(0.9); break;
            }

            const material = new THREE.MeshBasicMaterial({
                color: colors[index % colors.length],
                wireframe: true,
                transparent: true,
                opacity: 0.8
            });
            
            const mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);

            camera.position.z = 3;

            const iconContainer = card.querySelector('.icon-3d');
            if (iconContainer) {
                iconContainer.appendChild(renderer.domElement);
            }

            // Store references
            this.scenes[`service-${index}`] = scene;
            this.cameras[`service-${index}`] = camera;
            this.renderers[`service-${index}`] = renderer;

            this.animations[`service-${index}`] = () => {
                mesh.rotation.x += 0.005;
                mesh.rotation.y += 0.01;
                renderer.render(scene, camera);
            };

            // Hover effects
            card.addEventListener('mouseenter', () => {
                gsap.to(mesh.rotation, { duration: 0.5, x: mesh.rotation.x + Math.PI/4, y: mesh.rotation.y + Math.PI/4 });
                gsap.to(mesh.scale, { duration: 0.5, x: 1.2, y: 1.2, z: 1.2 });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(mesh.scale, { duration: 0.5, x: 1, y: 1, z: 1 });
            });
        });
    }

    initWhyChooseScene() {
        const container = document.getElementById('why-choose-3d');
        if (!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(400, 400);
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);

        // Create interconnected nodes
        const nodes = [];
        const nodeGeometry = new THREE.SphereGeometry(0.1, 16, 16);
        const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0x06B6D4, transparent: true, opacity: 0.8 });

        for (let i = 0; i < 8; i++) {
            const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
            const angle = (i / 8) * Math.PI * 2;
            node.position.set(Math.cos(angle) * 3, Math.sin(angle) * 3, 0);
            nodes.push(node);
            scene.add(node);
        }

        // Create connections
        const lineMaterial = new THREE.LineBasicMaterial({ color: 0x8B5CF6, transparent: true, opacity: 0.3 });
        nodes.forEach((node, i) => {
            const nextNode = nodes[(i + 1) % nodes.length];
            const geometry = new THREE.BufferGeometry().setFromPoints([node.position, nextNode.position]);
            const line = new THREE.Line(geometry, lineMaterial);
            scene.add(line);
        });

        camera.position.z = 8;

        this.scenes.whyChoose = scene;
        this.cameras.whyChoose = camera;
        this.renderers.whyChoose = renderer;

        this.animations.whyChoose = () => {
            nodes.forEach((node, index) => {
                node.position.y += Math.sin(Date.now() * 0.002 + index) * 0.02;
                node.rotation.x += 0.01;
                node.rotation.y += 0.02;
            });
            renderer.render(scene, camera);
        };
    }

    initCTAScene() {
        const container = document.getElementById('cta-bg');
        if (!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);

        // Create animated background
        const geometry = new THREE.PlaneGeometry(20, 20, 50, 50);
        const material = new THREE.MeshBasicMaterial({
            color: 0x06B6D4,
            transparent: true,
            opacity: 0.03,
            wireframe: true
        });
        
        const plane = new THREE.Mesh(geometry, material);
        plane.rotation.x = -Math.PI / 4;
        scene.add(plane);

        camera.position.z = 10;
        camera.position.y = 5;

        this.scenes.cta = scene;
        this.cameras.cta = camera;
        this.renderers.cta = renderer;

        this.animations.cta = () => {
            plane.rotation.z += 0.002;
            const positions = plane.geometry.attributes.position.array;
            for (let i = 0; i < positions.length; i += 3) {
                positions[i + 2] = Math.sin(Date.now() * 0.001 + positions[i] * 0.1) * 0.5;
            }
            plane.geometry.attributes.position.needsUpdate = true;
            renderer.render(scene, camera);
        };
    }

    startAnimationLoop() {
        const animate = () => {
            requestAnimationFrame(animate);
            
            // Run all animations
            Object.values(this.animations).forEach(animationFn => {
                if (typeof animationFn === 'function') {
                    animationFn();
                }
            });
        };
        
        animate();
    }

    handleResize() {
        // Handle window resize for responsive design
        const heroRenderer = this.renderers.hero;
        const heroCamera = this.cameras.hero;
        const ctaRenderer = this.renderers.cta;
        const ctaCamera = this.cameras.cta;

        if (heroRenderer && heroCamera) {
            heroCamera.aspect = window.innerWidth / window.innerHeight;
            heroCamera.updateProjectionMatrix();
            heroRenderer.setSize(window.innerWidth, window.innerHeight);
        }

        if (ctaRenderer && ctaCamera) {
            ctaCamera.aspect = window.innerWidth / window.innerHeight;
            ctaCamera.updateProjectionMatrix();
            ctaRenderer.setSize(window.innerWidth, window.innerHeight);
        }
    }
}

// Initialize 3D scenes when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const threejsScenes = new ThreeJSScenes();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        threejsScenes.handleResize();
    });
});