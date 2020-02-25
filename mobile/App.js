import React from "react";
import { StatusBar, YellowBox } from "react-native";
import Routes from "./src/routes";

//Permite ignorar alertas que podem ocorrer na aplicação
YellowBox.ignoreWarnings([
  //parte do texto que quero ignorar
  "Unrecognized WebSocket"
]);

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7D40E7" />
      <Routes />
    </>
  );
}
