import { Injectable } from "@angular/core";
import { AsyncSubject, Observable } from "rxjs";

@Injectable()
export class SourceService {
  private bindLayerToVectorSource = new AsyncSubject<string>()

  /**
   * used by vector-source.component, notify the project content(layer.component), they can add layer to map with the new sourceId
   * this function only can be used once
   * @param sourceId 
   */
  startBind = (sourceId: string):void => {
    this.bindLayerToVectorSource.next(sourceId)
    this.bindLayerToVectorSource.complete()
  }

  /**
   * used by layer.component, listen when should layer add themselves to map with a sourceId
   * @returns sourceId
   */
  listenBinding = (): Observable<string> => this.bindLayerToVectorSource.asObservable()
  
}