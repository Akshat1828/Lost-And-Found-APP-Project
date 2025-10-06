import { useState } from 'react';

export default function PostForm({ onPostCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [itemType, setItemType] = useState('lost');
  const [location, setLocation] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      setMessage('Please log in first');
      setIsSubmitting(false);
      return;
    }

    try {
      // First get user ID from email
      const userResponse = await fetch(`http://localhost:8080/api/users/profile?email=${encodeURIComponent(userEmail)}`);
      if (!userResponse.ok) {
        throw new Error('Failed to get user information');
      }

      const user = await userResponse.json();

      // Create the post
      const postData = {
        userId: user.id,
        title,
        description,
        imageUrl: imageUrl || null,
        itemType,
        location: location || null,
        contactInfo: contactInfo || null
      };

      const response = await fetch('http://localhost:8080/api/users/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      const result = await response.text();
      if (response.ok) {
        setMessage('Post created successfully!');
        // Reset form
        setTitle('');
        setDescription('');
        setImageUrl('');
        setItemType('lost');
        setLocation('');
        setContactInfo('');
        // Notify parent component
        if (onPostCreated) onPostCreated();
      } else {
        setMessage(result || 'Failed to create post');
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '15px',
      padding: '20px',
      margin: '20px 0',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    }}>
      <h3 style={{ color: '#fff', marginBottom: '15px' }}>Create New Post</h3>

      {message && (
        <div style={{
          color: message.includes('success') ? '#4CAF50' : '#f44336',
          marginBottom: '15px',
          padding: '10px',
          borderRadius: '5px',
          background: 'rgba(255, 255, 255, 0.1)'
        }}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ color: '#fff', display: 'block', marginBottom: '5px' }}>
            Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#fff',
              fontSize: '14px'
            }}
            placeholder="What did you lose/find?"
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ color: '#fff', display: 'block', marginBottom: '5px' }}>
            Type *
          </label>
          <select
            value={itemType}
            onChange={(e) => setItemType(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#fff',
              fontSize: '14px'
            }}
          >
            <option value="lost">Lost Item</option>
            <option value="found">Found Item</option>
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ color: '#fff', display: 'block', marginBottom: '5px' }}>
            Description *
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#fff',
              fontSize: '14px',
              resize: 'vertical'
            }}
            placeholder="Describe the item in detail..."
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ color: '#fff', display: 'block', marginBottom: '5px' }}>
            Image URL (optional)
          </label>
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#fff',
              fontSize: '14px'
            }}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ color: '#fff', display: 'block', marginBottom: '5px' }}>
            Location (optional)
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#fff',
              fontSize: '14px'
            }}
            placeholder="Where did you lose/find it?"
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ color: '#fff', display: 'block', marginBottom: '5px' }}>
            Contact Info (optional)
          </label>
          <input
            type="text"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#fff',
              fontSize: '14px'
            }}
            placeholder="Phone number or email for contact"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            background: isSubmitting ? 'rgba(100, 100, 100, 0.7)' : 'rgba(0, 123, 255, 0.7)',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            padding: '12px 24px',
            fontSize: '16px',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            transition: 'background 0.3s ease',
            width: '100%'
          }}
        >
          {isSubmitting ? 'Creating Post...' : 'Create Post'}
        </button>
      </form>
    </div>
  );
}