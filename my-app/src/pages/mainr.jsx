import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Silk from '@/components/Silk';
import CardNav from '@/components/CardNav';
import Stepper, { Step } from '@/components/Stepper';
import PostCard from '@/components/PostCard';
import logo from '/src/assets/mainimage.png';

export default function MainR() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [showStepper, setShowStepper] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/users/posts');
      if (response.ok) {
        const postsData = await response.json();
        setPosts(postsData);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePostCreated = () => {
    fetchPosts(); // Refresh posts after creating a new one
  };

  const handleSubmitPost = async () => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      if (image) formData.append('image', image);

      const response = await fetch('http://localhost:8080/api/users/posts', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Post created successfully!');
        handlePostCreated();
        setShowStepper(false);
        setName('');
        setDescription('');
        setImage(null);
      } else {
        alert('Failed to create post.');
      }
    } catch (error) {
      console.error('Error creating post:', error);
      alert('An error occurred while creating the post.');
    }
  };

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
      links: [
        {
          label: 'Your Profile',
          ariaLabel: 'Your Profile',
          onClick: (e) => {
            e.preventDefault();
            navigate('/Profile');
          },
        },
      ],
    },
  ];

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* 🌌 Background */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
        }}
      >
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
          logo={logo}
        />

        {/* 📝 Posts Section */}
        <div
          style={{
            width: '90%',
            maxWidth: '800px',
            maxHeight: '70vh',
            overflowY: 'auto',
            padding: '20px',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '15px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <div style={{ marginTop: '20px' }}>
            <h2 style={{ color: '#fff', marginBottom: '15px', textAlign: 'center' }}>
              Recent Posts
            </h2>

            {loading ? (
              <div style={{ textAlign: 'center', color: '#fff', padding: '40px' }}>
                Loading posts...
              </div>
            ) : posts.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#fff', padding: '40px' }}>
                No posts yet. Be the first to create one!
              </div>
            ) : (
              posts.map((post) => (
                <PostCard key={post.id} post={post} onPostUpdate={fetchPosts} />
              ))
            )}
          </div>
        </div>

        {/* ⚙️ Stepper Toggle */}
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
          title={showStepper ? 'Close Post Creator' : 'Create New Post'}
        >
          {showStepper ? '✖' : '➕'}
        </button>

        {/* 🌫 Overlay */}
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

        {/* 🪄 Stepper (Post Creation Wizard) */}
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
            onStepChange={(step) => console.log('Step:', step)}
            onFinalStepCompleted={() => console.log('Post creation completed!')}
            backButtonText="Previous"
            nextButtonText="Next"
          >
            <Step>
              <h2>🪄 Create a New Post</h2>
              <p>Let's help you list your lost or found item.</p>
            </Step>

            <Step>
              <h2>📝 Item Details</h2>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Item Name"
                style={{
                  width: '80%',
                  padding: '2%',
                  borderRadius: '8px',
                  border: 'none',
                  background: 'rgba(255,255,255,0.3)',
                  color: '#fff',
                  marginBottom: '10px',
                }}
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the item..."
                style={{
                  width: '80%',
                  height: '100px',
                  padding: '2%',
                  borderRadius: '8px',
                  border: 'none',
                  background: 'rgba(255,255,255,0.3)',
                  color: '#fff',
                  resize: 'none',
                }}
              />
            </Step>

            <Step>
              <h2>📸 Upload Image</h2>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                style={{ marginTop: '10px', color: '#fff' }}
              />
              <p>Optional: Upload a picture of your item.</p>
            </Step>

            <Step>
              <h2>✅ Ready to Post?</h2>
              <p>Review your details and hit submit!</p>
              <button
                onClick={handleSubmitPost}
                style={{
                  marginTop: '10px',
                  padding: '10px 20px',
                  borderRadius: '10px',
                  border: 'none',
                  background: '#4f3268',
                  color: '#fff',
                  cursor: 'pointer',
                }}
              >
                Submit Post
              </button>
            </Step>
          </Stepper>
        </div>
      </div>
    </div>
  );
}
