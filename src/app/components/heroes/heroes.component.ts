import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/app/hero';

import { HeroService } from 'src/app/hero-service.service';
import { MessageService } from 'src/app/message.service';

@Component ({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {

  selectedHero?:Hero

  heroes: Hero[] = []

  constructor(
    private heroService: HeroService,
  ) {}

  ngOnInit (){
    this.getHeroes()
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes)
  }
}
