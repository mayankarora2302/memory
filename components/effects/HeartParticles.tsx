'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeartParticles() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const currentContainer = containerRef.current;
        if (!currentContainer) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: false,
            powerPreference: 'high-performance'
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        renderer.setClearColor(0x000000, 0);
        currentContainer.appendChild(renderer.domElement);

        // Create heart shape once
        const heartShape = new THREE.Shape();
        heartShape.moveTo(0, 0);
        heartShape.bezierCurveTo(0, -0.3, -0.6, -0.3, -0.6, 0);
        heartShape.bezierCurveTo(-0.6, 0.3, 0, 0.6, 0, 1);
        heartShape.bezierCurveTo(0, 0.6, 0.6, 0.3, 0.6, 0);
        heartShape.bezierCurveTo(0.6, -0.3, 0, -0.3, 0, 0);

        const geometry = new THREE.ExtrudeGeometry(heartShape, { depth: 0.1, bevelEnabled: false });
        const material = new THREE.MeshBasicMaterial({ color: 0xe50914, transparent: true, opacity: 0.4 });

        const hearts: THREE.Mesh[] = [];
        const particleCount = 10; // Lowered for performance

        for (let i = 0; i < particleCount; i++) {
            const heart = new THREE.Mesh(geometry, material);
            heart.position.set((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10);
            heart.scale.set(0.1, 0.1, 0.1);
            heart.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
            scene.add(heart);
            hearts.push(heart);
        }

        let animationId: number;
        const animate = () => {
            animationId = requestAnimationFrame(animate);
            const time = Date.now() * 0.001;
            hearts.forEach((heart, index) => {
                heart.rotation.x += 0.005;
                heart.rotation.y += 0.01;
                heart.position.y += Math.sin(time + index) * 0.002;
            });
            renderer.render(scene, camera);
        };

        animate();

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', handleResize);

            // Comprehensive cleanup
            scene.traverse((object: THREE.Object3D) => {
                if (object instanceof THREE.Mesh) {
                    object.geometry.dispose();
                    if (Array.isArray(object.material)) {
                        object.material.forEach(m => m.dispose());
                    } else {
                        object.material.dispose();
                    }
                }
            });

            renderer.dispose();
            if (currentContainer && renderer.domElement) {
                currentContainer.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 pointer-events-none z-10"
            style={{ mixBlendMode: 'screen' }}
        />
    );
}
