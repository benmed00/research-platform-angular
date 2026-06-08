import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.scss']
})
export class StatCardComponent {
  @Input() title: string = '';
  @Input() value: string | number = '';
  @Input() icon?: string;
  @Input() color: string = '#3498db';
  @Input() trend?: {
    value: number;
    isPositive: boolean;
  };
}
