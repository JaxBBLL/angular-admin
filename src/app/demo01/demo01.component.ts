import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo01',
  templateUrl: './demo01.component.html',
  styleUrls: ['./demo01.component.less']
})
export class Demo01Component implements OnInit {
  list: Array<string> = ["Tom", "Jack", "Peter"];
  isLogin: Boolean = true;

  scoreList: number[] = [90, 70, 86, 99, 56];
  inputValue: string = "test name";
  constructor() { }

  ngOnInit(): void {
    console.log('ngOnInit');
  }

  handleClick() {
    console.log('click')
    let n = Math.floor(Math.random() * 20 + 80)
    this.scoreList.push(n)
  }

  handleChange(data: any) {
    console.log(data)
    console.log(this.inputValue)
  }

}
