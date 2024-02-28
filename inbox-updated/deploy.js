const HDWalletProvider = require('@truffle/hdwallet-provider'); // HDWalletProvider 모듈을 불러옵니다.
const { Web3 } = require('web3'); // Web3 모듈을 불러옵니다.

const { abi, evm } = require('./compile'); // 컴파일된 ABI와 바이트코드를 불러옵니다.

require('dotenv').config(); // dotenv를 사용하여 환경 변수를 로드합니다.

const provider = new HDWalletProvider(
  process.env.REPLACE_WITH_YOUR_MNEMONIC, // 개인키 또는 니모닉을 환경 변수에서 가져옵니다.
  process.env.REPLACE_WITH_YOUR_INFURA_URL // Infura 노드 URL을 환경 변수에서 가져옵니다.
);

const web3 = new Web3(provider); // HDWalletProvider를 사용하여 Web3 인스턴스를 생성합니다.

const deploy = async () => {
  const accounts = await web3.eth.getAccounts(); // 사용 가능한 계정 목록을 가져옵니다.

  console.log('Attempting to deploy from account', accounts[0]); // 배포를 시도할 계정을 로그에 출력합니다.

  const result = await new web3.eth.Contract(abi) // 컨트랙트 인스턴스를 생성하고 배포합니다.
    .deploy({ data: evm.bytecode.object, arguments: ['Hi there!'] }) // 컨트랙트를 배포할 때 전달할 인자와 바이트코드를 설정합니다.
    .send({ gas: '1000000', from: accounts[0] }); // 컨트랙트를 배포하고 결과를 받아옵니다.

  console.log('Contract deployed to', result.options.address); // 배포된 컨트랙트의 주소를 로그에 출력합니다.
  provider.engine.stop(); // HDWalletProvider 엔진을 중지합니다.
};

deploy(); // deploy 함수를 호출하여 배포를 수행합니다.