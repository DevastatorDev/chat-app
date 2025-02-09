import { useRef } from "react";
import InputBox from "./components/InputBox";
import Button from "./components/Button";

export default function App() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="">
      <InputBox placeholder="Enter room id" inputRef={inputRef} />

      <Button
        text="Join Room"
        onClick={() => console.log(inputRef.current?.value)}
      />

      <Button
        text="Create Room"
        onClick={() => console.log(inputRef.current?.value)}
      />
    </div>
  );
}
