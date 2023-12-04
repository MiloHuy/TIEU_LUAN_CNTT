import FormUploadImageDetail from "features/form-upload-image-detail"

const ListStoryUserDetail = (props) => {
    const { stories } = props

    return (
        stories.length !== 0 ? 'Có story' : <FormUploadImageDetail />
    )
}

export default ListStoryUserDetail
