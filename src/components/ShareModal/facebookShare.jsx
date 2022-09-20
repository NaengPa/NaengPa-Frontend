import React from "react";
import { ReactComponent as Facebook } from "../../assets/facebook.svg";

const FacebookShare = () => {
  const shareFacebook = () => {
    window.open(`http://www.facebook.com/sharer.php?u=${window.location.href}`);
  };

  return <Facebook onClick={shareFacebook}></Facebook>;
};

export default FacebookShare;
