import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import retirements from '../retirements.json'
import {JsonPipe} from "@angular/common";
import {RetirementCardComponent} from "./retirement-card/retirement-card.component";
import {PrimeNGConfig} from "primeng/api";
import {Aura} from "primeng/themes/aura";
import {SelectButtonModule} from "primeng/selectbutton";
import {compareAsc} from "date-fns";
import {FormsModule} from "@angular/forms";
import {RetirementBarChartComponent} from "./retirement-bar-chart/retirement-bar-chart.component";

export type RetirementType = typeof retirements[0]
export type RetirementsType = typeof retirements

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JsonPipe, RetirementCardComponent, SelectButtonModule, FormsModule, RetirementBarChartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  retirements = retirements.sort((a, b) => compareAsc(a.date, b.date));

  selectedViewType: 'card' | 'list' = 'card';

  constructor(config: PrimeNGConfig) {
    config.theme.set({ preset: Aura });
  }
}
