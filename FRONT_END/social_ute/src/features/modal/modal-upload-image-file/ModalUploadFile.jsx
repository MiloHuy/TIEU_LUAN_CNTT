import { Dialog, DialogContent, DialogTrigger } from "components/dialog";
import FormPreview from "features/form/form-upload-multilple/FormPreview";
import FormSelectImagesOrVideos from "features/form/form-upload-multilple/FormSelectImagesOrVideos";
import FormSelectPostOrStory from "features/form/form-upload-multilple/FormSelectPostOrStory";
import FormUploadFinal from "features/form/form-upload-multilple/FormUploadFinal";

import { useMemo, useState } from "react";

const ModalUploadFile = ({ trigger }) => {
  const [stepForm, setStepForm] = useState(0)
  const [dataModalUpload, setDataModalUpload] = useState({
    files: [],
    images: []
  })

  const handleNextForm = () => {
    if (stepForm < 4)
      setStepForm(stepForm + 1)
  }

  const transformNextForm = useMemo(() => {
    switch (stepForm) {
      case 0:
        return 'min-h-[45vh] max-w-[50vw]'
      case 1:
        return 'min-h-[50vh] max-w-[40vw]'
      case 2:
        return 'min-h-[80vh] max-w-[55vw]'
      case 3:
        return 'min-h-[80vh] max-w-[55vw] '
      default:
        break
    }
  }, [stepForm])

  const multipleForm = [
    <FormSelectPostOrStory
      stepForm={stepForm}
      handleNextForm={handleNextForm}
    />,

    <FormSelectImagesOrVideos
      stepForm={stepForm}
      handleNextForm={handleNextForm}
      setFiles={setDataModalUpload}
    />,

    <FormPreview
      files={dataModalUpload.files}
      stepForm={stepForm}
      setFilesAndImages={setDataModalUpload}
      handleNextForm={handleNextForm}
    />,

    <FormUploadFinal
      files={dataModalUpload.files}
      images={dataModalUpload.images}

      stepForm={stepForm}
      handleNextForm={handleNextForm}
    />
  ]

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>

      <DialogContent className={`${transformNextForm} sm:rounded-[20px] transform duration-500 ease-in overflow-hidden`}>
        <div className='flex'>
          {multipleForm.map((form) => { return form })}
        </div>
      </DialogContent>
    </Dialog >
  )
}

export default ModalUploadFile
