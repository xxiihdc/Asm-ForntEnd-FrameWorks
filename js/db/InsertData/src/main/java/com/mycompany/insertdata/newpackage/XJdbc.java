/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.insertdata.newpackage;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 *
 * @author ductr
 */
public class XJdbc {

    static String db = "jdbc:sqlserver://localhost:1433;databaseName=AsmFE;"
            + "userName=sa;password=123";
    static String driver = "com.microsoft.sqlserver.jdbc.SQLServerDriver";

    static {
        try {
            Class.forName(driver);
        } catch (Exception ex) {
            throw new RuntimeException(ex);
        }
    }

    public static PreparedStatement getStmt(String sql, Object... args) {
        PreparedStatement stmt;
        try {
            Connection cn = DriverManager.getConnection(db);
            if (sql.trim().startsWith("{")) {
                stmt = cn.prepareCall(sql);
            } else {
                stmt = cn.prepareStatement(sql);
            }
            for (int i = 0; i < args.length; i++) {
                stmt.setObject(i + 1, args[i]);
            }
            return stmt;

        } catch (Exception ex) {
            throw new RuntimeException(ex);
        }
    }

    public static ResultSet query(String sql, Object... args) {
        try {
            PreparedStatement stmt = XJdbc.getStmt(sql, args);
            ResultSet rs = stmt.executeQuery();
            return rs;
        } catch (SQLException ex) {
            throw new RuntimeException(ex);
        }
    }

    public static Object value(String sql, Object... args) {
        try {
            ResultSet rs = XJdbc.query(sql, args);
            if (rs.next()) {
                Object o = rs.getObject(1);
                rs.getStatement().getConnection().close();
                return o;
            } else {
                rs.getStatement().getConnection().close();
                return null;
            }
        } catch (Exception ex) {
            throw new RuntimeException(ex);
        }
    }

    public static int update(String sql, Object... args) {
        try {
            PreparedStatement stmt = XJdbc.getStmt(sql, args);
            int i = stmt.executeUpdate();
            stmt.getConnection().close();
            return i;
        } catch (Exception ex) {
            throw new RuntimeException(ex);
        }
    }
}
