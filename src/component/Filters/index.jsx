import * as React from "react";
import Button from "../Button";

export default function Filters({ inputSelect, onButtonClick }) {
    return (
        <div className="flex flex-col items-center w-full bg-beige p-5 gap-5" >
            <div className="flex flex-row justify-center w-full gap-5">
                {inputSelect}
            </div>
        
                <Button className="w-full" onClick={onButtonClick} />
       
        </div>
    );
}
