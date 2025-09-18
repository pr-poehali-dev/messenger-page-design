import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import Icon from '@/components/ui/icon'

interface Comment {
  id: string
  author: string
  content: string
  timestamp: string
  avatar?: string
}

interface Article {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  timestamp: string
  readTime: string
  tags: string[]
  image: string
  comments: Comment[]
}

const mockArticles: Article[] = [
  {
    id: '1',
    title: 'Современная разработка React приложений',
    excerpt: 'Изучаем лучшие практики и новые возможности React 18 для создания производительных приложений.',
    content: 'React 18 принес множество новых возможностей для разработчиков. Concurrent Features позволяют создавать более отзывчивые интерфейсы, а новые хуки упрощают управление состоянием. В этой статье мы рассмотрим основные нововведения и покажем, как их использовать в реальных проектах.',
    author: 'Алексей Петров',
    timestamp: '2 часа назад',
    readTime: '5 мин',
    tags: ['React', 'JavaScript', 'Frontend'],
    image: '/img/8ae24c3e-c14e-473f-bcf5-f43fa82c71b6.jpg',
    comments: [
      {
        id: '1',
        author: 'Мария К.',
        content: 'Отличная статья! Особенно понравился раздел про Suspense.',
        timestamp: '1 час назад'
      },
      {
        id: '2',
        author: 'Дмитрий С.',
        content: 'Можете рассказать больше про Server Components?',
        timestamp: '30 мин назад'
      }
    ]
  },
  {
    id: '2',
    title: 'Дизайн-системы в 2024 году',
    excerpt: 'Как создать и поддерживать дизайн-систему, которая масштабируется вместе с вашим продуктом.',
    content: 'Дизайн-системы стали неотъемлемой частью современной разработки. Они обеспечивают консистентность интерфейса, ускоряют разработку и помогают командам работать более эффективно. Рассмотрим основные принципы создания масштабируемых дизайн-систем.',
    author: 'Елена Иванова',
    timestamp: '1 день назад',
    readTime: '7 мин',
    tags: ['Design', 'UI/UX', 'Figma'],
    image: '/img/978bb9d1-a2a0-4219-8b0b-6e25f4985215.jpg',
    comments: [
      {
        id: '3',
        author: 'Сергей П.',
        content: 'Очень актуальная тема. У нас в команде как раз внедряем дизайн-систему.',
        timestamp: '12 часов назад'
      }
    ]
  },
  {
    id: '3',
    title: 'TypeScript: продвинутые типы',
    excerpt: 'Погружаемся в сложные типы TypeScript и учимся использовать их для более безопасного кода.',
    content: 'TypeScript предоставляет мощную систему типов, которая позволяет писать более надежный код. Изучим advanced types, условные типы, mapped types и другие продвинутые возможности для создания типобезопасных приложений.',
    author: 'Михаил Козлов',
    timestamp: '3 дня назад',
    readTime: '10 мин',
    tags: ['TypeScript', 'JavaScript', 'Types'],
    image: '/img/408a54c4-4ba5-4471-bf2a-590450daa33c.jpg',
    comments: []
  }
]

