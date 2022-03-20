var app = angular.module('myapp', ['ui.router', 'ngCookies']);
app.config(function ($stateProvider, $urlRouterProvider) {
    // $urlRouterProvider.otherwise('/home');
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'home.html',
            controller: function ($rootScope, $scope, $state) {
                $scope.learnNow = function () {
                    if ($rootScope.isLogin) {
                        $state.go('course');
                    } else {
                        $state.go('login');
                    }
                }
            }
        })
        .state('login', {
            url: '/login',
            templateUrl: 'login.html',
            controller: function ($scope, $cookies, $rootScope, $state) {
                $scope.login = function () {
                    for (var i = 0; i < $rootScope.acc.length; i++) {
                        if ($scope.username == $rootScope.acc[i].username &&
                            $scope.pass == $rootScope.acc[i].password) {
                            $cookies.put("username", $scope.username);
                            $cookies.put("fullname", $rootScope.acc[i].fullname);
                            $cookies.put("pass",$scope.pass);
                            $state.go('course');
                            $rootScope.isLogin = true;
                            $rootScope.taiKhoan = $rootScope.acc[i].fullname;
                            return;
                        }
                    }
                    alert("Tên đăng nhập hoặc mật khẩu không đúng!");
                }
            }
        })
        .state('register', {
            url: '/register',
            templateUrl: 'register.html',
            controller: function ($scope, $state, $http, $rootScope, $filter,$window) {
                $scope.gender = 'male';
                $scope.usersmall = "Tên đăng nhập ít nhất 5 ký tự, bao gồm chữ cái số, '_' và không bắt đầu bằng số";
                
                $scope.register = function () {
                    $scope.formatedDate = $filter("date")(new Date(), "yyyy-MM-dd");
                    console.log($scope.formatedDate);
                    if ($scope.registerform.$valid) {
                        $state.go('home');
                        alert("Đăng ký thành công");
                        var genderbit = 0;
                        if ($scope.gender == 'male' || $scope.gender == 'other') {
                            genderbit = 1;
                        }
                        var url = "http://127.0.0.1/AsmFe/register.php?us="
                            + $scope.username + "&pass=" + $scope.password + "&fn=" + $scope.fullname +
                            "&email=" + $scope.mail + "&bd=" + $scope.formatedDate + "&gen=" + genderbit;
                        $http.get(url).then(function (response) {
                            console.log(response.data);
                        });
                        $window.location.href = '/';
                    } else {
                        alert("Đăng ký không thành công\nKiểm tra đầy đủ thông tin");
                        
                    }

                }
                $scope.blur = function () {
                    for (var i = 0; i < $rootScope.acc.length; i++) {
                        if ($scope.username == $rootScope.acc[i].username) {
                            $scope.registerform.username.$setValidity("username", false);
                            $scope.usersmall = "Tên đăng nhập đã tồn tại";
                            return;
                        } else {
                            $scope.registerform.username.$setValidity("username", true);
                        }
                    }
                    if ($scope.registerform.username.$valid) {
                        $scope.usersmall = "Tên đăng nhập đúng!";
                    } else {
                        $scope.usersmall = "Tên đăng nhập chưa đúng định dạng!";
                    }
                };
                $scope.checkpass = function () {

                    if ($scope.password == $scope.repass) {
                        $scope.registerform.repass.$setValidity("repass", true);
                    } else {
                        $scope.registerform.repass.$setValidity("repass", false);
                    }
                };
            }
        })
        .state('exam', {
            url: '/exam',
            templateUrl: 'exam.html',
            controller: function ($scope, $rootScope, $http, quizFactory) {
                $rootScope.question = [];
                $rootScope.courseName = "ABC";
                $http.get("js/db/Subjects.js").then(function (res) {
                    for (var i = 0; i < res.data.length; i++) {
                        if ($rootScope.examId == (res.data[i].Id) + ".js") {
                            $rootScope.courseName = res.data[i].Name;
                        }
                    }
                });
                $http.get('../js/db/Quizs/' + $rootScope.examId).then(function (response) {
                    quizFactory.questions = response.data;
                });
            }
        })
        .state('course', {
            url: '/course',
            templateUrl: 'course.html',
            controller: function ($scope, $http, $state, $rootScope) {
                $scope.course = [];
                $http.get('js/db/Subjects.js').then(function (response) {
                    $scope.course = response.data;
                    $scope.begin = 0;
                    $scope.page = $scope.course.length / 4;
                    $scope.pages = [];
                    for (var i = 1; i <= $scope.page; i++) {
                        $scope.pages.push(i);
                    }
                });
                $scope.coursepage = function (index) {
                    $scope.begin = (index - 1) * 4;
                }
                $scope.exam = function (id) {
                    if ($rootScope.isLogin) {
                        $rootScope.examId = id + '.js';
                        $state.go('exam');
                    } else {
                        $state.go('login')
                    }
                }
            }
        })
        .state('forgetpass', {
            url: '/forgerpassword',
            templateUrl: 'forget-pass.html',
            controller: function ($scope, $rootScope) {
             //   console.log($rootScope.acc);
                $scope.getpass = function () {
                    console.log($scope.reemail);
                    console.log($scope.reusername);
                    for (var i = 0; i < $rootScope.acc.length; i++) {
                        if ($scope.reemail == $rootScope.acc[i].email
                            && $scope.reusername == $rootScope.acc[i].username) {
                            alert("Mật khẩu của ban là: " + $rootScope.acc[i].password);
                            return;
                        } else {
                            alert("Tên đăng nhập hoặc email không đúng")
                        }
                    }
                }

            }
        })
        .state('intro', {
            url: '/intro',
            templateUrl: 'introduce.html'
        })
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'dashboard.html',
            controller: function ($scope, $http, $cookies) {
                $scope.acc.username = $cookies.get('username');
                $http.get('http://127.0.0.1/AsmFe/getUser.php').then(function (res) {
                    for (var i = 0; i < res.data.length; i++) {
                        if ($scope.acc.username == res.data[i].username) {
                            $scope.acc.fullname = res.data[i].fullname;
                            $scope.acc.password = res.data[i].password;
                            $scope.acc.repass = res.data[i].password;
                            $scope.acc.email = res.data[i].email;
                            $scope.acc.birthday = res.data[i].birthday;
                            $scope.acc.gender = res.data[i].gender;
                        }
                    }
                })
                $scope.ketqua = [];
                $http.get('http://127.0.0.1/AsmFe/getKetQua.php?id=' + $scope.acc.username).
                then(function (res) {
                    $scope.ketqua = res.data;
                    if(res.data.length==0){
                        $scope.len=true;
                    }
                });
            }
        })
        .state('changepass',{
            url:'changepass',
            templateUrl:'change-pass.html',
            controller: function($scope,$cookies,$state){
                $scope.checkpass=$cookies.get("pass");
                console.log($scope.checkpass);
                $scope.check1=function(){   
                    if($scope.oldpass==$scope.checkpass){
                        $scope.frmchangepass.oldpass.$setValidity("oldpass", true);
                    }else{
                        $scope.frmchangepass.oldpass.$setValidity("oldpass", false);
                    }
                }
                $scope.check2=function(){
                    if($scope.newpass==$scope.newpass2){
                        $scope.frmchangepass.newpass2.$setValidity("newpass2", true);
                    }else{
                        $scope.frmchangepass.newpass2.$setValidity("newpass2", false);
                    }
                }
                $scope.savepass=function(){
                    if($scope.frmchangepass.$valid){
                        alert("Đổi mật khẩu thành công");
                        $state.go('home');
                    }else{
                        alert("Kiểm tra thông tin mật khẩu!!");
                    }
                }
            }
        })
        .state('gopy',{
            url:'/gopy',
            templateUrl:'gopy.html'
        })
});
app.controller('rootctrl', function ($scope, $http, $state, $rootScope, $cookies) {
    $rootScope.isLogin = false;
    $rootScope.acc = [];
    $rootScope.taiKhoan = "Tài Khoản"
    $scope.init = function () {
        var a = $cookies.get('username');
        if (a) {
            $rootScope.isLogin = true;
            $rootScope.taiKhoan = $cookies.get('fullname');
        }
        $state.go('home');
    }
    $http.get('http://127.0.0.1/AsmFe/getUser.php').then(function (response) {
        $rootScope.acc = response.data;
    })
    $scope.logout = function () {
        $cookies.remove('username');
        $cookies.remove('fullname');
        $state.go('home');
        $rootScope.isLogin = false;
        $rootScope.taiKhoan = "Tài Khoản"
    }
});
app.directive('quizfpoly', function (quizFactory, $timeout, $http, $rootScope,$cookies) {
    return {
        restrict: "AE",
        scope: {},
        templateUrl: 'quiz.html',
        link: function (scope, elem, attrs) {
            scope.finish=function(){
                scope.end();
                scope.clock=-1;
            }
            scope.isEnd = false;
            scope.len = 0;
            $http.get("../js/db/Quizs/" + $rootScope.examId).then(function (res) {
                scope.len = res.data.length
            })
            scope.save = function(){
                var maMon = $rootScope.examId.substring(0,4);
                var masv = $cookies.get('username');
                $http.get("http://127.0.0.1/AsmFe/LuuKetQua.php?maMon="+maMon+"&tenMon="+$rootScope.courseName+"&diem="+scope.mark+"&masv="+masv).then(function (res) {
                    alert("Kết quả đã được lưu");
                })
            }
            scope.timing = function () {
                scope.clock = 60 * 1000 * 10;
                scope.tickInterval = 1000 //ms
                var tick = function () {
                    scope.clock = scope.clock - 1000;
                    if (scope.clock == 0) {
                        alert("Hết giờ");
                        scope.end();
                        return;
                    }
                    if(scope.clock<0){
                        return;
                    }
                    $timeout(tick, scope.tickInterval);
                }
                $timeout(tick, scope.tickInterval);
            }
            scope.start = function () {
                scope.isEnd = false;
                quizFactory.getQuestions().then(function () {
                    scope.reset();
                    scope.timing();
                    scope.mark = 0;
                    scope.count = 1;
                    scope.id = Math.floor(Math.random() * (scope.len - 10));
                    scope.inProgess = true;
                    scope.getQuestion();
                })

            };
            scope.reset = function () {
                scope.inProgess = false;
                scope.mark = 0;
                scope.count = 0;
                scope.clock = 0;
            };
            scope.getQuestion = function () {
                var quiz = quizFactory.getQuestion(scope.id);
                if (quiz) {
                    scope.answer = quiz.AnswerId;
                    scope.question = quiz.Text;
                    scope.options = quiz.Answers;
                }
            };
            scope.check = function () {
                if (!$('input[name = answer]:checked').length) {
                    alert("Chọn đáp án!!!");
                    return;
                }
                var ans = $('input[name = answer]:checked').val();
                if (ans == scope.answer) {
                    scope.mark++;
                }
                scope.next();
            }

            scope.next = function () {
                scope.id++;
                scope.count++;
                if (scope.count >= 11) {
                    scope.end();
                    return;
                }
                scope.getQuestion();
            }
            scope.end = function () {
                scope.inProgess = false;
                scope.isEnd = true;
            }
            scope.reset();
        }
    }
});
app.factory('quizFactory', function ($http, $rootScope) {

    return {
        getQuestions: function () {
            return $http.get('../js/db/Quizs/' + $rootScope.examId).then(function (response) {
                questions = response.data;
            });
        },
        getQuestion: function (id) {
            return questions[id];
        }
    }
});
app.controller('quizctrl', function ($scope, $rootScope, $http, $state) {
    // $rootScope.question=[];
    $scope.courseName = "ABC";
    $scope.courses = [];
    $http.get("js/db/Subjects.js").then(function (res) {
        $scope.courses = res.data;
        for (var i = 0; i < res.data.length; i++) {
            if ($rootScope.examId == (res.data[i].Id) + ".js") {
                $scope.courseName = res.data[i].Name;
            }
        }
    });
    $scope.exam = function (id) {
        if ($rootScope.isLogin) {
            $rootScope.examId = id + '.js';
           // alert($rootScope.examId);
            $state.reload();
            window.scrollTo(0, 0);
        } else {
            $state.go('login')
        }
    }
});



