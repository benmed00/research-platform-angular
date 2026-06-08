import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SHARED_IMPORTS } from '../../../../shared/shared-imports';

/**
 * Environmental monitoring data explorer and time-series viewer.
 *
 * @remarks Implementation pending — placeholder for the environmental-data feature module.
 * @see environmental-data.model — EnvironmentalData
 */
@Component({
  selector: 'app-environmental-data',
  templateUrl: './environmental-data.component.html',
  styleUrls: ['./environmental-data.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [SHARED_IMPORTS]
})
export class EnvironmentalDataComponent {}
