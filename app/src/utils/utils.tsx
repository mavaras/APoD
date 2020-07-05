import { PermissionsAndroid } from 'react-native';
import { NASA_API_KEY } from 'react-native-dotenv';

import FirebaseDB from '../config';


export function shuffleArray(array: Array<any>): Array<any> {
  let aux: any;
  let randomIndex: number;
  let currentIndex: number = array.length;
  const resArray: any[] = array;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    aux = array[currentIndex];
    resArray[currentIndex] = array[randomIndex];
    resArray[randomIndex] = aux;
  }

  return resArray;
}

export function formatDate(date: string): string {
  const monthNames: Array<string> = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  const dateSplit: Array<string> = date.split('-');
  return `${monthNames[parseInt(dateSplit[1], 10) - 1]} ${parseInt(dateSplit[2], 10)}`;
}

export function filterByWord(
  array: Array<any>,
  text: string,
  toExclude: string = '',
): Array<any> {
  return array.filter((element: {[string: string]: string}) =>
    element.title.toLowerCase().includes(text.toLowerCase())
    && element.title !== toExclude);
}

export function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function getTodayStringDate(): string {
  const today: Date = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
}

export function equalDates(date1: string, date2: string): boolean {
  return date1 === date2;
}

async function wait(time: number) {
  return new Promise((aux) => {
    setTimeout(aux, time);
  });
}

export async function fetchData(params: any): Promise<{[string: string]: string}> {
  const DB = FirebaseDB.instance; // eslint-disable-line no-undef
  let response: any;

  if (!params) {
    let mustQuery: boolean = true;
    let lastPicture: any = null;

    await DB.pictures
      .limitToLast(1)
      .once('value', (data: any) => {
        // eslint-disable-next-line prefer-destructuring
        lastPicture = Object.values(data.val())[0];
        const today = new Date();
        // eslint-disable-next-line prefer-template
        const todayDate: string = `${today.getFullYear()}-${('0' + (today.getMonth() + 1)).slice(-2)}-${('0' + today.getDate()).slice(-2)}`;
        mustQuery = todayDate !== lastPicture.date;
      });

    if (mustQuery) {
      const controller: AbortController = new AbortController();
      setTimeout(() => controller.abort(), 10000);
      await fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`, { signal: controller.signal })
        .then((_response) => _response.json())
        .then((responseJson) => {
          if (!('error' in responseJson) && responseJson) {
            response = responseJson;
            DB.pictures
              .orderByChild('title')
              .equalTo(responseJson.title)
              .once('value')
              .then((snapshot: any) => {
                if (response.title !== 'Default Image') {
                  if (!snapshot.val()) {
                    // eslint-disable-next-line no-nested-ternary
                    const anyAuthor: string = 'author' in responseJson ? responseJson.author : ('copyright' in response) ? response.copyright : '';
                    DB.pictures.push({
                      title: responseJson.title,
                      explanation: responseJson.explanation,
                      url: responseJson.url,
                      date: responseJson.date,
                      author: anyAuthor,
                    });
                  }
                  response = responseJson;
                } else {
                  response = lastPicture;
                }
              });
          } else {
            throw new Error('error in response');
          }
        })
        .catch(() => { throw new Error('error in fetching'); });
    } else {
      response = lastPicture;
    }
  } else {
    response = params.attrs;
  }

  await wait(2000);
  return response;
}

export async function requestStoragePermissionAndroid() {
  try {
    const granted: string = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'ReactNativeCode Storage Permission',
        message: 'ReactNativeCode App needs access to your storage to download Photos.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      log('Storage Permission Granted');
    } else {
      log('Storage Permission Not Granted');
    }
  } catch (err) {
    log(`Some error while granting storage access: ${err}`);
  }
}

export function log(content: string): void {
  console.log(content);
}

/*
async function loadData(): Promise<void> {
  if (pictures.length === picturesList.length) {
    return;
  }
  setRefreshing(true);
  await DB.pictures
    .once('value', (data: any) => {
      picturesList = data.val();
      this.picturesList = Object.values(picturesList);
      this.picturesList = this.picturesList.filter((picture: {[string: string]: string})
      : {[string: string]: string} | undefined => {
        if (!['youtube', 'vimeo'].some((aux) => picture.url.split(/[/.]/).includes(aux))) {
          return picture;
        }
      });
      getNextItems();
    })
    .catch(() => setError(true));
}
*/
