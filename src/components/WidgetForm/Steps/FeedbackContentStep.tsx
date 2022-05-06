import { ArrowLeft, Camera } from "phosphor-react";
import { FormEvent, useState } from "react";
import { fbTypes, FeedbackType } from "..";
import { api } from "../../../lib/Api";
import { CloseButton } from "../../CloseButton";
import { Loading } from "../../Loading";
import { ScreenshotButton } from "../ScreenshotButton";

interface IFeedbackContentStep {
    fbType: FeedbackType;
    onFbRestarted: ()=>void;
    onFbSent: ()=>void;
}

export function FeedbackContentStep(props: IFeedbackContentStep){

    const [screenshot, setScreenshot] = useState<string | null>(null);
    const [comment, setComment] = useState("");
    const [isSendingFeedback, setIsSendingFeedback] = useState(false);

    const fbTypeInfo = fbTypes[props.fbType]

    async function submitFb(event: FormEvent){
        setIsSendingFeedback(true);

        event.preventDefault(); //para o html n att a página ao dar o submit (comportamento padrão)

        await api.post('/feedbacks', {
            type: props.fbType,
            comment,
            screenshot
        });

        setIsSendingFeedback(false);
        props.onFbSent();
    }

    return (
        <>
        <header>
            <button type="button" className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100">
                <ArrowLeft weight="bold" className="w-4 h-4" onClick={props.onFbRestarted}/>
            </button>
            <span className="text-xl leading-6 flex items-center gap-2" >
                <img src={fbTypeInfo.image.source} alt={fbTypeInfo.image.alt} className="w-6 h-6"/>
                {fbTypeInfo.title}
                </span>
            <CloseButton/>
        </header>

    <form onSubmit={submitFb} className="my-4 w-full">
        <textarea
        onChange={event => setComment(event.target.value)} //pegando o q o user digitou
        className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none"
        placeholder="Conte com detalhes o que está acontecendo..."
        />

        <footer className="flex gap-2 mt-2">

            <ScreenshotButton
                screenshot={screenshot}
                onScreenshotTook={setScreenshot}
            />

            <button type="submit" className="p-2 bg-brand-500 rounded-md border-transparent flex-1  flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500" disabled={comment.length<1 || isSendingFeedback}>
                {isSendingFeedback ? <Loading/> : 'Enviar feedback'}
            </button>
        </footer>
    </form>
    </>
    )
}