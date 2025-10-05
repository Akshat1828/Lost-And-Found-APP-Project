// src/pages/MainR.jsx
import { useNavigate } from 'react-router-dom';
import AnimatedList from '@/components/AnimatedList';
import Silk from '@/components/Silk';

const items = [
  'Item 1',
  'Item 2',
  'Item 3',
  'Item 4',
  'Item 5',
  'Item 6',
  'Item 7',
  'Item 8',
  'Item 9',
  'Item 10'
];

export default function MainR() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Silk as full-screen background */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <Silk
          speed={5}
          scale={1}
          color="#4f3268ff"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>

      {/* Content on top */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(29, 29, 31, 0.7)' // optional overlay
        }}
      >
        <AnimatedList
          items={items} 
          onItemSelect={(item, index) => console.log(item, index)}
          showGradients={false}
          enableArrowNavigation={true}
          displayScrollbar={true}
        />
      </div>
    </div>
  );
}
