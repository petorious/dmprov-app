import {addLocaleData} from 'react-intl';
import en_messages from './en';
import de_messages from './de';
import es_messages from './es';
import ru_messages from './ru';
import pl_messages from './pl';
import sv_messages from './sv';
import en from 'react-intl/locale-data/en';
import de from 'react-intl/locale-data/de';
import es from 'react-intl/locale-data/es';
import sv from 'react-intl/locale-data/sv';
import pl from 'react-intl/locale-data/de';
import ru from 'react-intl/locale-data/en';


var areIntlLocalesSupported = require('intl-locales-supported');


//START: Intl polyfill
//Required for working on Safari
//Code from here: https://formatjs.io/guides/runtime-environments/
var localesMyAppSupports = [
    /* list locales here */
];

if (global.Intl) {
    // Determine if the built-in `Intl` has the locale data we need.
    if (!areIntlLocalesSupported(localesMyAppSupports)) {
        // `Intl` exists, but it doesn't have the data we need, so load the
        // polyfill and replace the constructors with need with the polyfill's.
        var IntlPolyfill = require('intl');
        Intl.NumberFormat   = IntlPolyfill.NumberFormat;
        Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
    }
} else {
    // No `Intl`, so use and load the polyfill.
    global.Intl = require('intl');
}
//END: Intl polyfill

const locales = [
  {
    locale: 'en',
    messages: en_messages,
    data: en
  },
  {
    locale: 'de',
    messages: de_messages,
    data: de
  },
   {
    locale: 'es',
    messages: es_messages,
    data: es
  },
   {
    locale: 'pl',
    messages: pl_messages,
    data: pl
  },
   {
    locale: 'sv',
    messages: sv_messages,
    data: sv
  },
   {
    locale: 'ru',
    messages: ru_messages,
    data: ru
  },




]


export function getLocaleMessages(locale){

  if(locales){
    for (var i = 0; i < locales.length; i++) {
      if(locales[i]['locale']===locale){
        return locales[i]['messages']
      }
    }
  }

  return en_messages; //Default locale

}

export function addLocalizationData(){

  locales.map((l)=>{
    addLocaleData(l.data);
    return l;
  });

}


export default locales;
