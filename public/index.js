
window.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.querySelector('#login-form');


    // LOGIN FORM SUBMIT
    loginForm.onsubmit = function (e) {
        e.preventDefault();
        document.querySelector('#alertBox').style.display = 'none';
        const username = loginForm.querySelector('#InputUsername').value
        const password = loginForm.querySelector('#InputPassword').value

        login(username, password);
    };


    // LOGIN FUNCTION
    function login(username, password) {


        return fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password
            })
        })
            .then(function (response) {
               
                if (response.status === 400) {
                    const error = new Error('The username or password is incorrect')
                    error.code = response.status;
                    throw error;
                } else if (response.status == 406) {
                    console.log(response)
                    const error = new Error("User does not exist , Please register")
                    error.code = response.status;
                    throw error;
                   
                } else if (response.status !== 200) {
                    const error = new Error('Unknown error')
                    error.code = response.status;
                    throw error;
                }
                console.log(response.status);
                return response.json()
                
                .then(function (data) {
                   
                        // if (data == null) {
                        //     const error = new Error('Unknown error')
                        //     error.code = 404;
                        //     throw error
                        // }
                      
                        const userInfo = data.name
                        document.querySelector('#alertBox').style.display = 'none';
                        window.localStorage.setItem('LoggedInUser', JSON.stringify(userInfo))
                        window.location.href = "/main/main.html";
                       
                        return data;
                    })
            })
            
            .catch(function (error) {
                
                if (error.code === 400) {
                    errBox(error.message)
                } else {
                    console.log(error)
                    // $('#alertBox');
                    console.log(error.code)
                    if(error.code === 406) {
                        document.querySelector('#alertBox').style.display = 'block';
                        document.querySelector('#notification').innerHTML=error;
                    }
              
                    // window.location.href = `/error/?errCode=${error.error}`;
                }
            })
    }


})
