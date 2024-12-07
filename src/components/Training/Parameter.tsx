import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function TrainingParameters() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-2">Training Parameters</h2>
      
      <div>
        <Label htmlFor="learning-rate">Learning Rate</Label>
        <Input id="learning-rate" type="number" defaultValue={0.001} step={0.0001} min={0} max={1} />
      </div>
      
      <div>
        <Label htmlFor="batch-size">Batch Size</Label>
        <Input id="batch-size" type="number" defaultValue={32} step={1} min={1} />
      </div>
      
      <div>
        <Label htmlFor="epochs">Epochs</Label>
        <Input id="epochs" type="number" defaultValue={10} step={1} min={1} />
      </div>
      
      <div>
        <Label htmlFor="optimizer">Optimizer</Label>
        <Select defaultValue="adam">
          <SelectTrigger id="optimizer">
            <SelectValue placeholder="Select optimizer" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="adam">Adam</SelectItem>
            <SelectItem value="sgd">SGD</SelectItem>
            <SelectItem value="rmsprop">RMSprop</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

