const MissionUtils = require("@woowacourse/mission-utils");

class App {
  constructor() {
    this.initialPrint();
  }

  initialPrint() {
    MissionUtils.Console.print('숫자 야구 게임을 시작합니다.');
  }

  play() {
    this.computerNumber = this.makeRandomNumber();
    this.getUserNumber();
  }

  makeRandomNumber() {
    const resultNumber = [];
    while (resultNumber.length < 3) {
      const number = MissionUtils.Random.pickNumberInRange(1, 9);
      if (!resultNumber.includes(number)) {
        resultNumber.push(number);
      }
    }
    return resultNumber;
  }

  getUserNumber() {
    MissionUtils.Console.readLine('숫자를 입력해주세요 : ', (input) => {
      if (!this.isValidUserNumber(input)) {
        throw new Error('잘못된 값을 입력하였습니다.');
      }
      this.compareNumber(this.computerNumber, this.stringToNumberArray(input))
    });
  }

  isValidUserNumber(input) {
    if (input.length !== 3) return false;
    if (new Set(input).size !== 3) return false;
    if (input.includes(0)) return false;
    if (Number.isNaN(Number(input))) return false;
    return true;
  }

  stringToNumberArray(string) {
    return [...string].map(char => Number(char));
  }

  compareNumber(computerNumber, userNumber) {
    const result = {
      ball: 0,
      strike: 0,
    };
    
    userNumber.forEach((num, index) => {
      if (num === computerNumber[index]) result.strike += 1;
      else if (computerNumber.includes(num)) result.ball += 1;
    });
    this.printResult(result.strike, result.ball);
    this.isCorrectAnswer(result);
  }
  
  printResult(strike, ball) {
    if (strike === 0 && ball === 0) {
      MissionUtils.Console.print('낫싱');
      return;
    } 
    
    const resultText = [];
    if (ball > 0) resultText.push(ball + '볼');
    if (strike > 0)  resultText.push(strike + '스트라이크');
    MissionUtils.Console.print(resultText.join(' '));
  }

  isCorrectAnswer(result) {
    if (result.strike === 3){
      MissionUtils.Console.print('3개의 숫자를 모두 맞히셨습니다! 게임 종료');
      this.askRetry();
      return;
    }
    this.getUserNumber();
  }

  askRetry() {
    MissionUtils.Console.readLine('게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요.\n', (answer) => {
      this.retryOrExit(answer);
    });
  }

  retryOrExit(answer) {
    if (answer === '1') {
      this.play();
      return;
    }
    if (answer === '2') {
      MissionUtils.Console.close(); 
      return;
    }
    MissionUtils.Console.print('잘못 입력하였습니다. 다시 입력해주세요.');
    this.askRetry();
  }
}

module.exports = App;