function setPage() {
    var b = $(window).width();
    if (b < 500) {
        var phone = document.getElementById('phone');
        phone.className = "col-md-5 col-12 text-left mt-1";
        var icon = document.getElementById('icon');
        icon.className = "col-md-3 col-12 mt-1 ml-auto"
        var mail = document.getElementById('mail');
        mail.className = "mt-1 col-md-3 offset-md-1 col-12 text-left";
        document.getElementById('list1').style.color = 'red';
        document.getElementById('list1').style.paddingLeft = '0px';
    }
}
var sr = ScrollReveal();
ScrollReveal({
    reset: false,
    distance: '60px',
    // duration: 2500,
    delay: 400
})
sr.reveal('.content', { delay: 500 });

function serviceDivOver(div, icon) {
    div.style.border = '1px solid red';
    div.style.backgroundColor = '#e74c3c';
    var ic = document.getElementById(icon);
    ic.style.color = 'black';
}
function serviceDivOut(div, icon) {
    div.style.border = '1px solid hsla(0,0%,100%,.5)';
    div.style.backgroundColor = '#ecf0f1';
    var ic = document.getElementById(icon);
    ic.style.color = '#e74c3c';
}
function loginGG() {
    alert('Tính năng này đang được hoàn thiện');
}
function gotoPage(index) {
    switch (index) {
        case 1:
            location.href = 'http://127.0.0.1:5500/login.html';
            break;
        case 2:
            // code block
            break;
        default:
            break;
    }
}
