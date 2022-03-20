<?php
header('Access-Control-Allow-Origin: *');

header('Access-Control-Allow-Methods: GET, POST');

header("Access-Control-Allow-Headers: X-Requested-With");
$connect = mysqli_connect("localhost","root","","asmfe");
mysqli_set_charset($connect,"utf8");


        $us= $_GET['us'];
        $pass = $_GET['pass'];
        $fn = $_GET['fn'];
        $email=$_GET['email'];
        $bd=$_GET['bd'];
        $gen=$_GET['gen'];
        $query="INSERT INTO `_users`(`_username`, `_password`, `fullname`, `email`,`birthday`, `gender`) VALUES (?,?,?,?,?,?)";
        $stmt=$connect->prepare($query);
        $stmt->bind_param("sssssi",$us,$pass,$fn,$email,$bd,$gen);
        $stmt->execute();
        $connect->close();
        echo "done";
?>