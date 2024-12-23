import Image from "next/image";
import AddProdBtn from "./components/AddProdBtn";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen bg-neutral">
      <AddProdBtn />
      <h1>Home Page</h1>
    </div>
  );
}
