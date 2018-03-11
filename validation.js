var Validation = (function(window, document) {

    console.log(window);
    var isData = false;
    var isVerified = false;
    var registrationFrom = document.getElementById("registrationForm");
    var validate = function validate(e) {
        var el = e.target;
        var exp = regex[el.getAttribute("data-exp")];
        var val = el.value;
        var limit = +el.getAttribute("data-length");
        //debugger;
        var length = val.length;
        console.log();
        if (length > limit && limit > 0) {
            val = val.slice(0, -1);
            el.value = val;
        }
        console.log(el.parentElement.getElementsByTagName('span'));

        if (el.getAttribute("data-required") == "required") {
            isData = checkEmpty(el);
        }
        if (el.getAttribute("data-exp") != " " && isData) {
            var match = exp.test(val);
            if (match) {
                isVerified = removeError(el);
            } else {
                var errortwo = el.getAttribute("data-errortwo");
                isVerified = displayError(el, errortwo);
            }
        }
    }

    var displayError = function displayError(el, error) {
        var parentElement = el.parentElement;
        var errorContainer = parentElement.getElementsByTagName('span');
        console.log(el.value);
        if (el.value) {
            errorContainer[0].innerHTML = error;
            el.className = "red";
        } else {
            //console.log(el.value);
            errorContainer[0].innerHTML = el.getAttribute("data-error");
            el.className = "red";
        }
        return false;
    }
    var removeError = function removeError(el) {
        var parentElement = el.parentElement;
        var errorContainer = parentElement.getElementsByTagName('span');
        console.log(el.value);
        if (el.value) {
            errorContainer[0].innerHTML = "";
            el.className = "green";
            return true;
        } else {
            //

        }
    }
    var checkEmpty = function checkEmpty(el) {
        if (el.value) {
            removeError(el);
            return true;
        } else {
            displayError(el);
            return false;
        }
    }


    var regex = {
        alpha: /^[a-zA-Z]*$/,
        phone: /^[0-9]*$/

    }

    var attactEvents = function attactEvents() {
        var inputs = document.querySelectorAll("input, select");
        
        var errorSpans = registrationFrom.querySelectorAll("span")

        console.log(inputs);

        inputs.forEach(function(element, index) {
            addEventListener("keyup", validate);
            addEventListener("change", validate);
        });

        var resetButton = document.getElementsByClassName('reset');
        var submitButton = document.getElementsByClassName('submit');

        submitButton[0].addEventListener("click", function(e) {
            e.preventDefault();
            submitForm(inputs);


        });

        resetButton[0].addEventListener("click", function() {
            refreshForm(errorSpans, inputs);
        });

    }
    var submitForm = function submitForm(inputs) {
        inputs.forEach(function(element, index) {
            if (element.getAttribute("data-required")) {
                checkEmpty(element);
            }

        });

        if (isVerified && isData) {
        	// var name = document.getElementById("fname").value;
        	// var number  = document.getElementById("phone").value;
        	// console.log(name);
        	// console.log(number);
        	// addCard(name, number);
            registrationFrom.submit();
        }
    }
    // var addCard = function addCard(name, number){
    // var card = document.createElement("DIV");
    // card.className = "card-wrapper";
    // var p1 = document.createElement("P");
    // p1.innerHTML = name;
    // card.appendChild(p1);
    // var p2 = document.createElement("P");
    // p2.innerHTML = number;
    // card.appendChild(p2);
    // var target = document.getElementById("root");
    // target.appendChild(card);
    // }
    var refreshForm = function refreshForm(errorSpans, inputs) {
        errorSpans.forEach(function(element, index) {
            element.innerHTML = "";
        });
        inputs.forEach(function(element, index) {
            element.className = "";
        });
    }



    return {
        attactEvents: attactEvents
    }


})(this, this.document);

document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        Validation.attactEvents();
    }
};