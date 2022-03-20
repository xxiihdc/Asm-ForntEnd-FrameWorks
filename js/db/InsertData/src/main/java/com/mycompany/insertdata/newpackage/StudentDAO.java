/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.insertdata.newpackage;

/**
 *
 * @author ductr
 */
public class StudentDAO {
    public int insert(Student s){
        String sql ="INSERT INTO students (username, password, email, gender, schoolfee, mark) "
                + "VALUES (?,?,?,?,?,?)";
      return XJdbc.update(sql, s.getUsername(),s.getPassword(),
              s.getEmail(),s.getGender(),s.getFee(),s.getMark());
    }
}
