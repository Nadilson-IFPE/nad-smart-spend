import { ReactNode } from "react";
import infotip from '/public/infotip.png'
import Image from "next/image";

interface InfoTipDialogProps {
    text: string;
    isOpen: boolean;
    children?: ReactNode;
    toggle: () => void;
}

const InfoTipDialog = (props: InfoTipDialogProps) => {

    return (
        <>
            {props.isOpen && (
                <div className="grid place-items-center fixed select-none rounded-lg z-50 p-5 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full items-center content-center justify-center">
                    <div className="relative w-full max-w-md max-h-full rounded-lg items-center content-center justify-center" onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
                        <div className="relative bg-[#243653] rounded-lg shadow">
                            <div className="p-6 text-justify bg-[#243653] rounded-lg pb-16">
                                <div className="flex gap-2 text-3xl rounded-lg">
                                    <Image src={infotip} width={48} height={48} className="mb-2" alt="" />
                                    <span className="font-bold text-xl text-yellow-300 pt-3 px-2">Dicas de como usar</span>
                                </div>
                                <div className="relative w-full border-[1px] border-gray-600 mb-10" />
                                <h3 className="mb-10 text-base font-normal text-yellow-100" dangerouslySetInnerHTML={{ __html: props.text }}></h3>
                                <div className="relative w-full border-[1px] border-gray-600 mb-10" />
                                <button type="button" onClick={props.toggle} className="float-right text-white font-bold bg-gray-500 hover:bg-gray-600 rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                    OK
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )

}

export default InfoTipDialog