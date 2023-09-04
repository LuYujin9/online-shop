//import { useState } from "react";
import "./App.css";
import { products } from "../public/data";
import ProductCardList from "./components/ProductCard/ProductList";

function App() {
  return <ProductCardList products={products} />;
}
export default App;
