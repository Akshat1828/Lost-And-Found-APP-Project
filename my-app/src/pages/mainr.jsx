import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedList from '@/components/AnimatedList';
import Silk from '@/components/Silk';
import CardNav from '@/components/CardNav';
import Stepper, { Step } from '@/components/Stepper';

export default function MainR() {
  const [name, setName] = useState('');
  const [showStepper, setShowStepper] = useState(false);
  const navigate = useNavigate();

  const itemsh = [
    {
      label: 'Items',
      bgColor: '#170D27',
      textColor: '#fff',
      links: [
        { label: 'Your Lost Items', ariaLabel: 'Your Lost Items' },
        { label: 'Items You Have Found', ariaLabel: 'Items You Have Found' },
      ],
    },
    {
      label: 'Profile',
      bgColor: '#0D0716',
      textColor: '#fff',
      links: [{ label: 'Your Profile', ariaLabel: 'Your Profile' }],
    },
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
  ];

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* 🌌 Background */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <Silk speed={5} scale={1} color="#4f3268ff" noiseIntensity={1.5} rotation={0} />
      </div>

      {/* 🌟 Foreground */}
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
          backgroundColor: 'rgba(29, 29, 31, 0.7)',
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

        {/* 🧾 Animated list in center */}
        <AnimatedList
          items={items}
          onItemSelect={(item, index) => console.log(item, index)}
          showGradients={false}
          enableArrowNavigation={true}
          displayScrollbar={true}
        />

        {/* 🎛 Toggle Stepper button */}
        <button
          onClick={() => setShowStepper(!showStepper)}
          style={{
            position: 'fixed',
            bottom: '5%',
            right: '5%',
            zIndex: 60,
            background: showStepper ? 'rgba(255, 0, 100, 0.7)' : 'rgba(0, 0, 0, 0.7)',
            color: '#fff',
            border: 'none',
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            fontSize: '1.5rem',
            cursor: 'pointer',
            backdropFilter: 'blur(5px)',
            transition: '0.3s ease',
          }}
          title={showStepper ? 'Close Stepper' : 'Open Stepper'}
        >
          {showStepper ? '✖' : '⚙️'}
        </button>

        {/* 🌫 Background dim overlay */}
        {showStepper && (
          <div
            onClick={() => setShowStepper(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.6)',
              zIndex: 40,
              backdropFilter: 'blur(3px)',
              transition: 'opacity 0.3s ease',
            }}
          />
        )}

        {/* 🪟 Stepper in center */}
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: showStepper
              ? 'translate(-50%, -50%) scale(1)'
              : 'translate(-50%, -30%) scale(0.9)',
            opacity: showStepper ? 1 : 0,
            pointerEvents: showStepper ? 'auto' : 'none',
            width: '80%',
            maxWidth: '600px',
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '2%',
            boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
            zIndex: 50,
            color: '#fff',
            transition: 'all 0.5s cubic-bezier(0.19, 1, 0.22, 1)',
          }}
        >
          <Stepper
            initialStep={1}
            onStepChange={(step) => console.log(step)}
            onFinalStepCompleted={() => console.log('All steps completed!')}
            backButtonText="Previous"
            nextButtonText="Next"
          >
            <Step>
              <h2>Hey There!</h2>
              <p>Lets help you find that item of yours!</p>
            </Step>
            <Step>
              <h2>Step 2</h2>
              <img
                style={{
                  height: '20%',
                  width: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center -70%',
                  borderRadius: '10px',
                  marginTop: '2%',
                }}
                src="https://www.purrfectcatgifts.co.uk/cdn/shop/collections/Funny_Cat_Cards_640x640.png?v=1663150894"
              />
              <p>Give us an image if you have</p>
            </Step>
            <Step>
              <h2>Any Important Information</h2>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Info"
                style={{
                  width: '80%',
                  padding: '2%',
                  borderRadius: '8%',
                  border: 'none',
                  background: 'rgba(255,255,255,0.3)',
                  color: '#fff',
                }}
              />
            </Step>
            <Step>
              <h2>Thats It!</h2>
              <p>You can go back and check the details if you want</p>
            </Step>
          </Stepper>
        </div>
      </div>
    </div>
  );
}
