import { hydrateRoot, createRoot } from "react-dom/client";
import "@fontsource/instrument-serif/latin-400-italic.css";
import "./styles.css";
import App from "./App";

const root = document.getElementById("root")!;
if (root.hasChildNodes()) hydrateRoot(root, <App />);
else createRoot(root).render(<App />);
