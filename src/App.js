import "./App.css";
import React from "react";
import MapContainer from "./components/MapContainer";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/index" exact component={MapContainer}></Route>
          <Route path="/login" exact component={LoginForm}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
