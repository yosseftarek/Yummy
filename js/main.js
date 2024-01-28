//declaration
let data = document.getElementById("data")
let search = document.getElementById("search")

//first actions
$(".sidebar-text ul li").animate({
    top: 300
}, 1000)
var width = $(".sidebar-text").outerWidth();
$(".sidebar").css('left', -width);


//loading screen
$(document).ready(function () {
    $(".loading").fadeOut(1000);
    $("body").css("overflow", "auto")
})


//sidebar
function openNavbar() {
    $(".sidebar").animate({
        left: 0
    }, 500);

    $(".open-close-icon").addClass("fa-x");
    $(".open-close-icon").removeClass("fa-align-justify");

    for (let i = 0; i < 5; i++) {
        $(".sidebar-text ul li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
}
function closeNavbar() {
    $(".sidebar").animate({
        left: -width,
    }, 500);

    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");

    $(".sidebar-text ul li").animate({
        top: 300
    }, 1000)
}

$(".sidebar-icon .open-close-icon").click(function () {

    if ($(".sidebar").css("left") == "0px") {
        closeNavbar()
    }

    else {
        openNavbar()

    }
})

//Home
async function getHomeData() {
    let mealsResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
    mealsResponse = await mealsResponse.json();
    dispMeals(mealsResponse.meals)
}

function dispMeals(arr) {
    let cartona = "";
    for (let i = 0; i < arr.length; i++) {
        cartona += `
        <div class="col-md-3">
                <div class="meal position-relative overflow-hidden rounded-2">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="">
                    <div class="position-absolute d-flex align-items-center p-2 meal-overlay text-black">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }
    data.innerHTML = cartona
}

getHomeData()

//Category
async function getCategory() {
    search.innerHTML = ``
    closeNavbar()
    let categResponse = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    categResponse = await categResponse.json()
    dispCategory(categResponse.categories)
}
function dispCategory(arr) {
    let cartona = ``;
    for (let i = 0; i < arr.length; i++) {
        cartona += `
        <div class="col-md-3">
                <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strCategoryThumb}" alt="" srcset="">
                    <div class="meal-overlay position-absolute text-center text-black p-2">
                        <h3>${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                    </div>
                </div>
        </div>
        `
    }
    data.innerHTML = cartona
}
async function getCategoryMeals(category) {
    data.innerHTML = ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()
    dispMeals(response.meals.slice(0, 20))

}

//Area
async function getArea() {   
    search.innerHTML = ``
    closeNavbar()
    let areaResponse = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
    areaResponse = await areaResponse.json()
    dispArea(areaResponse.meals)
}
function dispArea(arr) {
    let cartona = ``;
    for (let i = 0; i < arr.length; i++) {
        cartona += `
        <div class="col-md-3">
            <div onclick="getAreaMeals('${arr[i].strArea}')" class="rounded-2 text-center position-relative area text-white">
                <i class="fa-solid fa-house-laptop fa-4x"></i>
                <h3>${arr[i].strArea}</h3>
            </div>
        </div>
        `
    }
    data.innerHTML = cartona;
}
async function getAreaMeals(area) {
    data.innerHTML = ``
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json();
    dispMeals(response.meals.slice(0, 20))
}

//Ingrediants
async function getIngrediants() {   
    search.innerHTML = ``
    let ingredResponse = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list");
    ingredResponse = await ingredResponse.json();
    dispIngredient(ingredResponse.meals)
}
function dispIngredient(arr) {
    closeNavbar()
    let cartona = ``
    for (let i = 0; i < 20; i++) {
        cartona += `
        <div onclick="getIngrediantsMeals('${arr[i].strIngredient}')" class="col-md-3 text-center text-white">
            <div>
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3>${arr[i].strIngredient}</h3>
                <p>${arr[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
            </div>
        </div>
        `
    }
    data.innerHTML = cartona
}
async function getIngrediantsMeals(meal) {
    data.innerHTML = ``
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${meal}`)
    response = await response.json()
    dispMeals(response.meals.slice(0, 20))
}

//search
function showSearch() {
    closeNavbar()
    data.innerHTML = ""
    search.innerHTML = `
    <div class="row py-4">
        <div class="col-md-6">
            <input onkeyup="searchName(this.value)"class="form-control text-white bg-transparent" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchLetter(this.value)"class="form-control text-white bg-transparent" placeholder="Search By First Letter"maxlength="1">
        </div>
    </div>`
}
async function searchName(name) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    response = await response.json()
    if (response.meals) {
        dispMeals(response.meals)
    }
}

async function searchLetter(letter) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
    response = await response.json()
    if (response.meals) {
        dispMeals(response.meals)
    }
}

//contact us
let subBtn;
let namefocused, emailfocused, phonefocused, agefocused, passwordfocused, repasswordfocused = false;
function showContactUs() {
    closeNavbar();
    search.innerHTML = ``
    data.innerHTML = `
    <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
        <div class="container w-75 text-center">
            <div class="row g-4">
                <div class="col-md-6">
                    <input class="form-control" id="name" type="text" placeholder="Enter Your Name" onkeyup="validate()">
                    <div id="nameWarning" class="alert alert-danger w-100 mt-2 d-none">
                        Special characters and numbers not allowed
                    </div>              
                </div>
                <div class="col-md-6">
                    <input class="form-control" id="email" type="email" placeholder="Enter Your Email" onkeyup="validate()">  
                    <div id="emailWarning" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                    </div>              
                </div>
                <div class="col-md-6">
                    <input class="form-control" id="phone" type="text" placeholder="Enter Your Phone" onkeyup="validate()">  
                    <div id="phoneWarning" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                    </div>              
                </div>
                <div class="col-md-6">
                    <input class="form-control" id="age" type="number" placeholder="Enter Your Age" onkeyup="validate()" "maxlength="2"> 
                    <div id="ageWarning" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                    </div>              
                </div>
                <div class="col-md-6">
                    <input class="form-control" id="password" type="password" placeholder="Enter Your Password" onkeyup="validate()">
                    <div id="passWarning" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                    </div>                
                </div>
                <div class="col-md-6">
                    <input class="form-control" id="repassword" type="password" placeholder="Repassword" onkeyup="validate()"> 
                    <div id="repassWarning" class="alert alert-danger w-100 mt-2 d-none">
                        Repassword doesn't match password
                    </div>            
                </div>
            </div>
            <button id="subBtn" disabled class="btn btn-outline-danger mt-3 px-2">Submit</button>
        </div>
    </div> `


    subBtn = document.getElementById("subBtn")
    document.getElementById("name").addEventListener("focus", function () {
        namefocused = true;
    })
    document.getElementById("email").addEventListener("focus", function () {
        emailfocused = true;
    })
    document.getElementById("phone").addEventListener("focus", function () {
        phonefocused = true;
    })
    document.getElementById("age").addEventListener("focus", function () {
        agefocused = true;
    })
    document.getElementById("password").addEventListener("focus", function () {
        passwordfocused = true;
    })
    document.getElementById("repassword").addEventListener("focus", function () {
        repasswordfocused = true;
    })
}
function validateAge() {
    return (/^[1-9]|[1-9][0-9]$/).test(document.getElementById("age").value)
}
function validateName() {
    return (/^[a-zA-Z]+$/).test(document.getElementById("name").value)
}
function validatePhone() {
    return (/^(01)[0125][0-9]{8}$/).test(document.getElementById("phone").value)
}
function validateEmail() {
    return (/^[A-Za-z]\w+@[a-zA-Z]{3,15}\.[a-z]{3,5}$/).test(document.getElementById("email").value)
}
function validatePass() {
    return (/^(?=.*[A-Za-z])(?=.*\d).{8,}$/).test(document.getElementById("password").value)
}
function validateRepass() {
    return document.getElementById("password").value == document.getElementById("repassword").value
}

function validate() {

    if (namefocused) {
        if (validateName()) {
            document.getElementById("nameWarning").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameWarning").classList.replace("d-none", "d-block")

        }

    }
    if (emailfocused) {
        if (validateEmail()) {
            document.getElementById("emailWarning").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailWarning").classList.replace("d-none", "d-block")
        }
    }
    if (phonefocused) {

        if (validatePhone()) {
            document.getElementById("phoneWarning").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneWarning").classList.replace("d-none", "d-block")

        }
    }
    if (agefocused) {

        if (validateAge()) {
            document.getElementById("ageWarning").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageWarning").classList.replace("d-none", "d-block")

        }
    }
    if (passwordfocused) {

        if (validatePass()) {
            document.getElementById("passWarning").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passWarning").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordfocused) {
        if (validateRepass()) {
            document.getElementById("repassWarning").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repassWarning").classList.replace("d-none", "d-block")

        }

    }

    if (validateName() && validateEmail() && validatePhone() && validateAge() && validatePass() && validateRepass()) {
        subBtn.removeAttribute("disabled")
    }
}

