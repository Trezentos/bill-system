const customerInp = document.querySelector('#customer');
const formDatas = document.querySelector('#debt-form');
const saveBtn = document.querySelector('#saveBtn');
const backBtn = document.querySelector('#backBtn')
const debtsForm = document.getElementById('debt-form');


window.addEventListener('load', async (e) => {
    try {
        const response = 
        await fetch(`http://localhost:3000/api/debt/listone/${localStorage.getItem('debtId')}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token" : localStorage.getItem('token'),
            }
        });

        const debtInfos = await response.json();
        
        let i = 0;
        for(let prop in debtInfos){
            if( prop == '_id' || prop == '__v' || prop == 'user' ) continue;
            formDatas[i].value = debtInfos[prop]
            i++;
        }

    } catch (error) {
        console.log(error.message);
    }
});

saveBtn.addEventListener('click', async (e)=>{
    e.preventDefault();  
    try {

        const debtUser = {
            customer: debtsForm[0].value,
            email: debtsForm[1].value,
            cpf: debtsForm[2].value,
            cep: debtsForm[3].value,
            numberHouse: debtsForm[4].value,
            complement: debtsForm[5].value,
            debtAmount: debtsForm[6].value,
            status: debtsForm[7].value,
            justiceNumber: debtsForm[8].value,
            description: debtsForm[9].value,
        } 

        for(let prop in debtUser){
            if(debtUser[prop] == "") return alert('Todos os campos são obrigatórios...')
        }

        const response = await fetch(
            `http://localhost:3000/api/debt/edit/${localStorage.getItem('debtId')}`,
            {
            method: 'PUT',
            body: JSON.stringify(debtUser),
            headers: {
                'Content-Type': 'application/json',
                "auth-token" : localStorage.getItem('token'),
            }
        });
        localStorage.setItem('debtId', '');  
        window.location.href='../debtList/index.html';

        
    } catch (error) {
        console.log(error.message)
    }

});

backBtn.addEventListener('click', async() => {
    localStorage.setItem('debtId', '');  
    window.location.href='../debtList/index.html';
})
