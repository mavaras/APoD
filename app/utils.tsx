import { PermissionsAndroid } from 'react-native';


export function shuffleArray(array: any[]) {
  let aux;
  let randomIndex;
  let currentIndex = array.length;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    aux = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = aux;
  }

  return array;
}


export async function requestStorageRuntimePermissionAndroid() {
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
