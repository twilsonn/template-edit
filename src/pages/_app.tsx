import type { AppProps } from "next/app";

import "@/styles/index.css";
import "@/styles/react-split-pane.css";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
