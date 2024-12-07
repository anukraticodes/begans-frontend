'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/hooks/use-toast'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, XCircle } from 'lucide-react'

interface ModelVersion {
  id: string
  name: string
  createdAt: string
  accuracy: number
  isActive: boolean
  performance: {
    precision: number
    recall: number
    f1Score: number
  }
}

const initialVersions: ModelVersion[] = [
  { 
    id: '1', 
    name: 'v1.0.0', 
    createdAt: '2023-06-01', 
    accuracy: 0.85, 
    isActive: false,
    performance: { precision: 0.83, recall: 0.87, f1Score: 0.85 }
  },
  { 
    id: '2', 
    name: 'v1.1.0', 
    createdAt: '2023-06-15', 
    accuracy: 0.87, 
    isActive: false,
    performance: { precision: 0.86, recall: 0.88, f1Score: 0.87 }
  },
  { 
    id: '3', 
    name: 'v2.0.0', 
    createdAt: '2023-07-01', 
    accuracy: 0.92, 
    isActive: true,
    performance: { precision: 0.91, recall: 0.93, f1Score: 0.92 }
  },
]

export default function VersionsPage() {
  const [versions, setVersions] = useState<ModelVersion[]>(initialVersions)
  const [selectedVersion, setSelectedVersion] = useState<ModelVersion | null>(null)

  const activeVersion = versions.find(v => v.isActive)

  const handleDeleteVersion = (id: string) => {
    setVersions(versions.filter(v => v.id !== id))
    toast({
      title: "Version Deleted",
      description: `Model version ${id} has been deleted.`,
    })
  }

  const handleActivateVersion = (id: string) => {
    setVersions(versions.map(v => ({
      ...v,
      isActive: v.id === id
    })))
    toast({
      title: "Version Activated",
      description: `Model version ${id} is now active.`,
    })
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Manage Versions</h1>
      
      {activeVersion && (
        <Card>
          <CardHeader className="border-b border-gray-200">
            <CardTitle className="text-gray-800">Active Version: {activeVersion.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Accuracy</p>
                <p className="text-2xl font-bold text-gray-900">{activeVersion.accuracy.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Created At</p>
                <p className="text-2xl font-bold text-gray-900">{activeVersion.createdAt}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Precision</p>
                <p className="text-2xl font-bold text-gray-900">{activeVersion.performance.precision.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Recall</p>
                <p className="text-2xl font-bold text-gray-900">{activeVersion.performance.recall.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="border-b border-gray-200">
          <CardTitle className="text-gray-800">Version History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="text-gray-600">Version</TableHead>
                <TableHead className="text-gray-600">Created At</TableHead>
                <TableHead className="text-gray-600">Accuracy</TableHead>
                <TableHead className="text-gray-600">Status</TableHead>
                <TableHead className="text-gray-600">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {versions.map((version) => (
                <TableRow key={version.id}>
                  <TableCell className="font-medium text-gray-900">{version.name}</TableCell>
                  <TableCell className="text-gray-600">{version.createdAt}</TableCell>
                  <TableCell className="text-gray-600">{version.accuracy.toFixed(2)}</TableCell>
                  <TableCell>
                    {version.isActive ? (
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        <CheckCircle className="mr-1 h-3 w-3" /> Active
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                        <XCircle className="mr-1 h-3 w-3" /> Inactive
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedVersion(version)} className="text-blue-600 border-blue-300 hover:bg-blue-50">
                            Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-white">
                          <DialogHeader>
                            <DialogTitle className="text-gray-900">Version Details: {selectedVersion?.name}</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="name" className="text-right text-gray-600">
                                Name
                              </Label>
                              <Input id="name" value={selectedVersion?.name} className="col-span-3 border-gray-300" readOnly />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="created" className="text-right text-gray-600">
                                Created
                              </Label>
                              <Input id="created" value={selectedVersion?.createdAt} className="col-span-3 border-gray-300" readOnly />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="accuracy" className="text-right text-gray-600">
                                Accuracy
                              </Label>
                              <Input id="accuracy" value={selectedVersion?.accuracy.toFixed(2)} className="col-span-3 border-gray-300" readOnly />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="precision" className="text-right text-gray-600">
                                Precision
                              </Label>
                              <Input id="precision" value={selectedVersion?.performance.precision.toFixed(2)} className="col-span-3 border-gray-300" readOnly />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="recall" className="text-right text-gray-600">
                                Recall
                              </Label>
                              <Input id="recall" value={selectedVersion?.performance.recall.toFixed(2)} className="col-span-3 border-gray-300" readOnly />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="f1Score" className="text-right text-gray-600">
                                F1 Score
                              </Label>
                              <Input id="f1Score" value={selectedVersion?.performance.f1Score.toFixed(2)} className="col-span-3 border-gray-300" readOnly />
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleActivateVersion(version.id)}
                        disabled={version.isActive}
                        className="text-blue-600 border-blue-300 hover:bg-blue-50"
                      >
                        Activate
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteVersion(version.id)}
                        disabled={version.isActive}
                        className="bg-red-500 hover:bg-red-600 text-white"
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

