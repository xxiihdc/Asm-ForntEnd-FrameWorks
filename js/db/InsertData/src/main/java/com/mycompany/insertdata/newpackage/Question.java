/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.insertdata.newpackage;

/**
 *
 * @author ductr
 */
public class Question {
    String text;
    int id,answer;

    public Question(String text, int id, int answer) {
        this.text = text;
        this.id = id;
        this.answer = answer;
    }

    public String getText() {
        return text;
    }

    public int getId() {
        return id;
    }

    public int getAnswer() {
        return answer;
    }
    
    
}
