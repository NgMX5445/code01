
window.addEventListener('DOMContentLoaded', function () {

    let localStorageUser; 

    try {
        localStorageUser = JSON.parse(localStorage.getItem("LoggedInUser"))
        document.title = `${localStorageUser} | Investment`

    } catch (error) {
        window.location.href = "/";
        return;
    }

 document.getElementById("userName").innerHTML=localStorageUser
    
})


