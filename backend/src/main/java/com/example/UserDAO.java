package com.example;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class UserDAO {

    private Connection conn;

    public UserDAO(Connection conn) {
        this.conn = conn;
    }

    public void createUsersTable() {
        String sql = "CREATE TABLE IF NOT EXISTS users (" +
                     "id SERIAL PRIMARY KEY," +
                     "username VARCHAR(255) UNIQUE NOT NULL," +
                     "phone VARCHAR(20)," +
                     "email VARCHAR(255) UNIQUE NOT NULL," +
                     "password VARCHAR(255) NOT NULL" +
                     ")";
        try (Statement stmt = conn.createStatement()) {
            stmt.execute(sql);
            System.out.println("Users table created or already exists.");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public boolean registerUser(String username, String phone, String email, String password) {
        String sql = "INSERT INTO users (username, phone, email, password) VALUES (?, ?, ?, ?)";
        try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, username);
            pstmt.setString(2, phone);
            pstmt.setString(3, email);
            pstmt.setString(4, password); // In real app, hash the password
            pstmt.executeUpdate();
            return true;
        } catch (SQLException e) {
            System.err.println("SQL Error during user registration: " + e.getMessage());
            e.printStackTrace();
            return false;
        }
    }

    public boolean loginUser(String email, String password) {
        String sql = "SELECT * FROM users WHERE email = ? AND password = ?";
        try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, email);
            pstmt.setString(2, password); // In real app, compare hashed password
            ResultSet rs = pstmt.executeQuery();
            return rs.next();
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public User getUserByEmail(String email) {
        String sql = "SELECT * FROM users WHERE email = ?";
        try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, email);
            ResultSet rs = pstmt.executeQuery();
            if (rs.next()) {
                User user = new User();
                user.setId(rs.getInt("id"));
                user.setUsername(rs.getString("username"));
                user.setPhone(rs.getString("phone"));
                user.setEmail(rs.getString("email"));
                user.setPassword(rs.getString("password"));
                return user;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }
}