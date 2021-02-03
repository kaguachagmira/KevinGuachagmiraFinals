import { MessageService } from './../services/message.service';
import { Gato } from '../interfaces/gato';
//import { HEROES } from './../mock-heroes';
import { Component, OnInit } from '@angular/core';
import { HeroService } from '../services/hero.service';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {


  //heroesLista = HEROES;
  heroes : Gato[];
  selectedHeroe : Gato;

  constructor(private heroService: HeroService, private messageService: MessageService) {}
  ngOnInit(): void {
    this.getHeroes();
  }
  onSelect(heroe: Gato): void {
    this.selectedHeroe = heroe;
    this.messageService.add(`Envio un mensaje el heroe seleccionado es : id=${heroe.id}`);
  }
  getHeroes(): void {
    //Modo Async
    this.heroService.getHeroesServidor()
    .subscribe(heroes =>  this.heroes = heroes)

    //Modo Sync
    //this.heroes = this.heroService.getHeroes();
  }
}
