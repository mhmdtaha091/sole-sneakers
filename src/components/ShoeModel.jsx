import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Environment, ContactShadows, Sparkles, Float } from '@react-three/drei';
import * as THREE from 'three';

useGLTF.preload('/models/shoe.glb');

export default function ShoeModel() {
    const groupRef = useRef();
    const scanRef = useRef();
    const { scene } = useGLTF('/models/shoe.glb');

    // Center the loaded model on its bounding box
    useEffect(() => {
        if (!scene) return;
        const box = new THREE.Box3().setFromObject(scene);
        const center = box.getCenter(new THREE.Vector3());
        scene.position.sub(center);
        // Normalize scale so the shoe fits nicely in the viewport
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        scene.scale.setScalar(2.2 / maxDim);
    }, [scene]);

    useFrame(({ clock }) => {
        const t = clock.elapsedTime;
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.003;
            groupRef.current.position.y = Math.sin(t * 0.6) * 0.1;
        }
        if (scanRef.current) {
            scanRef.current.position.y = Math.sin(t * 0.9) * 0.6;
        }
    });

    return (
        <>
            {/* 3-point product lighting */}
            <ambientLight intensity={0.6} />
            <spotLight
                position={[5, 8, 4]}
                angle={0.2}
                penumbra={0.5}
                intensity={3}
                castShadow
                color="#ffffff"
            />
            <spotLight
                position={[-5, 3, -3]}
                angle={0.3}
                penumbra={1}
                intensity={1.2}
                color="#256af4"
            />
            <pointLight position={[0, -2, 5]} intensity={1.5} color="#39ff14" />

            <Environment preset="studio" />

            <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.5}>
                <group ref={groupRef}>
                    {/* The real shoe model */}
                    <primitive object={scene} />

                    {/* Scan ring sweeping up/down */}
                    <mesh ref={scanRef} position={[0, 0, 0]}>
                        <torusGeometry args={[1.3, 0.007, 4, 80]} />
                        <meshStandardMaterial
                            color="#0db9f2"
                            emissive="#0db9f2"
                            emissiveIntensity={8}
                            transparent
                            opacity={0.7}
                        />
                    </mesh>
                </group>
            </Float>

            {/* Pedestal */}
            <mesh position={[0, -1.5, 0]} receiveShadow>
                <cylinderGeometry args={[1.4, 1.7, 0.1, 64]} />
                <meshStandardMaterial color="#0d0d0d" roughness={0.2} metalness={0.9} />
            </mesh>
            <mesh position={[0, -1.45, 0]}>
                <torusGeometry args={[1.4, 0.018, 4, 80]} />
                <meshStandardMaterial color="#256af4" emissive="#256af4" emissiveIntensity={5} />
            </mesh>

            <Sparkles count={80} scale={5} size={1.5} speed={0.2} opacity={0.3} color="#256af4" />
            <ContactShadows position={[0, -1.55, 0]} opacity={0.9} scale={8} blur={3} far={4} />
        </>
    );
}
