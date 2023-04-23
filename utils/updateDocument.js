import { db } from '@/firebase/clientApp';

export default function setCollection({ collection, doc, data }) {
  db.collection(collection)
    .doc(doc)
    .update(data)
    .then(() => console.log('Update success'))
    .catch((error) => console.error('Error updating', error));
}
