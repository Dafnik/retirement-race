import {ChangeDetectorRef, Component, computed, effect, inject, input, OnInit, signal} from '@angular/core';
import {ChartModule} from "primeng/chart";
import {RetirementsType, RetirementType} from "../app.component";
import {differenceInBusinessDays} from "date-fns";

@Component({
  selector: 'app-retirement-bar-chart',
  standalone: true,
  imports: [
    ChartModule
  ],
  templateUrl: './retirement-bar-chart.component.html',
  styleUrl: './retirement-bar-chart.component.css'
})
export class RetirementBarChartComponent implements OnInit {
  cd = inject(ChangeDetectorRef)

  retirements = input.required<RetirementsType>()

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
    const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
    const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

    const retirements = this.retirements();

    this.data = {
      labels: retirements.map((it) => it.name),
      datasets: [
        {
          backgroundColor: documentStyle.getPropertyValue('--p-cyan-500'),
          borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
          data: retirements.map((it) => differenceInBusinessDays(it.date, new Date())),
        },
      ],
    };

    this.options = {
      indexAxis: 'y',
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: false
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500,
            },
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }
}
