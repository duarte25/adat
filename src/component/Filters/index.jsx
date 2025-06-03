export default function Filters({ inputSelect }) {
  return (
    <div className="flex flex-row items-center w-full bg-beige p-5 gap-5" >
      <div className="flex flex-row justify-center w-full gap-5">
        {inputSelect}
      </div>
    </div>
  );
}
