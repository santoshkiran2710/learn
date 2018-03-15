import React from 'react';

export const validator = {
  email:{
    blank: {
      message: 'Please enter an Email address'
    },
    format:{
      pattern: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message:'Please enter a valid email'
    },

  },
  password:{
    blank:{
      message:'Password cannot be blank'
    },
    length:{
      min:{
        val:5,
        message: 'Password must be atleast 5 characters'
      }
    },
    match:{
      message: 'Provided value doesn\'t match'
    },
  },
  string:{
    blank:{
      message: 'Value cannot be blank'
    },
    format:{
      pattern: /[a-zA-Z0-9 ]/,
      message: 'Value cannot have special characters'
    }
  },
  phone:{
    blank:{
      message: 'Please enter a Phone number'
    },
    format:{
      /*
        Valid formats:
          (123) 456-7890
          (123)456-7890
          123-456-7890
          123.456.7890
          1234567890
          +31636363634
          075-63546725
        */
      pattern: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
      message: 'Please enter a valid phone number'
    }
  }
}

export function validate(fieldname, val, prevVal){
  //console.log('validate:'+fieldname+','+val+','+prevVal);
  let resp = [null, null];
  if(typeof(prevVal)==='undefined') prevVal = val;
  if(validator.hasOwnProperty(fieldname)){
    let v = validator[fieldname];
    if(val==='' || val===null){
      resp[0] = true;
      resp[1] = v['blank']['message'];
    }
    else if(v.hasOwnProperty('format') && !v['format']['pattern'].test(val)){
      resp[0] = true;
      resp[1] = v['format']['message'];
    }else if(v.hasOwnProperty('match') && val!==prevVal){
      resp[0] = true;
      resp[1] = v['match']['message'];
    }
    else if(v.hasOwnProperty('length')){
      let l = v['length'];
      if(l.hasOwnProperty('min') && val.length < l['min']['val']){
        resp[0] = true;
        resp[1] = l['min']['message'];
      }else if(l.hasOwnProperty('max') && val.length > l['max']['val']){
        resp[0] = true;
        resp[1] = l['max']['message'];
      }else {
        resp[0] = false;
      }
    }else {
      resp[0] = false;
    }
  }else{
    resp[0] = false;
  }
  //console.log('resp:'+resp[0]+','+resp[1]);
  return resp;
}
