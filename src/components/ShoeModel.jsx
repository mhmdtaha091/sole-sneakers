import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, Sparkles, ContactShadows } from '@react-three/drei';

export default function ShoeModel() {
    const groupRef = useRef();
    const scanRef = useRef();

    useFrame(({ clock }) => {
        const t = clock.elapsedTime;
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.004;
            groupRef.current.position.y = Math.sin(t * 0.6) * 0.12;
        }
        // Scan ring sweeps up and down the shoe body
        if (scanRef.current) {
            scanRef.current.position.y = Math.sin(t * 0.85) * 0.72;
        }
    });

    return (
        <>
            {/* 3-point product lighting rig */}
            <ambientLight intensity={0.35} />
            <spotLight
                position={[5, 8, 5]}
                angle={0.2}
                penumbra={0.6}
                intensity={3}
                castShadow
                color="#ffffff"
            />
            <spotLight
                position={[-4, 4, -4]}
                angle={0.3}
                penumbra={1}
                intensity={1.2}
                color="#256af4"
            />
            <pointLight position={[0, -3, 4]} intensity={2} color="#39ff14" />

            <Environment preset="studio" />

            <group ref={groupRef}>
                {/* ── UPPER BODY ── */}

                {/* Main shoe body — dark glossy capsule */}
                <mesh castShadow position={[0, 0.05, 0]} rotation={[0, 0, 0.08]}>
                    <capsuleGeometry args={[0.36, 1.35, 6, 24]} />
                    <meshPhysicalMaterial
                        color="#111111"
                        metalness={0.3}
                        roughness={0.12}
                        clearcoat={1.0}
                        clearcoatRoughness={0.04}
                        envMapIntensity={2}
                    />
                </mesh>

                {/* Heel counter — rounded volume at the back */}
                <mesh castShadow position={[-0.48, 0.05, 0]} rotation={[0, 0, 0.05]}>
                    <sphereGeometry args={[0.40, 16, 16]} />
                    <meshPhysicalMaterial
                        color="#1a1a1a"
                        metalness={0.4}
                        roughness={0.1}
                        clearcoat={0.9}
                    />
                </mesh>

                {/* Toe box — front capsule */}
                <mesh castShadow position={[0.58, -0.1, 0]} rotation={[0.05, 0, -0.18]}>
                    <capsuleGeometry args={[0.26, 0.48, 4, 16]} />
                    <meshPhysicalMaterial
                        color="#111111"
                        metalness={0.2}
                        roughness={0.18}
                        clearcoat={1}
                    />
                </mesh>

                {/* ── MIDSOLE ── */}
                <mesh position={[0, -0.52, 0]} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.50, 0.56, 1.88, 32]} />
                    <meshStandardMaterial color="#dedede" roughness={0.7} metalness={0.05} />
                </mesh>

                {/* ── LED SOLE STRIPE ── */}
                <mesh position={[0, -0.50, 0.50]} rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[0.88, 0.028, 6, 48, Math.PI * 1.45]} />
                    <meshStandardMaterial
                        color="#256af4"
                        emissive="#256af4"
                        emissiveIntensity={4}
                    />
                </mesh>

                {/* Heel logo dot */}
                <mesh position={[-0.80, -0.48, 0]}>
                    <sphereGeometry args={[0.048, 8, 8]} />
                    <meshStandardMaterial color="#39ff14" emissive="#39ff14" emissiveIntensity={5} />
                </mesh>

                {/* ── SCAN RING ── thin horizontal torus that sweeps up/down */}
                <mesh ref={scanRef}>
                    <torusGeometry args={[0.68, 0.007, 4, 80]} />
                    <meshStandardMaterial
                        color="#0db9f2"
                        emissive="#0db9f2"
                        emissiveIntensity={8}
                        transparent
                        opacity={0.75}
                    />
                </mesh>
            </group>

            {/* ── PEDESTAL ── */}
            <mesh position={[0, -1.55, 0]} receiveShadow>
                <cylinderGeometry args={[1.1, 1.4, 0.1, 64]} />
                <meshStandardMaterial color="#0d0d0d" roughness={0.2} metalness={0.9} />
            </mesh>

            {/* Pedestal neon ring */}
            <mesh position={[0, -1.50, 0]}>
                <torusGeometry args={[1.1, 0.018, 4, 80]} />
                <meshStandardMaterial color="#256af4" emissive="#256af4" emissiveIntensity={5} />
            </mesh>

            <Sparkles count={80} scale={5} size={1.5} speed={0.2} opacity={0.35} color="#256af4" />
            <ContactShadows position={[0, -1.6, 0]} opacity={0.9} scale={6} blur={3} far={4} />
        </>
    );
}
