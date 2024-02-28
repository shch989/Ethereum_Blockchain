// HDWalletProvider 모듈을 가져옴
const HDWalletProvider = require('@truffle/hdwallet-provider')
// Web3 모듈 중에서 Web3 객체를 가져옴
const { Web3 } = require('web3')
// 컴파일된 스마트 계약의 ABI와 바이트코드를 가져옴
const { interface, bytecode } = require('./compile')

// dotenv를 사용하여 환경 변수를 설정함
require('dotenv').config()

// HDWalletProvider를 사용하여 이더리움 네트워크에 연결하는 프로바이더를 생성함
const provider = new HDWalletProvider(
  process.env.REPLACE_WITH_YOUR_MNEMONIC, // 이더리움 지갑의 니모닉을 환경 변수에서 가져옴
  process.env.REPLACE_WITH_YOUR_INFURA_URL // Infura URL을 환경 변수에서 가져옴
)
// 이더리움 네트워크에 연결하기 위해 Web3 인스턴스를 생성함
const web3 = new Web3(provider)

// 스마트 계약을 배포하는 비동기 함수를 선언함
const deploy = async () => {
  // 이더리움 네트워크의 모든 계정을 가져와서 accounts 변수에 할당함
  const accounts = await web3.eth.getAccounts();

  // 계정 중에서 첫 번째 계정을 사용하여 스마트 계약을 배포할 것임을 콘솔에 출력함
  console.log('Attempting to deploy from account', accounts[0]);

  // Web3를 사용하여 스마트 계약을 배포함
  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Hi there!'] }) // 스마트 계약의 바이트코드와 생성자 인자를 설정함
    .send({ gas: '1000000', from: accounts[0] }); // 계정에서 gas 비용을 지불하고 스마트 계약을 배포함

  // 스마트 계약이 성공적으로 배포되었음을 콘솔에 출력함
  console.log('Contract deployed to', result.options.address);

  // HDWalletProvider 엔진을 종료하여 리소스를 해제함
  provider.engine.stop();
};

// deploy 함수를 호출하여 스마트 계약을 배포함
deploy();