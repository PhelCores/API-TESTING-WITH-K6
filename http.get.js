

import http from 'k6/http'
import { check } from 'k6'
import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';


export default function ( ) {

    let res = http.get('https://test-api.k6.io/public/crocodiles/')


    const crocodile = res.json()
    const crocoID = crocodile[0].id
    const crocoName = crocodile[0].name
    const crocoSex = crocodile[0].sex
    const crocoAge = crocodile[0].age
    const croco_date_of_birth = crocodile[0].date_of_birth

    res = http.get(`https://test-api.k6.io/public/crocodiles/${crocoID}/`)

// console.log(res.json().id)
// console.log(res.json().name)
// console.log(res.json().sex)
// console.log(res.json().age)
// console.log(res.json().date_of_birth)


//Assertions 

    check(res, {
        'STAUTS IS 200' :(r) => r.status === 200,
        'CROC ID IS: 0000000': (r) => r.json().id === crocoID,
        'CROC NAME IS: 0000000': (r) => r.json().name === crocoName,
        'CROC SEX IS: 0000000': (r) => r.json().sex === crocoSex,
        'CROC AGE IS: 0000000': (r) => r.json().age === crocoAge,
        'CROC DATE OF BIRTH: 0000000': (r) => r.json().date_of_birth === croco_date_of_birth,
        



    })
  
}