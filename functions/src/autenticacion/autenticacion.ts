const functions = require('firebase-functions');
const express = require("express")
const cors = require("cors")
import * as bodyParser from "body-parser";
const reque = require("request");

const auth = express();
auth.use(cors({ origin: true }));
auth.use(bodyParser.json());
auth.use(bodyParser.urlencoded({ extended: true }));


auth.post("/", (req : any, response : any) => {
    let body = req.body;
    console.log(body);
    response.header('Access-Control-Allow-Origin', '*');
    console.log("llegando aqui");

        return reque.post('https://accounts.spotify.com/api/token',{
            form:{
                grant_type:'authorization_code',
                code : body.codigo,
                redirect_uri: body.redirect_uri,
                client_id: 'c1e2d5bb35ee45a1964cddd54b6110ae',
                client_secret: 'c5e08de3ed8b4279b1e4531d435ed257'
            }
        },function (err: any, res: any, bod: any){
            if (err) {
                console.error('error posting json: ', err)
                throw err
            }
            var headers = res.headers
            var statusCode = res.statusCode
            console.log('headers: ', headers)
            console.log('statusCode: ', statusCode)
            console.log('body: ', bod);
            
            return response.json({body : bod});
        });
});


export const loginSpotify = functions.https.onRequest((request : any, response : any) => {
    if (!request.path) {
        request.url = `/${request.url}`;
    }
    return auth(request, response);
});