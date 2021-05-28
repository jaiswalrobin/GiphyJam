import "./App.css";
import React from "react";
import Layout from "./Components/Layout";
import Container from "./containers/Container";
import Navbar from "./Components/Navbar/Navbar";

const App = (props) => {
  return (
    <Layout>
      <Navbar />
    </Layout>
  );
};

export default App;
