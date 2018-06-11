import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as Typed from 'typed.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit  {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {

    const first_options = {
      strings: ['am a <i>Full Stack Developer</i>.^1000', 'love <i>Typescript^1000, Angular^1000, and Nodejs</i>.^1000'],
      typeSpeed: 50,
      loop: true,
      onLastStringBackspaced: () => {
        second_typed.toggle();
        first_typed.toggle();
      }
    };

    const second_options = {
      strings: [
        'left buttons^1000 to know more about me^500 and my work.^500',
        'and menu above to see my solutions^1000 for Leetcode problems^1000',
        'articles^1000, and contact information.^1000'],
      typeSpeed: 50,
      loop: true,
      onLastStringBackspaced: () => {
        second_typed.toggle();
        first_typed.toggle();
      }
    };

    const first_typed = new Typed('.typed-element', first_options);
    const second_typed = new Typed('.work-typed-element', second_options);
    second_typed.stop();
  }

}
