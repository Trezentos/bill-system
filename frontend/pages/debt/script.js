const registerBtn = document.getElementById('registerBtn');
const debtsForm = document.getElementById('debt-form');

registerBtn.addEventListener('click', async (e) => {
    try {
        e.preventDefault();

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
        
        await fetch('http://localhost:3000/api/debt/create', {
            method: 'POST',
            body: JSON.stringify(debtUser),
            headers: { 
                "auth-token" : localStorage.getItem('token'),
                "Content-Type": "application/json" ,
            },
        });
        alert('Dívida registrada!');

        for(let i in debtsForm){
            debtsForm[i].value = "";
        };
        debtsForm[9].value = "";
    } catch (error) {
        console.log(error.message)
    }
});