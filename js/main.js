const firstForm = $(".first-form-part");
const secondForm = $(".second-form-part");
const thirdForm = $(".third-form-part");
const firstFormValues = $(".first-form-part .form-row .form-holder .form-control");
const secondFormValues = $(".second-form-part .form-row .form-holder .form-control");
const thirdFormValues = $(".third-form-part .form-row .form-holder .form-control");
const backBtn = $("#back-btn");
const selectGender = $("#gender");
const finishBtn = $("#finish");
const nextBtn = $("#next-btn");
var currentPage = 2;


console.log(selectGender)

$(function () {
  // Select
  $("html").click(function () {
    $(".select .dropdown").hide();
  });
  $(".select").click(function (event) {
    event.stopPropagation();
  });
  $(".select .select-control").click(function () {
    $(this).parent().next().toggle().toggleClass("active");
  });
  $(".select .dropdown li").click(function () {
    $(this).parent().toggle();
    var text = $(this).attr("rel");
    $(this).parent().prev().find("div").text(text);
  });
  // Payment
  $(".payment-block .payment-item").click(function () {
    $(".payment-block .payment-item").removeClass("active");
    $(this).addClass("active");
  });
  // Date Picker
  var dp1 = $("#dp1").datepicker().data("datepicker");
});



nextBtn.click(function() {
  checkFormValid() === true ? alert("ok") : alert("not ok")
})

//finishBtn.click(checkFormValid())


function hasLength(value) {
    return value.length === 0 ? false : true;
}

function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }
  
function isPhone(phone) {
    var regex = /^(\+0?1\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
    return regex.test(phone);
}

function removeInvalidClass(value) {
    $(value).removeClass("isInvalid"); 
}

function addInvalidClass(value) {
    $(value).addClass("isInvalid");
}

function goToPage(page) {
  if (page < 1 || page > 3) {
    return true;
  }

  currentPage = page;

  if (currentPage == 1) {
    firstForm.removeClass("hidden");
    secondForm.addClass("hidden");
    thirdForm.addClass("hidden");
    backBtn.addClass("hidden");
  } else if (currentPage == 2) {
    firstForm.addClass("hidden");
    secondForm.removeClass("hidden");
    thirdForm.addClass("hidden");
    backBtn.removeClass("hidden");
  } else if (currentPage == 3) {
    firstForm.addClass("hidden");
    secondForm.addClass("hidden");
    thirdForm.removeClass("hidden");
    nextBtn.addClass("hidden");
    finishBtn.show();
  }
}

function checkFormValid() {
  let formIsValid = true;
  let values;

  if (currentPage == 1) {
    values = firstFormValues;
  } else if (currentPage == 2) {
    values = secondFormValues;
  } else if (currentPage == 3) {
    values = thirdFormValues;
  }

  for (let i = 0; i < values.length; i++) {
    let currentElement = values[i];
    let currentType = currentElement.type;
    let currentValue = currentElement.value;

    // validates if has length
    if (!hasLength(currentValue)) {
      addInvalidClass(currentElement);
    } else {
      removeInvalidClass(currentElement);
      if (currentType == "email") {
        if (!isEmail(currentValue)) {
          addInvalidClass(currentElement);
          alert("Please add a valid e-mail");
        } else {
          removeInvalidClass(currentElement);
        }
      } else if (currentType == "tel") {
        if (!isPhone(currentValue)) {
          addInvalidClass(currentElement);
          alert("Please add a valid phone ###-###-####");
        } else {
          removeInvalidClass(currentElement);
        }
      }
    }
  }

  // validates if form is valid
  for (let i = 0; i < values.length; i++) {
    if ($(values[i]).hasClass("isInvalid")) {
      formIsValid = false;
      break;
    }
  }

  if (formIsValid) {
    goToPage(currentPage + 1);
    return true;
  } else {
    return false;
  }
}    
// tentar apanhar valores das drops.