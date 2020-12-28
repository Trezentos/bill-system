const loginBtn = document.getElementById('loginBtn');
const loginForm = document.getElementById('loginForm');
const createAccountBtn = document.getElementById('createBtn')
const errorMessage = document.querySelector('.error-msg')

loginBtn.addEventListener('click', async (e)=>{
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

        if(data.token){
            localStorage.setItem("token",data.token);
            window.location.href = '../menu/index.html';
        }else{
            errorMessage.classList.add('show');
        }

    } catch (error) {
        console.log(error.message)
    }
});

createAccountBtn.addEventListener('click', async (e)=>{
    e.preventDefault();
    window.location.href = '../register/index.html'
})