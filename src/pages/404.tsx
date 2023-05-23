const ErrorPage = () => {
    return (
        <section className="flex items-center h-full p-16">
            <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                <div className="max-w-md text-center">
                    <h2 className="mt-10 mb-8 font-extrabold text-9xl">
                        <span className="sr-only">404 Error</span>ERRO!
                    </h2>
                    <p className="text-2xl font-semibold md:text-3xl">
                        Variável de ambiente inválida ou não configurada:
                        "NEXT_PUBLIC_MONGODB_URL"</p>
                    <p className="mt-4 mb-8">Verifique no código-fonte ou no site de
                        hospedagem se a variável foi definida com os dados
                        necessários para as requisições ao MongoDB.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default ErrorPage