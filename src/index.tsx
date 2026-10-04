import { App } from "./components/app";
import React from "react";
import { createRoot } from "react-dom/client";

const domNode = document.getElementById("root")!;
const root = createRoot(domNode);

root.render(<App />);
