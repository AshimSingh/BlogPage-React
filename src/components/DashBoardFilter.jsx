import { DatePicker } from 'antd'
import {
    UnorderedListOutlined,
    IdcardOutlined,
} from '@ant-design/icons'
import DashboardNavBar from './DashBoardNavBar'

const DashboardFilter = ({
    handelDateChange,
    view,
    handelViewChange,
    onSearchBarChange,
    searchQuery,
    handelSearchForChange,
}) => {
    return (
        <div className=" w-full flex justify-center items-center flex-col p-2 my-3">
            <div className="w-full">
                <h1 className="text-2xl font-medium">Filters:</h1>
            </div>
            <div className="w-full flex flex-wrap justify-start items-center  p-2 ">
                <div className="w-[25%] ">
                    <h4>Search: </h4>
                    <DashboardNavBar
                        onSearchBarChange={onSearchBarChange}
                        searchedQuery={searchQuery}
                        handelSearchForChange={handelSearchForChange}
                    />
                </div>
                <div className="mx-2 ">
                    {/* from to date picker when change it calls handelDateChange */}
                    <h4>From: </h4>
                    <DatePicker
                        onChange={(date, dateString) =>
                            handelDateChange(date, dateString, 'from')
                        }
                        name="from"
                        style={{ zIndex: 1 }}
                    />
                </div>
                <div className="mx-2">
                    <h4>To: </h4>
                    <DatePicker
                        onChange={(date, dateString) =>
                            handelDateChange(date, dateString, 'to')
                        }
                        name="to"
                        style={{ zIndex: 1 }}
                    />
                </div>
                <div>
                    <h1>View : </h1>
                    <div>
                        <button>
                            <UnorderedListOutlined
                                className={`text-[27px]  mx-2 ${
                                    view === 'tableView'
                                        ? 'text-blue-600  '
                                        : 'text-gray-400'
                                }`}
                                onClick={() =>
                                    handelViewChange('tableView')
                                }
                            />
                        </button>
                        <button>
                            <IdcardOutlined
                                className={`text-[30px]   mx-2 ${
                                    view === 'cardView'
                                        ? 'text-blue-600 '
                                        : 'text-gray-400'
                                }`}
                                onClick={() =>
                                    handelViewChange('cardView')
                                }
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DashboardFilter
