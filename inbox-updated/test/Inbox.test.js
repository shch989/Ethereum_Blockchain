const assert = require('assert'); // assert 모듈을 불러옵니다.
const ganache = require('ganache'); // ganache를 불러와 테스트 네트워크를 설정합니다.
const { Web3 } = require('web3'); // web3 모듈에서 Web3 클래스를 불러옵니다.
const web3 = new Web3(ganache.provider()); // ganache provider를 사용하여 web3 인스턴스를 생성합니다.

const { abi, evm } = require('../compile'); // 컴파일된 컨트랙트의 ABI 및 EVM bytecode를 가져옵니다.

let accounts; // 계정 목록을 저장할 변수를 선언합니다.
let inbox; // 컨트랙트 인스턴스를 저장할 변수를 선언합니다.

beforeEach(async () => { // 각 테스트 전에 실행될 함수입니다.
  accounts = await web3.eth.getAccounts(); // 테스트용 계정 목록을 가져옵니다.
  inbox = await new web3.eth.Contract(abi) // 컨트랙트 인스턴스를 배포합니다.
    .deploy({
      data: evm.bytecode.object, // 컨트랙트의 EVM bytecode를 전달합니다.
      arguments: ['Hi there!'], // 컨트랙트 생성자에 전달할 인자를 설정합니다.
    })
    .send({ from: accounts[0], gas: '1000000' }); // 트랜잭션을 보내어 컨트랙트를 배포합니다.
});

describe('Inbox', () => { // 'Inbox' 컨트랙트에 대한 테스트를 설명합니다.
  it('deploys a contract', () => { // 'deploys a contract' 테스트 케이스를 정의합니다.
    assert.ok(inbox.options.address); // 컨트랙트 주소가 존재하는지 확인합니다.
  });

  it('has a default message', async () => { // 'has a default message' 테스트 케이스를 정의합니다.
    const message = await inbox.methods.message().call(); // 컨트랙트의 message 함수를 호출하여 현재 메시지를 가져옵니다.
    assert.equal(message, 'Hi there!'); // 가져온 메시지가 'Hi there!'인지 확인합니다.
  });

  it('can change the message', async () => { // 'can change the message' 테스트 케이스를 정의합니다.
    await inbox.methods.setMessage('bye').send({ from: accounts[0] }); // setMessage 함수를 호출하여 메시지를 변경합니다.
    const message = await inbox.methods.message().call(); // 변경된 메시지를 가져옵니다.
    assert.equal(message, 'bye'); // 가져온 메시지가 'bye'인지 확인합니다.
  });
});