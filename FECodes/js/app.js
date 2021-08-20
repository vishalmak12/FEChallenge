const clearErrorMessage = () => {
    $(".error-msg.email-error").html("");
    $(".input-section").removeClass("error");
}

(function() {
    $(".option-phone").on("click", function() {
        $(".email-input").addClass("hide");
        $(".phone-input").removeClass("hide");
        $(".option-email").removeClass("active");
        $(".option-phone").addClass("active");
        clearErrorMessage();
    });
    $(".option-email").on("click", function() {
        $(".email-input").removeClass("hide");
        $(".phone-input").addClass("hide");
        $(".option-email").addClass("active");
        $(".option-phone").removeClass("active");
        clearErrorMessage();
    });
    $("#btn-search").on("click", function(e) {
        e.preventDefault();
        localStorage.clear(); //Clears storage for next request
        var apiValue, url;
        email = $('input[name="email"]').val().toLowerCase();
        phone = $('input[type="tel"]').val(); //Fetching phone number from input
        regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

        if (email) {
            apiValue = email.match(regEx);
            url = 'https://ltv-data-api.herokuapp.com/api/v1/records.json?email=' + email;
        } else if (phone.length == 10) {
            apiValue = phone;
            url = 'https://ltv-data-api.herokuapp.com/api/v1/records.json?phone=' + phone;
        }

        if (apiValue) {
            document.querySelector('input[type="text"]').parentNode.classList.remove("error");
            const proxyurl = "";
            $("#section-result-id").hide();
            $("#loader-id").show();
            $("#footer-id").addClass("footer-cont");
            fetch(proxyurl + url)
                .then((response) => response.text())
                .then(function(contents) {
                    localStorage.setItem("userObject", contents);
                    setTimeout(() => {
                        $("#section-result-id").hide();
                        $("#loader-id").hide();
                        $("#footer-id").removeClass("footer-cont");
                        window.location.href = "result.html";
                    }, 1000);
                })
                .catch((e) => console.log(e));
        } else {
            let phone = $(".option-phone").hasClass("active");
            $(".input-section").addClass("error");
            if (phone == true) {
                $("#errorMessageID").html("Please enter a valid phone number");

            } else {
                $("#errorMessageID").html("Please enter a valid email address");
            }
        }
    });
})();
