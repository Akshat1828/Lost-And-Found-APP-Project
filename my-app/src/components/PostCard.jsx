import { useState, useEffect } from 'react';

export default function PostCard({ post, onPostUpdate }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);

  const userEmail = localStorage.getItem('userEmail');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (userEmail) {
      fetchUserProfile();
    }
  }, [userEmail]);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/users/profile?email=${encodeURIComponent(userEmail)}`);
      if (response.ok) {
        const user = await response.json();
        setCurrentUser(user);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const fetchComments = async () => {
    if (!showComments) return;

    setLoadingComments(true);
    try {
      const response = await fetch(`http://localhost:8080/api/users/posts/${post.id}/comments`);
      if (response.ok) {
        const commentsData = await response.json();
        setComments(commentsData);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoadingComments(false);
    }
  };

  useEffect(() => {
    if (showComments) {
      fetchComments();
    }
  }, [showComments, post.id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !currentUser) return;

    setIsSubmittingComment(true);
    try {
      const commentData = {
        postId: post.id,
        userId: currentUser.id,
        commentText: newComment.trim()
      };

      const response = await fetch('http://localhost:8080/api/users/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
      });

      if (response.ok) {
        setNewComment('');
        fetchComments(); // Refresh comments
      } else {
        console.error('Failed to post comment');
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '15px',
      padding: '20px',
      margin: '15px 0',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.3)'
    }}>
      {/* Post Header */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontWeight: 'bold',
          marginRight: '10px'
        }}>
          {post.username ? post.username.charAt(0).toUpperCase() : 'U'}
        </div>
        <div>
          <div style={{ fontWeight: 'bold', color: '#333' }}>{post.username || 'Unknown User'}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>{formatDate(post.createdAt)}</div>
        </div>
        <div style={{
          marginLeft: 'auto',
          padding: '4px 12px',
          borderRadius: '12px',
          background: post.itemType === 'lost' ? 'rgba(255, 59, 48, 0.1)' : 'rgba(52, 199, 89, 0.1)',
          color: post.itemType === 'lost' ? '#ff3b30' : '#34c759',
          fontSize: '12px',
          fontWeight: 'bold'
        }}>
          {post.itemType.toUpperCase()}
        </div>
      </div>

      {/* Post Title */}
      <h3 style={{ color: '#333', marginBottom: '10px', fontSize: '18px' }}>{post.title}</h3>

      {/* Post Image */}
      {post.imageUrl && (
        <div style={{ marginBottom: '15px' }}>
          <img
            src={post.imageUrl}
            alt={post.title}
            style={{
              width: '100%',
              maxHeight: '300px',
              objectFit: 'cover',
              borderRadius: '10px',
              border: '1px solid rgba(0, 0, 0, 0.1)'
            }}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      )}

      {/* Post Description */}
      <p style={{ color: '#555', lineHeight: '1.5', marginBottom: '15px' }}>{post.description}</p>

      {/* Post Details */}
      <div style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
        {post.location && <div><strong>Location:</strong> {post.location}</div>}
        {post.contactInfo && <div><strong>Contact:</strong> {post.contactInfo}</div>}
      </div>

      {/* Comments Section */}
      <div style={{ borderTop: '1px solid rgba(0, 0, 0, 0.1)', paddingTop: '15px' }}>
        <button
          onClick={() => setShowComments(!showComments)}
          style={{
            background: 'none',
            border: 'none',
            color: '#667eea',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold',
            marginBottom: '10px'
          }}
        >
          {showComments ? 'Hide Comments' : `Show Comments (${comments.length})`}
        </button>

        {showComments && (
          <div>
            {/* Comments List */}
            <div style={{ marginBottom: '15px' }}>
              {loadingComments ? (
                <div style={{ textAlign: 'center', color: '#666' }}>Loading comments...</div>
              ) : comments.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#666' }}>No comments yet</div>
              ) : (
                comments.map(comment => (
                  <div key={comment.id} style={{
                    background: 'rgba(0, 0, 0, 0.05)',
                    padding: '10px',
                    borderRadius: '8px',
                    marginBottom: '8px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                      <span style={{ fontWeight: 'bold', fontSize: '14px', color: '#333' }}>
                        {comment.username || 'Anonymous'}
                      </span>
                      <span style={{ fontSize: '12px', color: '#666' }}>
                        {formatDate(comment.createdAt)}
                      </span>
                    </div>
                    <p style={{ margin: 0, color: '#555', fontSize: '14px' }}>{comment.commentText}</p>
                  </div>
                ))
              )}
            </div>

            {/* Add Comment Form */}
            {currentUser && (
              <form onSubmit={handleCommentSubmit}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      borderRadius: '20px',
                      border: '1px solid rgba(0, 0, 0, 0.2)',
                      fontSize: '14px'
                    }}
                    disabled={isSubmittingComment}
                  />
                  <button
                    type="submit"
                    disabled={isSubmittingComment || !newComment.trim()}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '20px',
                      border: 'none',
                      background: isSubmittingComment ? '#ccc' : '#667eea',
                      color: '#fff',
                      fontSize: '14px',
                      cursor: isSubmittingComment || !newComment.trim() ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {isSubmittingComment ? '...' : 'Post'}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}