import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Center, Environment, Float, Sparkles, ContactShadows } from '@react-three/drei';

export default function ShoeModel() {
    const meshRef = useRef();

    useFrame((state, delta) => {
        meshRef.current.rotation.y += delta * 0.5;
        // Add subtle bobbing
        meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    });

    return (
        <>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
            <pointLight position={[-10, -10, -10]} intensity={1} color="#256af4" />
            <pointLight position={[10, -10, 10]} intensity={1} color="#39ff14" />

            <Environment preset="city" />

            <Float speed={1.5} rotationIntensity={1.5} floatIntensity={2}>
                <group ref={meshRef}>
                    {/* Main body of the 'shoe' */}
                    <mesh castShadow receiveShadow position={[0, 0, 0]}>
                        <capsuleGeometry args={[0.5, 1.2, 4, 16]} />
                        {/* Sneaker-like dark shiny material with neon edges */}
                        <meshPhysicalMaterial
                            color="#1a1a1a"
                            metalness={0.6}
                            roughness={0.2}
                            clearcoat={1}
                            clearcoatRoughness={0.1}
                        />
                    </mesh>
                    {/* Sole abstraction */}
                    <mesh position={[0, -0.6, 0]} rotation={[0, 0, Math.PI / 2]}>
                        <cylinderGeometry args={[0.55, 0.55, 2.3, 32]} />
                        <meshStandardMaterial color="#256af4" emissive="#256af4" emissiveIntensity={0.5} />
                    </mesh>
                    {/* Highlight accent */}
                    <mesh position={[0.4, 0.2, 0.5]} rotation={[0.2, 0, 0.5]}>
                        <torusGeometry args={[0.3, 0.05, 16, 32]} />
                        <meshStandardMaterial color="#39ff14" emissive="#39ff14" emissiveIntensity={0.8} />
                    </mesh>
                </group>
            </Float>

            <Sparkles count={50} scale={4} size={2} speed={0.4} opacity={0.5} color="#256af4" />
            <ContactShadows position={[0, -1.5, 0]} opacity={0.6} scale={10} blur={2} far={4} color="#000000" />
        </>
    );
}
