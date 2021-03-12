import { NavBar } from "../components/NavBar";

const Index = (props) => {
  console.log("THE PROPS ARE");
  return (
    <>
      {" "}
      <NavBar landing={true} /> <div> Hello World </div>{" "}
    </>
  );
};

export default Index;
