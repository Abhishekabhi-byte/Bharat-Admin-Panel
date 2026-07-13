'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Users, 
  Eye, 
  Edit2, 
  Trash2, 
  Plus, 
  Upload, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Search,
  User,
  Briefcase,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export default function CoreTeamPage() {
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: 'Rajesh Kumar',
      position: 'CEO & Founder',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=250',
      createdAt: '2026-07-01'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      position: 'Chief Technology Officer',
      imageUrl: 'https://images.unsplash.com/photo-1494790108372-be9c29b29330?w=250',
      createdAt: '2026-07-05'
    },
    {
      id: 3,
      name: 'Amit Patel',
      position: 'Head of Operations',
      imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=250',
      createdAt: '2026-07-06'
    },
    {
      id: 4,
      name: 'Sneha Reddy',
      position: 'Director of Engineering',
      imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=250',
      createdAt: '2026-07-07'
    },
    {
      id: 5,
      name: 'Vikram Singh',
      position: 'VP of Sales & Marketing',
      imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=250',
      createdAt: '2026-07-08'
    },
    {
      id: 6,
      name: 'Ananya Gupta',
      position: 'Head of Human Resources',
      imageUrl: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=250',
      createdAt: '2026-07-09'
    },
    {
      id: 7,
      name: 'Deepak Verma',
      position: 'Chief Financial Officer',
      imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=250',
      createdAt: '2026-07-10'
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 5;

  // Form state
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [formError, setFormError] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewingMember, setViewingMember] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fileInputRef = useRef(null);

  // Filter team members based on search
  const filteredMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMembers = filteredMembers.slice(indexOfFirstItem, indexOfLastItem);

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      if (previewUrl && !previewUrl.startsWith('http')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

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
      setFormError('Please upload a valid image file (JPEG, PNG, GIF, WEBP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setFormError('Image size must be less than 5MB.');
      return;
    }

    setFormError('');

    // Clean up previous object URL
    if (previewUrl && !previewUrl.startsWith('http')) {
      URL.revokeObjectURL(previewUrl);
    }

    setImageFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  const validateForm = () => {
    if (!previewUrl) {
      setFormError('Please select a profile image.');
      return false;
    }
    if (!name.trim()) {
      setFormError('Please enter the member name.');
      return false;
    }
    if (!position.trim()) {
      setFormError('Please enter the position.');
      return false;
    }
    return true;
  };

  const handleCreateMember = (e) => {
    e.preventDefault();
    setFormError('');

    if (!validateForm()) return;

    // Store the image as a data URL to persist it properly
    const imageToStore = previewUrl;

    const newMember = {
      id: Date.now(),
      name: name.trim(),
      position: position.trim(),
      imageUrl: imageToStore,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setTeamMembers([newMember, ...teamMembers]);
    setCurrentPage(1);
    resetForm();
    setIsModalOpen(false);
  };

  const handleEdit = (member) => {
    setEditingId(member.id);
    setName(member.name);
    setPosition(member.position);
    // Use the existing image URL
    setPreviewUrl(member.imageUrl);
    setImageFile(null);
    setFormError('');
    setIsModalOpen(true);
  };

  const handleUpdateMember = (e) => {
    e.preventDefault();
    setFormError('');

    if (!validateForm()) return;

    const updatedMembers = teamMembers.map(member =>
      member.id === editingId
        ? {
            ...member,
            name: name.trim(),
            position: position.trim(),
            imageUrl: previewUrl // Use the current preview URL (either existing or new upload)
          }
        : member
    );

    setTeamMembers(updatedMembers);
    resetForm();
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this team member? This action cannot be undone.')) {
      setIsDeleting(true);
      setTimeout(() => {
        const updatedMembers = teamMembers.filter(member => member.id !== id);
        setTeamMembers(updatedMembers);
        const newTotalPages = Math.ceil(updatedMembers.length / itemsPerPage);
        if (currentPage > newTotalPages && newTotalPages > 0) {
          setCurrentPage(newTotalPages);
        }
        setIsDeleting(false);
      }, 300);
    }
  };

  const handleView = (member) => {
    setViewingMember(member);
    setIsViewModalOpen(true);
  };

  const resetForm = () => {
    // Only revoke object URLs that we created (blob URLs)
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    setImageFile(null);
    setPreviewUrl('');
    setName('');
    setPosition('');
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

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-red-900 via-red-800 to-red-700 flex items-start justify-center p-3 md:p-6">
      <div className="w-full max-w-7xl bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-4 md:p-6 border border-white/20">
        {/* Table */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-white/30 shadow-xl overflow-hidden flex flex-col justify-between">
          {/* Table Header with Search */}
          <div className="flex justify-between items-center p-4 border-b border-red-200/50">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-red-600" />
              <span className="font-semibold text-gray-800">Team Members</span>
              <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">
                {filteredMembers.length}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search members..."
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
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white text-sm font-medium rounded-lg hover:shadow-lg hover:shadow-red-500/30 hover:scale-105 transition-all duration-300 whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                Add Member
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-red-600/10 to-red-500/10 border-b border-red-200/50 text-gray-700 font-semibold uppercase text-xs tracking-wider">
                  <th className="px-6 py-4 w-[100px]">Image</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Position</th>
                  <th className="px-6 py-4 w-[160px]">Joined Date</th>
                  <th className="px-6 py-4 w-[180px] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-red-100/50">
                {currentMembers.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-16">
                      <Users className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                      <p className="font-medium text-gray-500 text-base">No team members found</p>
                      <p className="text-sm text-gray-400 mt-1">Try adjusting your search or add a new member</p>
                    </td>
                  </tr>
                ) : (
                  currentMembers.map((member) => (
                    <tr key={member.id} className="hover:bg-red-50/50 transition-colors duration-150">
                      <td className="px-6 py-4">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-100 to-red-50 overflow-hidden border-2 border-red-200/50 shadow-md flex-shrink-0">
                          {member.imageUrl ? (
                            <img 
                              src={member.imageUrl} 
                              alt={member.name} 
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                // If image fails to load, show initials avatar
                                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=dc2626&color=fff&size=128`;
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-red-100 text-red-700 text-lg font-bold">
                              {member.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="font-semibold text-gray-800 block max-w-xs truncate text-base">{member.name}</span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 text-gray-700 bg-red-50/80 px-3 py-1.5 rounded-full border border-red-200/50 text-sm font-medium">
                          <Briefcase className="w-3.5 h-3.5 text-red-600" />
                          {member.position}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-gray-600 font-medium whitespace-nowrap text-sm">
                        {new Date(member.createdAt).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => handleView(member)}
                            title="View" 
                            className="p-2 text-gray-500 rounded-lg hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                          >
                            <Eye className="w-4.5 h-4.5" />
                          </button>
                          <button 
                            onClick={() => handleEdit(member)}
                            title="Edit" 
                            className="p-2 text-gray-500 rounded-lg hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                          >
                            <Edit2 className="w-4.5 h-4.5" />
                          </button>
                          <button 
                            onClick={() => handleDelete(member.id)}
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
          {filteredMembers.length > 0 && (
            <div className="px-6 py-4 border-t border-red-200/50 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gradient-to-r from-red-50/50 to-transparent">
              <span className="font-medium text-gray-600 text-sm">
                Showing <span className="text-gray-800 font-bold">{indexOfFirstItem + 1}</span> to{' '}
                <span className="text-gray-800 font-bold">
                  {Math.min(indexOfLastItem, filteredMembers.length)}
                </span>{' '}
                of <span className="text-gray-800 font-bold">{filteredMembers.length}</span> members
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-red-200/50 bg-white/80 text-gray-600 hover:bg-red-50 hover:border-red-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
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
                          ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg shadow-red-500/30 scale-105'
                          : 'bg-white/80 border border-red-200/50 text-gray-700 hover:bg-red-50 hover:border-red-300'
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
                  className="p-2 rounded-lg border border-red-200/50 bg-white/80 text-gray-600 hover:bg-red-50 hover:border-red-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
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
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-200" onClick={closeModal}>
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl border border-red-200/50 max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-4 duration-300" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                {editingId ? (
                  <>
                    <Edit2 className="w-5 h-5 text-red-600" />
                    Edit Team Member
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5 text-red-600" />
                    Add Team Member
                  </>
                )}
              </h3>
              <button 
                onClick={closeModal} 
                className="p-2 rounded-xl text-gray-400 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2 text-red-700 text-sm">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={editingId ? handleUpdateMember : handleCreateMember} className="space-y-4 text-sm">
              {/* Profile Image */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Profile Image *
                </label>
                {previewUrl ? (
                  <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-red-200 shadow-lg group">
                    <img 
                      key={previewUrl}
                      src={previewUrl} 
                      alt="Preview" 
                      className="w-full h-full object-cover" 
                      onError={(e) => {
                        // If preview fails, try to recover
                        if (editingId && previewUrl) {
                          // For existing images, keep them
                          console.log('Image preview error');
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (previewUrl && previewUrl.startsWith('blob:')) {
                          URL.revokeObjectURL(previewUrl);
                        }
                        setPreviewUrl('');
                        setImageFile(null);
                        if (fileInputRef.current) {
                          fileInputRef.current.value = '';
                        }
                      }}
                      className="absolute top-1 right-1 p-1.5 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-full shadow-lg hover:shadow-red-500/30 transition-all opacity-0 group-hover:opacity-100"
                      aria-label="Remove image"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-red-300 rounded-xl cursor-pointer hover:bg-red-50 transition-all duration-200 hover:border-red-500 group">
                    <Upload className="w-10 h-10 text-red-400 group-hover:text-red-600 mb-2 transition-colors" />
                    <span className="text-sm font-medium text-gray-700">Upload profile photo</span>
                    <span className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 5MB</span>
                    <input 
                      ref={fileInputRef}
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleImageChange}
                      aria-label="Upload profile image"
                    />
                  </label>
                )}
              </div>

              {/* Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Full Name *
                </label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rajesh Kumar"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                  maxLength={100}
                />
              </div>

              {/* Position */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Position *
                </label>
                <input 
                  type="text" 
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  placeholder="e.g. CEO & Founder"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                  maxLength={100}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-2.5 border border-gray-200 rounded-xl font-semibold text-gray-600 hover:bg-gray-50 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-red-500/30 hover:scale-105 transition-all duration-300"
                >
                  {editingId ? 'Update Member' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {isViewModalOpen && viewingMember && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-200" onClick={() => {
          setIsViewModalOpen(false);
          setViewingMember(null);
        }}>
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl border border-red-200/50 max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-4 duration-300" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <User className="w-5 h-5 text-red-600" />
                Team Member Details
              </h3>
              <button 
                onClick={() => {
                  setIsViewModalOpen(false);
                  setViewingMember(null);
                }}
                className="p-2 rounded-xl text-gray-400 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                aria-label="Close preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5">
              {/* Profile Image */}
              <div className="flex justify-center">
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-red-200 shadow-xl">
                  {viewingMember.imageUrl ? (
                    <img 
                      src={viewingMember.imageUrl} 
                      alt={viewingMember.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(viewingMember.name)}&background=dc2626&color=fff&size=128`;
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-red-100 text-red-700 text-4xl font-bold">
                      {viewingMember.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
              </div>

              {/* Details Grid */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <User className="w-4 h-4 text-red-600" />
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Full Name</p>
                  </div>
                  <p className="text-base font-semibold text-gray-800 bg-red-50/50 px-4 py-2.5 rounded-xl border border-red-200/50">
                    {viewingMember.name}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <Briefcase className="w-4 h-4 text-red-600" />
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Position</p>
                    </div>
                    <p className="text-sm font-medium text-gray-700 bg-red-50/50 px-4 py-2.5 rounded-xl border border-red-200/50">
                      {viewingMember.position}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <CheckCircle className="w-4 h-4 text-red-600" />
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Joined Date</p>
                    </div>
                    <p className="text-sm font-medium text-gray-700 bg-red-50/50 px-4 py-2.5 rounded-xl border border-red-200/50">
                      {new Date(viewingMember.createdAt).toLocaleDateString('en-US', { 
                        weekday: 'long',
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => {
                  setIsViewModalOpen(false);
                  setViewingMember(null);
                }}
                className="w-full py-3 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-red-500/30 hover:scale-105 transition-all duration-300"
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