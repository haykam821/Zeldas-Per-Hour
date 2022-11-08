require("file-loader?name=[name].[ext]!html-minify-loader!./index.html");

const React = require("react");
const { createRoot } = require("react-dom/client");

const App = require("./components/app.jsx");

const root = createRoot(document.getElementById("app"));
root.render(<App />);
