package com.example;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class PostDAO {

    private Connection conn;

    public PostDAO(Connection conn) {
        this.conn = conn;
    }

    public void createPostsTable() {
        String sql = "CREATE TABLE IF NOT EXISTS posts (" +
                     "id SERIAL PRIMARY KEY," +
                     "user_id INTEGER REFERENCES users(id) ON DELETE CASCADE," +
                     "title VARCHAR(255) NOT NULL," +
                     "description TEXT NOT NULL," +
                     "image_url VARCHAR(500)," +
                     "item_type VARCHAR(50) NOT NULL CHECK (item_type IN ('lost', 'found'))," +
                     "location VARCHAR(255)," +
                     "contact_info VARCHAR(255)," +
                     "created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
                     "updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP" +
                     ")";
        try (Statement stmt = conn.createStatement()) {
            stmt.execute(sql);
            System.out.println("Posts table created or already exists.");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public boolean createPost(Post post) {
        String sql = "INSERT INTO posts (user_id, title, description, image_url, item_type, location, contact_info) " +
                     "VALUES (?, ?, ?, ?, ?, ?, ?)";
        try (PreparedStatement pstmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            pstmt.setInt(1, post.getUserId());
            pstmt.setString(2, post.getTitle());
            pstmt.setString(3, post.getDescription());
            pstmt.setString(4, post.getImageUrl());
            pstmt.setString(5, post.getItemType());
            pstmt.setString(6, post.getLocation());
            pstmt.setString(7, post.getContactInfo());

            int affectedRows = pstmt.executeUpdate();
            if (affectedRows > 0) {
                try (ResultSet generatedKeys = pstmt.getGeneratedKeys()) {
                    if (generatedKeys.next()) {
                        post.setId(generatedKeys.getInt(1));
                        return true;
                    }
                }
            }
            return false;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public List<Post> getAllPosts() {
        List<Post> posts = new ArrayList<>();
        String sql = "SELECT p.*, u.username FROM posts p " +
                     "LEFT JOIN users u ON p.user_id = u.id " +
                     "ORDER BY p.created_at DESC";

        try (PreparedStatement pstmt = conn.prepareStatement(sql);
             ResultSet rs = pstmt.executeQuery()) {

            while (rs.next()) {
                Post post = new Post();
                post.setId(rs.getInt("id"));
                post.setUserId(rs.getInt("user_id"));
                post.setTitle(rs.getString("title"));
                post.setDescription(rs.getString("description"));
                post.setImageUrl(rs.getString("image_url"));
                post.setItemType(rs.getString("item_type"));
                post.setLocation(rs.getString("location"));
                post.setContactInfo(rs.getString("contact_info"));
                post.setCreatedAt(rs.getTimestamp("created_at").toLocalDateTime());
                post.setUpdatedAt(rs.getTimestamp("updated_at").toLocalDateTime());
                post.setUsername(rs.getString("username"));
                posts.add(post);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return posts;
    }

    public Post getPostById(int postId) {
        String sql = "SELECT p.*, u.username FROM posts p " +
                     "LEFT JOIN users u ON p.user_id = u.id " +
                     "WHERE p.id = ?";

        try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setInt(1, postId);
            try (ResultSet rs = pstmt.executeQuery()) {
                if (rs.next()) {
                    Post post = new Post();
                    post.setId(rs.getInt("id"));
                    post.setUserId(rs.getInt("user_id"));
                    post.setTitle(rs.getString("title"));
                    post.setDescription(rs.getString("description"));
                    post.setImageUrl(rs.getString("image_url"));
                    post.setItemType(rs.getString("item_type"));
                    post.setLocation(rs.getString("location"));
                    post.setContactInfo(rs.getString("contact_info"));
                    post.setCreatedAt(rs.getTimestamp("created_at").toLocalDateTime());
                    post.setUpdatedAt(rs.getTimestamp("updated_at").toLocalDateTime());
                    post.setUsername(rs.getString("username"));
                    return post;
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    public List<Post> getPostsByUserId(int userId) {
        List<Post> posts = new ArrayList<>();
        String sql = "SELECT p.*, u.username FROM posts p " +
                     "LEFT JOIN users u ON p.user_id = u.id " +
                     "WHERE p.user_id = ? " +
                     "ORDER BY p.created_at DESC";

        try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setInt(1, userId);
            try (ResultSet rs = pstmt.executeQuery()) {
                while (rs.next()) {
                    Post post = new Post();
                    post.setId(rs.getInt("id"));
                    post.setUserId(rs.getInt("user_id"));
                    post.setTitle(rs.getString("title"));
                    post.setDescription(rs.getString("description"));
                    post.setImageUrl(rs.getString("image_url"));
                    post.setItemType(rs.getString("item_type"));
                    post.setLocation(rs.getString("location"));
                    post.setContactInfo(rs.getString("contact_info"));
                    post.setCreatedAt(rs.getTimestamp("created_at").toLocalDateTime());
                    post.setUpdatedAt(rs.getTimestamp("updated_at").toLocalDateTime());
                    post.setUsername(rs.getString("username"));
                    posts.add(post);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return posts;
    }

    public boolean updatePost(Post post) {
        String sql = "UPDATE posts SET title = ?, description = ?, image_url = ?, " +
                     "item_type = ?, location = ?, contact_info = ?, updated_at = CURRENT_TIMESTAMP " +
                     "WHERE id = ? AND user_id = ?";
        try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, post.getTitle());
            pstmt.setString(2, post.getDescription());
            pstmt.setString(3, post.getImageUrl());
            pstmt.setString(4, post.getItemType());
            pstmt.setString(5, post.getLocation());
            pstmt.setString(6, post.getContactInfo());
            pstmt.setInt(7, post.getId());
            pstmt.setInt(8, post.getUserId());

            return pstmt.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean deletePost(int postId, int userId) {
        String sql = "DELETE FROM posts WHERE id = ? AND user_id = ?";
        try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setInt(1, postId);
            pstmt.setInt(2, userId);
            return pstmt.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
}