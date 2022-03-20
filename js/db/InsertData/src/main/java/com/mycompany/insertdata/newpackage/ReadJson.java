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


// insert students data
public class ReadJson {
    public static void main(String[] args) {
        try {
            StudentDAO dao = new StudentDAO();
            File input = new File
                ("E:\\ki5\\frontend-framework\\Assignment\\Assignment\\Asm-TaiNguyen"
                        + "\\Asm-TaiNguyen\\db\\Students.js");
            JsonElement jfile = JsonParser.parseReader(new FileReader(input));
            JsonArray fileArray  = jfile.getAsJsonArray();
            for(JsonElement test: fileArray){
                JsonObject ob = test.getAsJsonObject();
                String username = ob.get("username").getAsString();
                String pass = ob.get("password").getAsString();
                String fullname = ob.get("fullname").getAsString();
                String email = ob.get("email").getAsString();
                boolean gender = ob.get("gender").getAsBoolean();
                String birthday = ob.get("birthday").getAsString();
                double fee = ob.get("schoolfee").getAsDouble();
                double marks = ob.get("marks").getAsDouble();
                Student s = new Student(username,pass,fullname,email,gender,birthday,fee,marks);
                dao.insert(s);
            }
        } catch (FileNotFoundException ex) {
            ex.printStackTrace();
        }
    }
}
