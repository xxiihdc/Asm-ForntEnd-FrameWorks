<?php
header('Access-Control-Allow-Origin: *');

header('Access-Control-Allow-Methods: GET, POST');

header("Access-Control-Allow-Headers: X-Requested-With");
		$connect = mysqli_connect("localhost","root","","asmfe");
        mysqli_set_charset($connect,"utf8");
		class User 
		{
			
			function User($username,$fullname,$password,$email,$birthday,$gender,$fee)
			{
				# code...
				$this -> username = $username;
                $this -> fullname = $fullname;
                $this -> password = $password;
                $this -> email = $email;
                $this -> birthday = $birthday;
                $this -> gender = $gender;
                $this -> fee = $fee;

			}
			
		}
        $query="select * from _users";
        $data = mysqli_query($connect,$query);
        $users = array();
        while($row = mysqli_fetch_assoc($data)){
        array_push($users, new User($row['_username'],$row['fullname'],$row['_password'], $row['email'], $row['birthday'], $row['gender'],$row['schoolfee']));
    }
    echo json_encode($users);
    $connect->close();
	?>