import {ChangeDetectorRef, Component, computed, effect, inject, input, OnInit, signal} from '@angular/core';
import {RetirementType} from "../app.component";
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import {DatePipe} from "@angular/common";
import {ChartModule} from "primeng/chart";
import {differenceInBusinessDays, subYears} from "date-fns";

@Component({
  selector: 'app-retirement-card',
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    DatePipe,
    ChartModule
  ],
  templateUrl: './retirement-card.component.html',
  styleUrl: './retirement-card.component.css'
})
export class RetirementCardComponent implements OnInit {
  cd = inject(ChangeDetectorRef)

  index = input.required({
    transform: (it: number) => it + 1
  })
  retirement = input.required<RetirementType>()

  todoDays = computed(() => {
    return differenceInBusinessDays(this.retirement().date, new Date());
  })

  doneDays = computed(() => {
    return differenceInBusinessDays(new Date(), subYears(this.retirement().date, 45));
  })

  readonly test = signal(true)

  themeEffect = effect(() => {
    if (this.test()) {
      this.initChart();
      this.cd.markForCheck();
    }
  });

  data: unknown;
  options: unknown

  ngOnInit() {
    this.initChart();
  }

  initChart() {
      const documentStyle = getComputedStyle(document.documentElement);

      this.data = {
        labels: ['Geleistet', 'Ausständige Leistungen'],
        datasets: [
          {
            data: [this.doneDays(), this.todoDays()],
            backgroundColor: [
              documentStyle.getPropertyValue('--p-red-700'),
              documentStyle.getPropertyValue('--p-teal-700'),
            ],
            hoverBackgroundColor: [
              documentStyle.getPropertyValue('--p-red-800'),
              documentStyle.getPropertyValue('--p-teal-800'),
            ],
          },
        ],
      };

      this.options = {
        cutout: '60%',
        plugins: {
          legend: false
        },
      };
    }
}
