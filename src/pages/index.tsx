import { Key, useEffect, useState } from "react";
import { initMongoose } from "@/lib/mongoose";
import Transaction from "@/models/Transaction";
import { GetStaticProps } from "next";
import eyefill from '/public/eye-fill.svg'
import eyeslash from '/public/eye-slash.svg'
import Image from "next/image";
import Paginator from "@/components/Paginator";
import { paginate } from "@/helpers/paginate";


interface ITransaction {
  name: string;
  description: string;
  price: number;
  datetime: string;
}

export default function Home() {
  //const url = process.env.NEXT_PUBLIC_API_URL + '/transactions';
  const url = '/api/transactions';

  const budget = 0;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [datetime, setDatetime] = useState('');
  const [transactions, setTransactions] = useState<ITransaction[]>([{ name, description, price: 0, datetime }]);
  const [showBudget, setShowBudget] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    getAllTransactions().then((data) => {
      setTransactions(data.data);
    });
  }, []);

  const addNewTransaction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const registerTransaction = fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
        body: JSON.stringify({
          name,
          description,
          price,
          datetime,
        }),
      }).then((response) => {
        response.json().then(json => {
          setName('');
          setDescription('');
          setPrice('');
          setDatetime('');
          setTransactions(json.data);
          getAllTransactions();
        })
      });

    } catch (error) {
      console.log(error);
      setName('');
      setDescription('');
      setPrice('');
      setDatetime('');
    }

  };

  async function getAllTransactions() {
    const req = await fetch(url);
    const response = await req.json();
    setTransactions(response.data);
    return response;
  };

  let balance = 0;
  if (transactions.length > 0) {
    transactions.forEach(function (transaction) {
      balance = balance + transaction.price;
    });
  }
  const availableBudget = (balance + budget).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const paginatedItems = paginate(Array.from(transactions).reverse(), currentPage, pageSize);

  return (
    <>
      <main className="h-screen mx-auto place-items-center max-w-[800px] items-center content-center justify-between">

        <div className="grid min-w-full place-items-center mx-auto content-center items-center justify-center min-h-screen" >

          <h1 className="select-none text-center text-[#7dd3fc] font-bold text-3xl uppercase mt-24">Saldo em conta</h1>
          <div className="bg-transparent p-5 flex justify-center content-center items-center gap-5">

            {/* <h2 className="peer text-center text-white font-bold m-0 text-2xl transition-transform ease-in-out duration-500">{showBudget ? availableBudget : '**********'}</h2> */}
            <h2 className={`peer select-none text-center ` + (balance + budget < 0 ? 'text-red-500' : 'text-green-400') + ` font-bold m-0 text-2xl transition-transform ease-in-out duration-500 ` + (showBudget ? 'blur-none' : 'blur-[9px]')}>{availableBudget}</h2>
            <button onClick={() => setShowBudget(!showBudget)} className="bg-gray-300 hover:bg-gray-400 rounded p-1 text-xs text-gray-600 font-mono cursor-pointer transition-transform ease-in-out duration-500">{/* {showBudget ? 'Ocultar' : 'Exibir'} */}
              <Image src={showBudget ? eyeslash : eyefill} width={24} height={24} className="transition-transform ease-in-out duration-500" alt="Exibir ou ocultar saldo" />
            </button>
          </div>
          <div className="flex">
            <div className="justify-center items-center">
              <form className="p-3 mt-5 w-screen max-w-[800px]" onSubmit={addNewTransaction}>
                <div className="flex gap-[3px] justify-center content-center items-center">
                  <input type="text" value={name} onChange={ev => setName(ev.target.value)} placeholder={`Despesa ou serviço (ex.: Compra de TV)`} className="mb-[5px] rounded-[5px] bg-transparent white w-full border-2 border-solid border-[#30313D] p-[5px] pt-[2px] pr-[5px]" required />
                </div>
                <div className="flex gap-[3px] justify-center content-center items-center">
                  <input type="text" value={price} onChange={ev => setPrice(ev.target.value)} placeholder={'Valor (ex.: +10/-10 para R$ 10,00/-R$ 10,00)'} className="mb-[5px] rounded-[5px] bg-transparent white w-full border-2 border-solid border-[#30313D] p-[5px] pt-[2px] pr-[5px]" required />
                </div>
                <div className="flex gap-[3px] justify-center content-center items-center">
                  <input value={datetime} onChange={ev => setDatetime(ev.target.value)} type="datetime-local" className="text-gray-400 mb-[5px] rounded-[5px] bg-transparent w-full border-2 border-solid border-[#30313D] p-[5px] pt-[2px] pr-[5px]" required />
                </div>
                <div className="flex gap-[5px] justify-center content-center items-center">
                  <input type="text" value={description} onChange={ev => setDescription(ev.target.value)} placeholder={'Descrição breve'} className="mb-[5px] rounded-[5px] bg-transparent w-full border-2 border-solid border-[#30313D] p-[5px] pt-[2px] pr-[5px]" required />
                </div>
                <button type="submit" className="w-full font-bold mt-[5px] border-0 rounded-[5px] p-[6px] bg-gray-300 hover:bg-gray-500 text-black">Adicionar nova transação</button>
              </form>
            </div>
          </div>

          <div className={`p-3 w-screen max-w-[800px] ` + (transactions.length <= 0 ? 'hidden' : '')}>
            <span className="flex mb-4 font-bold text-blue-300 uppercase text-center justify-center content-center items-center">Todos os Registros ({transactions.length})</span>
            <p className="font-bold text-center justify-center content-center items-center mb-4">
              Exibindo página <span className="font-bold text-red-500">{currentPage} de {Math.ceil(transactions.length / pageSize)}</span>
            </p>
            {transactions.length > 0 && paginatedItems.map((transaction, index: Key) => (
              <div key={index} className="flex pt-[5px] pr-0 justify-between mb-2 border-t border-solid border-[#30313D] first:border-t-0 gap-2">
                <div className="text-left">
                  <div className="text-sm font-bold">{transaction.name}</div>
                  <div className="text-xs text-gray-400">{transaction.description}</div>
                </div>
                <div className="text-right">
                  <div className={`text-sm ` + (transaction.price < 0 ? 'text-red-500' : 'text-green-400')}>{transaction.price === 0 ? '' : transaction.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
                  <div className="text-xs text-gray-500">{transaction.datetime}</div>
                </div>
              </div>
            ))}
            <div className="pt-3 flex justify-center items-center content-center mx-auto">
              <Paginator
                totalItems={transactions.length}
                currentPage={currentPage}
                pageSize={pageSize}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          </div>

        </div>
      </main>
    </>
  );
}


export const getStaticProps: GetStaticProps = async () => {
  try {
    await initMongoose();

    const transactions = await Transaction.find({});;

    return {
      props: {
        transactions: JSON.parse(JSON.stringify(transactions)),
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};


/* export const getServerSideProps: GetServerSideProps = async () => {
  try {
    await initMongoose();

    const transactions = await Transaction.find({});;

    return {
      props: {
        transactions: JSON.parse(JSON.stringify(transactions)),
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};
 */