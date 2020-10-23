export class Reservation {
        public fullName: string;
        public email: string;
        public phone: number;
        public adultsNumber: number;
        public childrenNumber: number;
        public arrivalTime?: string;
        public startDate: string;
        public endDate: string;
        public price: number;
        public reservationID: string

    constructor (fullName: string, email: string, phone:number, adultsNumber:number, childrenNumber:number,  startDate:string, endDate:string, price: number, reservationID:string, arrivalTime?: string){
          
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
        this.adultsNumber = adultsNumber;
        this.childrenNumber = childrenNumber;
        this.arrivalTime = arrivalTime;
        this.startDate = startDate;
        this.endDate = endDate;
        this.price = price;
        this.reservationID = reservationID
    }

}
