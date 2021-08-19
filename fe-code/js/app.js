(function () {
  $(".option-phone").on("click", function(){
    $(".email-input").addClass("hide");
    $(".phone-input").removeClass("hide");
    $(".option-email").removeClass("active");
    $(".option-phone").addClass("active");
  });
  $(".option-email").on("click", function(){
    $(".email-input").removeClass("hide");
    $(".phone-input").addClass("hide");
    $(".option-email").addClass("active");
    $(".option-phone").removeClass("active");
  });
  $("#btn-search").on("click", function (e) {
    e.preventDefault();
    localStorage.clear(); //Clears storage for next request
    var apiValue, url;
    email = $('input[name="email"]').val().toLowerCase();
    phone = $('input[type="tel"]').val(); //Fetching phone number from input
    regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if(email){
      apiValue = email.match(regEx);
      url = 'https://ltv-data-api.herokuapp.com/api/v1/records.json?email=' + email;
    }else if(phone.length == 10){
      apiValue = phone;
      url = 'https://ltv-data-api.herokuapp.com/api/v1/records.json?phone=' + phone;
    }

    if (apiValue) {
      document.querySelector('input[type="text"]').parentNode.classList.remove("error");
      const proxyurl = "";
      fetch(proxyurl + url)
      .then((response) => response.text())
      .then(function (contents) {
        localStorage.setItem("userObject", contents);
        window.location.href = "result.html";
      })
      .catch((e) => console.log(e));
    } else {
      document.querySelector('input[type="text"]').parentNode.classList.add("error");
    }
  });
})();
