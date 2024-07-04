import http from 'k6/http';
import { check } from 'k6';

export default function () {
    // Generate unique credentials for each test iteration
    const credentials = {
        username: "User_" + Date.now(),
        password: "Secret_" + Date.now()
    };

    // Register a new user in the data base
    http.post(
        'https://test-api.k6.io/user/register/',
        JSON.stringify(credentials),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    // Log in and retrieve access token
    let res = http.post(
        'https://test-api.k6.io/auth/token/login/',
        JSON.stringify({
            username: credentials.username,
            password: credentials.password
        }),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
    const accessToken = res.json().access;
    console.log(accessToken);

    // Make a GET request using the access token
    http.get(
        'https://test-api.k6.io/my/crocodiles/',
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    );


     //Create a new Resource (Crocodile)
    res = http.post('https://test-api.k6.io/my/crocodiles/',
        JSON.stringify({
            name: 'NewCrocodile',
            sex: 'M',
            date_of_birth:'1992-12-09'
        }),
         {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
                
            }
        }
    )

const newCrocodileID = res.json().id
  res = http.get(
        `https://test-api.k6.io/my/crocodiles/${newCrocodileID}`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    );


    check(res,{
        "status is 200": (r) => r.status === 200,
        "New Croco ID ": (r) => r.json().id === newCrocodileID 
    })


  http.patch(`https://test-api.k6.io/my/crocodiles/${newCrocodileID}`,
        JSON.stringify({
         
            sex: 'f'
            
        }),
         {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
                
            }
        }
    )


}