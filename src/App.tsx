import React from "react";
import Tabs from "./components/Tabs";
import Tab from "./components/Tab";
import "./App.css";

const App = () => {
  return (
    <>
      <h1>Accessible Tab Groups</h1>
      <h2>Fruits</h2>
      <Tabs name="Fruits">
        <Tab label="Apple">
          <div>
            An apple is an edible fruit produced by an apple tree. Apple trees
            are cultivated worldwide and are the most widely grown species in
            the genus Malus.
          </div>
        </Tab>
        <Tab label="Banana">
          <div>Tab content Banana</div>
        </Tab>
        <Tab label="Grape">
          <div>Tab content Grape</div>
        </Tab>
      </Tabs>
      <h2>Animals</h2>
      <Tabs name="Animals">
        <Tab label="Cat">
          <div>The cat is a domestic species of small carnivorous mammal. It is the only domesticated species in the family Felidae and is often referred to as the domestic cat to distinguish it from the wild members of the family.</div>
        </Tab>
        <Tab label="Dog">
          <div>Tab content Dog</div>
        </Tab>
      </Tabs>
    </>
  );
};

export default App;
