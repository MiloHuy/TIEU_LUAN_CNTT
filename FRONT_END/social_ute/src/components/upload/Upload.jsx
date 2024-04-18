
const Upload = ({ className, note, onChange }) => {
  return (
    <label
      for="post_img"
      className="flex flex-col items-center justify-center w-full h-80 rounded-lg border-2 border-black border-dashed cursor-pointer">

      {note ? note : null}

      <input
        id="post_img"
        type="file"
        className="hidden"
        accept="image/*"
        onChange={onChange}
      />
    </label>
  )
}

export default Upload