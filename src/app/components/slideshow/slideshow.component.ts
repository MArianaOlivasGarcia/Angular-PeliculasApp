import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import Swiper from 'swiper';
import { Movie } from '../../interfaces/NowPlayingResponse';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit, AfterViewInit {

  /* npm i swiper */
  /* En el angular.json importamos los styles */

  @Input() movies: Movie[];
  private swiper: Swiper;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    
    this.swiper = new Swiper('.swiper', {
      loop: true
    })

  }

  onSlideNext(){
    this.swiper.slideNext();
  }


  onSlidePrev(){
    this.swiper.slidePrev();
  }


}
