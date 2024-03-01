import { Button, Pagination } from "@nextui-org/react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from "react";

const DataTablePagination = (props) => {
    const { pagination, onPageChange, isActive } = props
    const { totals, size, pagIndex } = pagination
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(totals / size)

    useEffect(() => {
        onPageChange(currentPage)
        if (isActive === true) {
            setCurrentPage(1)
        }
    }, [currentPage, onPageChange, isActive])

    const handleCurrentPageChangePrevious = () => {
        setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))
    }

    const handleCurrentPageChangeNext = () => {
        setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))
    }

    return (
        totalPages !== 0 ? (
            <div className='flex flex-row gap-2 w-full justify-center'>
                <Button
                    variant="light"
                    isIconOnly
                    onClick={handleCurrentPageChangePrevious}
                    disabled={currentPage === 1}
                    className='-translate-y-1'
                >
                    <ChevronLeft size={20} />
                </Button>

                <Pagination
                    classNames={{
                        item: "w-8 h-8 text-small",
                        cursor:
                            "bg-table_background shadow-lg from-default-500 to-default-800 dark:from-default-300 dark:to-default-100 text-white font-bold",
                    }}
                    variant='bordered'
                    total={totalPages}
                    initialPage={1}
                    page={pagIndex}
                    onChange={setCurrentPage}
                />

                <Button
                    variant="light"
                    isIconOnly
                    onClick={handleCurrentPageChangeNext}
                    disabled={currentPage >= totalPages}
                    className='-translate-y-1'
                >
                    <ChevronRight size={20} />
                </Button>
            </div>) : (<div></div>)
    )
}

export default DataTablePagination
