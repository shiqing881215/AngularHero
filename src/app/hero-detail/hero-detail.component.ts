import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService }  from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero : Hero;

  constructor(
    private route: ActivatedRoute,   // holds information about the route to this instance
    private heroService: HeroService, // gets hero data from the remote server to display
    private location: Location // navigate back to the view that navigated here
  ) {}

  ngOnInit() {
    this.getHero();
  }

  getHero() : void {
    // + converts string to number
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id).subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
  }

}
