import { db } from '@/firebase/clientApp';

export default function setDocument({ collection, doc, data }) {
  db.collection(collection)
    .doc(doc)
    .set(data)
    .then(() => console.log('Write success'));
}
