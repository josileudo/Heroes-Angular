import { Component, OnInit, Input } from "@angular/core";

import { Hero } from "../../hero"

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.css']
})

export class HeroDetailsComponent  {

  @Input() hero?:Hero

}

