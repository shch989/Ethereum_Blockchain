const assert = require('assert')
const ganache = require('ganache')
const { Web3 } = require('web3')
const web3 = new Web3(ganache.provider())

// Car 클래스를 정의합니다.
class Car {
  // park 메서드를 정의합니다. 주차할 때 호출됩니다.
  park() {
    // 'stopped' 문자열을 반환합니다.
    return 'stopped'
  }

  // drive 메서드를 정의합니다. 운전할 때 호출됩니다.
  drive() {
    // 'vroom' 문자열을 반환합니다.
    return 'vroom'
  }
}

// Car 클래스의 인스턴스를 저장할 변수를 선언합니다.
let car;

// 각 테스트 케이스 실행 전에 실행될 코드를 정의합니다.
beforeEach(() => {
  // 테스트 시작 전에 Car 클래스의 새 인스턴스를 생성하여 변수에 할당합니다.
  car = new Car()
})

// 테스트 스위트를 정의합니다. 'Car' 클래스에 대한 여러 테스트 케이스가 포함됩니다.
describe('Car', () => {
  // 'can park' 테스트 케이스를 정의합니다. 'park' 메서드를 테스트합니다.
  it('can park', () => {
    // 이전에 생성한 Car 인스턴스의 'park' 메서드를 호출하고 반환된 값이 'stopped'인지 확인합니다.
    assert.equal(car.park(), 'stopped')
  })  

  // 'can drive' 테스트 케이스를 정의합니다. 'drive' 메서드를 테스트합니다.
  it('can drive', () => {
    // 이전에 생성한 Car 인스턴스의 'drive' 메서드를 호출하고 반환된 값이 'vroom'인지 확인합니다.
    assert.equal(car.drive(), 'vroom')
  }) 
})
