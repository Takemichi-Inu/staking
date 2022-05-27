import { ethers } from "hardhat";
import { Signer } from "ethers";

const UNISWAP_ABI = [
    "function swapExactETHForTokensSupportingFeeOnTransferTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts)"
  ];  

const uniswap = new ethers.Contract(
    "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
    UNISWAP_ABI,
    ethers.provider
);

export const makeSwap = async (signer: Signer, path: string[], value: string) => {
    await uniswap.connect(signer)
        .swapExactETHForTokensSupportingFeeOnTransferTokens(
            0, path, await signer.getAddress(), 9999999999
        , { value: ethers.utils.parseEther(value)});    
}

export const getBalance = async (token: string, account: string) => {
    const contract = new ethers.Contract(token, TOKEN_ABI, ethers.provider);
    return await contract.balanceOf(account);
}

export const approve = async (token: string, from: Signer, to: string, amount: string) => {
    const contract = new ethers.Contract(token, TOKEN_ABI, ethers.provider);
    return await contract.connect(from).approve(to, amount);
}

export const transfer = async (token: string, from: Signer, to: string, amount: string) => {
    const contract = new ethers.Contract(token, TOKEN_ABI, ethers.provider);
    return await contract.connect(from).transfer(to, amount);
}

export const TOKEN_ABI = [
    {
        constant: true,
        inputs: [
            {
                name: "_owner",
                type: "address",
            },
        ],
        name: "balanceOf",
        outputs: [
            {
                name: "balance",
                type: "uint256",
            },
        ],
        payable: false,
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "spender",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
        ],
        name: "approve",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "value",
                type: "uint256"
            }
        ],
        name: "transfer",
        stateMutability: "nonPayable",
        type: "function"
    }
];