interface TrainingOutputProps {
    output: string[]
  }
  
  export default function TrainingOutput({ output }: TrainingOutputProps) {
    return (
      <div className="border rounded p-4 h-[500px] overflow-y-auto bg-gray-100">
        <h2 className="text-xl font-semibold mb-2">Training Output</h2>
        {output.length === 0 ? (
          <p className="text-gray-500">Training output will appear here...</p>
        ) : (
          <pre className="whitespace-pre-wrap">
            {output.join('\n')}
          </pre>
        )}
      </div>
    )
  }
  
  