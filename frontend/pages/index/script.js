const loginButton = document.querySelector('button');
const loginForm = document.getElementById('loginForm')

loginButton.addEventListener('click', async (e)=>{
    try {
        const [ name, password ] = [ loginForm[0].value, loginForm[1].value ]
        e.preventDefault();

        let response = await fetch('http://localhost:3000/api/user/login', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name,
                password,
            })
        });

        const data = await response.json(); 

    } catch (error) {
        console.log(error.message)
    }


})