/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.insertdata.newpackage;

/**
 *
 * @author ductr
 */
public class SubjectDAO {
        public int insert(Subject s){
        String sql ="INSERT INTO subject (id, name, logo) VALUES (?,?,?)";
      return XJdbc.update(sql, s.getId(),s.getName(),s.getLogo());
    }
}
