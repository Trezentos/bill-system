const createAccountBtn = document.getElementById('createAccountBtn');
const popUpText = document.querySelector('.pop-up, p');
const formDatas = document.getElementById('registerAccountForm');
const errorMsg = document.querySelector('.error-message');
const popUp = document.querySelector('.pop-up');

createAccountBtn.addEventListener('click', async (e)=>{
    e.preventDefault();

    try {
        
        const user = {
            name: formDatas[0].value,
            email: formDatas[1].value,
            password: formDatas[2].value,
            confirmedPassword: formDatas[3].value,
        }

        if (user.confirmedPassword != user.password ){
            return showPopUp('Senha de confirmação não está igual!', "red");
        }

        const response = await fetch('http://localhost:3000/api/user/register', {
            method: "POST",
            headers: { "Content-Type" : "application/json" },  
            body: JSON.stringify({
                    name: user.name,
                    email: user.email,
                    password: user.password,
            }),
        });

        const data = await response.json();
        
        if( data.error ){
            showPopUp(data.error, "red" );
        }
        else if( data.errors ){
            showPopUp(data.errors[0].msg, "red" );
        }    
        else if(data){
            console.log(data)
                
            showPopUp("Conta Registrada!", "#0c8f56");
                
                setTimeout( ()=>{
                    formDatas[0].value = formDatas[1].value = formDatas[2].value = formDatas[3].value = "";
                    window.location.href = '../index/index.html';
                } , 2500);
        }
            
        

    } catch (error) {
        console.log(error.message)
    }

});

function showPopUp(text, color){

    popUp.classList.add('active');
    popUpText.textContent = text;
    popUpText.style.color = color;

}

popUp.addEventListener('animationend', (e)=>{

    popUp.classList.remove('active');

})

