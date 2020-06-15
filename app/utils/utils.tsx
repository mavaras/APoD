import { PermissionsAndroid } from 'react-native';


export function shuffleArray(array: any[]): any[] {
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

export function filterByWord(array: any[], text: string): any[] {
  return array.filter((element: {[string: string]: string}) =>
    element.title.toLowerCase().includes(text.toLowerCase()));
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

export async function requestStoragePermissionAndroid() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'ReactNativeCode Storage Permission',
        message: 'ReactNativeCode App needs access to your storage to download Photos.',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Storage Permission Granted');
    } else {
      console.log('Storage Permission Not Granted');
    }
  } catch (err) {
    console.log(`Some error while granting storage access: ${err}`);
  }
}
