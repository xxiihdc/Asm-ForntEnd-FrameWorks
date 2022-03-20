<?php
header('Access-Control-Allow-Origin: *');

header('Access-Control-Allow-Methods: GET, POST');

header("Access-Control-Allow-Headers: X-Requested-With");
$connect = mysqli_connect("localhost","root","","asmfe");
mysqli_set_charset($connect,"utf8");


        $maMon= $_GET['maMon'];
        $tenMon = $_GET['tenMon'];
        $diem = $_GET['diem'];
        $masv=$_GET['masv'];
        $query2="DELETE FROM `ketqua` WHERE `maSV`= ? and `maMon`= ?";
            $stmt2=$connect->prepare($query2);
         $stmt2->bind_param("ss",$masv,$maMon);
        $stmt2->execute();
        $query="INSERT INTO `ketqua`(`maMon`, `maSV`, `Diem`, `tenMon`) VALUES (?,?,?,?)";
        $stmt=$connect->prepare($query);
        $stmt->bind_param("ssis",$maMon,$masv,$diem,$tenMon);
        $stmt->execute();
        
    

        $connect->close();
        echo "done";
?>