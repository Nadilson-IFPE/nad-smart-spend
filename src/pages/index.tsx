import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="">
        <h1 className="text-center text-white m-0">Gastos</h1>
        <h2 className="text-center text-white m-0">R$ 10.000,00</h2>
        <form className="mt-5">
          <div className="flex gap-[5px] mb-[5px]">
            <input type="text" placeholder={''} className="mb-[5px] rounded-[5px] bg-transparent white w-full border-2 border-solid border-[#30313D] p-[5px] pt-[2px] pr-[5px]" />
            <input type="datetime-local" className="bg-gray-500 mb-[5px] rounded-[5px] bg-transparent w-full border-2 border-solid border-[#30313D] p-[5px] pt-[2px] pr-[5px]" />
          </div>
          <div className="description">
            <input type="text" placeholder={'Descreva o gasto...'} className="mb-[5px] rounded-[5px] bg-transparent w-full border-2 border-solid border-[#30313D] p-[5px] pt-[2px] pr-[5px]" />
          </div>
          <button type="submit" className="w-full mt-[5px] border-0 rounded-[5px] p-[5px] bg-gray-300 hover:bg-gray-500 text-black">Adicionar novo gasto</button>
        </form>
        <div className="mt-[10px]">
          <div className="flex pt-[5px] pr-0 justify-between mb-2 border-t border-solid border-[#30313D] first:border-t-0">
            <div className="text-left">
              <div className="text-base">Celular</div>
              <div className="text-xs text-gray-400">Informações sobre o gasto</div>
            </div>
            <div className="text-right">
              <div className="text-red-600">-R$ 1.000.00</div>
              <div className="text-xs text-gray-500">22/03/1973</div>
            </div>
          </div>

          <div className="flex pt-[5px] pr-0 justify-between mb-2 border-t border-solid border-[#30313D] first:border-t-0">
            <div className="text-left">
              <div className="text-base">Manutenção de PC</div>
              <div className="text-xs text-gray-400">Informações gerais</div>
            </div>
            <div className="text-right">
              <div className="text-green-600">R$ 100,00</div>
              <div className="text-xs text-gray-500">22/03/2023</div>
            </div>
          </div>

          <div className="flex pt-[5px] pr-0 justify-between mb-2 border-t border-solid border-[#30313D] first:border-t-0">
            <div className="text-left">
              <div className="text-base">TV LG</div>
              <div className="text-xs text-gray-400">Informações sobre o gasto</div>
            </div>
            <div className="text-right">
              <div className="text-red-600">-R$ 2.600.00</div>
              <div className="text-xs text-gray-500">22/03/2023</div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
