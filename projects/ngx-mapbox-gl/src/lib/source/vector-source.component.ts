import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  QueryList,
  SimpleChanges,
} from '@angular/core';
import { VectorSource, VectorSourceImpl } from 'mapbox-gl';
import { fromEvent, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { LayerComponent } from '../layer/layer.component';
import { MapService } from '../map/map.service';
import { SourceService } from './source.service';

@Component({
  selector: 'mgl-vector-source',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SourceService]
})
export class VectorSourceComponent
  implements OnInit, OnDestroy, OnChanges, VectorSource {
  /* Init inputs */
  @Input() id: string;

  /* Dynamic inputs */
  @Input() url?: VectorSource['url'];
  @Input() tiles?: VectorSource['tiles'];
  @Input() bounds?: VectorSource['bounds'];
  @Input() scheme?: VectorSource['scheme'];
  @Input() minzoom?: VectorSource['minzoom'];
  @Input() maxzoom?: VectorSource['maxzoom'];
  @Input() attribution?: VectorSource['attribution'];
  @Input() promoteId?: VectorSource['promoteId'];

  type: VectorSource['type'] = 'vector';

  @ContentChildren(LayerComponent) layerComponents = new QueryList<LayerComponent>()

  private sourceAdded = false;
  private sub = new Subscription();

  constructor(private mapService: MapService, public sourceService: SourceService) {}

  ngOnInit() {
    const sub1 = this.mapService.mapLoaded$.subscribe(() => {
      this.init();
      const sub = fromEvent(this.mapService.mapInstance as any, 'styledata')
        .pipe(filter(() => !this.mapService.mapInstance.getSource(this.id)))
        .subscribe(() => {
          this.init();
        });
      this.sub.add(sub);
    });
    this.sub.add(sub1);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.sourceAdded) {
      if(changes.tiles && !changes.tiles.isFirstChange() && changes.tiles.previousValue === undefined) {
        // 如果tiles第一次从undefined改变至有值，则初始化。（tiles无值时不可初始化）
        this.init()
      }
      return;
    }
    if (
      (changes.bounds && !changes.bounds.isFirstChange()) ||
      (changes.scheme && !changes.scheme.isFirstChange()) ||
      (changes.minzoom && !changes.minzoom.isFirstChange()) ||
      (changes.maxzoom && !changes.maxzoom.isFirstChange()) ||
      (changes.attribution && !changes.attribution.isFirstChange()) ||
      (changes.promoteId && !changes.promoteId.isFirstChange())
    ) {
      this.ngOnDestroy();
      this.ngOnInit();
    } else if (
      (changes.url && !changes.url.isFirstChange()) ||
      (changes.tiles && !changes.tiles.isFirstChange())
    ) {
      const source = this.mapService.getSource<VectorSourceImpl>(this.id);
      if (source === undefined){
        return;
      }
      if (changes.url && this.url) {
        source.setUrl(this.url);
      }
      // 只有在tile有值的情况下才可以初始化
      if (changes.tiles && this.tiles) {
        source.setTiles(this.tiles);
      }
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    if (this.sourceAdded) {
      this.mapService.removeSource(this.id);
      this.sourceAdded = false;
    }
  }

  private init() {
    if(!this.tiles) {
      return
    }
    const source: VectorSource = {
      type: this.type,
      url: this.url,
      tiles: this.tiles,
      bounds: this.bounds,
      scheme: this.scheme,
      minzoom: this.minzoom,
      maxzoom: this.maxzoom,
      attribution: this.attribution,
      promoteId: this.promoteId,
    };
    this.mapService.addSource(this.id, source);
    // init与tiles同步，避免异步问题
    // 如果init时存在tiles，则证明tiles已经被设置，需要通知layer同步绑定。否则则通过ngOnChange生命周期处理layer的异步绑定
    this.sourceService.startBind(this.id)
    this.sourceAdded = true;
  }
}
