import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup,  Validators } from '@angular/forms';
import { Reservation } from 'src/app/models/reservation';
import { BookingService } from 'src/app/shared/booking.service';
import * as _ from 'lodash';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
declare var $ : any;

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'], 
})
export class BookingComponent implements OnInit {
  
  public adultsOptions: number[];
  public childrenOptions: number[];
  public locale: any;
  public today: Date;
  public formBooking: FormGroup;
  public price: any;
  public bookings
  public nuevoArray:Date[]
  public entrada:Date
  public salida:Date
  public payPalConfig ? : IPayPalConfig;
  public reservationID :string
  public trial: Date[]

  constructor(private formBuilder: FormBuilder, private bookingService: BookingService) {
    
    this.adultsOptions = [1, 2, 3, 4, 5, 6, 7, 8]
    this.childrenOptions = [0, 1, 2, 3, 4, 5, 6, 7]

    if(navigator.language == "es") {
      this.locale = {
        firstDayOfWeek: 1,
            dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
            dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
            dayNamesMin: [ "D","L","M","X","J","V","S" ],
            monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
            monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ],
            today: 'Hoy',
            clear: 'Borrar'
      };
    }else{
      this.locale = {
        firstDayOfWeek: 0,
        dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        dayNamesMin: ["Su","Mo","Tu","We","Th","Fr","Sa"],
        monthNames: [ "January","February","March","April","May","June","July","August","September","October","November","December" ],
        monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
        today: 'Today',
        clear: 'Clear',
        dateFormat: 'mm/dd/yy',
        weekHeader: 'Wk'
      };
    }

    this.today = new Date();
    

    this.formBooking = this.formBuilder.group({
      fullName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, 
                                Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      phone: new FormControl('', [Validators.required, 
                                  Validators.pattern("^((\\+{2,5}$)|0)?[0-9]{8,12}$")]),
      adultsNumber:  new FormControl(this.adultsOptions[0]),
      arrivalTime: new FormControl(''),
      childrenNumber:  new FormControl(this.childrenOptions[0]),
      date : new FormControl('', Validators.required)
    })

  }

  getDaysArray(start, end) {
    for(var arr=[],dt=new Date(start); dt<=end; dt.setDate(dt.getDate()+1)){
        arr.push(new Date(dt));
    }
    return arr;
  };

    getBooking(){
      let entrada
      let salida
     
      this.nuevoArray = []
      this.bookingService.getBooking().subscribe((data:any[]) =>{
        for(let i= 0; i<= data.length; i++ ){
           entrada= new Date(data[i].startDate)
           salida = new Date(data[i].endDate)
           this.nuevoArray = _.concat(this.nuevoArray,this.getDaysArray(entrada,salida))
           console.log(this.nuevoArray)
        }
        }) 
    }

  calculatePrice(){
    let start = this.formBooking.value.date[0].getDate()
    let end = this.formBooking.value.date[1].getDate()
    //Resto de días 180
    if(end-start == 1){
      this.price= "Selecciona mínimo dos noches"
       //si es un finde 225/noche
      }else if ((end-start<4) && this.formBooking.value.date[0].getDay() == 5 && this.formBooking.value.date[1].getDay() == 0 ){
        this.price = 225*(end-start)
        //Si son menos de 4 noches 225/noche
        }else if  (end-start<4){
          this.price = 225*(end-start)
            //Entre 4 y 6 noches 225/noche
            } else if((end-start)>=4 && (end-start)<7){
              this.price = 225*(end-start)
              //Entre 7 y 14 noches 200/noche
              } else if((end-start)>=7 && (end-start)<15 ){
                this.price = 200*(end-start)
                //Más de 15 noches 150/noche
                }  else if(end-start>=15){
                  this.price = 150*(end-start)
                  }
  }


 

  get fullName(){
    return this.formBooking.get('fullName')
  }
  get email(){
    return this.formBooking.get('email')
  }
  get phone(){
    return this.formBooking.get('phone')
  }
  get adultsNumber(){
    return this.formBooking.get('adultsNumber')
  }
  get childrenNumber(){
    return this.formBooking.get('childrenNumber')
  }
  get date(){
    return this.formBooking.get('date')
  }

  initConfig(): void {     
     this.payPalConfig = {
     currency: 'EUR',
     createOrderOnClient: (data) => <ICreateOrderRequest>{
       intent: 'CAPTURE',
       purchase_units: [{
           amount: {
             currency_code: 'EUR',
             value: this.price,
             breakdown: {
               item_total: {
                 currency_code: 'EUR',
                 value: this.price
               }
             }
           },
           items: [{
               name: 'La Cuesta Blanca -  Casa Rural',
               quantity: '1',
               unit_amount: {
                 currency_code: 'EUR',
                 value: this.price,
               },
             }]
         }]
     },
     advanced: {
       commit: 'true'
     },
     style: {
       label: 'paypal',
       layout: 'vertical'
     },
     onApprove: (data, actions) => {
       console.log('onApprove - transaction was approved, but not authorized', data, actions);
       actions.order.get().then(details => {
         console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
     },
     onClientAuthorization: (data) => {
       console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
       this.reservationID = data.id
       console.log( data.id)
       $('#paymentModal').modal('hide');
       $('#modelId').modal('hide');
       $('#paymentID').modal('show');

       
        let booking = new Reservation(this.formBooking.value.fullName, this.formBooking.value.email, this.formBooking.value.phone, this.formBooking.value.adultsNumber, this.formBooking.value.childrenNumber, this.formBooking.value.date[0], this.formBooking.value.date[1], this.price, this.reservationID, this.formBooking.value.arrivalTime)
        
        this.bookingService.addBooking(booking).subscribe(data =>{
          this.formBooking.reset()
          this.getBooking()
        }) 
      

     },
     onCancel: (data, actions) => {
       console.log('OnCancel', data, actions);
     },
     onError: err => {
       console.log('OnError', err);
     },
     onClick: (data, actions) => {
       console.log('onClick', data, actions);
     },
    };
   }
  
  ngOnInit(): void {
   this.getBooking()
   this.initConfig();
  }
}


