import { css } from "@linaria/core";
import { Route, Switch } from "wouter";
import Home from "./pages/landing/index";
import Nav from "./components/Nav";

export default function App() {
  return (
    <>
      <Nav />
      <Switch>
        <Route path="/" component={Home} />
      </Switch>
    </>
  );
}

export const globals = css`
  :global() {
    html {
      box-sizing: border-box;
      --theme-color: 72, 68, 236
    }

    body {
      margin: 0;
      font-family: "Eudoxus Sans", system-ui, sans-serif;
      font-weight: 500;
      overflow-x: hidden;
      background-color: #f5f5f5;
    }

    input,
    select,
    textarea {
      font-family: "Eudoxus Sans", system-ui, sans-serif !important;
    }

    a {
      -webkit-tap-highlight-color: transparent;
    }

    ::selection {
      background-color: rgba(var(--theme-color), 0.3);
      color: rgb(var(--theme-color));
    }
  }
`;
