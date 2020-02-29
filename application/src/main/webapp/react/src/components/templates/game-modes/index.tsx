import * as React from "react";
import PrimaryButton from "../../atoms/button/primary";

const GameModes = () => {
    return (
        <div>
            <PrimaryButton text={"Battle"} click={() => console.log("Battle Clicked")}/>
            <PrimaryButton text={"Time Attack"} click={() => console.log("Time Attack Clicked")}/>
            <PrimaryButton text={"War"} click={() => console.log("War Clicked")}/>
            <PrimaryButton text={"Tag Team"} click={() => console.log("Tag Team Clicked")}/>
        </div>
    );
};

export default GameModes;
