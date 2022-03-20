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
public class ReadSubject {
    public static void main(String[] args) {
        try {
            SubjectDAO dao = new SubjectDAO();
            File input = new File
                ("E:\\ki5\\frontend-framework\\Assignment\\Assignment\\Asm-TaiNguyen"
                        + "\\Asm-TaiNguyen\\db\\Subjects.js");
            JsonElement jfile = JsonParser.parseReader(new FileReader(input));
            JsonArray fileArray  = jfile.getAsJsonArray();
            for(JsonElement test: fileArray){
                JsonObject ob = test.getAsJsonObject();
                String id = ob.get("Id").getAsString();
                String name = ob.get("Name").getAsString();
                String logo = ob.get("Logo").getAsString();
                Subject s = new Subject(id,name,logo);
                dao.insert(s);
            }
        } catch (FileNotFoundException ex) {
            ex.printStackTrace();
        }
}
}
