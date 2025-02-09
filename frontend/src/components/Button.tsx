interface ButtonInterface {
  text: string;
  onClick: () => void;
}

export default function Button({ text, onClick }: ButtonInterface) {
  return (
    <button
      className="px-4 py-2 border-2 border-black rounded-xl text-xl w-full"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
