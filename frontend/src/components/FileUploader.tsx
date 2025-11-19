interface Props {
  onUpload: (file: File) => void
}

export const FileUploader = ({ onUpload }: Props) => {
  return (
    <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl py-6 cursor-pointer text-center gap-2 text-slate-500">
      <input
        type="file"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) onUpload(file)
        }}
      />
      <span className="text-sm">Fayl yoki skrinshot yuklang</span>
      <span className="text-xs text-slate-400">PNG, JPG, DOCX, PDF</span>
    </label>
  )
}
