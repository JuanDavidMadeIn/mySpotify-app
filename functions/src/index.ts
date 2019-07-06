import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

import {loginSpotify} from './autenticacion/autenticacion';
export {loginSpotify};
