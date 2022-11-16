(function ($) {

    $.fn.appearSuccessMessage = function (className) {

        //No Element
        if (className == null || typeof className == "undefined") {
            return null;
        }

        if (!$(`.${className}`).hasClass("success")) {
            $(`.${className}`).addClass("success");
            $(`.${className}`).prop("hidden", false);
        }
    }

    /**
     * 
     * @param {"string"} className 
     * @returns 
     */


    $.fn.appearErrorMessage = function (className) {

        //No Element
        if (className == null || typeof className == "undefined") {
            return null;
        }

        if (!$(`.${className}`).hasClass("error")) {
            $(`.${className}`).addClass("error");
            $(`.${className}`).prop("hidden", false);
        }
    }

    /**
     * 
     * @param {"string"} className 
     * @returns 
     */

    $.fn.disappearErrorMessage = function (className) {

        //No Element
        if (className == null || typeof className == "undefined") {
            return null;
        }

        if ($(`.${className}`).hasClass("error")) {
            $(`.${className}`).removeClass("error");
            $(`.${className}`).prop("hidden", true);
        }
    }

    /**
     * 
     * @param {*} className 
     * @param {*} message 
     * @returns 
     */
    $.fn.setErrorMessage = function (className, message) {


        if (className == null || typeof className == "undefined") {
            return null;
        }

        if (message == null || typeof message == "undefined") {
            return null;
        }

        $(`.${className}`).text(message);

    }

    $.fn.setSuccessMessage = function (className, message) {

        if (className == null || typeof className == "undefined") {
            return null;
        }

        if (message == null || typeof message == "undefined") {
            return null;
        }

        $(`.${className}`).text(message);
    }


    $.fn.setResultStatusMessage = function (className, message) {

    }


})(jQuery);
