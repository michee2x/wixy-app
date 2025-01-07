export const AddOrUpdate = (array, newObject) => {
            //find the index of the object with thesame id
            const index = array.findIndex(obj => obj._id === newObject._id)

            if(index > -1){
                //if found, merge the existing object with the new one
                array[index] = {...array[index], ...newObject};
            } else {
                //if not found, add the new object to the array
                array.push(newObject)
            }
            console.log("hey boss this is the updated allcovnersations", array)
            return array;
        }