'use client';

import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Eye, 
  Edit2, 
  Trash2, 
  Plus, 
  Upload, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Search,
  Calendar,
  Tag,
  Users,
  Zap,
  Wrench,
  Building,
  Train,
  Award,
  BookOpen
} from 'lucide-react';

export default function JourneyPage() {
  const [journeyEntries, setJourneyEntries] = useState([
    {
      id: 1,
      imageUrl: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=250',
      title: 'Company Foundation & Early Growth',
      description: 'Established our company with a vision to deliver excellence in electrical and industrial services.',
      startDate: '2018-06-01',
      endDate: '2020-12-31',
      isPresent: false,
      category: 'our-team'
    },
    {
      id: 2,
      imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=250',
      title: 'Major Electrical Installation Projects',
      description: 'Successfully completed large-scale electrical installations for commercial and industrial clients.',
      startDate: '2020-01-01',
      endDate: '2021-12-31',
      isPresent: false,
      category: 'electrical-installations'
    },
    {
      id: 3,
      imageUrl: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=250',
      title: 'Transformer Service & Maintenance',
      description: 'Launched specialized transformer maintenance and repair services for power utilities.',
      startDate: '2021-01-01',
      endDate: '2022-12-31',
      isPresent: false,
      category: 'transformer-service'
    },
    {
      id: 4,
      imageUrl: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=250',
      title: 'Industrial Infrastructure Development',
      description: 'Developed industrial infrastructure solutions for manufacturing and heavy industries.',
      startDate: '2022-01-01',
      endDate: '2023-12-31',
      isPresent: false,
      category: 'industrial-infrastructure'
    },
    {
      id: 5,
      imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=250',
      title: 'Railway Electrification Projects',
      description: 'Played a key role in railway electrification and infrastructure modernization.',
      startDate: '2023-01-01',
      endDate: '2024-12-31',
      isPresent: false,
      category: 'railway-project'
    },
    {
      id: 6,
      imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=250',
      title: 'Industry Awards & Achievements',
      description: 'Received multiple industry awards for innovation, safety, and service excellence.',
      startDate: '2024-01-01',
      endDate: '',
      isPresent: true,
      category: 'events-achievements'
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 5;

  // Form state
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isPresent, setIsPresent] = useState(false);
  const [category, setCategory] = useState('our-team');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewingEntry, setViewingEntry] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // Category options
  const categories = [
    { value: 'our-team', label: 'Our Team', icon: Users },
    { value: 'electrical-installations', label: 'Electrical Installations', icon: Zap },
    { value: 'transformer-service', label: 'Transformer Service', icon: Wrench },
    { value: 'industrial-infrastructure', label: 'Industrial Infrastructure', icon: Building },
    { value: 'railway-project', label: 'Railway Project', icon: Train },
    { value: 'events-achievements', label: 'Events & Achievements', icon: Award },
  ];

  const getCategoryLabel = (value) => {
    const found = categories.find(cat => cat.value === value);
    return found ? found.label : value;
  };

  const getCategoryIcon = (value) => {
    const found = categories.find(cat => cat.value === value);
    return found ? found.icon : Tag;
  };

  const getCategoryColor = (value) => {
    switch(value) {
      case 'our-team': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'electrical-installations': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'transformer-service': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'industrial-infrastructure': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'railway-project': return 'bg-rose-100 text-rose-700 border-rose-200';
      case 'events-achievements': return 'bg-indigo-100 text-indigo-700 border-indigo-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  // Filter entries based on search
  const filteredEntries = journeyEntries.filter(entry =>
    entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    getCategoryLabel(entry.category).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEntries.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEntries = filteredEntries.slice(indexOfFirstItem, indexOfLastItem);

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Ensure current page is always valid after filter changes
  useEffect(() => {
    if (filteredEntries.length === 0) {
      setCurrentPage(1);
    } else if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [filteredEntries.length, totalPages]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    e.target.value = '';

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (JPEG, PNG, GIF, WEBP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB.');
      return;
    }

    if (previewUrl && !previewUrl.startsWith('http')) {
      URL.revokeObjectURL(previewUrl);
    }

    setImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleCreateEntry = (e) => {
    e.preventDefault();
    if (!previewUrl) return alert('Please select an image.');
    if (!title.trim()) return alert('Please enter a title.');
    if (!description.trim()) return alert('Please enter a description.');
    if (!startDate) return alert('Please select a start date.');

    if (!isPresent && !endDate) {
      return alert('Please select an end date or check "Present".');
    }

    if (!isPresent && endDate && startDate > endDate) {
      return alert('Start date cannot be later than end date.');
    }

    const newEntry = {
      id: Date.now(),
      imageUrl: previewUrl,
      title: title.trim(),
      description: description.trim(),
      startDate: startDate,
      endDate: isPresent ? '' : endDate,
      isPresent: isPresent,
      category: category
    };

    setJourneyEntries([newEntry, ...journeyEntries]);
    setCurrentPage(1);
    resetForm();
    setIsModalOpen(false);
  };

  const handleEdit = (entry) => {
    setEditingId(entry.id);
    setPreviewUrl(entry.imageUrl);
    setTitle(entry.title);
    setDescription(entry.description);
    setStartDate(entry.startDate);
    setEndDate(entry.endDate);
    setIsPresent(entry.isPresent);
    setCategory(entry.category);
    setIsModalOpen(true);
  };

  const handleUpdateEntry = (e) => {
    e.preventDefault();
    if (!previewUrl) return alert('Please select an image.');
    if (!title.trim()) return alert('Please enter a title.');
    if (!description.trim()) return alert('Please enter a description.');
    if (!startDate) return alert('Please select a start date.');

    if (!isPresent && !endDate) {
      return alert('Please select an end date or check "Present".');
    }

    if (!isPresent && endDate && startDate > endDate) {
      return alert('Start date cannot be later than end date.');
    }

    const updatedEntries = journeyEntries.map(entry =>
      entry.id === editingId
        ? {
            ...entry,
            imageUrl: previewUrl,
            title: title.trim(),
            description: description.trim(),
            startDate: startDate,
            endDate: isPresent ? '' : endDate,
            isPresent: isPresent,
            category: category
          }
        : entry
    );

    setJourneyEntries(updatedEntries);
    resetForm();
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this journey entry?')) {
      const updatedEntries = journeyEntries.filter(entry => entry.id !== id);
      setJourneyEntries(updatedEntries);
    }
  };

  const handleView = (entry) => {
    setViewingEntry(entry);
    setIsViewModalOpen(true);
  };

  const resetForm = () => {
    if (previewUrl && !previewUrl.startsWith('http')) {
      URL.revokeObjectURL(previewUrl);
    }
    setImage(null);
    setPreviewUrl('');
    setTitle('');
    setDescription('');
    setStartDate('');
    setEndDate('');
    setIsPresent(false);
    setCategory('our-team');
    setEditingId(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const truncateText = (text, maxLength = 50) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '…';
  };

  const formatDateRange = (entry) => {
    const start = entry.startDate ? new Date(entry.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '';
    const end = entry.isPresent ? 'Present' : (entry.endDate ? new Date(entry.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '');
    return `${start} — ${end}`;
  };

  const getDuration = (entry) => {
    if (!entry.startDate) return 0;
    const start = new Date(entry.startDate);
    const end = entry.isPresent ? new Date() : new Date(entry.endDate || new Date());
    const diffTime = Math.abs(end - start);
    const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);
    return Math.round(diffYears) || 1; 
  };

  return (
    <div className="min-h-screen w-full  flex items-start justify-center p-3 md:p-6 relative overflow-hidden">
      {/* Side Blur Effect - Left */}
     

      <div className="w-full max-w-7xl bg-slate-900 backdrop-blur-xl rounded-2xl shadow-2xl p-4 md:p-6 border border-white/20 relative z-10">
        
        {/* Table */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-white/30 shadow-xl overflow-hidden flex flex-col justify-between">
          
          {/* Table Header with Search */}
          <div className="p-4 border-b border-red-200/50">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-red-600" />
                <span className="font-semibold text-gray-800">Journey</span>
                <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">
                  {filteredEntries.length}
                </span>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-none">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search journeys..."
                    className="w-full sm:w-64 pl-9 pr-4 py-2 text-sm text-gray-800 border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 bg-white/80"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-all duration-300 whitespace-nowrap"
                >
                  <Plus className="w-4 h-4" />
                  Add Journey
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-red-50/50 border-b border-red-200/50 text-gray-700 font-semibold uppercase text-xs tracking-wider">
                  <th className="px-6 py-4 w-[100px]">Image</th>
                  <th className="px-6 py-4 w-[220px]">Title</th>
                  <th className="px-6 py-4">Description</th>
                  <th className="px-6 py-4 w-[140px]">Date Range</th>
                  <th className="px-6 py-4 w-[150px]">Category</th>
                  <th className="px-6 py-4 w-[110px]">Duration</th>
                  <th className="px-6 py-4 w-[150px] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-red-100/50">
                {currentEntries.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-16">
                      <Clock className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                      <p className="font-medium text-gray-500 text-base">No journey entries found</p>
                      <p className="text-sm text-gray-400 mt-1">Try adjusting your search or add a new entry</p>
                    </td>
                  </tr>
                ) : (
                  currentEntries.map((entry) => {
                    const CategoryIcon = getCategoryIcon(entry.category);
                    return (
                      <tr key={entry.id} className="hover:bg-red-50/30 transition-colors duration-150">
                        <td className="px-6 py-4">
                          <div className="w-14 h-14 rounded-lg overflow-hidden border border-red-200 shadow-sm">
                            <img 
                              src={entry.imageUrl} 
                              alt={entry.title} 
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/100x100/FF6B6B/FFFFFF?text=No+Image';
                              }}
                            />
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <span className="font-semibold text-gray-800 block truncate max-w-[200px]">{truncateText(entry.title, 10)}</span>
                        </td>

                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-600 block max-w-xs truncate">{truncateText(entry.description, 20)}</span>
                        </td>

                        <td className="px-6 py-4 text-gray-600 font-medium whitespace-nowrap text-xs">
                          {formatDateRange(entry)}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium ${getCategoryColor(entry.category)}`}>
                            <CategoryIcon className="w-3.5 h-3.5 flex-shrink-0" />
                            {getCategoryLabel(entry.category)}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-1.5 bg-red-50/80 px-3 py-1.5 rounded-full border border-red-200/50 text-xs font-medium text-gray-700">
                            <Clock className="w-3.5 h-3.5 text-red-600" />
                            {getDuration(entry)} {getDuration(entry) === 1 ? 'year' : 'years'}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button 
                              onClick={() => handleView(entry)}
                              title="View" 
                              className="p-2 text-gray-500 rounded-lg hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                            >
                              <Eye className="w-4.5 h-4.5" />
                            </button>
                            <button 
                              onClick={() => handleEdit(entry)}
                              title="Edit" 
                              className="p-2 text-gray-500 rounded-lg hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                            >
                              <Edit2 className="w-4.5 h-4.5" />
                            </button>
                            <button 
                              onClick={() => handleDelete(entry.id)}
                              title="Delete" 
                              className="p-2 text-gray-500 rounded-lg hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                            >
                              <Trash2 className="w-4.5 h-4.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredEntries.length > 0 && (
            <div className="px-6 py-4 border-t border-red-200/50 flex flex-col sm:flex-row justify-between items-center gap-4 bg-red-50/30">
              <span className="font-medium text-gray-600 text-sm">
                Showing <span className="text-gray-800 font-bold">{indexOfFirstItem + 1}</span> to{' '}
                <span className="text-gray-800 font-bold">
                  {Math.min(indexOfLastItem, filteredEntries.length)}
                </span>{' '}
                of <span className="text-gray-800 font-bold">{filteredEntries.length}</span> entries
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-red-200/50 bg-white text-gray-600 hover:bg-red-50 hover:border-red-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {Array.from({ length: Math.min(totalPages, 5) }, (_, index) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = index + 1;
                  } else if (currentPage <= 3) {
                    pageNum = index + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + index;
                  } else {
                    pageNum = currentPage - 2 + index;
                  }
                  
                  const isSelected = currentPage === pageNum;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-9 h-9 rounded-lg text-sm font-bold transition-all duration-200 ${
                        isSelected
                          ? 'bg-red-600 text-white shadow-md'
                          : 'bg-white border border-red-200/50 text-gray-700 hover:bg-red-50 hover:border-red-300'
                      }`}
                      aria-label={`Go to page ${pageNum}`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-red-200/50 bg-white text-gray-600 hover:bg-red-50 hover:border-red-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
                  aria-label="Next page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={closeModal}>
          <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-xl border border-red-200 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                {editingId ? (
                  <>
                    <Edit2 className="w-5 h-5 text-red-600" />
                    Edit Journey
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5 text-red-600" />
                    Add Journey
                  </>
                )}
              </h3>
              <button 
                onClick={closeModal} 
                className="p-2 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={editingId ? handleUpdateEntry : handleCreateEntry} className="space-y-4 text-sm">
              {/* Image */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Image *
                </label>
                {previewUrl ? (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-red-200 shadow-sm">
                    <img 
                      key={previewUrl}
                      src={previewUrl} 
                      alt="Preview" 
                      className="w-full h-full object-cover" 
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (previewUrl && !previewUrl.startsWith('http')) {
                          URL.revokeObjectURL(previewUrl);
                        }
                        setPreviewUrl('');
                        setImage(null);
                      }}
                      className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition-all"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-red-300 rounded-lg cursor-pointer hover:bg-red-50 transition-all duration-200 hover:border-red-500">
                    <Upload className="w-10 h-10 text-red-400 mb-2" />
                    <span className="text-sm font-medium text-gray-700">Click to upload image</span>
                    <span className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 5MB</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleImageChange} 
                    />
                  </label>
                )}
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Title *
                </label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Infrastructure Modernization"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                  maxLength={300}
                />
                <div className="text-xs text-gray-400 mt-1 text-right">
                  {title.length}/300
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Description *
                </label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the journey milestone..."
                  rows="3"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all resize-none"
            
                />
             
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all bg-white"
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    Start Date *
                  </label>
                  <input 
                    type="date" 
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    End Date
                  </label>
                  <input 
                    type="date" 
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    disabled={isPresent}
                    className={`w-full px-4 py-2.5 rounded-lg border text-sm text-gray-800 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all ${
                      isPresent ? 'bg-gray-100 border-gray-200 cursor-not-allowed' : 'border-gray-200'
                    }`}
                  />
                </div>
              </div>

              {/* Present Checkbox */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isPresent"
                  checked={isPresent}
                  onChange={(e) => {
                    setIsPresent(e.target.checked);
                    if (e.target.checked) {
                      setEndDate('');
                    }
                  }}
                  className="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <label htmlFor="isPresent" className="text-sm font-medium text-gray-700">
                  Present (ongoing)
                </label>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-2.5 border border-gray-200 rounded-lg font-semibold text-gray-600 hover:bg-gray-50 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all duration-300"
                >
                  {editingId ? 'Update Journey' : 'Save Journey'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {isViewModalOpen && viewingEntry && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => {
          setIsViewModalOpen(false);
          setViewingEntry(null);
        }}>
          <div className="bg-white rounded-xl w-full max-w-lg p-6 shadow-xl border border-red-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-red-600" />
                Journey Details
              </h3>
              <button 
                onClick={() => {
                  setIsViewModalOpen(false);
                  setViewingEntry(null);
                }}
                className="p-2 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5">
              {/* Image */}
              <div className="w-full h-56 rounded-lg overflow-hidden border-2 border-red-200 shadow-md">
                <img 
                  src={viewingEntry.imageUrl} 
                  alt={viewingEntry.title} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/600x400/FF6B6B/FFFFFF?text=No+Image';
                  }}
                />
              </div>

              {/* Details */}
              <div className="space-y-4 bg-red-50/50 p-4 rounded-lg border border-red-200/50">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Title</p>
                  <p className="text-base font-semibold text-gray-800 mt-1">{viewingEntry.title}</p>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Description</p>
                  <p className="text-sm text-gray-700 mt-1 leading-relaxed">{viewingEntry.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Category</p>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium mt-1.5 ${getCategoryColor(viewingEntry.category)}`}>
                      {React.createElement(getCategoryIcon(viewingEntry.category), { className: 'w-3.5 h-3.5' })}
                      {getCategoryLabel(viewingEntry.category)}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Duration</p>
                    <p className="text-sm font-medium text-gray-700 mt-1.5">
                      {getDuration(viewingEntry)} {getDuration(viewingEntry) === 1 ? 'year' : 'years'}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Date Range</p>
                  <p className="text-sm font-medium text-gray-700 mt-1">{formatDateRange(viewingEntry)}</p>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => {
                  setIsViewModalOpen(false);
                  setViewingEntry(null);
                }}
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}