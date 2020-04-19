
export function shuffle_array(array) {
    var aux, random_index, current_index = array.length;
    while (current_index != 0) {
        random_index = Math.floor(Math.random() * current_index);
        current_index -= 1;
        aux = array[current_index];
        array[current_index] = array[random_index];
        array[random_index] = aux;
    }

  return array;
}
