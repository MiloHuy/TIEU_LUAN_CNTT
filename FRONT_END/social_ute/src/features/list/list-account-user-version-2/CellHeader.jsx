
const HeaderCellUserAccount = ({ column }) => {
    const titleMapping = {
        username: {
            id: 'username',
            defaultMessage: 'UserName',
        },
        phone_number: {
            id: 'phone_number',
            defaultMessage: 'Phone Number',
        },
        id: {
            id: 'id',
            defaultMessage: 'MSSV',
        },
        gmail: {
            id: 'gmail',
            defaultMessage: 'Gmail',
        },
        department: {
            id: 'department',
            defaultMessage: 'department',
        },
        action: {
            id: 'action',
            defaultMessage: 'Action',
        },
    }

    return titleMapping[column.id]
}

export default HeaderCellUserAccount
