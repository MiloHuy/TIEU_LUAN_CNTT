import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import clsx from "clsx";

const FormRegister = (props) => {
    const handleOpenRegiser = (value) => {
        props.handleFunction('hidden')
    }

    return (
        <form className={clsx('flex flex-col gap-2 items-center justify-center p-4 w-full h-full ', props.className)}>
            <h1 className="text-lg font-bold font-merriweather text-center">
                Sign up
            </h1>

            <div className='grid grid-cols-2 gap-2 w-full'>
                <Input
                    isRequired
                    type="text"
                    label="First Name"
                    defaultValue=""
                    className="w-full"
                />

                <Input
                    isRequired
                    type="text"
                    label="Last Name"
                    defaultValue=""
                    className="w-full"
                />
            </div>
            <Input
                isRequired
                type="email"
                label="Email"
                defaultValue=""
                className="w-full"
            />

            <Input
                isRequired
                type="number"
                label="Phone"
                defaultValue=""
                className="w-full"
            />

            <div className='grid grid-cols-2 gap-2 w-full'>
                <Input
                    isRequired
                    type="password"
                    label="Password"
                    defaultValue=""
                    className="w-full"
                />

                <Input
                    isRequired
                    type="number"
                    label="ID"
                    defaultValue=""
                    className="w-full"
                />
            </div>


            <div className='grid grid-cols-2 gap-2 w-full'>
                <Select
                    isRequired
                    label="Faculty"
                    placeholder="Select Faculty"
                    className="w-full"
                >
                    <SelectItem>None</SelectItem>
                </Select>

                <Select
                    isRequired
                    label="Department"
                    placeholder="Select department"
                    className="w-full"
                >
                    <SelectItem>None</SelectItem>
                </Select>
            </div>

            <Button className="w-3/4 text-sm font-merriweather" onClick={handleOpenRegiser}>Sign up</Button>
        </form>
    )
}

export default FormRegister