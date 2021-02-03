import { Villano } from '../interfaces/villano';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-villanos',
  templateUrl: './villanos.component.html',
  styleUrls: ['./villanos.component.scss'],
})
export class VillanosComponent implements OnInit {
  hero: Villano = {
    id: 1,
    name: 'Windstorm',
  };

  constructor() {}
  ngOnInit(): void {

  }
}
