import { ref } from 'vue';

const Web3 = require('web3');
const contractAddress = '0xc0f15E529715366a6077f67444fB2819a0cA7Cc3'
const contractABI = require('../web3/abi.json')


const web3 = ref('')
const contract = ref('')

web3.value = new Web3(new Web3.providers.HttpProvider('https://polygon-mumbai.g.alchemy.com/v2/7T1sn1PkKEmVOC880l38GE1KLFf0V0Y6'));
contract.value = new web3.value.eth.Contract(contractABI, contractAddress);

const setup = () => {
    return {
        web3, contract, contractAddress
    }
} 

export default setup
