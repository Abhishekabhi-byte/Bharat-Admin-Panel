'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Image as ImageIcon, 
  Eye, 
  Edit2, 
  Trash2, 
  Plus, 
  Upload, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Search,
  FolderKanban,
  Tag,
  FileText,
  Layers,
  AlertCircle
} from 'lucide-react';

export default function AdminPage() {
  const [items, setItems] = useState([
    {
      id: 1,
      title: 'Summer Collection Launch',
      description: 'Introducing our new summer collection with vibrant colors and sustainable materials.',
      images: [
        'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=250',
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=250'
      ],
      category: 'Fashion',
      createdAt: '2026-07-01'
    },
    {
      id: 2,
      title: 'Tech Innovation Summit',
      description: 'Annual technology conference featuring industry leaders and innovative startups.',
      images: [
        'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=250',
        'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=250'
      ],
      category: 'Technology',
      createdAt: '2026-07-05'
    },
    {
      id: 3,
      title: 'Art Exhibition 2024',
      description: 'Modern art exhibition showcasing contemporary artists from around the world.',
      images: [
        'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=250'
      ],
      category: '',
      createdAt: '2026-07-06'
    },
    {
      id: 4,
      title: 'Sustainable Living Workshop',
      description: 'Learn about sustainable living practices and eco-friendly lifestyle choices.',
      images: [
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=250'
      ],
      category: 'Education',
      createdAt: '2026-07-07'
    },
    {
      id: 5,
      title: 'Product Launch Event',
      description: 'Exclusive product launch event for our latest innovation in smart home technology.',
      images: [
        'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=250',
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=250',
        'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=250'
      ],
      category: 'Products',
      createdAt: '2026-07-08'
    },
    {
      id: 6,
      title: 'Community Outreach Program',
      description: 'Community engagement program focusing on education and skill development.',
      images: [
        'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=250'
      ],
      category: 'Community',
      createdAt: '2026-07-09'
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 5;

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFiles, setImageFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [category, setCategory] = useState('');
  const [formError, setFormError] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewingItem, setViewingItem] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fileInputRef = useRef(null);

  // Filter items based on search
  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.category && item.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      previewUrls.forEach(url => {
        if (url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [previewUrls]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    e.target.value = '';

    if (files.length === 0) return;

    const invalidFiles = files.filter(file => !file.type.startsWith('image/'));
    if (invalidFiles.length > 0) {
      setFormError('Please upload valid image files (JPEG, PNG, GIF, WEBP).');
      return;
    }

    const largeFiles = files.filter(file => file.size > 5 * 1024 * 1024);
    if (largeFiles.length > 0) {
      setFormError('Each image must be less than 5MB.');
      return;
    }

    setFormError('');

    const newPreviews = files.map(file => URL.createObjectURL(file));
    setImageFiles([...imageFiles, ...files]);
    setPreviewUrls([...previewUrls, ...newPreviews]);
  };

  const removeImage = (index) => {
    if (previewUrls[index] && previewUrls[index].startsWith('blob:')) {
      URL.revokeObjectURL(previewUrls[index]);
    }
    const newFiles = imageFiles.filter((_, i) => i !== index);
    const newPreviews = previewUrls.filter((_, i) => i !== index);
    setImageFiles(newFiles);
    setPreviewUrls(newPreviews);
  };

  const validateForm = () => {
    if (previewUrls.length === 0) {
      setFormError('Please select at least one image.');
      return false;
    }
    if (!title.trim()) {
      setFormError('Please enter a title.');
      return false;
    }
    return true;
  };

  const handleCreateItem = (e) => {
    e.preventDefault();
    setFormError('');

    if (!validateForm()) return;

    const newItem = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      images: previewUrls,
      category: category.trim(),
      createdAt: new Date().toISOString().split('T')[0]
    };

    setItems([newItem, ...items]);
    setCurrentPage(1);
    resetForm();
    setIsModalOpen(false);
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setTitle(item.title);
    setDescription(item.description);
    setPreviewUrls(item.images);
    setCategory(item.category);
    setImageFiles([]);
    setFormError('');
    setIsModalOpen(true);
  };

  const handleUpdateItem = (e) => {
    e.preventDefault();
    setFormError('');

    if (!validateForm()) return;

    const updatedItems = items.map(item =>
      item.id === editingId
        ? {
            ...item,
            title: title.trim(),
            description: description.trim(),
            images: previewUrls,
            category: category.trim()
          }
        : item
    );

    setItems(updatedItems);
    resetForm();
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
      setIsDeleting(true);
      setTimeout(() => {
        const updatedItems = items.filter(item => item.id !== id);
        setItems(updatedItems);
        const newTotalPages = Math.ceil(updatedItems.length / itemsPerPage);
        if (currentPage > newTotalPages && newTotalPages > 0) {
          setCurrentPage(newTotalPages);
        }
        setIsDeleting(false);
      }, 300);
    }
  };

  const handleView = (item) => {
    setViewingItem(item);
    setIsViewModalOpen(true);
  };

  const resetForm = () => {
    previewUrls.forEach(url => {
      if (url.startsWith('blob:')) {
        URL.revokeObjectURL(url);
      }
    });
    setImageFiles([]);
    setPreviewUrls([]);
    setTitle('');
    setDescription('');
    setCategory('');
    setEditingId(null);
    setFormError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const truncateText = (text, maxLength = 40) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '…';
  };

  return (
    <div className="min-h-screen w-full  flex items-start justify-center p-3 md:p-6">
      <div className="w-full max-w-7xl bg-slate-900 backdrop-blur-xl rounded-2xl shadow-2xl p-4 md:p-6 border border-white/20">
        {/* Table */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-white/30 shadow-xl overflow-hidden flex flex-col justify-between">
          {/* Table Header with Search */}
          <div className="flex justify-between items-center p-4 border-b border-red-200/50">
            <div className="flex items-center gap-3">
              <FolderKanban className="w-5 h-5 text-red-600" />
              <span className="font-semibold text-gray-800">Items</span>
              <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">
                {filteredItems.length}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search items..."
                  className="w-48 md:w-64 pl-9 pr-4 py-2 text-sm text-gray-800 border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 bg-white/80"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button
                onClick={() => {
                  resetForm();
                  setIsModalOpen(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-all duration-300 whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                Add Item
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-red-50/50 border-b border-red-200/50 text-gray-700 font-semibold uppercase text-xs tracking-wider">
                  <th className="px-6 py-4 w-[140px]">Images</th>
                  <th className="px-6 py-4 min-w-[150px]">Title</th>
                  <th className="px-6 py-4 min-w-[200px]">Description</th>
                  <th className="px-6 py-4 w-[140px]">Category</th>
                  <th className="px-6 py-4 w-[130px]">Created</th>
                  <th className="px-6 py-4 w-[160px] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-red-100/50">
                {currentItems.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-16">
                      <FolderKanban className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                      <p className="font-medium text-gray-500 text-base">No items found</p>
                      <p className="text-sm text-gray-400 mt-1">Try adjusting your search or add a new item</p>
                    </td>
                  </tr>
                ) : (
                  currentItems.map((item) => (
                    <tr key={item.id} className="hover:bg-red-50/30 transition-colors duration-150">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5">
                          {item.images.slice(0, 3).map((img, idx) => (
                            <div key={idx} className="w-12 h-12 rounded-lg overflow-hidden border border-red-200 shadow-sm">
                              <img 
                                src={img} 
                                alt={`Image ${idx + 1}`} 
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.src = 'https://via.placeholder.com/100x100/FF6B6B/FFFFFF?text=No+Image';
                                }}
                              />
                            </div>
                          ))}
                          {item.images.length > 3 && (
                            <div className="w-12 h-12 rounded-lg bg-red-100 border border-red-200 flex items-center justify-center text-xs font-bold text-red-700">
                              +{item.images.length - 3}
                            </div>
                          )}
                        </div>
                      </td>
                      
                      <td className="px-6 py-4">
                        <span className="font-semibold text-gray-800 block text-base">{item.title}</span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600 block max-w-xs" title={item.description}>
                          {truncateText(item.description, 40)}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        {item.category ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border bg-red-50/80 border-red-200/50 text-red-700 text-xs font-medium">
                            <Tag className="w-3 h-3" />
                            {item.category}
                          </span>
                        ) : (
                          <span className="text-xs italic text-gray-400">Not specified</span>
                        )}
                      </td>

                      <td className="px-6 py-4 text-gray-600 font-medium whitespace-nowrap text-xs">
                        {item.createdAt}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => handleView(item)}
                            title="View" 
                            className="p-2 text-gray-500 rounded-lg hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                          >
                            <Eye className="w-4.5 h-4.5" />
                          </button>
                          <button 
                            onClick={() => handleEdit(item)}
                            title="Edit" 
                            className="p-2 text-gray-500 rounded-lg hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                          >
                            <Edit2 className="w-4.5 h-4.5" />
                          </button>
                          <button 
                            onClick={() => handleDelete(item.id)}
                            disabled={isDeleting}
                            title="Delete" 
                            className="p-2 text-gray-500 rounded-lg hover:text-red-600 hover:bg-red-50 transition-all duration-200 disabled:opacity-50"
                          >
                            <Trash2 className="w-4.5 h-4.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredItems.length > 0 && (
            <div className="px-6 py-4 border-t border-red-200/50 flex flex-col sm:flex-row justify-between items-center gap-4 bg-red-50/30">
              <span className="font-medium text-gray-600 text-sm">
                Showing <span className="text-gray-800 font-bold">{indexOfFirstItem + 1}</span> to{' '}
                <span className="text-gray-800 font-bold">
                  {Math.min(indexOfLastItem, filteredItems.length)}
                </span>{' '}
                of <span className="text-gray-800 font-bold">{filteredItems.length}</span> items
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
          <div className="bg-white rounded-xl w-full max-w-2xl p-6 shadow-xl border border-red-200 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                {editingId ? (
                  <>
                    <Edit2 className="w-5 h-5 text-red-600" />
                    Edit Item
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5 text-red-600" />
                    Add New Item
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

            {formError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 text-red-700 text-sm">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={editingId ? handleUpdateItem : handleCreateItem} className="space-y-4 text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left Column */}
                <div>
                  {/* Images */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Images * (Multiple)
                    </label>
                    {previewUrls.length > 0 ? (
                      <div className="space-y-2">
                        <div className="grid grid-cols-3 gap-2">
                          {previewUrls.map((url, index) => (
                            <div key={index} className="relative group">
                              <div className="w-full h-24 rounded-lg overflow-hidden border border-red-200 shadow-sm">
                                <img 
                                  src={url} 
                                  alt={`Upload ${index + 1}`} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute -top-1 -right-1 p-1 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition-all"
                                aria-label="Remove image"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                          <label className="w-full h-24 rounded-lg border-2 border-dashed border-red-300 rounded-lg cursor-pointer hover:bg-red-50 transition-all duration-200 hover:border-red-500 flex items-center justify-center">
                            <Plus className="w-6 h-6 text-red-400" />
                            <input 
                              ref={fileInputRef}
                              type="file" 
                              accept="image/*" 
                              multiple
                              className="hidden" 
                              onChange={handleImageChange}
                              aria-label="Upload more images"
                            />
                          </label>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            if (fileInputRef.current) {
                              fileInputRef.current.click();
                            }
                          }}
                          className="w-full py-2 border border-red-200 rounded-lg text-red-600 font-medium hover:bg-red-50 transition-all duration-200"
                        >
                          + Add More Images
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-red-300 rounded-lg cursor-pointer hover:bg-red-50 transition-all duration-200 hover:border-red-500">
                        <Upload className="w-10 h-10 text-red-400 mb-2" />
                        <span className="text-sm font-medium text-gray-700">Upload images</span>
                        <span className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 5MB each</span>
                        <span className="text-xs text-gray-400">Select multiple images</span>
                        <input 
                          ref={fileInputRef}
                          type="file" 
                          accept="image/*" 
                          multiple
                          className="hidden" 
                          onChange={handleImageChange}
                          aria-label="Upload images"
                        />
                      </label>
                    )}
                    <p className="text-xs text-gray-400 mt-2">
                      {previewUrls.length} image{previewUrls.length !== 1 ? 's' : ''} selected
                    </p>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  {/* Title */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Title *
                    </label>
                    <input 
                      type="text" 
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Summer Collection Launch"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                      maxLength={100}
                    />
                    <div className="text-xs text-gray-400 mt-1 text-right">
                      {title.length}/100
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Description
                    </label>
                    <textarea 
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe your item in detail..."
                      rows="3"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all resize-none"
                     
                    />
                   
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Category (Optional)
                    </label>
                    <input 
                      type="text" 
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      placeholder="e.g. Fashion, Technology"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                      maxLength={50}
                    />
                  </div>
                </div>
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
                  {editingId ? 'Update Item' : 'Save Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {isViewModalOpen && viewingItem && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => {
          setIsViewModalOpen(false);
          setViewingItem(null);
        }}>
          <div className="bg-white rounded-xl w-full max-w-2xl p-6 shadow-xl border border-red-200 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <FolderKanban className="w-5 h-5 text-red-600" />
                Item Details
              </h3>
              <button 
                onClick={() => {
                  setIsViewModalOpen(false);
                  setViewingItem(null);
                }}
                className="p-2 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5">
              {/* Image Gallery */}
              <div className="grid grid-cols-3 gap-3">
                {viewingItem.images.map((img, idx) => (
                  <div key={idx} className="w-full h-36 rounded-lg overflow-hidden border border-red-200 shadow-sm">
                    <img 
                      src={img} 
                      alt={`Image ${idx + 1}`} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x300/FF6B6B/FFFFFF?text=No+Image';
                      }}
                    />
                  </div>
                ))}
              </div>
              
              <div className="space-y-4 bg-red-50/50 p-5 rounded-lg border border-red-200/50">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <FileText className="w-4 h-4 text-red-600" />
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Title</p>
                  </div>
                  <p className="text-base font-semibold text-gray-800">{viewingItem.title}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <FileText className="w-4 h-4 text-red-600" />
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Description</p>
                  </div>
                  <p className="text-sm text-gray-700">{viewingItem.description || 'No description provided'}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <Tag className="w-4 h-4 text-red-600" />
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Category</p>
                    </div>
                    {viewingItem.category ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border bg-red-50/80 border-red-200/50 text-red-700 text-xs font-medium">
                        <Tag className="w-3 h-3" />
                        {viewingItem.category}
                      </span>
                    ) : (
                      <p className="text-sm text-gray-400 italic">Not specified</p>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <Layers className="w-4 h-4 text-red-600" />
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Created Date</p>
                    </div>
                    <p className="text-sm font-medium text-gray-700">{viewingItem.createdAt}</p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <ImageIcon className="w-4 h-4 text-red-600" />
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Total Images</p>
                  </div>
                  <p className="text-sm font-medium text-gray-700">{viewingItem.images.length} images</p>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsViewModalOpen(false);
                  setViewingItem(null);
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