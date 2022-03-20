/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.insertdata.newpackage;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;

/**
 *
 * @author ductr
 */
public class ReadQuiz {

    public static void main(String[] args) throws FileNotFoundException {
        File folder = new File("E:\\ki5\\frontend-framework\\Assignment\\Assignment\\Asm-TaiNguyen\\Asm-TaiNguyen\\db\\Quizs");
        File[] lstFile = folder.listFiles();
        QuestionDAO dao = new QuestionDAO();
        for (File file : lstFile) {
            if (file.isFile()) {
                JsonElement jfile = JsonParser.parseReader(new FileReader(file));
                JsonArray fileArray = jfile.getAsJsonArray();
                String name = file.getName().substring(0,4);
                for (JsonElement test : fileArray) {
                    JsonObject ob = test.getAsJsonObject();
                    int id = ob.get("Id").getAsInt();
                    String text = ob.get("Text").getAsString();
                    int answer = ob.get("AnswerId").getAsInt();
                    Question q = new Question(text,id,answer);
                   dao.insert(q, name);
                   JsonArray questionDetails = ob.get("Answers").getAsJsonArray();
                   for(JsonElement j : questionDetails){
                       QDAO qdao = new QDAO();
                       JsonObject ob2 = j.getAsJsonObject();
                       int id2 = ob2.get("Id").getAsInt();
                       String text2 = ob2.get("Text").getAsString();
                       QuestionDetails qd = new QuestionDetails(id, id2, text2);
                       qdao.insert(qd);
                   }
                }
            }
        }
    }
}
