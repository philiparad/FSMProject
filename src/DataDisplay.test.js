import { fireEvent, render, screen, waitFor, getByRole } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import DataDisplay from './DataDisplay';

describe('DataDisplay Test', () => {
  test('render DataDisplay', async () => {
    act(() => {
	  //Create mock server responses
      let randomCountries = [{"name":{"common":"Spain","official":"Kingdom of Spain","nativeName":{"spa":{"official":"Reino de España","common":"España"}}},"tld":[".es"],"cca2":"ES","ccn3":"724","cca3":"ESP","cioc":"ESP","independent":true,"status":"officially-assigned","unMember":true,"currencies":{"EUR":{"name":"Euro","symbol":"€"}},"idd":{"root":"+3","suffixes":["4"]},"capital":["Madrid"],"altSpellings":["ES","Kingdom of Spain","Reino de España"],"region":"Europe","subregion":"Southern Europe","languages":{"spa":"Spanish","cat":"Catalan","eus":"Basque","glc":"Galician"},"translations":{"ara":{"official":"مملكة إسبانيا","common":"إسبانيا"},"bre":{"official":"Rouantelezh Spagn","common":"Spagn"},"ces":{"official":"Španělské království","common":"Španělsko"},"cym":{"official":"Kingdom of Spain","common":"Spain"},"deu":{"official":"Königreich Spanien","common":"Spanien"},"est":{"official":"Hispaania Kuningriik","common":"Hispaania"},"fin":{"official":"Espanjan kuningaskunta","common":"Espanja"},"fra":{"official":"Royaume d'Espagne","common":"Espagne"},"hrv":{"official":"Kraljevina Španjolska","common":"Španjolska"},"hun":{"official":"Spanyol Királyság","common":"Spanyolország"},"ita":{"official":"Regno di Spagna","common":"Spagna"},"jpn":{"official":"スペイン王国","common":"スペイン"},"kor":{"official":"에스파냐 왕국","common":"스페인"},"nld":{"official":"Koninkrijk Spanje","common":"Spanje"},"per":{"official":"پادشاهی اسپانیا","common":"اسپانیا"},"pol":{"official":"Królestwo Hiszpanii ","common":"Hiszpania"},"por":{"official":"Reino de Espanha","common":"Espanha"},"rus":{"official":"Королевство Испания","common":"Испания"},"slk":{"official":"Španielske kráľovstvo","common":"Španielsko"},"spa":{"official":"Reino de España","common":"España"},"srp":{"official":"Краљевина Шпанија","common":"Шпанија"},"swe":{"official":"Konungariket Spanien","common":"Spanien"},"tur":{"official":"İspanya Krallığı","common":"İspanya"},"urd":{"official":"مملکتِ ہسپانیہ","common":"ہسپانیہ"},"zho":{"official":"西班牙王国","common":"西班牙"}},"latlng":[40,-4],"landlocked":false,"borders":["AND","FRA","GIB","PRT","MAR"],"area":505992,"demonyms":{"eng":{"f":"Spanish","m":"Spanish"},"fra":{"f":"Espagnole","m":"Espagnol"}},"flag":"🇪🇸","maps":{"googleMaps":"https://goo.gl/maps/138JaXW8EZzRVitY9","openStreetMaps":"https://www.openstreetmap.org/relation/1311341"},"population":47351567,"gini":{"2018":34.7},"fifa":"ESP","car":{"signs":["E"],"side":"right"},"timezones":["UTC","UTC+01:00"],"continents":["Europe"],"flags":{"png":"https://flagcdn.com/w320/es.png","svg":"https://flagcdn.com/es.svg","alt":"The flag of Spain is composed of three horizontal bands of red, yellow and red, with the yellow band twice the height of the red bands. In the yellow band is the national coat of arms offset slightly towards the hoist side of center."},"coatOfArms":{"png":"https://mainfacts.com/media/images/coats_of_arms/es.png","svg":"https://mainfacts.com/media/images/coats_of_arms/es.svg"},"startOfWeek":"monday","capitalInfo":{"latlng":[40.4,-3.68]},"postalCode":{"format":"#####","regex":"^(\\d{5})$"}},{"name":{"common":"Montenegro","official":"Montenegro","nativeName":{"cnr":{"official":"Црна Гора","common":"Црна Гора"}}},"tld":[".me"],"cca2":"ME","ccn3":"499","cca3":"MNE","cioc":"MNE","independent":true,"status":"officially-assigned","unMember":true,"currencies":{"EUR":{"name":"Euro","symbol":"€"}},"idd":{"root":"+3","suffixes":["82"]},"capital":["Podgorica"],"altSpellings":["ME","Crna Gora"],"region":"Europe","subregion":"Southeast Europe","languages":{"cnr":"Montenegrin"},"translations":{"ara":{"official":"الجبل الاسود","common":"الجبل الاسود"},"bre":{"official":"Republik Montenegro","common":"Montenegro"},"ces":{"official":"Černá Hora","common":"Černá Hora"},"cym":{"official":"Montenegro","common":"Montenegro"},"deu":{"official":"Montenegro","common":"Montenegro"},"est":{"official":"Montenegro","common":"Montenegro"},"fin":{"official":"Montenegro","common":"Montenegro"},"fra":{"official":"Monténégro","common":"Monténégro"},"hrv":{"official":"Crna Gora","common":"Crna Gora"},"hun":{"official":"Montenegró","common":"Montenegró"},"ita":{"official":"Montenegro","common":"Montenegro"},"jpn":{"official":"モンテネグロ","common":"モンテネグロ"},"kor":{"official":"몬테네그로","common":"몬테네그로"},"nld":{"official":"Montenegro","common":"Montenegro"},"per":{"official":"مونته‌نگرو","common":"مونته‌نگرو"},"pol":{"official":"Czarnogóra","common":"Czarnogóra"},"por":{"official":"Montenegro","common":"Montenegro"},"rus":{"official":"Черногория","common":"Черногория"},"slk":{"official":"Čierna Hora","common":"Čierna Hora"},"spa":{"official":"Montenegro","common":"Montenegro"},"srp":{"official":"Црна Гора","common":"Црна Гора"},"swe":{"official":"Montenegro","common":"Montenegro"},"tur":{"official":"Karadağ","common":"Karadağ"},"urd":{"official":"مونٹینیگرو","common":"مونٹینیگرو"},"zho":{"official":"黑山","common":"黑山"}},"latlng":[42.5,19.3],"landlocked":false,"borders":["ALB","BIH","HRV","UNK","SRB"],"area":13812,"demonyms":{"eng":{"f":"Montenegrin","m":"Montenegrin"},"fra":{"f":"Monténégrine","m":"Monténégrin"}},"flag":"🇲🇪","maps":{"googleMaps":"https://goo.gl/maps/4THX1fM7WqANuPbB8","openStreetMaps":"https://www.openstreetmap.org/relation/53296"},"population":621718,"gini":{"2016":38.5},"fifa":"MNE","car":{"signs":["SCG"],"side":"right"},"timezones":["UTC+01:00"],"continents":["Europe"],"flags":{"png":"https://flagcdn.com/w320/me.png","svg":"https://flagcdn.com/me.svg","alt":"The flag of Montenegro features a large red central rectangular area surrounded by a golden-yellow border. The coat of arms of Montenegro is centered in the red rectangle."},"coatOfArms":{"png":"https://mainfacts.com/media/images/coats_of_arms/me.png","svg":"https://mainfacts.com/media/images/coats_of_arms/me.svg"},"startOfWeek":"monday","capitalInfo":{"latlng":[42.43,19.27]},"postalCode":{"format":"#####","regex":"^(\\d{5})$"}}];
      render(<DataDisplay data={randomCountries}/>);
    });
    screen.debug();
    expect(screen.getByText(/Name/i)).toBeInTheDocument;
    expect(screen.getByText(/Capital/i)).toBeInTheDocument;
    expect(screen.getByText(/Population/i)).toBeInTheDocument;
  });
});
