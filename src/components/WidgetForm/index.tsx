import { useState } from "react";
import { CloseButton } from "../CloseButton";
import bugImg from '../../assets/bug.svg';
import ideaImg from '../../assets/idea.svg';
import thoughtImg from '../../assets/thought.svg';
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";

export const fbTypes = {
    BUG: {
        title: "Problema",
        image: {
            source: bugImg,
            alt: "Imagem de um inseto"
        }
    },
    IDEA: {
        title: "Ideia",
        image: {
            source: ideaImg,
            alt: "Image de uma lâmpada"
        }
    },
    OTHER: {
        title: "Outro",
        image: {
            source: thoughtImg,
            alt: "Image de um balão de pensamento"
        }
    },
};

export type FeedbackType = keyof typeof fbTypes;//criação de um novo tipo de acordo com os tipos das chaves de fbTypes

export function WidgetForm() {
    const [fbType, setFbType] = useState<FeedbackType | null >(null)
    const [fbSent, setFbSent]=useState(false);

    function handleRestartFb(){
        setFbSent(false);
        setFbType(null);
    }

    return (
        <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">

           {fbSent ? (
               <FeedbackSuccessStep onFbRestarted={handleRestartFb}/>
           ):
            <>
             {!fbType ? (
                <FeedbackTypeStep onFbTypeChanged={setFbType} />
            ) : (
                <FeedbackContentStep fbType={fbType} onFbRestarted={handleRestartFb} onFbSent={()=>setFbSent(true)}/>  
            )}
            </>
        }

            <footer className="text-xs text-neutral-400">
                Desenhado por <a className="underline underline-offset-2" href="https://www.internetsat.com.br">InternetSAT</a>
            </footer>
        </div>
    );
}