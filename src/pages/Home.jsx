import { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SliderHome from "../components/Slider";
import Wrapper from "../components/wrapper/Wrapper";

const Home = () => {
  let navigate=useNavigate();
  useEffect(() => {
    if (localStorage.getItem("Scaler")) {
      navigate("/");
    }
    else{
      navigate("/login");
    }
  }, []);

  return (
    <Fragment>
      <SliderHome />
      <Wrapper/>
    </Fragment>
  );
};

export default Home;
