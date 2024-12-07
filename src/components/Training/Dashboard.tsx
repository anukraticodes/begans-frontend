'use client'

import { useState } from 'react'
import FileUpload from './FileUpload'
import TrainingParameters from '@/components/Training/Parameter'
import TrainingOutput from '@/components/Training/Output'
import ModelVersionManager from '@/components/Training/VersionManager'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function TrainingDashboard() {
  const [imagesZip, setImagesZip] = useState<File | null>(null)
  const [jsonFile, setJsonFile] = useState<File | null>(null)
  const [trainingOutput, setTrainingOutput] = useState<string[]>([])
  const [isTraining, setIsTraining] = useState(false)

  const handleStartTraining = async () => {
    if (!imagesZip || !jsonFile) {
      alert('Please upload both the images ZIP and JSON file before starting training.')
      return
    }

    setIsTraining(true)
    setTrainingOutput([])

    // Simulating training process
    for (let epoch = 1; epoch <= 10; epoch++) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setTrainingOutput(prev => [...prev, `Epoch ${epoch}/10 completed. Loss: ${(Math.random() * 0.5).toFixed(4)}`])
    }

    setIsTraining(false)
    setTrainingOutput(prev => [...prev, 'Training completed!'])
  }

  return (
    <Tabs defaultValue="train" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="train">Train Model</TabsTrigger>
        <TabsTrigger value="manage">Manage Versions</TabsTrigger>
      </TabsList>
      <TabsContent value="train">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <FileUpload
              label="Upload Images ZIP"
              accept=".zip"
              onChange={(file) => setImagesZip(file)}
            />
            <FileUpload
              label="Upload JSON File"
              accept=".json"
              onChange={(file) => setJsonFile(file)}
            />
            <TrainingParameters />
            <Button 
              onClick={handleStartTraining} 
              disabled={isTraining || !imagesZip || !jsonFile}
              className="mt-4 w-full"
            >
              {isTraining ? 'Training...' : 'Start Training'}
            </Button>
          </div>
          <TrainingOutput output={trainingOutput} />
        </div>
      </TabsContent>
      <TabsContent value="manage">
        <ModelVersionManager />
      </TabsContent>
    </Tabs>
  )
}

