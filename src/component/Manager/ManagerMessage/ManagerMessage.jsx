import React, { useState, useRef } from 'react';
import { Send, Image, Paperclip, Search, MoreVertical, X, ArrowLeft } from 'lucide-react';

const ManagerMessage = () => {
  const fileInputRef = useRef(null);
  const [selectedChatId, setSelectedChatId] = useState('1');
  const [inputMessage, setInputMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState('');
  const [modalImageName, setModalImageName] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Sample avatar URLs
  const getRandomAvatar = () => {
    const avatars = [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1494790108755-2616c79fcfe4?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    ];
    return avatars[Math.floor(Math.random() * avatars.length)];
  };

  const [chatUsers] = useState([
    {
      id: '1',
      name: 'Rocky Parker',
      avatar: getRandomAvatar(),
      lastMessage: 'How can i help you',
      timestamp: '08:36 AM',
      isOnline: true,
      unreadCount: 2
    },
    {
      id: '2',
      name: 'Sarah Wilson',
      avatar: getRandomAvatar(),
      lastMessage: 'See you tomorrow!',
      timestamp: '08:15 AM',
      isOnline: true,
      unreadCount: 0
    },
    {
      id: '3',
      name: 'Mike Johnson',
      avatar: getRandomAvatar(),
      lastMessage: 'Thanks for the help',
      timestamp: 'Yesterday',
      isOnline: false,
      unreadCount: 1
    },
    {
      id: '4',
      name: 'Emma Davis',
      avatar: getRandomAvatar(),
      lastMessage: 'Great work on the project',
      timestamp: 'Yesterday',
      isOnline: true,
      unreadCount: 0
    },
    {
      id: '5',
      name: 'Alex Chen',
      avatar: getRandomAvatar(),
      lastMessage: 'Let me know when you are free',
      timestamp: '2 days ago',
      isOnline: false,
      unreadCount: 3
    }
  ]);

  const [messages, setMessages] = useState({
    '1': [
      {
        id: 1,
        senderId: '1',
        senderName: 'Rocky Parker',
        content: 'Hi, How are you doing?',
        timestamp: '08:36 AM',
        isCurrentUser: false,
        messageType: 'text'
      },
      {
        id: 2,
        senderId: 'current',
        senderName: 'You',
        content: 'I am doing great, thanks for asking!',
        timestamp: '08:37 AM',
        isCurrentUser: true,
        messageType: 'text'
      },
      {
        id: 3,
        senderId: '1',
        senderName: 'Rocky Parker',
        content: 'How can i help you',
        timestamp: '08:38 AM',
        isCurrentUser: false,
        messageType: 'text'
      }
    ],
    '2': [
      {
        id: 1,
        senderId: '2',
        senderName: 'Sarah Wilson',
        content: 'Hey! How was your day?',
        timestamp: '08:15 AM',
        isCurrentUser: false,
        messageType: 'text'
      }
    ]
  });

  const currentChat = chatUsers.find(user => user.id === selectedChatId);
  const currentMessages = messages[selectedChatId] || [];

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        id: currentMessages.length + 1,
        senderId: 'current',
        senderName: 'You',
        content: inputMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isCurrentUser: true,
        messageType: 'text'
      };

      setMessages(prev => ({
        ...prev,
        [selectedChatId]: [...(prev[selectedChatId] || []), newMessage]
      }));
      setInputMessage('');
    }
  };

  const handleImageUpload = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      const imageUrls = [];
      let processedCount = 0;

      fileArray.forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageUrl = e.target?.result;
          imageUrls[index] = imageUrl;
          processedCount++;

          if (processedCount === fileArray.length) {
            const newMessage = {
              id: currentMessages.length + 1,
              senderId: 'current',
              senderName: 'You',
              content: fileArray.length > 1 ? `${fileArray.length} images` : '',
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              isCurrentUser: true,
              messageType: fileArray.length > 1 ? 'multiple-images' : 'image',
              imageUrl: fileArray.length === 1 ? imageUrls[0] : undefined,
              imageUrls: fileArray.length > 1 ? imageUrls : undefined
            };

            setMessages(prev => ({
              ...prev,
              [selectedChatId]: [...(prev[selectedChatId] || []), newMessage]
            }));
          }
        };
        reader.readAsDataURL(file);
      });
    }
        
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleImageClick = (imageSrc, userName) => {
    setModalImageSrc(imageSrc);
    setModalImageName(userName);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImageSrc('');
    setModalImageName('');
  };

  const handleChatSelect = (chatId) => {
    setSelectedChatId(chatId);
    setIsSidebarOpen(false);
  };

  const renderMessageContent = (message) => {
    if (message.messageType === 'text') {
      return <p className="text-sm break-words">{message.content}</p>;
    } else if (message.messageType === 'image') {
      return (
        <div className="relative max-w-full max-h-64 w-auto h-auto rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
          <img
            src={message.imageUrl || ''}
            alt="Shared image"
            className="object-cover w-full h-full max-w-72 max-h-48"
            onClick={() => handleImageClick(message.imageUrl || '', `Image from ${message.senderName}`)}
          />
        </div>
      );
    } else if (message.messageType === 'multiple-images' && message.imageUrls) {
      return (
        <div className="space-y-2">
          <div className={`grid gap-2 ${
            message.imageUrls.length === 1 ? 'grid-cols-1' :
            message.imageUrls.length === 2 ? 'grid-cols-2' :
            message.imageUrls.length === 3 ? 'grid-cols-3' :
            'grid-cols-2'
          }`}>
            {message.imageUrls.slice(0, 4).map((imageUrl, index) => (
              <div key={index} className="relative">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
                  <img
                    src={imageUrl}
                    alt={`Shared image ${index + 1}`}
                    className="object-cover w-full h-full"
                    onClick={() => handleImageClick(imageUrl, `Image ${index + 1} from ${message.senderName}`)}
                  />
                </div>
                {index === 3 && message.imageUrls && message.imageUrls.length > 4 && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                    <span className="text-white font-semibold text-sm sm:text-lg">+{message.imageUrls.length - 4}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          {message.imageUrls.length > 1 && (
            <p className="text-xs text-gray-400">{message.imageUrls.length} images</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex bg-gray-50 relative border border-gray-200 rounded-lg shadow-lg h-screen max-h-[88vh]">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Chat List */}
      <div className={`
        fixed lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out z-50
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        w-80 sm:w-96 md:w-60 lg:w-80 xl:w-96 bg-white border-r border-gray-200 flex flex-col h-full
      `}>
        {/* Sidebar Header */}
        <div className=" p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold text-gray-900">Messages</h1>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full lg:hidden md:hidden"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <MoreVertical className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {chatUsers.map((user) => (
            <div
              key={user.id}
              onClick={() => handleChatSelect(user.id)}
              className={`flex items-center p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 ${
                selectedChatId === user.id ? 'bg-blue-50 border-r-2 border-r-blue-500' : ''
              }`}
            >
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 rounded-full overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="object-cover w-full h-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleImageClick(user.avatar, user.name);
                    }}
                  />
                </div>
                {user.isOnline && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              
              <div className="ml-3 flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900 truncate">{user.name}</h3>
                  <span className="text-xs text-gray-500 flex-shrink-0">{user.timestamp}</span>
                </div>
                <p className="text-sm text-gray-600 truncate mt-1">{user.lastMessage}</p>
              </div>
              
              {user.unreadCount > 0 && (
                <div className="ml-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                  {user.unreadCount}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat Header */}
        {currentChat && (
          <div className="bg-white border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 min-w-0">
                <button 
                  onClick={() => setIsSidebarOpen(true)}
                  className="p-2 hover:bg-gray-100 rounded-full lg:hidden flex-shrink-0"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 rounded-full overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
                    <img
                      src={currentChat.avatar}
                      alt={currentChat.name}
                      className="object-cover w-full h-full"
                      onClick={() => handleImageClick(currentChat.avatar, currentChat.name)}
                    />
                  </div>
                  {currentChat.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="font-semibold text-gray-900 truncate">{currentChat.name}</h2>
                  <p className="text-sm text-gray-500 truncate">
                    {currentChat.isOnline ? 'Active now' : 'Last seen recently'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 flex-shrink-0">
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <MoreVertical className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {currentMessages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-3 ${
                message.isCurrentUser ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
                  <img
                    src={message.isCurrentUser ? getRandomAvatar() : currentChat?.avatar || ''}
                    alt={message.senderName}
                    className="object-cover w-full h-full"
                    onClick={() => handleImageClick(
                      message.isCurrentUser ? getRandomAvatar() : currentChat?.avatar || '', 
                      message.senderName
                    )}
                  />
                </div>
              </div>

              {/* Message Content */}
              <div className={`flex-1 min-w-0 max-w-xs md:max-w-md ${
                message.isCurrentUser ? 'text-right' : 'text-left'
              }`}>
                <div className={`inline-block rounded-2xl px-4 py-2 ${
                  message.isCurrentUser
                    ? 'bg-blue-500 text-white rounded-br-md'
                    : 'bg-gray-200 text-gray-800 rounded-bl-md'
                }`}>
                  {renderMessageContent(message)}
                </div>
                
                <p className={`text-xs text-gray-500 mt-1 ${
                  message.isCurrentUser ? 'text-right' : 'text-left'
                }`}>
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex-shrink-0 p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
            >
              <Image className="w-6 h-6" />
            </button>
            
            <button className="flex-shrink-0 p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-colors">
              <Paperclip className="w-6 h-6" />
            </button>

            <div className="flex-1 min-w-0">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className="flex-shrink-0 w-12 h-12 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center transition-colors duration-200"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            multiple
            className="hidden"
          />
        </div>
      </div>

      {/* Image Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl max-h-full">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-2xl max-h-full flex flex-col">
              <div className="p-4 bg-gray-50 border-b flex-shrink-0">
                <h3 className="text-lg font-semibold text-gray-900 truncate">{modalImageName}</h3>
              </div>
              
              <div className="p-4 flex-1 overflow-auto">
                <div className="max-w-full max-h-96 mx-auto rounded-lg overflow-hidden">
                  <img
                    src={modalImageSrc}
                    alt={modalImageName}
                    className="object-contain w-auto h-auto max-w-full max-h-full"
                  />
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 border-t flex justify-end space-x-3 flex-shrink-0">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Close
                </button>
                <a
                  href={modalImageSrc}
                  download
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors inline-block"
                >
                  Download
                </a>
              </div>
            </div>
          </div>
          
          <div 
            className="absolute inset-0 -z-10" 
            onClick={closeModal}
          ></div>
        </div>
      )}
    </div>
  );
};

export default ManagerMessage;