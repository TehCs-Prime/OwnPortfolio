import {useEffect, useRef} from 'react';
import Grid3D from './GridScene';


const TimeLine = () => {
    const mountRef = useRef<HTMLDivElement | null> (null);

    useEffect ( () => {
        const mount = mountRef.current;

        if (!mount) return;

        
})

    return (
        <Grid3D>
              {/* Add your custom objects here */}
              <mesh position={[0, 0, 0]}>
                <boxGeometry args={[5, 5, 5]} />
                <meshStandardMaterial color="orange" />
              </mesh>
        
              <mesh position={[10, 10, 0]}>
                <sphereGeometry args={[3, 32, 32]} />
                <meshStandardMaterial color="skyblue" />
              </mesh>
        </Grid3D>
    );
}
export default TimeLine;