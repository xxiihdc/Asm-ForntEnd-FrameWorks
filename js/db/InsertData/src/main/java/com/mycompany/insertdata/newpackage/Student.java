/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.insertdata.newpackage;

/**
 *
 * @author ductr
 */
public class Student {
    String username;
    String password;
    String fullname;
    String email;
    boolean gender;
    String birthday;
    double fee;
    double mark;

    public Student() {
    }

    public Student(String username, String password, String fullname, String email,
            boolean gender, String birthday, double fee, double mark) {
        this.username = username;
        this.password = password;
        this.fullname = fullname;
        this.email = email;
        this.gender = gender;
        this.birthday = birthday;
        this.fee = fee;
        this.mark = mark;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public boolean getGender() {
        return gender;
    }

    public void setGender(boolean gender) {
        this.gender = gender;
    }

    public String getBirthday() {
        return birthday;
    }

    public void setBirthday(String birthday) {
        this.birthday = birthday;
    }

    public double getFee() {
        return fee;
    }

    public void setFee(double fee) {
        this.fee = fee;
    }

    public double getMark() {
        return mark;
    }

    public void setMark(double mark) {
        this.mark = mark;
    }
    
}
