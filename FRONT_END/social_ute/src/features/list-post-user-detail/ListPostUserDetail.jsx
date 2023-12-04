import FormUploadImageDetail from "features/form-upload-image-detail"

const ListPostUserDetail = (props) => {
    const { posts } = props
    return (
        posts.length !== 0 ? 'Có bài viết' : <FormUploadImageDetail />
    )
}

export default ListPostUserDetail
