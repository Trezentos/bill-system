const mongoose = require('mongoose');

const debtSchema = new mongoose.Schema({
    user: {
        type:mongoose.Types.ObjectId ,
        ref:'user'
    },
    customer: {
        type: String,
        required: true,
        min: 6,
    },
    email: {
        type: String,
        required: true,
        min: 12,
    },
    cpf: {
        type: String,
        required: true,
        min: 6,
    },
    cep: {
        type: String,
        required: true,
        min: 8,
    },
    numberHouse: {
        type: String,
        required: true,
        min: 6,
    },
    complement: {
        type: String,
        required: true,
        min: 6,
    },
    debtAmount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    justiceNumber: {
        type: String,
    },
    description: {
        type: String,
        required: true,
        min: 6,
    },
})

module.exports = mongoose.model('Debt', debtSchema);