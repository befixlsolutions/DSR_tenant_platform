'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  BookOpen, 
  Search, 
  ThumbsUp, 
  ThumbsDown,
  Eye,
  Filter,
  Tag,
  Clock,
  TrendingUp,
} from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { mockKBArticles, kbCategories, type KBArticle } from '@/lib/mock-data/support';
import { showSuccess, showInfo } from '@/lib/utils/toast';

export default function KnowledgeBasePage() {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'views' | 'helpful' | 'recent'>('views');

  // Filter and sort articles
  let filteredArticles = mockKBArticles.filter(article => {
    if (!article.published) return false;
    if (categoryFilter !== 'all' && article.category !== categoryFilter) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        article.title.toLowerCase().includes(query) ||
        article.content.toLowerCase().includes(query) ||
        article.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    return true;
  });

  // Sort articles
  filteredArticles = [...filteredArticles].sort((a, b) => {
    switch (sortBy) {
      case 'views':
        return b.views - a.views;
      case 'helpful':
        return b.helpful - a.helpful;
      case 'recent':
        return b.updatedAt.getTime() - a.updatedAt.getTime();
      default:
        return 0;
    }
  });

  // Calculate stats
  const stats = {
    totalArticles: mockKBArticles.filter(a => a.published).length,
    totalViews: mockKBArticles.reduce((sum, a) => sum + a.views, 0),
    avgHelpful: Math.round(
      (mockKBArticles.reduce((sum, a) => sum + a.helpful, 0) /
        mockKBArticles.reduce((sum, a) => sum + (a.helpful + a.notHelpful), 0)) *
        100
    ),
    categories: kbCategories.length,
  };

  // Get popular articles
  const popularArticles = [...mockKBArticles]
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  const handleViewArticle = (articleId: string) => {
    router.push(`/support/kb/${articleId}`);
  };

  const handleMarkHelpful = (article: KBArticle, helpful: boolean) => {
    showSuccess(helpful ? 'Marked as helpful' : 'Feedback recorded');
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  const getHelpfulPercentage = (article: KBArticle) => {
    const total = article.helpful + article.notHelpful;
    if (total === 0) return 0;
    return Math.round((article.helpful / total) * 100);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Knowledge Base"
        subtitle="Find answers and learn about the platform"
        showExport={false}
        showHelp={true}
        onHelp={() => showInfo('Search for articles and guides to help you use the platform')}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-600 mb-1">Total Articles</p>
                <p className="text-2xl font-bold text-neutral-900">{stats.totalArticles}</p>
              </div>
              <BookOpen className="w-8 h-8 text-primary-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-600 mb-1">Total Views</p>
                <p className="text-2xl font-bold text-primary-600">{stats.totalViews.toLocaleString()}</p>
              </div>
              <Eye className="w-8 h-8 text-primary-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-600 mb-1">Helpful Rate</p>
                <p className="text-2xl font-bold text-green-600">{stats.avgHelpful}%</p>
              </div>
              <ThumbsUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-600 mb-1">Categories</p>
                <p className="text-2xl font-bold text-neutral-900">{stats.categories}</p>
              </div>
              <Tag className="w-8 h-8 text-neutral-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardContent>
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search articles..."
                    className="w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-neutral-600" />
                    <span className="text-sm font-medium text-neutral-700">Filters:</span>
                  </div>

                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="px-3 py-1.5 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="all">All Categories</option>
                    {kbCategories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'views' | 'helpful' | 'recent')}
                    className="px-3 py-1.5 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="views">Most Viewed</option>
                    <option value="helpful">Most Helpful</option>
                    <option value="recent">Recently Updated</option>
                  </select>

                  {(categoryFilter !== 'all' || searchQuery) && (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => {
                        setCategoryFilter('all');
                        setSearchQuery('');
                      }}
                    >
                      Clear Filters
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Articles List */}
          {filteredArticles.length === 0 ? (
            <Card>
              <CardContent>
                <div className="text-center py-12">
                  <BookOpen className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
                  <p className="text-neutral-600">No articles found matching your search</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredArticles.map(article => (
                <Card 
                  key={article.id} 
                  className="hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleViewArticle(article.id)}
                >
                  <CardContent>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-0.5 text-xs font-medium bg-primary-100 text-primary-700 rounded">
                            {article.category}
                          </span>
                          <span className="text-xs text-neutral-500">
                            Updated {formatDate(article.updatedAt)}
                          </span>
                        </div>

                        <h3 className="text-base font-semibold text-neutral-900 mb-2">
                          {article.title}
                        </h3>

                        <p className="text-sm text-neutral-600 mb-3 line-clamp-2">
                          {article.content}
                        </p>

                        <div className="flex items-center gap-4 text-xs text-neutral-600">
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span>{article.views} views</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="w-4 h-4 text-green-600" />
                            <span>{getHelpfulPercentage(article)}% helpful</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span>By {article.createdBy}</span>
                          </div>
                        </div>

                        {article.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-3">
                            {article.tags.map(tag => (
                              <span 
                                key={tag}
                                className="px-2 py-0.5 text-xs bg-neutral-100 text-neutral-700 rounded"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-2 flex-shrink-0">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMarkHelpful(article, true);
                          }}
                          leftIcon={<ThumbsUp className="w-4 h-4" />}
                        >
                          {article.helpful}
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMarkHelpful(article, false);
                          }}
                          leftIcon={<ThumbsDown className="w-4 h-4" />}
                        >
                          {article.notHelpful}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Popular Articles */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary-600" />
                Popular Articles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {popularArticles.map((article, index) => (
                  <div 
                    key={article.id}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-neutral-50 cursor-pointer transition-colors"
                    onClick={() => handleViewArticle(article.id)}
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-sm font-semibold">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-neutral-900 line-clamp-2 mb-1">
                        {article.title}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-neutral-600">
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          <span>{article.views}</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="w-3 h-3" />
                          <span>{article.helpful}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Categories */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="w-5 h-5 text-neutral-600" />
                Categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {kbCategories.map(category => {
                  const count = mockKBArticles.filter(a => a.category === category && a.published).length;
                  return (
                    <button
                      key={category}
                      onClick={() => setCategoryFilter(category)}
                      className={`w-full flex items-center justify-between p-2 rounded-lg text-sm transition-colors ${
                        categoryFilter === category
                          ? 'bg-primary-100 text-primary-700 font-medium'
                          : 'hover:bg-neutral-50 text-neutral-700'
                      }`}
                    >
                      <span>{category}</span>
                      <span className="text-xs text-neutral-500">{count}</span>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Need Help? */}
          <Card className="bg-primary-50 border-primary-200">
            <CardContent>
              <div className="text-center">
                <BookOpen className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                <h3 className="text-sm font-semibold text-neutral-900 mb-1">
                  Can't find what you're looking for?
                </h3>
                <p className="text-xs text-neutral-600 mb-3">
                  Create a support ticket and our team will help you
                </p>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => router.push('/support/tickets')}
                >
                  Create Ticket
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
