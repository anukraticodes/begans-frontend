export interface Chat {
  id: string
  title: string
  messages: Message[]
}

export interface Message {
  id: number
  content: string
  role: 'user' | 'assistant'
  image?: string
}

// Mock data
const chats: Chat[] = [
  {
    id: '1',
    title: 'Chat about AI',
    messages: [
      { id: 1, content: 'What is AI?', role: 'user' },
      { id: 2, content: 'AI stands for Artificial Intelligence.', role: 'assistant' }
    ]
  },
  {
    id: '2',
    title: 'Project Discussion',
    messages: [
      { id: 1, content: 'Let\'s discuss the project scope.', role: 'user' },
      { id: 2, content: 'Sure! What aspects would you like to cover?', role: 'assistant' }
    ]
  }
]

export function loadMockData(): Chat[] {
  return chats
}
