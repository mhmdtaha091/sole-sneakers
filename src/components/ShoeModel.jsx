import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, Float, Sparkles, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

export default function ShoeModel() {
    const groupRef = useRef();
    const scanRef = useRef();

    useFrame(({ clock }) => {
        const t = clock.elapsedTime;
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.003;
        }
        // Scan ring sweeps vertically through the shoe body
        if (scanRef.current) {
            scanRef.current.position.y = Math.sin(t * 0.9) * 0.45;
        }
    });

    return (
        <>
            {/* 3-point product lighting */}
            <ambientLight intensity={0.5} />
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
            <pointLight position={[0, -2, 5]} intensity={2} color="#39ff14" />

            <Environment preset="studio" />

            <Float speed={0.8} rotationIntensity={0.3} floatIntensity={0.6}>
                <group ref={groupRef}>

                    {/* ── UPPER BODY ──
                        CapsuleGeometry is vertical (Y-axis) by default.
                        rotation={[0,0,π/2]} lays it horizontal (X-axis) like a real shoe. */}
                    <mesh castShadow position={[0.05, 0.12, 0]} rotation={[0, 0, Math.PI / 2]}>
                        <capsuleGeometry args={[0.28, 1.15, 6, 24]} />
                        <meshPhysicalMaterial
                            color="#111111"
                            metalness={0.3}
                            roughness={0.12}
                            clearcoat={1.0}
                            clearcoatRoughness={0.04}
                            envMapIntensity={2.0}
                        />
                    </mesh>

                    {/* ── HEEL COUNTER ── sphere at the back (negative X) */}
                    <mesh castShadow position={[-0.7, 0.14, 0]}>
                        <sphereGeometry args={[0.32, 16, 16]} />
                        <meshPhysicalMaterial
                            color="#1a1a1a"
                            metalness={0.4}
                            roughness={0.1}
                            clearcoat={0.9}
                        />
                    </mesh>

                    {/* ── TOE BOX ── small horizontal capsule, angled slightly downward */}
                    <mesh castShadow position={[0.74, -0.02, 0]} rotation={[0, 0, Math.PI / 2 + 0.14]}>
                        <capsuleGeometry args={[0.2, 0.4, 4, 16]} />
                        <meshPhysicalMaterial
                            color="#111111"
                            metalness={0.2}
                            roughness={0.16}
                            clearcoat={1.0}
                        />
                    </mesh>

                    {/* ── MIDSOLE ── horizontal cylinder */}
                    <mesh position={[0, -0.22, 0]} rotation={[0, 0, Math.PI / 2]}>
                        <cylinderGeometry args={[0.30, 0.36, 1.86, 32]} />
                        <meshStandardMaterial color="#e0e0e0" roughness={0.75} metalness={0.05} />
                    </mesh>

                    {/* ── OUTSOLE ── */}
                    <mesh position={[0, -0.32, 0]} rotation={[0, 0, Math.PI / 2]}>
                        <cylinderGeometry args={[0.31, 0.38, 1.9, 32]} />
                        <meshStandardMaterial color="#0e0e0e" roughness={0.95} />
                    </mesh>

                    {/* ── LED SOLE STRIPE ── */}
                    <mesh position={[0, -0.22, 0.37]} rotation={[Math.PI / 2, 0, 0]}>
                        <torusGeometry args={[0.86, 0.024, 6, 52, Math.PI * 1.5]} />
                        <meshStandardMaterial
                            color="#256af4"
                            emissive="#256af4"
                            emissiveIntensity={4}
                        />
                    </mesh>

                    {/* ── HEEL LOGO DOT ── */}
                    <mesh position={[-0.92, -0.16, 0]}>
                        <sphereGeometry args={[0.04, 8, 8]} />
                        <meshStandardMaterial color="#39ff14" emissive="#39ff14" emissiveIntensity={6} />
                    </mesh>

                    {/* ── SCAN RING ── horizontal torus that sweeps up/down */}
                    <mesh ref={scanRef} position={[0, 0, 0]}>
                        <torusGeometry args={[0.65, 0.007, 4, 80]} />
                        <meshStandardMaterial
                            color="#0db9f2"
                            emissive="#0db9f2"
                            emissiveIntensity={8}
                            transparent
                            opacity={0.72}
                        />
                    </mesh>

                </group>
            </Float>

            {/* ── PEDESTAL ── */}
            <mesh position={[0, -1.35, 0]} receiveShadow>
                <cylinderGeometry args={[1.2, 1.5, 0.1, 64]} />
                <meshStandardMaterial color="#0d0d0d" roughness={0.2} metalness={0.9} />
            </mesh>
            <mesh position={[0, -1.30, 0]}>
                <torusGeometry args={[1.2, 0.018, 4, 80]} />
                <meshStandardMaterial color="#256af4" emissive="#256af4" emissiveIntensity={5} />
            </mesh>

            <Sparkles count={70} scale={5} size={1.5} speed={0.2} opacity={0.3} color="#256af4" />
            <ContactShadows position={[0, -1.42, 0]} opacity={0.85} scale={7} blur={3} far={4} />
        </>
    );
}
