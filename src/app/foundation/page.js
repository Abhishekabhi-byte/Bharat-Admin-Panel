// app/foundation/page.js
'use client';

import React, { useState } from 'react';
import { 
  Building2, 
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
  Globe
} from 'lucide-react';

export default function FoundationPage() {
  const [foundations, setFoundations] = useState([
    { 
      id: 1, 
      title: 'Green Earth Foundation', 
      description: 'A non-profit organization dedicated to environmental conservation and sustainable development.',
      imageUrl: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=250',
      createdAt: '2026-07-01',
      status: 'Active'
    },
    { 
      id: 2, 
      title: 'Education For All', 
      description: 'Providing quality education to underprivileged children across rural communities.',
      imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=250',
      createdAt: '2026-07-05',
      status: 'Active'
    },
    { 
      id: 3, 
      title: 'Healthcare Initiative', 
      description: 'Improving healthcare access and medical facilities in remote areas.',
      imageUrl: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=250',
      createdAt: '2026-07-06',
      status: 'Inactive'
    },
    { 
      id: 4, 
      title: 'Women Empowerment Trust', 
      description: 'Empowering women through skill development, education, and entrepreneurship programs.',
      imageUrl: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=250',
      createdAt: '2026-07-07',
      status: 'Active'
    },
    { 
      id: 5, 
      title: 'Clean Water Project', 
      description: 'Providing clean drinking water to communities through sustainable water purification systems.',
      imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=250',
      createdAt: '2026-07-08',
      status: 'Active'
    },
    { 
      id: 6, 
      title: 'Animal Welfare Society', 
      description: 'Rescue, rehabilitation, and care for abandoned and injured animals.',
      imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=250',
      createdAt: '2026-07-09',
      status: 'Inactive'
    },
    { 
      id: 7, 
      title: 'Digital Literacy Mission', 
      description: 'Bridging the digital divide by providing technology education and access to digital resources.',
      imageUrl: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=250',
      createdAt: '2026-07-10',
      status: 'Active'
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 5;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [status, setStatus] = useState('Active');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewingFoundation, setViewingFoundation] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // Filter foundations based on search
  const filteredFoundations = foundations.filter(foundation =>
    foundation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    foundation.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredFoundations.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFoundations = filteredFoundations.slice(indexOfFirstItem, indexOfLastItem);

  // Reset to page 1 when search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleCreateFoundation = (e) => {
    e.preventDefault();
    if (!previewUrl) {
      alert('Please select an image.');
      return;
    }
    if (!title.trim()) {
      alert('Please enter a foundation title.');
      return;
    }
    if (!description.trim()) {
      alert('Please enter a description.');
      return;
    }

    const newFoundation = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      imageUrl: previewUrl,
      status: status,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setFoundations([newFoundation, ...foundations]);
    setCurrentPage(1);
    resetForm();
    setIsModalOpen(false);
  };

  const handleEdit = (foundation) => {
    setEditingId(foundation.id);
    setTitle(foundation.title);
    setDescription(foundation.description);
    setPreviewUrl(foundation.imageUrl);
    setStatus(foundation.status);
    setIsModalOpen(true);
  };

  const handleUpdateFoundation = (e) => {
    e.preventDefault();
    if (!previewUrl) {
      alert('Please select an image.');
      return;
    }
    if (!title.trim()) {
      alert('Please enter a foundation title.');
      return;
    }
    if (!description.trim()) {
      alert('Please enter a description.');
      return;
    }

    const updatedFoundations = foundations.map(foundation =>
      foundation.id === editingId
        ? { 
            ...foundation, 
            title: title.trim(), 
            description: description.trim(),
            imageUrl: previewUrl,
            status: status
          }
        : foundation
    );

    setFoundations(updatedFoundations);
    resetForm();
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this foundation entry?')) {
      const updatedFoundations = foundations.filter(foundation => foundation.id !== id);
      setFoundations(updatedFoundations);
      const newTotalPages = Math.ceil(updatedFoundations.length / itemsPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }
    }
  };

  const handleView = (foundation) => {
    setViewingFoundation(foundation);
    setIsViewModalOpen(true);
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setImage(null);
    setPreviewUrl('');
    setStatus('Active');
    setEditingId(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Active':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Inactive':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  // Helper to truncate description
  const truncateText = (text, maxLength = 60) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '…';
  };

  return (
    <div className="space-y-5 bg-[#7d3431] pt-1 max-w-7xl mx-auto px-1">
      
      {/* Top Controller Bar */}
      <div className="flex flex-col  sm:flex-row justify-between items-start sm:items-center gap-4 bg-white py-4 px-5 rounded-xl shadow-sm border border-red-200/50">
        <div>
          <h2 className="text-lg font-bold text-black">Foundation Directory</h2>
          <p className="text-xs text-black/70">Manage and track all foundation initiatives.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#7d3431] to-[#cb8c89] text-white font-medium text-sm rounded-xl hover:shadow-lg hover:shadow-[#7d3431]/20 transition-all duration-300"
        >
          <Plus className="w-4 h-4" /> Add New Foundation
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-red-200/50 shadow-sm overflow-hidden flex flex-col justify-between">
        {/* Table Header with Search */}
        <div className="p-4 border-b border-red-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/50" />
            <input
              type="text"
              placeholder="Search foundations..."
              className="w-full pl-10 pr-4 py-2 border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7d3431]/20 focus:border-[#7d3431] text-sm text-black"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="text-sm text-black/70">
            Showing {filteredFoundations.length} foundations
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-[#7d3431]/5 to-[#cb8c89]/5 border-b border-red-200 text-black font-bold uppercase text-xs tracking-wider">
                <th className="px-6 py-3.5 w-[120px]">Image</th>
                <th className="px-6 py-3.5">Title</th>
                <th className="px-6 py-3.5">Description</th>
                <th className="px-6 py-3.5 w-[120px]">Status</th>
                <th className="px-6 py-3.5 w-[160px]">Created Date</th>
                <th className="px-6 py-3.5 w-[180px] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-red-100">
              {currentFoundations.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-16 text-black/40">
                    <Building2 className="w-10 h-10 mx-auto opacity-20 mb-2" />
                    <p className="font-medium text-sm">No foundations found</p>
                  </td>
                </tr>
              ) : (
                currentFoundations.map((foundation) => (
                  <tr key={foundation.id} className="hover:bg-[#7d3431]/5 transition-colors">
                    <td className="px-6 py-3">
                      <div className="w-16 h-16 rounded-lg bg-slate-100 overflow-hidden border border-red-200 shadow-sm">
                        <img src={foundation.imageUrl} alt={foundation.title} className="w-full h-full object-cover" />
                      </div>
                    </td>
                    
                    <td className="px-6 py-3">
                      <span className="font-semibold text-black block max-w-xs truncate">{foundation.title}</span>
                    </td>

                    <td className="px-6 py-3">
                      <span className="text-black/70 block max-w-sm">
                        {truncateText( foundation.description )}
                      </span>
                    </td>

                    <td className="px-6 py-3">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(foundation.status)}`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 
                          ${foundation.status === 'Active' ? 'bg-emerald-500' : ''}
                          ${foundation.status === 'Inactive' ? 'bg-amber-500' : ''}
                        `} />
                        {foundation.status}
                      </span>
                    </td>

                    <td className="px-6 py-3 text-black/70 font-medium">
                      {foundation.createdAt}
                    </td>

                    <td className="px-6 py-3 text-right">
                      <div className="flex justify-end gap-1.5">
                        <button 
                          onClick={() => handleView(foundation)}
                          title="View" 
                          className="p-2 text-black/50 rounded-lg hover:text-[#7d3431] hover:bg-[#7d3431]/10 transition-all duration-200"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleEdit(foundation)}
                          title="Edit" 
                          className="p-2 text-black/50 rounded-lg hover:text-[#a55d5b] hover:bg-[#a55d5b]/10 transition-all duration-200"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(foundation.id)}
                          title="Delete" 
                          className="p-2 text-black/50 rounded-lg hover:text-red-600 hover:bg-red-50 transition-all duration-200"
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
        {filteredFoundations.length > 0 && (
          <div className="px-6 py-3.5 border-t border-red-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#7d3431]/5">
            <span className="font-medium text-black/70 text-sm">
              Showing <span className="text-black font-semibold">{indexOfFirstItem + 1}</span> to{' '}
              <span className="text-black font-semibold">
                {indexOfLastItem > filteredFoundations.length ? filteredFoundations.length : indexOfLastItem}
              </span>{' '}
              of <span className="text-black font-semibold">{filteredFoundations.length}</span> entries
            </span>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-1.5 rounded-lg border border-red-200 bg-white text-black/60 hover:bg-[#7d3431]/10 hover:border-[#7d3431] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: totalPages }, (_, index) => {
                const pageNum = index + 1;
                const isSelected = currentPage === pageNum;
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-all duration-200 ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#7d3431] to-[#cb8c89] text-white shadow-md shadow-[#7d3431]/20'
                        : 'bg-white border border-red-200 text-black hover:bg-[#7d3431]/10 hover:border-[#7d3431]'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded-lg border border-red-200 bg-white text-black/60 hover:bg-[#7d3431]/10 hover:border-[#7d3431] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-xl border border-red-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-black">
                {editingId ? 'Edit Foundation' : 'Add New Foundation'}
              </h3>
              <button 
                onClick={closeModal} 
                className="p-2 rounded-lg text-black/40 hover:bg-[#7d3431]/10 hover:text-[#7d3431] transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={editingId ? handleUpdateFoundation : handleCreateFoundation} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-black mb-1.5">
                  Foundation Image *
                </label>
                {previewUrl ? (
                  <div className="relative w-full h-40 rounded-lg overflow-hidden border-2 border-[#7d3431]/20">
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => {
                        setPreviewUrl('');
                        setImage(null);
                      }}
                      className="absolute top-2 right-2 p-1.5 bg-gradient-to-r from-[#7d3431] to-[#cb8c89] text-white rounded-full shadow-lg hover:shadow-[#7d3431]/30 transition-all"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-[#7d3431]/30 rounded-lg cursor-pointer hover:bg-[#7d3431]/5 transition-all duration-200 hover:border-[#7d3431]">
                    <Upload className="w-8 h-8 text-[#7d3431]/50 mb-2" />
                    <span className="text-sm font-medium text-black">Click to upload image</span>
                    <span className="text-xs text-black/50 mt-1">PNG, JPG, GIF up to 5MB</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                  </label>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-black mb-1.5">
                  Foundation Title *
                </label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Green Earth Foundation"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#7d3431]/20 text-sm text-black focus:outline-none focus:border-[#7d3431] focus:ring-2 focus:ring-[#7d3431]/20 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-black mb-1.5">
                  Description *
                </label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the foundation's mission and work..."
                  rows="3"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#7d3431]/20 text-sm text-black focus:outline-none focus:border-[#7d3431] focus:ring-2 focus:ring-[#7d3431]/20 transition-all resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-black mb-1.5">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#7d3431]/20 text-sm text-black focus:outline-none focus:border-[#7d3431] focus:ring-2 focus:ring-[#7d3431]/20 transition-all"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="flex gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-2.5 border border-[#7d3431]/20 rounded-lg font-semibold text-black/70 hover:bg-[#7d3431]/5 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-gradient-to-r from-[#7d3431] to-[#cb8c89] text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-[#7d3431]/20 transition-all duration-300"
                >
                  {editingId ? 'Update Foundation' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {isViewModalOpen && viewingFoundation && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg p-6 shadow-xl border border-red-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-black">Foundation Details</h3>
              <button 
                onClick={() => {
                  setIsViewModalOpen(false);
                  setViewingFoundation(null);
                }}
                className="p-2 rounded-lg text-black/40 hover:bg-[#7d3431]/10 hover:text-[#7d3431] transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="w-full h-48 rounded-lg overflow-hidden border-2 border-[#7d3431]/20">
                <img src={viewingFoundation.imageUrl} alt={viewingFoundation.title} className="w-full h-full object-cover" />
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-black">Title</p>
                  <p className="text-sm font-semibold text-black">{viewingFoundation.title}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-black">Description</p>
                  <p className="text-sm text-black/80">{viewingFoundation.description}</p>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <p className="text-xs font-bold uppercase tracking-wider text-black">Status</p>
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border mt-1 ${getStatusColor(viewingFoundation.status)}`}>
                      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 
                        ${viewingFoundation.status === 'Active' ? 'bg-emerald-500' : ''}
                        ${viewingFoundation.status === 'Inactive' ? 'bg-amber-500' : ''}
                      `} />
                      {viewingFoundation.status}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold uppercase tracking-wider text-black">Created Date</p>
                    <p className="text-sm font-medium text-black">{viewingFoundation.createdAt}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsViewModalOpen(false);
                  setViewingFoundation(null);
                }}
                className="w-full py-2.5 bg-gradient-to-r from-[#7d3431] to-[#cb8c89] text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-[#7d3431]/20 transition-all duration-300"
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