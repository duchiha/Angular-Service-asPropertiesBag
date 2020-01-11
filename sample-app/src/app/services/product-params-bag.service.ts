import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductParamsBagService {
  displayImage: boolean = false;
  listFilter: string;
}
