/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.insertdata.newpackage;

/**
 *
 * @author ductr
 */
public class QuestionDAO {
            public int insert(Question s,String sub){
        String sql ="INSERT INTO question\n" +
"                  (id, text, marks, answerid, subject)\n" +
"VALUES (?,?,?,?,?)";
      return XJdbc.update(sql,s.getId(),s.getText(),1,s.getAnswer(),sub);
    }
}
