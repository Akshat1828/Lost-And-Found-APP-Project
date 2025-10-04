import '../index.css';
import LightRays from '@/components/LightRays';
import Dock from '@/components/Dock';
import { VscHome, VscArchive, VscAccount, VscSettingsGear } from 'react-icons/vsc';
import CurvedLoop from '@/components/CurvedLoop';
import PrismaticBurst from '@/components/PrismaticBurst';
import { useNavigate } from 'react-router-dom';




const items = [
  { icon: <VscHome size={18} />, label: 'Home', onClick: () => alert('Home!') },
  { icon: <VscArchive size={18} />, label: 'Archive', onClick: () => alert('Archive!') },
  { icon: <VscAccount size={18} />, label: 'Profile', onClick: () => alert('Profile!') },
  { icon: <VscSettingsGear size={18} />, label: 'Settings', onClick: () => alert('Settings!') },
];

function App() {
  const navigate = useNavigate();
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', backgroundColor: 'black' }}>

      {/* LightRays effect */}
      <LightRays
        raysOrigin="top-center"
        raysColor="#ffffffff"
        raysSpeed={5}
        lightSpread={1}
        rayLength={10}
        followMouse={true}
        mouseInfluence={1}
        noiseAmount={0.2}
        distortion={0.05}
        className="custom-rays"
      />

      {/* Bold central text */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'white',
        fontSize: '8rem',
        fontWeight: 'bold',
        textAlign: 'center',
        zIndex: 10,
      }}>
        Lost Your
      </div>

      {/* CurvedLoop text below the central text */}
      <div style={{
        zIndex:20,
      }}>
        <CurvedLoop 
          marqueeText="Laptop ✦ ID Card ✦ Notebook ✦ Water Bottle ✦ Backpack ✦ Keys ✦ Glasses ✦ Headphones ✦ Wallet ✦ Calculator ✦ Textbooks ✦ Jacket ✦ Phone ✦ USB Drive ✦ Snacks ✦"
          speed={1}
          curveAmount={500}
          direction="right"
          interactive={true}
          className="custom-text-style"
        />
      </div>
              <div style={{
        position: 'absolute',
        bottom: '-5%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'white',
        fontSize: '8rem',
        fontWeight: 'bold',
        textAlign: 'center',
        zIndex: 10,
      }}>
       ?
      </div>

      {/* Dock at the bottom */}
      <div style={{ position: 'absolute', bottom: 0, width: '100%' }}>
        <Dock 
          items={items}
          panelHeight={68}
          baseItemSize={50}
          magnification={70}
        />
      </div>
<div style={{ width: '100%', height: '100%', position: 'relative' }}>
  <PrismaticBurst
    animationType="rotate3d"
    intensity={2}
    speed={0.5}
    distort={0}
    paused={false}
    offset={{ x: 0, y: 0 }}
    hoverDampness={0}
    rayCount={2}
    mixBlendMode="lighten"
    colors={['#ffffffff', '#4d3dff', '#ffffff','#ffffffff', '#4d3dff', '#ffffff']}
  />
        <div style={{
        position: 'absolute',
        top: '25%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'white',
        fontSize: '5rem',
        fontWeight: 'bold',
        textAlign: 'center',
        zIndex: 10,
      }}>
        We'll Help You
      </div>
              <div style={{
          position: 'absolute',
          top: '45%', // between the two texts
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10,
        }}>
          <button style={{
            padding: '1rem 3rem',
            fontSize: '2rem',
            fontWeight: 'bold',
            borderRadius: '1rem',
            backgroundColor: '#ff7e5f',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            transition: '0.3s',
          }}
            onClick={() => navigate('/Login')}
          >
            Get Started
          </button>
        </div>
        <div style={{
        position: 'absolute',
        bottom: '15%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'white',
        fontSize: '8rem',
        fontWeight: 'bold',
        textAlign: 'center',
        zIndex: 10,
      }}>
       Find It
      </div>
</div>

    </div>
  );
}

export default App;
