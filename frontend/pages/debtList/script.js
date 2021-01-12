const cards = document.querySelector('.cards');

window.addEventListener('load', async () => {
    try {
        const response = await fetch('http://localhost:3000/api/debt/list', {
            method: 'GET',
            headers: {
                "auth-token": localStorage.getItem('token'),
                "Content-Type": "application/json"
            }
        });
        const debts = await response.json();

        debts.forEach((debt) => {
            cards.innerHTML += 
            `<div class="card">
                <div class="header"/>
                    <p>Cliente: ${debt.customer}</p>
                    <div class="button-container">
                    <button onClick="removeDebt('${debt._id}')">x</button>
                    <button class="editBtn" onClick="editDebt('${debt._id}')">Editar</button>
                    </div>
                </div>
                <div class="content">
                    <p>Preço: R$${debt.debtAmount}, email: ${debt.email}</p>
                    <p>Situação: ${debt.status}</p>
                    <p>Descrição: ${debt.description}</p>
                </div>
             </div>` 
        });
    } catch (error) {
        console.log(error.message)
    }
});

async function removeDebt(id){
    try {
        await fetch(`http://localhost:3000/api/debt/${id}`,{
            method: 'DELETE',
            headers: {
                "auth-token": localStorage.getItem('token'),
                "Content-Type": "application/json"
            }
        });
        window.location.reload(true);      
    } catch (error) {
        console.log(error.message)
    }
}

async function editDebt(id){
    localStorage.setItem('debtId', id);

    window.location.href = '../debtEdit/index.html'
}
