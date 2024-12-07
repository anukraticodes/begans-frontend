'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from '@/hooks/use-toast'

interface ModelVersion {
  id: string
  name: string
  createdAt: string
}

export default function ModelVersionManager() {
  const [versions, setVersions] = useState<ModelVersion[]>([])
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null)

  useEffect(() => {
    // Simulating API call to fetch model versions
    const fetchVersions = async () => {
      // Replace this with actual API call
      const mockVersions: ModelVersion[] = [
        { id: '1', name: 'v1.0.0', createdAt: '2023-06-01' },
        { id: '2', name: 'v1.1.0', createdAt: '2023-06-15' },
        { id: '3', name: 'v2.0.0', createdAt: '2023-07-01' },
      ]
      setVersions(mockVersions)
      setSelectedVersion(mockVersions[mockVersions.length - 1].id)
    }
    fetchVersions()
  }, [])

  const handleDeleteVersion = async (id: string) => {
    // Replace this with actual API call
    setVersions(versions.filter(v => v.id !== id))
    toast({
      title: "Version Deleted",
      description: `Model version ${id} has been deleted.`,
    })
    if (selectedVersion === id) {
      setSelectedVersion(versions[versions.length - 2]?.id || null)
    }
  }

  const handleRollback = async () => {
    const currentIndex = versions.findIndex(v => v.id === selectedVersion)
    if (currentIndex > 0) {
      const previousVersion = versions[currentIndex - 1]
      setSelectedVersion(previousVersion.id)
      toast({
        title: "Rollback Successful",
        description: `Rolled back to version ${previousVersion.name}.`,
      })
    } else {
      toast({
        title: "Rollback Failed",
        description: "This is the earliest version. Cannot rollback further.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Model Version Management</h2>
      <div className="flex items-center space-x-4">
        <Select value={selectedVersion || undefined} onValueChange={setSelectedVersion}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select version" />
          </SelectTrigger>
          <SelectContent>
            {versions.map((version) => (
              <SelectItem key={version.id} value={version.id}>
                {version.name} ({version.createdAt})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={handleRollback} variant="outline">Rollback</Button>
        <Button 
          onClick={() => selectedVersion && handleDeleteVersion(selectedVersion)} 
          variant="destructive"
          disabled={!selectedVersion || versions.length <= 1}
        >
          Delete Version
        </Button>
      </div>
    </div>
  )
}

