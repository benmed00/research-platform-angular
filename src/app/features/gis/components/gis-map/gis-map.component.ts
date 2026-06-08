import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SHARED_IMPORTS } from '../../../../shared/shared-imports';

/**
 * Interactive GIS map view powered by Leaflet.
 *
 * @remarks Implementation pending — placeholder for the GIS feature module.
 * @see gis.model — MapLayer
 */
@Component({
  selector: 'app-gis-map',
  templateUrl: './gis-map.component.html',
  styleUrls: ['./gis-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [SHARED_IMPORTS]
})
export class GisMapComponent {}
