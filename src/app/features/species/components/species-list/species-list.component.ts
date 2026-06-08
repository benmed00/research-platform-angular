import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ChangeDetectionStrategy,
  inject
} from '@angular/core';
import { SHARED_IMPORTS } from '../../../../shared/shared-imports';
import { ApiService } from '../../../../core/services/api.service';

export interface SpeciesListItem {
  id: string;
  scientificName: string;
  commonName: string;
  iucnStatus: string;
}

/**
 * Lists species fetched from the `/species` API endpoint.
 */
@Component({
  selector: 'app-species-list',
  templateUrl: './species-list.component.html',
  styleUrls: ['./species-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [SHARED_IMPORTS]
})
export class SpeciesListComponent implements OnInit {
  private readonly cdr = inject(ChangeDetectorRef);

  species: SpeciesListItem[] = [];
  loading = false;
  displayedColumns = ['scientificName', 'commonName', 'iucnStatus'];
  columnLabels: Record<string, string> = {
    scientificName: 'Nom scientifique',
    commonName: 'Nom commun',
    iucnStatus: 'Statut UICN'
  };

  /**
   * Injects the API service for loading species records.
   *
   * @param apiService - Loads species records from the API
   */
  constructor(private apiService: ApiService) {}

  /**
   * Loads species on component init.
   *
   * @returns Nothing.
   */
  ngOnInit(): void {
    this.loadSpecies();
  }

  /**
   * Fetches all species from `/species`.
   *
   * @returns Nothing.
   */
  loadSpecies(): void {
    this.loading = true;
    this.cdr.markForCheck();
    this.apiService.get<SpeciesListItem[]>('/species').subscribe({
      next: (species) => {
        this.species = species;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.species = [];
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }
}
