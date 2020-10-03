import { IDates } from '../interfaces/i-dates';
import * as _ from 'lodash';

export class Dates implements IDates{
      
    constructor (data){
          _.set(this, 'data', data)
    }

    get startDate(){
        return _.get(this, 'data.starDate')
    }

    get endDate(){
        return _.get(this, 'data.endDate')
    }

    getData(){
        return _.get(this, 'data')
    }
}

