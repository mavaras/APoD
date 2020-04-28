import { PermissionsAndroid } from 'react-native';


export function shuffle_array(array) {
  let aux;
  let random_index;
  let current_index = array.length;
  while (current_index !== 0) {
    random_index = Math.floor(Math.random() * current_index);
    current_index -= 1;
    aux = array[current_index];
    array[current_index] = array[random_index];
    array[random_index] = aux;
  }

  return array;
}


export async function request_storage_runtime_permission_android() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'ReactNativeCode Storage Permission',
        message: 'ReactNativeCode App needs access to your storage to download Photos.'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Storage Permission Granted');
    } else {
      console.log('Storage Permission Not Granted');
    }
  } catch (err) {
    console.log(`Some error while granting storage access: ${err}`);
  }
}
