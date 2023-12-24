import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";

const About = () => {
    return (
        <div className='relative w-full h-[500px] '>
            <div className="flex flex-col items-center justify-start px-3 w-full h-full gap-5 py-3">
                <p className="text-black text-center font-serif text-2xl">
                    Danh sách sinh viên tham gia
                </p>
                <Table
                    classNames={{
                        base: 'w-4/5 border rounded-lg',
                        tbody: 'text-black'
                    }}
                    layout='fixed'
                    radius='sm'
                    aria-label="Table">
                    <TableHeader>
                        <TableColumn>TÊN</TableColumn>
                        <TableColumn>MSSV</TableColumn>
                        <TableColumn>GMAIL</TableColumn>
                        <TableColumn>GVHD</TableColumn>
                    </TableHeader>
                    <TableBody >
                        <TableRow key="1">
                            <TableCell className='text-lg font-normal '>Huỳnh Hùng Phú</TableCell>
                            <TableCell className='text-lg font-normal  '>20110540</TableCell>
                            <TableCell className='text-lg font-normal  truncate'>20110540@student.hcmute.edu.vn</TableCell>
                            <TableCell className='text-lg font-normal  '>Nguyễn Hữu Trung</TableCell>
                        </TableRow>
                        <TableRow key="2">
                            <TableCell className='text-lg font-normal  '>Nguyễn Đình Quang Huy</TableCell>
                            <TableCell className='text-lg font-normal  '>20110494</TableCell>
                            <TableCell className='text-lg font-normal  truncate'>20110494@student.hcmute.edu.vn</TableCell>
                            <TableCell className='text-lg font-normal  '>Nguyễn Hữu Trung</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default About
