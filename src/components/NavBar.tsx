import Link from 'next/link'
import React from 'react'
import profile from '/public/profile.png'
import Image from 'next/image'
import ThreeDotsDivider from './ThreeDotsDivider'
import useModal from '@/hooks/useModal'
import infotip from '/public/infotip.png'
import github from '/public/github.png'
import InfoTipDialog from './InfoTipDialog'



const NavBar = () => {

    const { isOpen, toggle } = useModal();


    return (
        <>
            <InfoTipDialog isOpen={isOpen} toggle={toggle}
                text={"No campo 1, você pode adicionar um produto comprado ou um crédito (dinheiro recebido por prestar um serviço remunerado).<br /><br />No campo 2, você adiciona o valor no formato a seguir: -10 ou +10 para representar -R$10,00 (débito) ou R$10,00 (crédito).<br /><br />No campo 3, você seleciona uma data e uma hora para representar o momento do débito ou crédito.<br /><br />No campo 4, você adiciona uma descrição simples da despesa ou crédito."}
            />

            <nav className='bg-[#0d1521] max-w-[800px] select-none border-b border-gray-700 shadow-xl mx-auto fixed top-0 left-0 right-0 z-20 p-5 text-white'>
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
                    <Link
                        href="https://nadportfolio.vercel.app/"
                        passHref
                        target='_blank'
                        rel='noreferrer'
                    >
                        <Image
                            src={profile}
                            alt="Website de Nadilson José Rodrigues Teixeira"
                            priority={true}
                            className={
                                'bg-transparent transform transition duration-500 hover:scale-205'
                            }
                            width={40}
                            height={40}
                        />
                    </Link>
                    <p className='text-lg'><strong>Smart Spend</strong></p>
                    <div className='flex'>
                        <Link
                            href="https://github.com/Nadilson-IFPE/nad-smart-spend"
                            passHref
                            target='_blank'
                            rel='noreferrer'
                        >
                            <Image
                                src={github}
                                alt="GitHub de Nadilson José Rodrigues Teixeira"
                                priority={true}
                                className={
                                    'mt-1 bg-transparent transform transition duration-500 hover:scale-205'
                                }
                                width={40}
                                height={40}
                            />
                        </Link>

                        <ThreeDotsDivider />

                        <div className='flex flex-col mt-1'>
                            <Image
                                src={infotip}
                                alt="Dicas sobre o uso do Smart Spend"
                                priority={true}
                                className={
                                    'bg-transparent transform transition duration-500 hover:scale-205 cursor-pointer'
                                }
                                width={40}
                                height={40}
                                onClick={toggle}
                            />
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavBar