const express = require('express');
const path = require('path');
const app = express();
const https = require('https');
// const { json } = require('body-parser');
const {ethers} = require('ethers');
// const bodyParser = require('body-parser');
require('dotenv').config();
const clientId = process.env.KYC_API_ID;
const clientSecret = process.env.KYC_API_SECRET;



let rpcURL = 'https://eth-sepolia.g.alchemy.com/v2/0JgA7Am5eZfWQ4lFL4e0e8QLTT-I0RVh';

let contractAddress = '0x8f559769fdda4a6b38C72DDBe59062d755c4D0b6';
let contractABI = [
  {
    "inputs": [
      
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "customerAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "status",
        "type": "bool"
      }
    ],
    "name": "customerAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "addressVerified",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "status",
        "type": "bool"
      }
    ],
    "name": "verificationDone",
    "type": "event"
  },
  {
    "inputs": [
      
    ],
    "name": "addComapny",
    "outputs": [
      
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      
    ],
    "name": "adduser",
    "outputs": [
      
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      
    ],
    "name": "amount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_addressToBlackList",
        "type": "address"
      }
    ],
    "name": "blackListComapny",
    "outputs": [
      
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_addressToBlackList",
        "type": "address"
      }
    ],
    "name": "blackListUser",
    "outputs": [
      
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "companyVerified",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      
    ],
    "name": "decimals",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "subtractedValue",
        "type": "uint256"
      }
    ],
    "name": "decreaseAllowance",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "addedValue",
        "type": "uint256"
      }
    ],
    "name": "increaseAllowance",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      
    ],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      
    ],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address payable",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      
    ],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      
    ],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      
    ],
    "name": "verifyAddress",
    "outputs": [
      
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_addressToBeVerified",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "companyAddress",
        "type": "address"
      }
    ],
    "name": "verifyUserAadhaar",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_addressToBeVerified",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "companyAddress",
        "type": "address"
      }
    ],
    "name": "verifyUserPan",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_addressToBeVerified",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "companyAddress",
        "type": "address"
      }
    ],
    "name": "verifyUserage",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]





const provider = new ethers.providers.JsonRpcProvider(rpcURL);
// const signer = provider.getSigner();

const privateKey = 'ea824dd1f39d35452119c9101be1a1e29265c7fbd39b93d6b74925d1b506a747';
const wallet = new ethers.Wallet(privateKey, provider);
const contract = new ethers.Contract(contractAddress , contractABI, wallet);






app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// app.use(bodyParser.urlencoded({urlencoded: false}));

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.json({ msg: "loaded the file" });
})


app.get('/main-page', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
})

