// JavaScript Document
var headerSource = (
    <div id="headerWrapper">
        <div id="header" class="unscrolled">
            <div id="navbar" class="unscrolled">
                <ul id="leftbar">
                    <li><a id="home" href="index.html">Home</a></li>
                    <li><a id="1"href="Page1.html">Page 1</a></li>
                    <li><a id="2"href="Page2.html">Page 2</a></li>
                    <li><a id="3"href="Page3.html">Page 3</a></li>
                    <li><a id="4"href="Page4.html">Page 4</a></li>
                </ul>
                <div id="rightbar"></div>
            </div>
        </div>
        <div id="popupBlackout" onClick={closePopups}></div>
        <div id="signinPopup" class="accountPopup">
            <h1>Sign In</h1>
            <form name="signInForm" onSubmit={e => { e.preventDefault(); }}>
                Email:<br/>
                <input type="email" id="signInEmail" name="email"/><br/>
                Password:<br/>
                <input type="password" id="signInPassword" name="password"/><br/><br/>
                <input type="submit" value="Submit" onClick={signInRequest}/>
            </form>
        </div>
        <div id="registerPopup" class="accountPopup">
            <h1>Register</h1>
            <form name="registerForm" onSubmit={e => { e.preventDefault(); }}>
                First Name:<br/>
                <input type="text" id="registerFirst" name="first name"/><br/>
                Last Name:<br/>
                <input type="text" id="registerLast" name="last name"/><br/>
                Email:<br/>
                <input type="email" id="registerEmail" name="email"/><br/>
                Password:<br/>
                <input type="password" id="registerPassword" name="password"/><br/>
                Password Again:<br/>
                <input type="password" id="registerPasswordRetry" name="passwordRetry"/><br/><br/>
                <input type="submit" value="Submit" onClick={registerRequest}/>
            </form>
        </div>
    </div>
);

ReactDOM.render(headerSource, document.getElementById('headerContainer'));

var rightBar = (
    <ul>
        <li><a onClick={openSignin}>Sign In</a></li>
        <li><a onClick={openRegister}>Register</a></li>
    </ul>
);

ReactDOM.render(rightBar, document.getElementById('rightbar'));

setActiveLink();
checkScroll();
window.onscroll = function() {checkScroll()};
var lastScrollTop = 0;
// element should be replaced with the actual target element on which you have applied scroll, use window in case of no target element.
window.addEventListener("scroll", function(){ // or window.addEventListener("scroll"....
    var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
    if (st > lastScrollTop){
        // downscroll code
    } else {
        // upscroll code
    }
    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
}, false);


function setActiveLink () {
    var links = document.getElementById("leftbar").getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        var link = links[i].getAttribute("href");
        if (!window.location.href.includes(".html") && link == "index.html") {
            links[i].className = "active";
        }
        if(window.location.href.includes(link)) {
            links[i].className = "active";
        }
    }
}

function checkScroll() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        document.getElementById("header").className = "scrolled";
        document.getElementById("navbar").className = "scrolled";
    } else {
        document.getElementById("header").className = "unscrolled";
        document.getElementById("navbar").className = "unscrolled";
    }
}

function scrollDown() {
  window.scrollTo(0, window.innerHeight-50);
}


function openSignin() {
    document.getElementById("popupBlackout").style.visibility = "visible";
    document.getElementById("popupBlackout").style.opacity = "1";
    document.getElementById("signinPopup").style.visibility = "visible";
    document.getElementById("signinPopup").style.opacity = "1";
    document.getElementById("registerPopup").style.visibility = "hidden";
    document.getElementById("registerPopup").style.opacity = "0";
}

function openRegister() {
    document.getElementById("popupBlackout").style.visibility = "visible";
    document.getElementById("popupBlackout").style.opacity = "1";
    document.getElementById("registerPopup").style.visibility = "visible";
    document.getElementById("registerPopup").style.opacity = "1";
    document.getElementById("signinPopup").style.visibility = "hidden";
    document.getElementById("signinPopup").style.opacity = "0";
}

function closePopups() {
    document.getElementById("popupBlackout").style.visibility = "hidden";
    document.getElementById("popupBlackout").style.opacity = "0";
    document.getElementById("signinPopup").style.visibility = "hidden";
    document.getElementById("signinPopup").style.opacity = "0";
    document.getElementById("registerPopup").style.visibility = "hidden";
    document.getElementById("registerPopup").style.opacity = "0";
}

function signInRequest() {
    console.log(document.getElementById("signInEmail").value);
    console.log(document.getElementById("signInPassword").value);
    var request = {
        "email": document.getElementById("signInEmail").value,
        "password": document.getElementById("signInPassword").value
    };
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "signin", true);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           // Typical action to be performed when the document is ready:
           var response = JSON.parse(xhttp.responseText);
           if (response.auth) {
                document.getElementById("signinPopup").innerHTML = "<h1>Welcome back " + response.firstName + " " + response.lastName + "</h1>";
           } else {
            document.getElementById("signinPopup").innerHTML = "<h1>Sorry access denied</h1>"
           }
        }
    };
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(request));
}

function registerRequest() {
    console.log(document.getElementById("registerEmail").value);
    console.log(document.getElementById("registerPassword").value);
    var request = {
        "email": document.getElementById("registerEmail").value,
        "password": document.getElementById("registerPassword").value,
        "firstName": document.getElementById("registerFirst").value,
        "lastName": document.getElementById("registerLast").value
    };
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "register", true);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           // Typical action to be performed when the document is ready:
           var response = JSON.parse(xhttp.responseText);
           if (response.success) {
            document.getElementById("registerPopup").innerHTML = "<h1>Success!</h1>";
           }
        }
    };
    console.log(request);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(request));
}