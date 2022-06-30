import firebase from "../js/Firebase";

export const selectablePaymentMethods = [
  { label: "Barzahlung", value: "cash" },
  { label: "EC-Karte", value: "debit-card" },
  { label: "Kreditkarte", value: "credit-card" },
  { label: "PayPal", value: "paypal" },
];

export async function uploadImage(uri) {
  const response = await fetch(uri);
  const imageBlob = await response.blob();

  const metadata = {
    contentType: "image/jpeg",
  };
  const name = generateUUID() + "-media.jpg";
  const imageRef = firebase.storage.ref().child("images/" + name);

  const snapshot = await imageRef.put(imageBlob, metadata);
  const downloadURL = await snapshot.ref.getDownloadURL();

  return downloadURL;
}

export function generateUUID() {
  // Public Domain/MIT
  var d = new Date().getTime(); //Timestamp
  var d2 = (performance && performance.now && performance.now() * 1000) || 0; //Time in microseconds since page-load or 0 if unsupported
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = Math.random() * 16; //random number between 0 and 16
    if (d > 0) {
      //Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      //Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

/* copied from https://www.w3resource.com/javascript-exercises/javascript-date-exercise-24.php */
export function getWeekNumber(dt) {
  let tdt = new Date(dt.valueOf());
  let dayn = (dt.getDay() + 6) % 7;
  tdt.setDate(tdt.getDate() - dayn + 3);
  let firstThursday = tdt.valueOf();
  tdt.setMonth(0, 1);
  if (tdt.getDay() !== 4) {
    tdt.setMonth(0, 1 + ((4 - tdt.getDay() + 7) % 7));
  }
  return 1 + Math.ceil((firstThursday - tdt) / 604800000);
}
