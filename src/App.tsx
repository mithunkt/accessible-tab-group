import React from "react";
import Tabs from "./components/Tabs";
import Tab from "./components/Tab";
import "./App.css";

const App = () => (
  <>
    <h1>Accessible Tab Groups</h1>
    <h2>Fruits</h2>
    <Tabs name="Fruits">
      <Tab label="Apple">
        <p>
          An apple is an edible fruit produced by an apple tree. Apple trees are
          cultivated worldwide and are the most widely grown species in the
          genus Malus.
        </p>
      </Tab>
      <Tab label="Banana">
        <p>Tab content Banana</p>
      </Tab>
      <Tab label="Grape">
        <p>Tab content Grape</p>
      </Tab>
    </Tabs>
    <h2>Animals</h2>
    <Tabs name="Animals">
      <Tab label="Cat">
        <p>
          The cat is a domestic species of small carnivorous mammal. It is the
          only domesticated species in the family Felidae and is often referred
          to as the domestic cat to distinguish it from the wild members of the
          family.
        </p>
      </Tab>
      <Tab label="Dog">
        <p>Tab content Dog</p>
      </Tab>
    </Tabs>
  </>
);

export default App;
