import { Injectable } from "@angular/core";
import { AsyncSubject, Observable } from "rxjs";

@Injectable()
export class SourceService {
  private bindLayerToSource = new AsyncSubject<string>()

  /**
   * used by source.component, notify the project content(layer.component), they can add layer to map with the new sourceId
   * this function only can be used once
   * @param sourceId 
   */
  startBind = (sourceId: string):void => {
    this.bindLayerToSource.next(sourceId)
    this.bindLayerToSource.complete()
  }

  /**
   * used by layer.component, listen when should layer add themselves to map with a sourceId
   * @returns sourceId
   */
  listenBinding = (): Observable<string> => this.bindLayerToSource.asObservable()

  hasBindSource = ():boolean => this.bindLayerToSource.closed
  
}