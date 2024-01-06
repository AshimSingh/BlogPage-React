import { notification } from 'antd'
import {
    CheckCircleFilled,
    CloseCircleFilled,
} from '@ant-design/icons'

export const Notification = ({
    message,
    description,
    type = 'error',
}) => {
    const [api, contextHolder] = notification.useNotification()
    const openNotificationWithIcon = (type) => {
        api[type]({
            message: { message },
            description: { description },
        })
    }
    openNotificationWithIcon(type)
    return <>{contextHolder}</>
}

export const successNotification = ({ message }) => {
    return notification.success({
        placement: 'topRight',
        icon: <CheckCircleFilled className="text-green-500" />,
        message: message,
    })
}

export const errorNotification = ({ message }) => {
    return notification.error({
        placement: 'topRight',
        icon: <CloseCircleFilled className="text-red-500" />,
        message: message,
    })
}
