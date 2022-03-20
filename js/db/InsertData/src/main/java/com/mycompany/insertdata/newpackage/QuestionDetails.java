/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.insertdata.newpackage;

/**
 *
 * @author ductr
 */
public class QuestionDetails {
    int qid;
    int id;
    String text;

    public QuestionDetails(int qid, int id, String text) {
        this.qid = qid;
        this.id = id;
        this.text = text;
    }

    public int getQid() {
        return qid;
    }

    public int getId() {
        return id;
    }

    public String getText() {
        return text;
    }
    
}