app.get('/user-verification', (req, res) => {
  let query = req.query;
  // res.json(query);
 

  // res.json(query);

  console.log(query['pan'] , query['aadhaar']);

  const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  // const aadhaarPattern = /^\d{12}$/;
  const aadhaarPattern = /^\d{4}\s*\d{4}\s*\d{4}$/;
  
  console.log('adhaar pattern -> ' + query['aadhaar'].match(aadhaarPattern)); 

  if(query['aadhaar'].match(aadhaarPattern)){
    if (panPattern.test(query['pan'])) {

      let dataWeNeed;
      let accessToken;
      let status;
  
      const url = 'https://production.deepvue.tech/v1/authorize';
      const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
      const payload = `client_id=test_joel&client_secret=960308d2cf3387e37e93bf0cf7e4800630baaebdc983b6838dabb90bd29f6b5a`;
  
      const options = {
        method: 'POST',
        headers: headers,
      };
  
      const APIreq = https.request(url, options, (APIres) => {
        let data = '';
  
        APIres.on('data', (chunk) => {
          data += chunk;
        });
  
        APIres.on('end', () => {
          dataWeNeed = JSON.parse(data)
          accessToken = dataWeNeed['access_token'];
          console.log(dataWeNeed);
          console.log('access token is ' + accessToken)
  
          // const https = require('https');
  
          const options = {
            hostname: 'production.deepvue.tech',
            path: `/v1/verification/panbasic?pan_number=${query['pan']}`,
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'x-api-key': '960308d2cf3387e37e93bf0cf7e4800630baaebdc983b6838dabb90bd29f6b5a',
            }
          }
  
          const APIreq2 = https.request(options, APIres2 => {
            let data = '';
  
            APIres2.on('data', chunk => {
              data += chunk;
            });
  
            APIres2.on('end', () => {
              dataWeNeed = JSON.parse(data)
              console.log(dataWeNeed);
              status = dataWeNeed['data']['status'];
  
              console.log('status is - ' + status);
              if(status == 'VALID'){
                
                let acc = query['account']
                let obj = {verifiedAddress : acc}
                console.log(obj);
                res.render('wallet' , {obj});

              }
              else{
                res.json({msg: 'pan not verified'});
              }
  
            });
          });
  
          APIreq2.on('error', error => {
            console.error(error);
          });
  
          APIreq2.end();
  
        });
      });
  
      APIreq.on('error', (error) => {
        console.error(error);
      });
  
      APIreq.write(payload);
      APIreq.end();
  
    }
    else{
      res.json({msg : 'wrong pan number pattern'});
    }
  }
  else{
    res.json({msg: 'wrong aadhaar number pattern'});
  }

})





app.get('/api-docs',(req,res)=>{
  res.sendFile(path.join(__dirname , 'apiDocs.html'));
})

app.get('/user-verifiacation/pan-verification' , async (req,res)=>{

  let query = req.query;
  let addressToBeVerified = query['addressToBeVerified'];
  let companyAddress = query['companyAddress'];

  
  // console.log(result);

  const contractInteractionPANVerifiaction = async (addressToBeVerified , companyAddress) =>{

    const result = await contract.verifyUserPan(addressToBeVerified, companyAddress , {gasLimit: 300000});
    
    const filter = contract.filters.verificationDone(null , null); 
  
    const events = await contract.queryFilter(filter);
  
    let length = events.length;
    
    res.json({status: events[length - 1].args.status});
  
   
    
  }

  let result = await contractInteractionPANVerifiaction(addressToBeVerified , companyAddress);

  

})


app.get('/user-verifiacation/Aadhaar-verification' , async (req,res)=>{

  let query = req.query;
  let addressToBeVerified = query['addressToBeVerified'];
  let companyAddress = query['companyAddress'];

  
  // console.log(result);

  const contractInteractionAadhaarVerifiaction = async (addressToBeVerified , companyAddress) =>{

    const result = await contract.verifyUserAadhaar(addressToBeVerified, companyAddress , {gasLimit: 300000});
    
    const filter = contract.filters.verificationDone(null , null); 
  
    const events = await contract.queryFilter(filter);
  
    let length = events.length;
    
    res.json({status: events[length - 1].args.status});
  
   
    
  }

  let result = await contractInteractionAadhaarVerifiaction(addressToBeVerified , companyAddress);

  

})



app.get('/user-verifiacation/age-verification' , async (req,res)=>{

  let query = req.query;
  let addressToBeVerified = query['addressToBeVerified'];
  let companyAddress = query['companyAddress'];

  
  // console.log(result);

  const contractInteractionAgeVerifiaction = async (addressToBeVerified , companyAddress) =>{

    const result = await contract.verifyUserage(addressToBeVerified, companyAddress , {gasLimit: 300000});
    
    const filter = contract.filters.verificationDone(null , null); 
  
    const events = await contract.queryFilter(filter);
  
    let length = events.length;
    
    res.json({status: events[length - 1].args.status});
  
   
    
  }

  let result = await contractInteractionAgeVerifiaction(addressToBeVerified , companyAddress);

  

})


app.listen(3002, () => {
  console.log('listeining on port 3002')
})
