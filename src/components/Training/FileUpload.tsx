import { ChangeEvent } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface FileUploadProps {
  label: string
  accept: string
  onChange: (file: File | null) => void
}

export default function FileUpload({ label, accept, onChange }: FileUploadProps) {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    onChange(file)
  }

  return (
    <div className="mb-4">
      <Label htmlFor={label}>{label}</Label>
      <Input
        id={label}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="mt-1"
      />
    </div>
  )
}

