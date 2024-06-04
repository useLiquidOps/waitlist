import { css } from "@linaria/core";
import { Route, Switch } from "wouter";
import Berlin from "./berlin";
import Home from "./index";
import Blog from "./blog";
import Nav from "./Nav";

export default function App() {
  return (
    <>
      <Nav />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/blog" component={Blog} />
        <Route path="/berlin" component={Berlin} />
      </Switch>
    </>
  );
}

export const globals = css`
  :global() {
    html {
      box-sizing: border-box;
      --theme-color: 0, 10, 255;
    }

    body {
      margin: 0;
      font-family: 'Eudoxus Sans', system-ui, sans-serif;
      font-weight: 500;
      overflow-x: hidden;
      background-color: #F5F5F5;
    }

    input, select, textarea {
      font-family: 'Eudoxus Sans', system-ui, sans-serif !important;
    }

    a {
      -webkit-tap-highlight-color: transparent;
    }

    ::selection {
      background-color: rgba(var(--theme-color), .3);
      color: rgb(var(--theme-color));
    }
  }
`;
