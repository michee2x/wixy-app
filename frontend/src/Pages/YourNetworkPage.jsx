import {MdSearch, MdAddBox, MdArrowRight} from "react-icons/md"
import {IoChatboxEllipses} from "react-icons/io5"
import { OtherChannels } from "./OtherChannels"
import { Link } from "react-router-dom"

export const YourNetworkPage = () => {


    return (
        <div className='w-full pt-16 lg:px-10 min-h-screen dark:bg-gray-950'>
        <div className="w-full flex justify-between pl-10 lg:pl-4 items-center pr-4 lg:pr-10 py-4 h-auto">
            <div className="w-[16rem] pl-2 flex justify-between items-center h-10 bg-gray-800 rounded-lg">
                <span className="text-xl text-blue-400"><MdSearch /></span>
                <input type="text" className="w-[90%] h-full border-0 outline-none bg-transparent" placeholder="Search" />
            </div>
            <div className="flex items-center gap-5">
                <span className="text-2xl text-blue-500"><MdAddBox /></span>
                <Link to={"/channels"} className="text-2xl pt-[1px] text-blue-500"><IoChatboxEllipses /></Link>
            </div>
        </div>

        <div className="w-full flex justify-between border-blue-400/30 items-center p-4 h-14">
            <span className="text-xl text-blue-400">Invitations</span>
            <Link to={"/invitation"} className="text-2xl text-blue-400"><MdArrowRight /></Link>
        </div>

        <div className="w-full flex justify-between items-center p-4 h-14">
            <span className="text-xl text-blue-400">Manage my network</span>
            <Link to={"/manage"} className="text-2xl text-blue-400"><MdArrowRight /></Link>
        </div>

        <OtherChannels />
    </div>
    )
}