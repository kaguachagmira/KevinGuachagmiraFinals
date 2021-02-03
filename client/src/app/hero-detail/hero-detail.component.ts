import { Component, OnInit, Input } from '@angular/core';
import { Gato } from '../interfaces/gato';
import { HeroService } from '../services/hero.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {

  @Input() hero: Gato;
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location

  ) { }

  ngOnInit(): void {
    this.getHero();
  }

 getHero():void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
    .subscribe(hero => this.hero = hero);
  }
  goBack(): void {
    this.location.back();
  }

}
