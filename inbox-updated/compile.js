const path = require('path'); // path 모듈을 불러옵니다.
const fs = require('fs'); // fs 모듈을 불러옵니다.
const solc = require('solc'); // solc 모듈을 불러옵니다.

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol'); // Inbox.sol 파일의 경로를 결정합니다.
const source = fs.readFileSync(inboxPath, 'utf8'); // Inbox.sol 파일을 읽어옵니다.

const input = {
  language: 'Solidity', // 솔리디티 언어를 사용합니다.
  sources: {
    'Inbox.sol': {
      content: source, // 솔리디티 파일 내용을 설정합니다.
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'], // 모든 결과를 가져옵니다.
      },
    },
  },
};

const compiledContracts = JSON.parse(solc.compile(JSON.stringify(input))); // 컴파일된 컨트랙트를 가져옵니다.
const contract = compiledContracts.contracts['Inbox.sol'].Inbox; // 컴파일된 컨트랙트에서 Inbox 컨트랙트를 선택합니다.

module.exports = contract; // 컴파일된 Inbox 컨트랙트를 내보냅니다.