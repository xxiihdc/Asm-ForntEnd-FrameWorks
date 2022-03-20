<?php
header('Access-Control-Allow-Origin: *');

header('Access-Control-Allow-Methods: GET, POST');

header("Access-Control-Allow-Headers: X-Requested-With");
$connect = mysqli_connect("localhost","root","","asmfe");
mysqli_set_charset($connect,"utf8");
        class KetQua {                     
                function KetQua($maMon,$tenMon,$diem){
                        $this -> maMon = $maMon;
                        $this -> tenMon = $tenMon;
                        $this -> diem = $diem;
                }
                        
        }
        $us= $_GET['id'];
        $query="SELECT * FROM `ketqua` WHERE maSV = '".$us."'";
        //echo $query;
        $mark = array();
        $data = mysqli_query($connect,$query);
        while($row = mysqli_fetch_assoc($data)){
                array_push($mark, new KetQua($row['maMon'],$row['tenMon'],$row['Diem']));
        }
        echo json_encode($mark);
        $connect->close();
        
?>