interface IPaginationProps {
    totalItems: number,
    pageSize: number,
    currentPage: number,
    onPageChange: (page: number) => void;
}


const Paginator = ({ totalItems, pageSize, currentPage, onPageChange }: IPaginationProps) => {
    const pagesCount = Math.ceil(totalItems / pageSize);

    if (pagesCount === 1) return null;

    const pages = Array.from({ length: pagesCount }, (_, index) => index + 1);

    let pageNumber: number[] = [];
    for (let i: number = currentPage - 3; i <= totalItems; i++) {
        if (i < 1) continue;
        if (i > pagesCount) break;
        pageNumber.push(i);
    }

    return (
        <>
            <div className='flex justify-between items-center list-none select-none'>

                <button className={`flex justify-center items-center w-8 h-8 border-solid border-[#EAEAEA] rounded-lg mr-3 ` + (currentPage <= 1 ? 'bg-gray-600 cursor-not-allowed pointer-events-none' : 'bg-red-900 cursor-pointer pointer-events-auto')}>
                    <span className="font-black" onClick={() => onPageChange(currentPage - 1)}>{'<<'}</span>
                </button>

                {pageNumber.map((page, key) => (
                    <div
                        key={key}
                        className={
                            page === currentPage ? 'flex justify-center items-center w-8 h-8 border-solid border-[#EAEAEA] rounded-full cursor-pointer bg-red-500 font-bold select-none'
                                : 'flex justify-center items-center w-8 h-8 border-solid border-[#EAEAEA] rounded-lg cursor-pointer font-bold select-none'
                        }
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </div>
                ))}
            </div>

            <button className={`flex justify-center items-center w-8 h-8 border-solid border-[#EAEAEA] rounded-lg ml-3 ` + (currentPage === pagesCount ? 'bg-gray-600 cursor-not-allowed pointer-events-none' : 'bg-red-900 cursor-pointer pointer-events-auto')}>
                <span className="font-black" onClick={() => onPageChange(currentPage + 1)}>{'>>'}</span>
            </button>
        </>
    )
}

export default Paginator