// Node.js의 기본 모듈 중에서 path와 fs 모듈을 가져옴
const path = require("path");
const fs = require("fs");
// solc 컴파일러 모듈을 가져옴
const solc = require("solc");

// 스마트 계약 소스 파일의 경로를 계산하여 inboxPath 변수에 할당함
const inboxPath = path.resolve(__dirname, "contracts", "Inbox.sol");
// fs 모듈을 사용하여 스마트 계약 소스 파일을 읽어들임
const source = fs.readFileSync(inboxPath, "utf8");

// solc.compile 함수를 사용하여 스마트 계약을 컴파일하고, 컴파일 결과에서 컴파일된 컨트랙트 객체를 추출함
// 첫 번째 매개변수로는 컴파일할 소스 코드, 두 번째 매개변수로는 컴파일러 버전을 전달함
// compile 함수의 반환 값은 컴파일된 스마트 계약에 대한 객체를 포함하는 컴파일 결과 객체임
// 여기서는 contracts 속성에서 Inbox 컨트랙트에 해당하는 컴파일 결과만을 선택함
const compiledContract = solc.compile(source, 1).contracts[":Inbox"];

// 컴파일된 스마트 계약 객체를 외부로 내보냄
module.exports = compiledContract;