import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DateRange, DateBoundry } from '../../../../models/date';
import { DatasetId } from '../../../../models/dataset-id.enum';
import { RankBoundry, RankRange } from 'src/app/models/rank.interface';
declare var $: any;

@Component({
  selector: 'dh-rank-viewer-filters',
  templateUrl: './rank-viewer-filters.component.html',
  styleUrls: ['./rank-viewer-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RankViewerFiltersComponent implements OnInit, AfterViewInit {
  @Input() selectedId: DatasetId | null = null;
  @Input() datasetIds: DatasetId[] | null = [];
  @Input() dateRange: DateRange | null = null;
  @Input() rankRange: RankRange | null = null;

  @Output() datasetSelect: EventEmitter<DatasetId> = new EventEmitter<DatasetId>();
  @Output() dateChange: EventEmitter<DateRange> = new EventEmitter<DateRange>();
  @Output() rankChange: EventEmitter<RankRange> = new EventEmitter<RankRange>();


  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    // console.log(this.dateInput.value);
    $("#dateInput").daterangepicker({
      opens: 'center',
      minDate: DateBoundry.MIN,
      maxDate: DateBoundry.MAX
    }, (start: any, end: any) => {
      this.dateChange.emit({
        startDate: start.format('MM/DD/YYYY'),
        endDate: end.format('MM/DD/YYYY')
      });
    })
  }

  onDatasetClick(datasetId: string) {
    this.datasetSelect.emit(datasetId as DatasetId);
  }

  onRankChange(type: string, rank: number) {
    const range: RankRange = {
      // @ts-ignore
      min: (type === 'min' && rank >= RankBoundry.MIN) ? rank : this.rankRange.min,
      // @ts-ignore
      max: (type === 'max' && rank <= RankBoundry.MAX) ? rank : this.rankRange.max,
    }
    this.rankChange.emit(range);
  }

  toNumber(num: string) {
    return Number(num);
  }

}
