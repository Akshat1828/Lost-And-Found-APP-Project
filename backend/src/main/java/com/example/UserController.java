package com.example;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;
import java.util.List;

import jakarta.annotation.PostConstruct;
import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private DataSource dataSource;

    private UserDAO userDAO;
    private PostDAO postDAO;
    private CommentDAO commentDAO;

    @PostConstruct
    public void init() {
        try {
            Connection conn = dataSource.getConnection();
            userDAO = new UserDAO(conn);
            postDAO = new PostDAO(conn);
            commentDAO = new CommentDAO(conn);
            userDAO.createUsersTable();
            postDAO.createPostsTable();
            commentDAO.createCommentsTable();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        try {
            // Validate required fields
            if (user.getUsername() == null || user.getUsername().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Username is required");
            }
            if (user.getEmail() == null || user.getEmail().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Email is required");
            }
            if (user.getPassword() == null || user.getPassword().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Password is required");
            }
            
            boolean success = userDAO.registerUser(user.getUsername(), user.getPhone(), user.getEmail(), user.getPassword());
            if (success) {
                return ResponseEntity.ok("User registered successfully");
            } else {
                return ResponseEntity.badRequest().body("Registration failed. Email or username may already exist.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Internal server error: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {
        boolean success = userDAO.loginUser(user.getEmail(), user.getPassword());
        if (success) {
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.badRequest().body("Invalid credentials");
        }
    }

    @GetMapping("/profile")
    public ResponseEntity<User> getUserProfile(@RequestParam String email) {
        User user = userDAO.getUserByEmail(email);
        if (user != null) {
            // Don't return password in the response
            user.setPassword(null);
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Posts endpoints
    @PostMapping("/posts")
    public ResponseEntity<String> createPost(@RequestBody Post post) {
        boolean success = postDAO.createPost(post);
        if (success) {
            return ResponseEntity.ok("Post created successfully");
        } else {
            return ResponseEntity.badRequest().body("Failed to create post");
        }
    }

    @GetMapping("/posts")
    public ResponseEntity<List<Post>> getAllPosts() {
        List<Post> posts = postDAO.getAllPosts();
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/posts/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable int id) {
        Post post = postDAO.getPostById(id);
        if (post != null) {
            return ResponseEntity.ok(post);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/posts/user/{userId}")
    public ResponseEntity<List<Post>> getPostsByUserId(@PathVariable int userId) {
        List<Post> posts = postDAO.getPostsByUserId(userId);
        return ResponseEntity.ok(posts);
    }

    @PutMapping("/posts/{id}")
    public ResponseEntity<String> updatePost(@PathVariable int id, @RequestBody Post post) {
        post.setId(id);
        boolean success = postDAO.updatePost(post);
        if (success) {
            return ResponseEntity.ok("Post updated successfully");
        } else {
            return ResponseEntity.badRequest().body("Failed to update post");
        }
    }

    @DeleteMapping("/posts/{id}")
    public ResponseEntity<String> deletePost(@PathVariable int id, @RequestParam int userId) {
        boolean success = postDAO.deletePost(id, userId);
        if (success) {
            return ResponseEntity.ok("Post deleted successfully");
        } else {
            return ResponseEntity.badRequest().body("Failed to delete post");
        }
    }

    // Comments endpoints
    @PostMapping("/comments")
    public ResponseEntity<String> createComment(@RequestBody Comment comment) {
        boolean success = commentDAO.createComment(comment);
        if (success) {
            return ResponseEntity.ok("Comment created successfully");
        } else {
            return ResponseEntity.badRequest().body("Failed to create comment");
        }
    }

    @GetMapping("/posts/{postId}/comments")
    public ResponseEntity<List<Comment>> getCommentsByPostId(@PathVariable int postId) {
        List<Comment> comments = commentDAO.getCommentsByPostId(postId);
        return ResponseEntity.ok(comments);
    }

    @DeleteMapping("/comments/{id}")
    public ResponseEntity<String> deleteComment(@PathVariable int id, @RequestParam int userId) {
        boolean success = commentDAO.deleteComment(id, userId);
        if (success) {
            return ResponseEntity.ok("Comment deleted successfully");
        } else {
            return ResponseEntity.badRequest().body("Failed to delete comment");
        }
    }
}