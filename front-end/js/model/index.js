import $ from "jquery";

export const model = {

    callBackEndGet: function (url, data) {
        return $.ajax({
            url: url,
            type: "GET", //send it through get method
            data,
            success: function (response) {
                return Promise.resolve("response",response);
            },
            error: function (xhr) {
                return Promise.reject("failreject",xhr);
            }
        });
    },

    callBackEndPost: function (url,data) {
        return $.ajax({
            url: url,
            type: "POST",
            data,
            success: function (response) {
                return Promise.resolve(response);
            },
            error: function (xhr) {
                return Promise.reject(xhr);
            }
        });
    },

    callBackEndPut: function () {

    }


};