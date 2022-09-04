import ReactDOM from "react-dom";

const LoadingPortal = ({ children }) => {
  const loading = document.getElementById("global-loading");
  return ReactDOM.createPortal(children, loading);
};

export default LoadingPortal;
