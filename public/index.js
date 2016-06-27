import "babel-polyfill";
import React from "react";
import {render} from "react-dom";
import Root from "./routes/index";

if (process.env && process.env.NODE_ENV === "development") {
    const a11y = require('react-a11y');
    a11y(React);
}

render(<Root />, document.getElementById('root'));
