const router = require('express').Router();
const Debt = require('../model/Debt');
const verifyToken = require('./verifyToken');

router.get('/list', verifyToken, async (req, res) => {

    const debts = await Debt.find({ user: req.user._id });

    if(!debts){
        return res.json({ message:"There're no debts registered" });
    }
    return res.json(debts);
});

router.get('/listone/:id', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;

        const debtInfos = await Debt.findOne({
            _id: id
        })

        if (debtInfos){
            return res.status(200).json(debtInfos);
        } else {
            return res.status(400).json({message: 'There is no debt with this id'});
        }
    } catch (error) {
        console.log(error.message)
    }
});

router.post('/create', verifyToken, async (req, res)=>{
    
    const debtFields = {}

    const {
        customer,
        email,
        cpf,
        cep,
        numberHouse,
        complement,
        debtAmount,
        status,
        justiceNumber,
        description
    } = req.body;

    if(customer) debtFields.customer = customer;
    if(email) debtFields.email = email;
    if(cpf) debtFields.cpf = cpf;

    if(cep) debtFields.cep = cep;
    if(numberHouse) debtFields.numberHouse = numberHouse;
    if(complement) debtFields.complement = complement;

    if(debtAmount) debtFields.debtAmount = debtAmount;
    if(status) debtFields.status = status;
    if(justiceNumber) debtFields.justiceNumber = justiceNumber;
    if(description) debtFields.description = description;

    debtFields.user = req.user._id;

    try{
        let debt = await Debt.findOne({ user: req.user._id });
        //Create
        debt = new Debt(debtFields);
        await debt.save();
        return res.json(debt);

    }catch(error){
        console.log(error.message);
        res.status(500).send({msg:"Server error"})
    }
});

router.delete('/:id', verifyToken, async (req, res)=>{

    const { id } = req.params;

    console.log(id);

    const deletedDebt = await Debt.findOneAndDelete({
        _id: id,
    });

    if(deletedDebt){
        return res.status(200).json({ message: "Deleted!" })
    }else{
        return res.status(400).json({ message: "There is no debt with this id!" })
    }
});

router.put('/edit/:id', verifyToken, async (req, res)=>{
    
    const debtFields = {}, { id } = req.params;
    const {
        customer,
        email,
        cpf,
        cep,
        numberHouse,
        complement,
        debtAmount,
        status,
        justiceNumber,
        description
    } = req.body;

    if( !(customer && email && cpf && cep && numberHouse && complement 
    && debtAmount && status && justiceNumber && description) ){
        return res.status(400).json({ message: ""})
    }

    debtFields.customer = customer;
    debtFields.email = email;
    debtFields.cpf = cpf;
    debtFields.cep = cep;
    debtFields.numberHouse = numberHouse;
    debtFields.complement = complement;
    debtFields.debtAmount = debtAmount;
    debtFields.status = status;
    debtFields.justiceNumber = justiceNumber;
    debtFields.description = description;
    debtFields.id = id;

    
    try {
        
        let debt = await Debt.findOne({ _id: debtFields.id });

        if(debt){
            debt = await Debt.findOneAndUpdate(
                {_id: debtFields.id},
                {$set: debtFields},
                {new: true},
            );
            return res.send({message:'changed'});
        }
        debt = new Debt(debtFields);
        await debt.save();
        return res.json(debt);

    } catch (error) {
        console.log(error.message);
    }
});

module.exports = router;

