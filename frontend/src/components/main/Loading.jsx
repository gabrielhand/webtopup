import NProgress from "nprogress";
import "./nprogress.css";

const Loading = () => {
  NProgress.configure({ showSpinner: false, trickleSpeed: 200 });
  return null;
};

export default Loading;
