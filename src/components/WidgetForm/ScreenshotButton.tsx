import html2canvas from "html2canvas";
import { Camera, Trash } from "phosphor-react";
import { useState } from "react";
import { Loading } from "../Loading";

interface IScreenshotButtonProps {
    onScreenshotTook: (screenshot: string | null)=>void;
    screenshot: string | null;
}

export function ScreenshotButton(props: IScreenshotButtonProps){

    const [isTakingScreenshot, setIsTakingScreenshot]=useState(false)

    async function handleScreenshot(){
        setIsTakingScreenshot(true);

        const canvas = await html2canvas(document.querySelector('html')!);
        const base64img = canvas.toDataURL("image/png");

        props.onScreenshotTook(base64img);

        setIsTakingScreenshot(false);
    }

    if(props.screenshot){
        return (
            <button
                type="button"
                className="p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors"
                style={{
                    backgroundImage: `url(${props.screenshot})`,
                }}
                onClick={()=>props.onScreenshotTook(null)}
            >
                <Trash weight="fill"/>
            </button>
        );
    }

    return (
        <button type="button" className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors" onClick={handleScreenshot}>
                {isTakingScreenshot ? <Loading/> : <Camera className="w-6 h-6"/>}
        </button>
    );
}