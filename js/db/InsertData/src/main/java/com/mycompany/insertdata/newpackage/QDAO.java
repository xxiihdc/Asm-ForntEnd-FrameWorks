/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.insertdata.newpackage;

/**
 *
 * @author ductr
 */
public class QDAO {
               public int insert(QuestionDetails s){
        String sql ="INSERT INTO question_details\n" +
"                  (id, questionId, text)\n" +
"VALUES (?,?,?)";
      return XJdbc.update(sql,s.getId(),s.getQid(),s.getText());
    }
}
