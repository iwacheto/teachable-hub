import "../styles/index.scss";
// import "@uiw/react-textarea-code-editor/dist.css";
import { Provider } from "react-redux";
import { store } from "../store/store";
import Notification from "../components/notification/Notification";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Notification />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
