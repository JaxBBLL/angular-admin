import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({ selector: '[test]' })
export class TestDirective implements OnInit {
  constructor(private el: ElementRef) {
    console.log('test is called')
  }

  ngOnInit(): void {
    console.log('oninit lifecycle hook', this.el)
    this.el.nativeElement.style.color = '#ff6600';
  }
}