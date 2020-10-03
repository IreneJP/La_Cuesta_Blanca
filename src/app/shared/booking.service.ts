import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from"@angular/common/http";
import { Reservation } from '../models/reservation';


@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private url = "http://localhost:3000/reservation"
  constructor(private http :HttpClient) { }


  getBooking(){
    return this.http.get(this.url)
  }

  getNotAvailableDates(){
    return this.http.get(this.url + "/notAvailableDates")
  }


  addBooking(booking:Reservation){
    return this.http.post(this.url, booking)
  }

}
