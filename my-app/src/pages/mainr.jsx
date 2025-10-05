// src/pages/MainR.jsx
import { useNavigate } from 'react-router-dom';
import AnimatedList from '@/components/AnimatedList';
import Silk from '@/components/Silk';
import CardNav from '@/components/CardNav'

  const itemsh = [
    {
      label: "About",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        { label: "Company", ariaLabel: "About Company" },
        { label: "Careers", ariaLabel: "About Careers" }
      ]
    },
    {
      label: "Projects", 
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        { label: "Featured", ariaLabel: "Featured Projects" },
        { label: "Case Studies", ariaLabel: "Project Case Studies" }
      ]
    },
    {
      label: "Contact",
      bgColor: "#271E37", 
      textColor: "#fff",
      links: [
        { label: "Email", ariaLabel: "Email us" },
        { label: "Twitter", ariaLabel: "Twitter" },
        { label: "LinkedIn", ariaLabel: "LinkedIn" }
      ]
    }
  ];






const items = [
  <div style={{ width: '90%', padding: '2%', backgroundColor: '#fff', borderRadius: '10px', margin: '1% 0' }}>
    <img src="/path/to/image1.jpg" alt="Item 1" style={{ width: '100%', borderRadius: '10px' }} />
    <h3 style={{ marginTop: '5px', color: '#000' }}>Title 1</h3>
    <p style={{ color: '#333' }}>Description for item 1.</p>
  </div>,

  <div style={{ width: '90%', padding: '2%', backgroundColor: '#fff', borderRadius: '10px', margin: '1% 0' }}>
    <img src="/path/to/image2.jpg" alt="Item 2" style={{ width: '100%', borderRadius: '10px' }} />
    <h3 style={{ marginTop: '5px', color: '#000' }}>Title 2</h3>
    <p style={{ color: '#333' }}>Description for item 2.</p>
  </div>,

  // ...repeat for all items
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
            <CardNav

      items={itemsh}
      baseColor="#fff"
      menuColor="#000"
      buttonBgColor="#111"
      buttonTextColor="#fff"
      ease="power3.out"
    />
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