export default function Index() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
  const [newComment, setNewComment] = useState('')
  const [comments, setComments] = useState<{ [key: string]: Comment[] }>({
    '1': mockArticles[0].comments,
    '2': mockArticles[1].comments,
    '3': mockArticles[2].comments
  })

  const handleAddComment = () => {
    if (!newComment.trim() || !selectedArticle) return

    const comment: Comment = {
      id: Date.now().toString(),
      author: 'Вы',
      content: newComment,
      timestamp: 'только что'
    }

    setComments(prev => ({
      ...prev,
      [selectedArticle.id]: [...(prev[selectedArticle.id] || []), comment]
    }))

    setNewComment('')
  }

  if (selectedArticle) {
    return (
      <div className="min-h-screen bg-telegram-light">
        <header className="bg-primary text-primary-foreground px-6 py-4 shadow-sm">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-primary-foreground hover:bg-telegram-hover"
              onClick={() => setSelectedArticle(null)}
            >
              <Icon name="ArrowLeft" size={20} className="mr-2" />
              Назад к статьям
            </Button>
            <div className="flex items-center gap-4">
              <Icon name="Share2" size={20} />
              <Icon name="Bookmark" size={20} />
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-6 py-8">
          <Card className="border-0 shadow-lg rounded-telegram animate-fade-in">
            <div className="aspect-video relative overflow-hidden rounded-t-telegram">
              <img 
                src={selectedArticle.image} 
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <span>{selectedArticle.author}</span>
                <span>•</span>
                <span>{selectedArticle.timestamp}</span>
                <span>•</span>
                <span>{selectedArticle.readTime}</span>
              </div>
              
              <CardTitle className="text-3xl font-bold mb-4">
                {selectedArticle.title}
              </CardTitle>
              
              <div className="flex gap-2 flex-wrap">
                {selectedArticle.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="rounded-full">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardHeader>

            <CardContent className="prose max-w-none">
              <p className="text-lg leading-relaxed text-gray-700">
                {selectedArticle.content}
              </p>
            </CardContent>
          </Card>

          <Card className="mt-8 border-0 shadow-lg rounded-telegram animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="MessageCircle" size={24} />
                Комментарии ({comments[selectedArticle.id]?.length || 0})
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Textarea
                  placeholder="Напишите комментарий..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="resize-none border-gray-200 focus:border-primary"
                  rows={3}
                />
                <div className="flex justify-end">
                  <Button 
                    onClick={handleAddComment}
                    disabled={!newComment.trim()}
                    className="bg-primary hover:bg-telegram-hover"
                  >
                    <Icon name="Send" size={16} className="mr-2" />
                    Отправить
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                {comments[selectedArticle.id]?.map((comment) => (
                  <div key={comment.id} className="flex gap-3 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={comment.avatar} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {comment.author.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{comment.author}</span>
                        <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                      </div>
                      <p className="text-gray-700">{comment.content}</p>
                    </div>
                  </div>
                ))}
                
                {(!comments[selectedArticle.id] || comments[selectedArticle.id].length === 0) && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Icon name="MessageCircle" size={48} className="mx-auto mb-3 opacity-30" />
                    <p>Пока нет комментариев. Будьте первым!</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-telegram-light">
      <header className="bg-primary text-primary-foreground px-6 py-6 shadow-sm">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Блог</h1>
            <div className="flex items-center gap-4">
              <Icon name="Search" size={20} />
              <Icon name="Settings" size={20} />
            </div>
          </div>
          <div className="relative">
            <Icon name="Search" size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input 
              placeholder="Поиск статей..." 
              className="pl-10 bg-white/10 border-white/20 text-white placeholder-white/60 focus:bg-white focus:text-gray-900 focus:placeholder-gray-400"
            />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockArticles.map((article, index) => (
            <Card 
              key={article.id} 
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer rounded-telegram hover:scale-[1.02] group animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => setSelectedArticle(article)}
            >
              <div className="aspect-video relative overflow-hidden rounded-t-telegram">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-black/20 text-white border-0">
                    {article.readTime}
                  </Badge>
                </div>
              </div>
              
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                  <span>{article.author}</span>
                  <span>•</span>
                  <span>{article.timestamp}</span>
                </div>
                
                <CardTitle className="text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                  {article.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="pt-0">
                <CardDescription className="text-sm line-clamp-3 mb-4">
                  {article.excerpt}
                </CardDescription>
                
                <div className="flex items-center justify-between">
                  <div className="flex gap-1 flex-wrap">
                    {article.tags.slice(0, 2).map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs rounded-full">
                        {tag}
                      </Badge>
                    ))}
                    {article.tags.length > 2 && (
                      <Badge variant="secondary" className="text-xs rounded-full">
                        +{article.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Icon name="MessageCircle" size={14} />
                    <span className="text-xs">{comments[article.id]?.length || 0}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}