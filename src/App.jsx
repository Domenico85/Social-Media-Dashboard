// imports
import React, { useState, useEffect } from 'react';
import { Calendar, BarChart3, User, Heart, MessageCircle, Share2, ArrowUp, Plus, Send, EyeIcon, Clock, Settings, Bell, Search, Filter } from 'lucide-react';

const SocialMediaDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [scheduledPosts, setScheduledPosts] = useState([
    { id: 1, content: "Exciting product launch coming soon! 🚀", platform: "twitter", date: "2025-06-02", time: "10:00", status: "scheduled" },
    { id: 2, content: "Behind the scenes of our creative process", platform: "instagram", date: "2025-06-03", time: "14:30", status: "scheduled" },
    { id: 3, content: "Join our webinar this Friday!", platform: "linkedin", date: "2025-06-06", time: "09:00", status: "scheduled" }
  ]);
  const [newPost, setNewPost] = useState({ content: '', platform: 'twitter', date: '', time: '' });
  const [notifications, setNotifications] = useState(3);

  // Mock analytics data
  const analyticsData = {
    overview: {
      totalFollowers: 45672,
      engagement: 8.5,
      reach: 123456,
      impressions: 287543
    },
    platforms: {
      twitter: { followers: 12500, engagement: 7.2, posts: 45 },
      instagram: { followers: 18900, engagement: 9.8, posts: 32 },
      linkedin: { followers: 8700, engagement: 6.5, posts: 28 },
      facebook: { followers: 5572, engagement: 5.1, posts: 19 }
    }
  };

  const recentPosts = [
    { id: 1, content: "Just shipped our latest feature! Thanks to everyone who provided feedback.", platform: "twitter", likes: 234, comments: 45, shares: 67, time: "2 hours ago" },
    { id: 2, content: "Team building day at our headquarters 📸", platform: "instagram", likes: 892, comments: 123, shares: 234, time: "5 hours ago" },
    { id: 3, content: "Insights from our latest industry report", platform: "linkedin", likes: 156, comments: 34, shares: 89, time: "1 day ago" }
  ];

  const getPlatformColor = (platform) => {
    const colors = {
      twitter: 'bg-blue-500',
      instagram: 'bg-pink-500',
      linkedin: 'bg-blue-700',
      facebook: 'bg-blue-600'
    };
    return colors[platform] || 'bg-gray-500';
  };

  const getPlatformIcon = (platform) => {
    return <div className={`w-3 h-3 rounded-full ${getPlatformColor(platform)}`}></div>;
  };

  const handleSchedulePost = () => {
    if (newPost.content && newPost.platform && newPost.date && newPost.time) {
      const post = {
        id: scheduledPosts.length + 1,
        ...newPost,
        status: 'scheduled'
      };
      setScheduledPosts([...scheduledPosts, post]);
      setNewPost({ content: '', platform: 'twitter', date: '', time: '' });
    }
  };

  const StatCard = ({ title, value, icon: Icon, change, color = "#2563eb" }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change && (
            <p className="text-sm text-green-600 mt-1 flex items-center">
              <ArrowUp className="w-4 h-4 mr-1 text-green-600" />
              +{change}% from last month
            </p>
          )}
        </div>
        <div className="p-3 rounded-lg" style={{ backgroundColor: `${color}15` }}>
          <Icon className="w-6 h-6" style={{ color: color }} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className=" px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">Social Dashboard</h1>
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-black-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-black-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
              <Bell className="w-5 h-5" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
              <Settings className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 min-h-screen p-4">
          <div className="space-y-2">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'schedule', label: 'Schedule Posts', icon: Calendar },
              { id: 'analytics', label: 'Analytics', icon: ArrowUp },
              { id: 'engagement', label: 'Engagement', icon: User }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === item.id
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Dashboard Overview</h2>
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm">
                    <option>Last 30 days</option>
                    <option>Last 7 days</option>
                    <option>Last 90 days</option>
                  </select>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  title="Total Followers"
                  value={analyticsData.overview.totalFollowers.toLocaleString()}
                  icon={User}
                  change={12.5}
                  color="#2563eb"
                />
                <StatCard
                  title="Engagement Rate"
                  value={`${analyticsData.overview.engagement}%`}
                  icon={Heart}
                  change={8.2}
                  color="#dc2626"
                />
                <StatCard
                  title="Total Reach"
                  value={analyticsData.overview.reach.toLocaleString()}
                  icon={EyeIcon}
                  change={15.7}
                  color="#16a34a"
                />
                <StatCard
                  title="Impressions"
                  value={analyticsData.overview.impressions.toLocaleString()}
                  icon={ArrowUp}
                  change={22.1}
                  color="#9333ea"
                />
              </div>

              {/* Platform Performance */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Performance</h3>
                  <div className="space-y-4">
                    {Object.entries(analyticsData.platforms).map(([platform, data]) => (
                      <div key={platform} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          {getPlatformIcon(platform)}
                          <div>
                            <p className="font-medium text-gray-900 capitalize">{platform}</p>
                            <p className="text-sm text-gray-600">{data.followers.toLocaleString()} followers</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{data.engagement}%</p>
                          <p className="text-sm text-gray-600">engagement</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {recentPosts.map((post) => (
                      <div key={post.id} className="border-l-4 border-blue-500 pl-4 py-2">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-sm text-gray-900 mb-1">{post.content}</p>
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <span className="flex items-center space-x-1">
                                {getPlatformIcon(post.platform)}
                                <span className="capitalize">{post.platform}</span>
                              </span>
                              <span>{post.time}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                          <span className="flex items-center space-x-1">
                            <Heart className="w-4 h-4" />
                            <span>{post.likes}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <MessageCircle className="w-4 h-4" />
                            <span>{post.comments}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Share2 className="w-4 h-4" />
                            <span>{post.shares}</span>
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'schedule' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Schedule Posts</h2>
              
              {/* New Post Form */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Post</h3>
                <div className="space-y-4">
                  <textarea
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    placeholder="What's on your mind?"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={3}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <select
                      value={newPost.platform}
                      onChange={(e) => setNewPost({ ...newPost, platform: e.target.value })}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="twitter">Twitter</option>
                      <option value="instagram">Instagram</option>
                      <option value="linkedin">LinkedIn</option>
                      <option value="facebook">Facebook</option>
                    </select>
                    <input
                      type="date"
                      value={newPost.date}
                      onChange={(e) => setNewPost({ ...newPost, date: e.target.value })}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="time"
                      value={newPost.time}
                      onChange={(e) => setNewPost({ ...newPost, time: e.target.value })}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <button
                    onClick={handleSchedulePost}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <Clock className="w-4 h-4" />
                    <span>Schedule Post</span>
                  </button>
                </div>
              </div>

              {/* Scheduled Posts */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Scheduled Posts</h3>
                <div className="space-y-4">
                  {scheduledPosts.map((post) => (
                    <div key={post.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="text-gray-900 mb-1">{post.content}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center space-x-1">
                            {getPlatformIcon(post.platform)}
                            <span className="capitalize">{post.platform}</span>
                          </span>
                          <span>{post.date} at {post.time}</span>
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                            {post.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Analytics & Insights</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Growth Metrics</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Follower Growth</span>
                      <span className="text-green-600 font-semibold">+12.5%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Engagement Rate</span>
                      <span className="text-blue-600 font-semibold">8.5%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Content Performance</span>
                      <span className="text-purple-600 font-semibold">+18.2%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Posts</h3>
                  <div className="space-y-4">
                    {recentPosts.slice(0, 3).map((post, index) => (
                      <div key={post.id} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-semibold">{index + 1}</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900 mb-1">{post.content}</p>
                          <div className="flex items-center space-x-3 text-xs text-gray-500">
                            <span>{post.likes} likes</span>
                            <span>{post.comments} comments</span>
                            <span>{post.shares} shares</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Comparison</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {Object.entries(analyticsData.platforms).map(([platform, data]) => (
                    <div key={platform} className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-center mb-2">
                        {getPlatformIcon(platform)}
                      </div>
                      <h4 className="font-semibold text-gray-900 capitalize mb-2">{platform}</h4>
                      <div className="space-y-1 text-sm">
                        <p className="text-gray-600">{data.followers.toLocaleString()} followers</p>
                        <p className="text-gray-600">{data.engagement}% engagement</p>
                        <p className="text-gray-600">{data.posts} posts</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'engagement' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Engagement Management</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <StatCard
                  title="Pending Responses"
                  value="23"
                  icon={MessageCircle}
                  color="#ea580c"
                />
                <StatCard
                  title="New Mentions"
                  value="47"
                  icon={Bell}
                  color="#2563eb"
                />
                <StatCard
                  title="Response Rate"
                  value="94%"
                  icon={ArrowUp}
                  change={5.2}
                  color="#16a34a"
                />
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Interactions</h3>
                <div className="space-y-4">
                  {[
                    { user: "@sarah_design", action: "commented", content: "Love this new feature! When will it be available?", time: "5 min ago", platform: "twitter" },
                    { user: "John Marketing", action: "mentioned you", content: "Great insights in the latest post about social media trends", time: "12 min ago", platform: "linkedin" },
                    { user: "@creative_studio", action: "shared", content: "Shared your post about design principles", time: "1 hour ago", platform: "instagram" },
                    { user: "Emma Thompson", action: "commented", content: "This is exactly what I was looking for. Thank you!", time: "2 hours ago", platform: "facebook" }
                  ].map((interaction, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">{interaction.user[0].toUpperCase()}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-semibold text-gray-900">{interaction.user}</span>
                          <span className="text-gray-600">{interaction.action}</span>
                          {getPlatformIcon(interaction.platform)}
                          <span className="text-sm text-gray-500">{interaction.time}</span>
                        </div>
                        <p className="text-gray-700 text-sm">{interaction.content}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Reply</button>
                          <button className="text-gray-600 hover:text-gray-700 text-sm font-medium">Like</button>
                          <button className="text-gray-600 hover:text-gray-700 text-sm font-medium">View</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default SocialMediaDashboard;