import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileCard from '@/components/ProfileCard';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userEmail = localStorage.getItem('userEmail');
      
      if (!userEmail) {
        setError('No user logged in');
        setLoading(false);
        navigate('/Login');
        return;
      }

      try {
        const response = await fetch(`http://localhost:8080/api/users/profile?email=${encodeURIComponent(userEmail)}`);
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          setError('Failed to load profile');
        }
      } catch (error) {
        setError('Error loading profile: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div>Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={{ color: 'red' }}>{error}</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div>User not found</div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop:'10%'}}>
      <ProfileCard
        name={user.username || 'Unknown User'}
        title={`User ID: ${user.id}`}
        handle={user.email}
        status="Online"
        contactText={`Phone: ${user.phone || 'Not provided'}`}
        avatarUrl="/path/to/avatar.jpg"
        showUserInfo={true}
        enableTilt={false}
        enableMobileTilt={false}
        onContactClick={() => console.log('Contact clicked')}
      />
    </div>
  );
}
