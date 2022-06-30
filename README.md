# T3M40401.1 Mobile Computing - Finance App

Die im Zuge der Vorlesung „Mobile Computing“ entwickelte mobile App, soll bei der Verwaltung der Finanzen einer Person bzw. eines ganzen Haushalts helfen. 
Wie ein klassisches Haushaltsbuch soll die App dafür genutzt werden die Einnahmen und Ausgaben eines Haushalts zu dokumentieren. 
Neben dem jeweiligen Betrag der Ein- bzw. Ausgabe werden Informationen zum Datum, der Kategorie und der Bezahlmethode hinzugefügt. 
In einer Liste werden alle Einträge aufgeführt, wodurch es möglich ist, regelmäßige und unregelmäßige Ausgaben genau festzustellen. 
Durch den Einsatz der integrierten Kamera eines Smartphones bietet sich zusätzlich die Möglichkeit den Kassenzettel oder eine Rechnung eines Einkaufs abzufotografieren und an einen Eintrag im digitalen Haushaltsbuch anzuheften.

<table>
  <tr>
    <td><img src="https://user-images.githubusercontent.com/38072209/176488567-f389e5dd-6089-4721-a349-3e7dca2d13fb.png" height=480></td>
    <td><img src="https://user-images.githubusercontent.com/38072209/176488393-5657a4e3-699a-40c2-8b13-ec31bbdc59ea.png" height=480></td>
    <td><img src="https://user-images.githubusercontent.com/38072209/176488611-ac6edaed-14c0-4907-ae2d-56b4e1c88f7a.png" height=480></td>
  </tr>
 </table>

## Vorbereitungen zum Starten der Anwendung
### Expo managed workflow
- `npm install --global expo-cli` zum Installieren der Expo CLI
- `npm install` im Ordner finance-app (Das ZIP RNManaged enthält bereits die node_modules)

### Expo bare workflow
- Android Studio muss heruntergeladen und für die Verwendung von React Native konfiguriert worden sein
- Im AVD Manager muss ein Android Emulator konfiguriert werden
- Die einzelnen Pakete müssen installiert werden (Das ZIP RNBare enthält bereits die node_modules)

Hinweis: Wenn die Fehlermeldung "npm ERR! Failed at the grpc@1.24.2 install script." auftritt muss zunächst firebase auf den aktuellen Stand gebracht werden. Das kann allerdings zu einer Inkompatibilität mit Expo führen! Siehe: [Link](https://github.com/grpc/grpc-node/issues/1183#issuecomment-596956959)
- Löschen des node_modules Ordners und der package-lock.json
- Ausführen des Befehls `npm install --save-exact --save firebase@latest`

## Starten der Anwendung
### Expo managed workflow
- Öffnen des Terminal im Ordner finance-app
- Ausführen des Befehls `expo start`
- Starten des iOS bzw. Android Simulators/Emulators
- In den Expo Developer Tools (im Browser) auf "Run on iOS bzw. Android" klicken
- Warten bis die Expo App im Simulator/Emulator geöffnet und die eigene App heruntergeladen wurde

### Expo bare workflow
- Öffnen des Terminal im Ordner finance-app
- Ausführen des Befehls `npm run android`
- Der Android Emulator startet automatisch
- Nach etwas Wartezeit startet auch die App automatisch

## Eingesetzte Bibliotheken

- [React Native](https://reactnative.dev/docs/components-and-apis)
- [React Navigation](https://reactnavigation.org/docs/getting-started)
- [Redux](https://redux.js.org/api/api-reference)
- [Firebase](https://firebase.google.com/docs/reference/js)
- [Segment Control](https://github.com/react-native-segmented-control/segmented-control)
- [Picker](https://github.com/react-native-picker/picker)
- [Datetime Picker](https://github.com/react-native-datetimepicker/datetimepicker)
- [React Native Chart Kit](https://github.com/indiespirit/react-native…)
- [Currency Input](https://github.com/CaioQuirinoMedeiros/react-native-currency-input)
- [Gesture Handler - Swipeable](https://docs.swmansion.com/react-native-gesture-handler/docs/api/components/swipeable)
- [SafeAreaContext](https://docs.expo.io/versions/v40.0.0/sdk/safe-area-context/)
- [StatusBar](https://docs.expo.io/versions/v40.0.0/sdk/status-bar/#statusbarstyle)
- [Icons](https://docs.expo.io/guides/icons/)
- [BlurView](https://docs.expo.io/versions/v40.0.0/sdk/blur-view/)
- [Camera](https://docs.expo.io/versions/latest/sdk/camera/)

## Offene Punkte/Probleme
- Problem bei der Verwendung von Firebase in Android (siehe [Link](https://github.com/facebook/react-native/issues/12981))
- Die Kamera-Funktionalität konnte nicht mit einem Android Smartphone getestet werden (kein Android-Gerät im Besitz, das Kamera Paket unterstützt den Android Emulator nicht)

## Ideen/Erweiterungen für zukünftige Versionen
- Verbesserung der Animationen durch den Einsatz von Reanimated und/oder Lottie
- Möglichkeit Bilder aus der Galerie mit Hilfe eines [ImagePicker](https://docs.expo.io/versions/v40.0.0/sdk/imagepicker/) einzubinden
