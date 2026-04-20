import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleSwarm() {
  const ref = useRef<THREE.Points>(null);

  // Generate random positions for 500 ember particles
  const sphere = new Float32Array(500 * 3);
  for(let i=0; i<500; i++) {
    sphere[i*3] = (Math.random() - 0.5) * 15;
    sphere[i*3+1] = (Math.random() - 0.5) * 15;
    sphere[i*3+2] = (Math.random() - 0.5) * 15;
  }

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#ec3642"
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.6}
        />
      </Points>
    </group>
  );
}

export default function EmberParticles() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ParticleSwarm />
      </Canvas>
    </div>
  );
}
