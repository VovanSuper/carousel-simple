import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngxd-sample-carousel-test',
  templateUrl: './carousel-test.component.html',
  styleUrls: ['./carousel-test.component.scss']
})
export class CarouselTestComponent implements OnInit {
  images = [
    'https://images.pexels.com/photos/247478/pexels-photo-247478.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=460&w=720',
    'https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=460&w=720',
    'https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=460&w=720',
    'https://images.pexels.com/photos/131723/pexels-photo-131723.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=460&w=720',
    'https://images.pexels.com/photos/917494/pexels-photo-917494.jpeg?cs=srgb&dl=flock-of-birds-917494.jpg&fm=jpg',
    'https://images.pexels.com/photos/6272/wood-free-wooden-home.jpg?cs=srgb&dl=i-love-you-more-than-coffee-pad-6272.jpg&fm=jpg',
    'https://images.pexels.com/photos/2608982/pexels-photo-2608982.jpeg?cs=srgb&dl=close-up-photography-of-brown-wasp-2608982.jpg&fm=jpg',
    'https://images.pexels.com/photos/1390200/pexels-photo-1390200.jpeg?cs=srgb&dl=white-and-brown-cow-nearby-mountains-1390200.jpg&fm=jpg',
    'https://images.pexels.com/photos/4020288/pexels-photo-4020288.jpeg?cs=srgb&dl=white-cassette-tape-4020288.jpg&fm=jpg'
  ];

  constructor() { }

  ngOnInit() { }

}
