'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  FileText, 
  Eye, 
  Edit2, 
  Trash2, 
  Plus, 
  Upload, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Search,
  AlertCircle,
  Image as ImageIcon,
  Tag,
  Grid,
  CheckCircle,
  ImagePlus,
  List
} from 'lucide-react';

export default function AboutHeadSection() {
  const [aboutItems, setAboutItems] = useState([
    {
      id: 1,
      title: 'About Our Company',
      description: 'We are a leading electrical engineering company specializing in power substations, transformer services, and comprehensive electrical solutions. With over 10 years of industry experience, we have successfully delivered projects across India.',
      images: [
        'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=400',
        'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400',
        'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=400'
      ],
      createdAt: '2026-07-01'
    },
    {
      id: 2,
      title: 'Our Mission & Vision',
      description: 'To deliver excellence in electrical engineering through innovation, quality, and customer satisfaction. We aim to be the preferred partner for electrical infrastructure solutions.',
      images: [
        'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400',
        'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400'
      ],
      createdAt: '2026-07-05'
    },
    {
      id: 3,
      title: 'Our Core Values',
      description: 'Integrity, innovation, safety, and customer-centric approach are the cornerstones of our organization. We believe in sustainable practices and continuous improvement.',
      images: [
        'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400',
        'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400'
      ],
      createdAt: '2026-07-10'
    },
    {
      id: 4,
      title: 'Our Expertise',
      description: 'With expertise in power substations, domestic wiring, transformer services, servo stabilizers, cable laying, and facade lighting, we provide end-to-end electrical solutions.',
      images: [
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400'
      ],
      createdAt: '2026-07-15'
    },
    {
      id: 5,
      title: 'Our Team',
      description: 'Our team consists of highly skilled engineers, technicians, and support staff dedicated to delivering quality electrical solutions with safety and precision.',
      images: [
        'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=400',
        'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=400',
        'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=400'
      ],
      createdAt: '2026-07-18'
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
  const [formError, setFormError] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewingItem, setViewingItem] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fileInputRef = useRef(null);

  // Filter items based on search
  const filteredItems = aboutItems.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
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

  const handleMultipleImageChange = (e) => {
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

    previewUrls.forEach(url => {
      if (url.startsWith('blob:')) {
        URL.revokeObjectURL(url);
      }
    });

    const newPreviewUrls = files.map(file => URL.createObjectURL(file));
    setImageFiles([...imageFiles, ...files]);
    setPreviewUrls([...previewUrls, ...newPreviewUrls]);
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
      setFormError('Please upload at least one image.');
      return false;
    }
    if (!title.trim()) {
      setFormError('Please enter the title.');
      return false;
    }
    if (!description.trim()) {
      setFormError('Please enter the description.');
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
      createdAt: new Date().toISOString().split('T')[0]
    };

    setAboutItems([newItem, ...aboutItems]);
    setCurrentPage(1);
    resetForm();
    setIsModalOpen(false);
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setTitle(item.title);
    setDescription(item.description);
    setPreviewUrls(item.images);
    setImageFiles([]);
    setFormError('');
    setIsModalOpen(true);
  };

  const handleUpdateItem = (e) => {
    e.preventDefault();
    setFormError('');

    if (!validateForm()) return;

    const updatedItems = aboutItems.map(item =>
      item.id === editingId
        ? {
            ...item,
            title: title.trim(),
            description: description.trim(),
            images: previewUrls
          }
        : item
    );

    setAboutItems(updatedItems);
    resetForm();
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
      setIsDeleting(true);
      setTimeout(() => {
        const updatedItems = aboutItems.filter(item => item.id !== id);
        setAboutItems(updatedItems);
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

  // Truncate text
  const truncateText = (text, maxLength = 40) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '…';
  };

  return (
    <div className="min-h-screen w-full  flex items-start justify-center p-4 md:p-8 relative overflow-hidden">
     
      <div className="w-full max-w-7xl bg-slate-700 backdrop-blur-xl rounded-2xl shadow-2xl p-4 md:p-6 border border-white/20 relative z-10">
        {/* Table */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-white/30 shadow-xl overflow-hidden flex flex-col justify-between">
          {/* Table Header with Search */}
          <div className="flex flex-wrap justify-between items-center p-5 border-b border-red-200/50 gap-3">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-red-600" />
              <span className="font-semibold text-gray-800 text-base">About Head</span>
              <span className="text-xs bg-red-100 text-red-700 px-2.5 py-1 rounded-full font-medium">
                {filteredItems.length}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search about items..."
                  className="w-56 md:w-64 pl-9 pr-4 py-2.5 text-sm text-gray-800 border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 bg-white/80"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button
                onClick={() => {
                  resetForm();
                  setIsModalOpen(true);
                }}
                className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-all duration-300 whitespace-nowrap"
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
                  <th className="px-5 py-4 w-[140px]">Images</th>
                  <th className="px-5 py-4 min-w-[150px]">Title</th>
                  <th className="px-5 py-4 min-w-[200px]">Description</th>
                  <th className="px-5 py-4 w-[140px] text-center">Total Images</th>
                  <th className="px-5 py-4 w-[160px] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-red-100/50">
                {currentItems.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-16">
                      <FileText className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                      <p className="font-medium text-gray-500 text-base">No items found</p>
                      <p className="text-sm text-gray-400 mt-1">Try adjusting your search or add a new item</p>
                    </td>
                  </tr>
                ) : (
                  currentItems.map((item) => (
                    <tr key={item.id} className="hover:bg-red-50/30 transition-colors duration-150">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1">
                          {item.images && item.images.length > 0 ? (
                            <>
                              <div className="w-12 h-12 rounded-lg overflow-hidden border border-red-200 shadow-sm flex-shrink-0">
                                <img 
                                  src={item.images[0]} 
                                  alt={item.title} 
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/100x100/FF6B6B/FFFFFF?text=No+Image';
                                  }}
                                />
                              </div>
                              {item.images.length > 1 && (
                                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-full">
                                  +{item.images.length - 1}
                                </span>
                              )}
                            </>
                          ) : (
                            <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
                              <ImageIcon className="w-6 h-6 text-red-300" />
                            </div>
                          )}
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <span className="font-semibold text-gray-800 text-sm">{item.title}</span>
                      </td>

                      <td className="px-5 py-4">
                        <span className="text-sm text-gray-600">{truncateText(item.description, 40)}</span>
                      </td>

                      <td className="px-5 py-4 text-center">
                        <span className="inline-flex items-center gap-1.5 bg-red-50/80 text-gray-700 px-3 py-1 rounded-full border border-red-200/50 text-xs font-medium">
                          <ImageIcon className="w-3.5 h-3.5 text-red-600" />
                          {item.images?.length || 0}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => handleView(item)}
                            title="View" 
                            className="p-2 text-gray-400 rounded-lg hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleEdit(item)}
                            title="Edit" 
                            className="p-2 text-gray-400 rounded-lg hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(item.id)}
                            disabled={isDeleting}
                            title="Delete" 
                            className="p-2 text-gray-400 rounded-lg hover:text-red-600 hover:bg-red-50 transition-all duration-200 disabled:opacity-50"
                          >
                            <Trash2 className="w-4 h-4" />
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
            <div className="px-5 py-4 border-t border-red-200/50 flex flex-col sm:flex-row justify-between items-center gap-3 bg-red-50/30">
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
                  className="p-2 rounded-lg border border-red-200/50 bg-white text-gray-500 hover:bg-red-50 hover:border-red-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
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
                          : 'bg-white border border-red-200/50 text-gray-600 hover:bg-red-50 hover:border-red-300'
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
                  className="p-2 rounded-lg border border-red-200/50 bg-white text-gray-500 hover:bg-red-50 hover:border-red-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
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
          <div className="bg-white rounded-xl w-full max-w-3xl p-6 shadow-xl border border-red-200 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                {editingId ? (
                  <>
                    <Edit2 className="w-5 h-5 text-red-600" />
                    Edit About Item
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5 text-red-600" />
                    Add About Item
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
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 text-red-600 text-sm">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={editingId ? handleUpdateItem : handleCreateItem} className="space-y-4 text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Left Column - Image Upload */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                    Images * <span className="font-normal text-gray-400">(Upload multiple)</span>
                  </label>
                  
                  {previewUrls.length > 0 ? (
                    <div className="space-y-2">
                      <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto">
                        {previewUrls.map((url, index) => (
                          <div key={index} className="relative group">
                            <div className="w-full h-24 rounded-lg overflow-hidden border-2 border-red-200 shadow-sm">
                              <img 
                                src={url} 
                                alt={`Upload ${index + 1}`} 
                                className="w-full h-full object-cover"
                              />
                              <span className="absolute bottom-1 left-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded">
                                {index + 1}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute -top-1 -right-1 p-1 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition-all"
                              aria-label="Remove image"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                        <label className="w-full h-24 rounded-lg border-2 border-dashed border-red-300 rounded-lg cursor-pointer hover:bg-red-50 transition-all duration-200 hover:border-red-500 flex items-center justify-center">
                          <ImagePlus className="w-6 h-6 text-red-400" />
                          <input 
                            ref={fileInputRef}
                            type="file" 
                            accept="image/*" 
                            multiple
                            className="hidden" 
                            onChange={handleMultipleImageChange}
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
                        className="w-full py-2 border border-red-200 rounded-lg text-red-600 font-medium hover:bg-red-50 transition-all duration-200 text-sm"
                      >
                        + Add More Images
                      </button>
                      <p className="text-xs text-gray-400">
                        {previewUrls.length} image{previewUrls.length !== 1 ? 's' : ''} uploaded
                      </p>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-56 border-2 border-dashed border-red-300 rounded-xl cursor-pointer hover:bg-red-50 transition-all duration-200 hover:border-red-500">
                      <Upload className="w-12 h-12 text-red-400 mb-2" />
                      <span className="text-sm font-medium text-gray-700">Upload images</span>
                      <span className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 5MB each</span>
                      <span className="text-xs text-gray-400">Select multiple images</span>
                      <input 
                        ref={fileInputRef}
                        type="file" 
                        accept="image/*" 
                        multiple
                        className="hidden" 
                        onChange={handleMultipleImageChange}
                        aria-label="Upload images"
                      />
                    </label>
                  )}
                </div>

                {/* Right Column - Title and Description */}
                <div className="space-y-4">
                  {/* Title */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                      Title *
                    </label>
                    <input 
                      type="text" 
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. About Our Company"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                      maxLength={200}
                    />
                    <div className="text-xs text-gray-400 mt-1 text-right">
                      {title.length}/200
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                      Description *
                    </label>
                    <textarea 
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe the about section content..."
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all resize-none"
                      rows="5"
                      maxLength={500}
                    />
                    <div className="text-xs text-gray-400 mt-1 text-right">
                      {description.length}/500
                    </div>
                  </div>

                  {/* Info Box */}
                  <div className="bg-red-50/50 p-4 rounded-lg border border-red-200/50">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Grid className="w-4 h-4 text-red-600" />
                      <span>Total Images: <strong>{previewUrls.length}</strong></span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                      <CheckCircle className="w-4 h-4 text-red-600" />
                      <span>Status: <strong className="text-green-600">{previewUrls.length > 0 ? 'Ready to save' : 'Add images'}</strong></span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-2.5 border border-gray-200 rounded-lg font-semibold text-gray-600 text-sm hover:bg-gray-50 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold text-sm transition-all duration-300"
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
          <div className="bg-white rounded-xl w-full max-w-3xl p-6 shadow-xl border border-red-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <FileText className="w-5 h-5 text-red-600" />
                About Details
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
              {/* Images Gallery */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <ImageIcon className="w-4 h-4 text-red-600" />
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Gallery Images</p>
                  <span className="ml-auto text-xs text-gray-400">Total: {viewingItem.images?.length || 0}</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {viewingItem.images && viewingItem.images.map((img, idx) => (
                    <div key={idx} className="relative w-full h-36 rounded-lg overflow-hidden border-2 border-red-200 shadow-sm group">
                      <img 
                        src={img} 
                        alt={`Image ${idx + 1}`} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/300x300/FF6B6B/FFFFFF?text=No+Image';
                        }}
                      />
                      <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded">
                        {idx + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Details */}
              <div className="space-y-4 bg-red-50/50 p-4 rounded-lg border border-red-200/50">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <Tag className="w-4 h-4 text-red-600" />
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Title</p>
                  </div>
                  <p className="text-base font-semibold text-gray-800">{viewingItem.title}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <FileText className="w-4 h-4 text-red-600" />
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Description</p>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{viewingItem.description}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <CheckCircle className="w-4 h-4 text-red-600" />
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Created Date</p>
                  </div>
                  <p className="text-sm font-medium text-gray-700">{viewingItem.createdAt}</p>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => {
                  setIsViewModalOpen(false);
                  setViewingItem(null);
                }}
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold text-sm transition-all duration-300"
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