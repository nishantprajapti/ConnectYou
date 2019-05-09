import $ from "jquery";
import { model } from "../model/index.js";
import question from "./questions.js";

$(document).ready(function() {

    const loggedIn = localStorage.getItem('connectYouUser');
    
    if (loggedIn && !location.href.includes("/home")) {
        location.href = location.href + 'home';
    } else if (loggedIn) {
        
    }

});


$(document.body).on('click', ".login", function (e) {
    if (!$(".username").val().length) {
        $(".username").addClass("error");
        $(".username").attr("placeholder", "Please enter User Name");
        e.stopImmediatePropagation();
    }
    if (!$(".password").val().length) {
        $(".password").addClass("error");
        $(".password").attr("placeholder", "Please enter Password");
        e.stopImmediatePropagation();
    }
});

$(document.body).on("click", ".register", function () {

    this.fullName = $("#fullName").val();
    this.emailAddress = $("#emailAddress").val();
    this.passwordReg = $("#password").val();
    let data = {
        fullName: this.fullName,
        password: this.passwordReg,
        emailAddress: this.emailAddress,
    }

    try {

        model.callBackEndGet("/registration", data).then(
            response => {
                console.log("response", response);
                if (response == 'success') {
                    var userLocalStorageInformation = window.btoa(this.emailAddress + ':' + this.passwordReg);
                    localStorage.setItem('connectYouUser', JSON.stringify(userLocalStorageInformation));
                }
            }
        )
    } catch (e) {
        console.log(e.statusText, "asdsa");
    }
});

$(document.body).on('click', ".login", function (e) {

    this.username = $(".username").val();
    this.password = $(".password").val();

    $.ajax({
        url: "/login",
        type: "get", //send it through get method
        data: {
            ajaxid: 4,
            UserID: this.username,
            password: this.password
        },
        success: function (response) {
            //Do Something
        },
        error: function (xhr) {
            //Do Something to handle error
        }
    });
});
