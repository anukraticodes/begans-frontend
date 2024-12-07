'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/hooks/use-toast'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Progress } from '@/components/ui/progress'
import { LineChart, Play, CircleStopIcon as Stop } from 'lucide-react'
import { CustomSlider } from '@/components/ui/custom-slider'
import axios from 'axios'
// Placeholder component for the graph
const Graph = () => (
  <div className="w-full h-full flex items-center justify-center bg-gray-100">
    <LineChart className="w-16 h-16 text-gray-400" />
    <span className="ml-2 text-gray-500">Graph will be displayed here during training</span>
  </div>
)

// Scrollable shell output component
const ShellOutput = ({ output }: { output: string[] }) => (
  <ScrollArea className="w-full h-[400px] bg-gray-900 text-gray-100 p-4 font-mono text-sm rounded-md">
    {output.map((line, index) => (
      <div key={index}>{line}</div>
    ))}
  </ScrollArea>
)

export default function TrainPage() {
  const [imagesZip, setImagesZip] = useState<File | null>(null)
  const [jsonFile, setJsonFile] = useState<File | null>(null)
  const [learningRate, setLearningRate] = useState(0.001)
  const [batchSize, setBatchSize] = useState(32)
  const [epochs, setEpochs] = useState(10)
  const [optimizer, setOptimizer] = useState('adam')
  const [computeDevice, setComputeDevice] = useState('gpu')
  const [isTraining, setIsTraining] = useState(false)
  const [shellOutput, setShellOutput] = useState<string[]>([])
  const [trainingModel, setTrainingModel] = useState<string | null>(null)
  const websocketRef = useRef<WebSocket | null>(null);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({
    imagesZip: 0,
    jsonFile: 0,
  })

  useEffect(() => {
    if (imagesZip && jsonFile) {
      setTrainingModel('Shakti')
    } else if (imagesZip) {
      setTrainingModel('Drishti')
    } else if (jsonFile) {
      setTrainingModel('Chakravyuha')
    } else {
      setTrainingModel(null)
    }
  }, [imagesZip, jsonFile])
  useEffect(() => {
    const startTraining = () => {
      setShellOutput([`Starting ${trainingModel} training...`]);
      console.log("Training started");

      // websocketRef.current = new WebSocket('ws://url'); 

      // websocketRef.current.onopen = () => {
      //   console.log('WebSocket connection opened');
      //   websocketRef.current?.send(JSON.stringify({ action: 'startTraining', model: trainingModel }));
      // };

      // websocketRef.current.onmessage = (event) => {
      //   const message = JSON.parse(event.data);
      //   console.log(message);
      //   setShellOutput(prev => [...prev, message]);
      // };

      // websocketRef.current.onclose = () => {
      //   console.log('WebSocket connection closed');
      // };

      // websocketRef.current.onerror = (error) => {
      //   console.error('WebSocket error:', error);
      //   toast({
      //     title: "Error",
      //     description: "An error occurred with the WebSocket connection.",
      //     variant: "destructive",
      //   });
      //   handleStopTraining();
      // };
    };

    if (isTraining) {
      startTraining();
    } else {
      if (websocketRef.current) {
        websocketRef.current.close();
        websocketRef.current = null;
      }
    }

    return () => {
      if (websocketRef.current) {
        websocketRef.current.close();
        websocketRef.current = null;
      }
    };
  }, [isTraining, trainingModel]);




  const handleStartTraining = async () => {
    if (!trainingModel) {
      toast({
        title: "Error",
        description: "Please upload at least one file (Images ZIP or JSON) before starting training.",
        variant: "destructive",
      });
      return;
    }

    if (imagesZip) {
      console.log('Uploading images ZIP file...');
      await uploadFileInChunks(imagesZip, 'imagesZip');
    }
    if (jsonFile) {
      console.log('Uploading JSON file...');
      await uploadFileInChunks(jsonFile, 'jsonFile');
    }

    setIsTraining(true);
  };
  const uploadFileInChunks = async (file: File, fileType: 'imagesZip' | 'jsonFile') => {
    const CHUNK_SIZE = 5 * 1024 * 1024; // 5 MB
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);

    for (let chunkNumber = 0; chunkNumber < totalChunks; chunkNumber++) {
      const start = chunkNumber * CHUNK_SIZE;
      const end = Math.min(file.size, start + CHUNK_SIZE);
      const chunk = file.slice(start, end);

      const formData = new FormData();
      formData.append("file", chunk);
      formData.append("chunk_number", (chunkNumber + 1).toString());
      formData.append("total_chunks", totalChunks.toString());
      formData.append("file_name", file.name);
      formData.append("file_type", fileType);

      try {
        console.log(`Uploading chunk ${chunkNumber + 1}/${totalChunks}`);
        const response = await axios.post("http://localhost:8000/api/train/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (response.status !== 200) {
          throw new Error('Failed to upload chunk');
        }

        setUploadProgress(prev => ({
          ...prev,
          [fileType]: Math.round(((chunkNumber + 1) / totalChunks) * 100),
        }));

        if (chunkNumber === totalChunks - 1) {
          const data = response.data;
          console.log(`File uploaded successfully with ID: ${data.id}`);
          setShellOutput(prev => [...prev, `File uploaded successfully with ID: ${data.id}`]);
        }
      } catch (err) {
        console.error("Error uploading chunk:", err);
        toast({
          title: "Error",
          description: `An error occurred while uploading the file: ${err.message}`,
          variant: "destructive",
        });
        break;
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: 'imagesZip' | 'jsonFile') => {
    const file = e.target.files?.[0];
    if (file) {
      if (fileType === 'imagesZip') {
        setImagesZip(file);
      } else {
        setJsonFile(file);
      }
    }
  };

  const handleStopTraining = () => {
    setIsTraining(false);
    console.log(isTraining);
    setShellOutput(prev => [...prev, "Training stopped by user."]);
    toast({
      title: "Training Stopped",
      description: "The training process has been stopped.",
    });
  };


  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Train Model</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="border-b border-gray-200">
            <CardTitle className="text-gray-800">Upload Files</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div>
              <Label htmlFor="images-zip" className="text-gray-700">Images ZIP</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="images-zip"
                  type="file"
                  accept=".zip"
                  onChange={(e) => handleFileChange(e, 'imagesZip')}
                  disabled={isTraining}
                  className="hidden"
                />
                <Button 
                  onClick={() => document.getElementById('images-zip')?.click()}
                  disabled={isTraining}
                  className="bg-blue-600 text-white hover:bg-blue-700"
                >
                  {imagesZip ? 'Change ZIP' : 'Upload ZIP'}
                </Button>
                <span className="text-sm text-gray-600">
                  {imagesZip ? imagesZip.name : 'No file selected'}
                </span>
              </div>
              {uploadProgress.imagesZip > 0 && uploadProgress.imagesZip < 100 && (
                <Progress value={uploadProgress.imagesZip} className="mt-2" />
              )}
            </div>
            <div>
              <Label htmlFor="json-file" className="text-gray-700">JSON File</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="json-file"
                  type="file"
                  accept=".json"
                  onChange={(e) => handleFileChange(e, 'jsonFile')}
                  disabled={isTraining}
                  className="hidden"
                />
                <Button 
                  onClick={() => document.getElementById('json-file')?.click()}
                  disabled={isTraining}
                  className="bg-blue-600 text-white hover:bg-blue-700"
                >
                  {jsonFile ? 'Change JSON' : 'Upload JSON'}
                </Button>
                <span className="text-sm text-gray-600">
                  {jsonFile ? jsonFile.name : 'No file selected'}
                </span>
              </div>
              {uploadProgress.jsonFile > 0 && uploadProgress.jsonFile < 100 && (
                <Progress value={uploadProgress.jsonFile} className="mt-2" />
              )}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-gray-200">
            <CardTitle className="text-gray-800">Training Parameters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div>
              <Label htmlFor="learning-rate" className="text-gray-700">Learning Rate: {learningRate.toFixed(4)}</Label>
              <CustomSlider
                id="learning-rate"
                min={0.0001}
                max={0.1}
                step={0.0001}
                value={[learningRate]}
                onValueChange={(value) => setLearningRate(value[0])}
                disabled={isTraining}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="batch-size" className="text-gray-700">Batch Size: {batchSize}</Label>
              <CustomSlider
                id="batch-size"
                min={1}
                max={128}
                step={1}
                value={[batchSize]}
                onValueChange={(value) => setBatchSize(value[0])}
                disabled={isTraining}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="epochs" className="text-gray-700">Epochs: {epochs}</Label>
              <CustomSlider
                id="epochs"
                min={1}
                max={100}
                step={1}
                value={[epochs]}
                onValueChange={(value) => setEpochs(value[0])}
                disabled={isTraining}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="optimizer" className="text-gray-700">Optimizer</Label>
              <Select value={optimizer} onValueChange={setOptimizer} disabled={isTraining}>
                <SelectTrigger id="optimizer" className="border-gray-300 bg-white text-gray-700">
                  <SelectValue placeholder="Select optimizer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="adam">Adam</SelectItem>
                  <SelectItem value="sgd">SGD</SelectItem>
                  <SelectItem value="rmsprop">RMSprop</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="compute-device" className="text-gray-700">Compute Device</Label>
              <Select value={computeDevice} onValueChange={setComputeDevice} disabled={isTraining}>
                <SelectTrigger id="compute-device" className="border-gray-300 bg-white text-gray-700">
                  <SelectValue placeholder="Select compute device" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpu">GPU</SelectItem>
                  <SelectItem value="cpu">CPU</SelectItem>
                  <SelectItem value="tpu">TPU</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>
      {trainingModel && (
        <div className="text-center text-lg font-semibold text-gray-800">
          Training Model: {trainingModel}
        </div>
      )}
      {isTraining ? (
        <Button 
          onClick={handleStopTraining} 
          className="w-full bg-red-500 hover:bg-red-600 text-white"
        >
          Stop Training
          <Stop className="ml-2 h-4 w-4" />
        </Button>
      ) : (
        <Button 
          onClick={handleStartTraining} 
          disabled={!trainingModel}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          Start Training
          <Play className="ml-2 h-4 w-4" />
        </Button>
      )}
      <Card className="mt-6">
        <CardHeader className="border-b border-gray-200">
          <CardTitle className="text-gray-800">Training Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="graph" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-100">
              <TabsTrigger value="graph" className="data-[state=active]:bg-white data-[state=active]:text-gray-900">Graph</TabsTrigger>
              <TabsTrigger value="shell" className="data-[state=active]:bg-white data-[state=active]:text-gray-900">Shell Output</TabsTrigger>
            </TabsList>
            <TabsContent value="graph" className="h-[400px]">
              <Graph />
            </TabsContent>
            <TabsContent value="shell" className="h-[400px]">
              <ShellOutput output={shellOutput} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

