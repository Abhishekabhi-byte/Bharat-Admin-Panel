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
  Building2,
  User,
  Briefcase,
  AlertCircle
} from 'lucide-react';

export default function Client() {
  const [clients, setClients] = useState([
    {
      id: 1,
      companyImage: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=250',
      description: 'Leading technology solutions provider for enterprise businesses.',
      clientImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=250',
      clientName: 'John Doe',
      clientDesignation: 'CEO, TechCorp'
    },
    {
      id: 2,
      companyImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=250',
      description: 'Global consulting firm specializing in digital transformation.',
      clientImage: 'https://images.unsplash.com/photo-1494790108372-be9c29b29330?w=250',
      clientName: 'Jane Smith',
      clientDesignation: 'Managing Director, ConsultPro'
    },
    {
      id: 3,
      companyImage: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=250',
      description: 'Innovative fintech startup revolutionizing payment systems.',
      clientImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=250',
      clientName: 'Michael Johnson',
      clientDesignation: 'CTO, PayFast'
    },
    {
      id: 4,
      companyImage: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=250',
      description: 'E-commerce platform with a focus on sustainable fashion.',
      clientImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=250',
      clientName: 'Emily Davis',
      clientDesignation: 'Founder, EcoWear'
    },
    {
      id: 5,
      companyImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=250',
      description: 'Healthcare technology company improving patient outcomes.',
      clientImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=250',
      clientName: 'David Lee',
      clientDesignation: 'CEO, HealthTech'
    },
    {
      id: 6,
      companyImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=250',
      description: 'EdTech platform offering online courses for professionals.',
      clientImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=250',
      clientName: 'Sarah Wilson',
      clientDesignation: 'Head of Product, LearnHub'
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 5;

  // Form state
  const [companyImageFile, setCompanyImageFile] = useState(null);
  const [companyPreview, setCompanyPreview] = useState('');
  const [description, setDescription] = useState('');
  const [clientImageFile, setClientImageFile] = useState(null);
  const [clientPreview, setClientPreview] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientDesignation, setClientDesignation] = useState('');
  const [formError, setFormError] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewingClient, setViewingClient] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const companyFileInputRef = useRef(null);
  const clientFileInputRef = useRef(null);

  // Filter clients based on search
  const filteredClients = clients.filter(client =>
    client.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.clientDesignation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentClients = filteredClients.slice(indexOfFirstItem, indexOfLastItem);

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      if (companyPreview && companyPreview.startsWith('blob:')) {
        URL.revokeObjectURL(companyPreview);
      }
      if (clientPreview && clientPreview.startsWith('blob:')) {
        URL.revokeObjectURL(clientPreview);
      }
    };
  }, [companyPreview, clientPreview]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleImageChange = (e, type) => {
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

    const url = URL.createObjectURL(file);

    if (type === 'company') {
      if (companyPreview && companyPreview.startsWith('blob:')) {
        URL.revokeObjectURL(companyPreview);
      }
      setCompanyImageFile(file);
      setCompanyPreview(url);
    } else {
      if (clientPreview && clientPreview.startsWith('blob:')) {
        URL.revokeObjectURL(clientPreview);
      }
      setClientImageFile(file);
      setClientPreview(url);
    }
  };

  const validateForm = () => {
    if (!companyPreview) {
      setFormError('Please select a company image.');
      return false;
    }
    if (!clientPreview) {
      setFormError('Please select a client image.');
      return false;
    }
    if (!clientName.trim()) {
      setFormError('Please enter the client name.');
      return false;
    }
    if (!clientDesignation.trim()) {
      setFormError('Please enter the client designation.');
      return false;
    }
    return true;
  };

  const handleCreateClient = (e) => {
    e.preventDefault();
    setFormError('');

    if (!validateForm()) return;

    const newClient = {
      id: Date.now(),
      companyImage: companyPreview,
      description: description.trim(),
      clientImage: clientPreview,
      clientName: clientName.trim(),
      clientDesignation: clientDesignation.trim()
    };

    setClients([newClient, ...clients]);
    setCurrentPage(1);
    resetForm();
    setIsModalOpen(false);
  };

  const handleEdit = (client) => {
    setEditingId(client.id);
    setCompanyPreview(client.companyImage);
    setDescription(client.description);
    setClientPreview(client.clientImage);
    setClientName(client.clientName);
    setClientDesignation(client.clientDesignation);
    setCompanyImageFile(null);
    setClientImageFile(null);
    setFormError('');
    setIsModalOpen(true);
  };

  const handleUpdateClient = (e) => {
    e.preventDefault();
    setFormError('');

    if (!validateForm()) return;

    const updatedClients = clients.map(client =>
      client.id === editingId
        ? {
            ...client,
            companyImage: companyPreview,
            description: description.trim(),
            clientImage: clientPreview,
            clientName: clientName.trim(),
            clientDesignation: clientDesignation.trim()
          }
        : client
    );

    setClients(updatedClients);
    resetForm();
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this client? This action cannot be undone.')) {
      setIsDeleting(true);
      setTimeout(() => {
        const updatedClients = clients.filter(client => client.id !== id);
        setClients(updatedClients);
        const newTotalPages = Math.ceil(updatedClients.length / itemsPerPage);
        if (currentPage > newTotalPages && newTotalPages > 0) {
          setCurrentPage(newTotalPages);
        }
        setIsDeleting(false);
      }, 300);
    }
  };

  const handleView = (client) => {
    setViewingClient(client);
    setIsViewModalOpen(true);
  };

  const resetForm = () => {
    if (companyPreview && companyPreview.startsWith('blob:')) {
      URL.revokeObjectURL(companyPreview);
    }
    if (clientPreview && clientPreview.startsWith('blob:')) {
      URL.revokeObjectURL(clientPreview);
    }
    setCompanyImageFile(null);
    setCompanyPreview('');
    setDescription('');
    setClientImageFile(null);
    setClientPreview('');
    setClientName('');
    setClientDesignation('');
    setEditingId(null);
    setFormError('');
    if (companyFileInputRef.current) {
      companyFileInputRef.current.value = '';
    }
    if (clientFileInputRef.current) {
      clientFileInputRef.current.value = '';
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
              <Users className="w-5 h-5 text-red-600" />
              <span className="font-semibold text-gray-800">Clients</span>
              <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">
                {filteredClients.length}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search clients..."
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
                Add Client
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-red-50/50 border-b border-red-200/50 text-gray-700 font-semibold uppercase text-xs tracking-wider">
                  <th className="px-6 py-4 w-[120px]">Company</th>
                  <th className="px-6 py-4 min-w-[150px]">Client</th>
                  <th className="px-6 py-4 min-w-[200px]">Description</th>
                  <th className="px-6 py-4 w-[180px]">Designation</th>
                  <th className="px-6 py-4 w-[160px] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-red-100/50">
                {currentClients.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-16">
                      <Users className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                      <p className="font-medium text-gray-500 text-base">No clients found</p>
                      <p className="text-sm text-gray-400 mt-1">Try adjusting your search or add a new client</p>
                    </td>
                  </tr>
                ) : (
                  currentClients.map((client) => (
                    <tr key={client.id} className="hover:bg-red-50/30 transition-colors duration-150">
                      <td className="px-6 py-4">
                        <div className="w-16 h-16 rounded-lg overflow-hidden border border-red-200 shadow-sm">
                          <img 
                            src={client.companyImage} 
                            alt="Company" 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/100x100/FF6B6B/FFFFFF?text=No+Image';
                            }}
                          />
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden border border-red-200 shadow-sm flex-shrink-0">
                            <img 
                              src={client.clientImage} 
                              alt={client.clientName} 
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(client.clientName) + '&background=dc2626&color=fff&size=128';
                              }}
                            />
                          </div>
                          <span className="font-semibold text-gray-800 block text-base">{client.clientName}</span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600 block max-w-xs" title={client.description}>
                          {truncateText(client.description, 40)}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 text-gray-700 bg-red-50/80 px-3 py-1.5 rounded-full border border-red-200/50 text-xs font-medium">
                          <Briefcase className="w-3.5 h-3.5 text-red-600" />
                          {client.clientDesignation}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => handleView(client)}
                            title="View" 
                            className="p-2 text-gray-500 rounded-lg hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                          >
                            <Eye className="w-4.5 h-4.5" />
                          </button>
                          <button 
                            onClick={() => handleEdit(client)}
                            title="Edit" 
                            className="p-2 text-gray-500 rounded-lg hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                          >
                            <Edit2 className="w-4.5 h-4.5" />
                          </button>
                          <button 
                            onClick={() => handleDelete(client.id)}
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
          {filteredClients.length > 0 && (
            <div className="px-6 py-4 border-t border-red-200/50 flex flex-col sm:flex-row justify-between items-center gap-4 bg-red-50/30">
              <span className="font-medium text-gray-600 text-sm">
                Showing <span className="text-gray-800 font-bold">{indexOfFirstItem + 1}</span> to{' '}
                <span className="text-gray-800 font-bold">
                  {Math.min(indexOfLastItem, filteredClients.length)}
                </span>{' '}
                of <span className="text-gray-800 font-bold">{filteredClients.length}</span> clients
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
          <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-xl border border-red-200 overflow-y-auto max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                {editingId ? (
                  <>
                    <Edit2 className="w-5 h-5 text-red-600" />
                    Edit Client
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5 text-red-600" />
                    Add Client
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

            <form onSubmit={editingId ? handleUpdateClient : handleCreateClient} className="space-y-4 text-sm">
              {/* Company Image */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Company Image *
                </label>
                {companyPreview ? (
                  <div className="relative w-full h-32 rounded-lg overflow-hidden border-2 border-red-200 shadow-sm">
                    <img 
                      key={companyPreview}
                      src={companyPreview} 
                      alt="Company" 
                      className="w-full h-full object-cover" 
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (companyPreview && companyPreview.startsWith('blob:')) {
                          URL.revokeObjectURL(companyPreview);
                        }
                        setCompanyPreview('');
                        setCompanyImageFile(null);
                        if (companyFileInputRef.current) {
                          companyFileInputRef.current.value = '';
                        }
                      }}
                      className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition-all"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-red-300 rounded-lg cursor-pointer hover:bg-red-50 transition-all duration-200 hover:border-red-500">
                    <Upload className="w-8 h-8 text-red-400 mb-2" />
                    <span className="text-sm font-medium text-gray-700">Upload company logo</span>
                    <span className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 5MB</span>
                    <input 
                      ref={companyFileInputRef}
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={(e) => handleImageChange(e, 'company')} 
                    />
                  </label>
                )}
              </div>

              {/* Client Image */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Client Image *
                </label>
                {clientPreview ? (
                  <div className="relative w-full h-32 rounded-lg overflow-hidden border-2 border-red-200 shadow-sm">
                    <img 
                      key={clientPreview}
                      src={clientPreview} 
                      alt="Client" 
                      className="w-full h-full object-cover" 
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (clientPreview && clientPreview.startsWith('blob:')) {
                          URL.revokeObjectURL(clientPreview);
                        }
                        setClientPreview('');
                        setClientImageFile(null);
                        if (clientFileInputRef.current) {
                          clientFileInputRef.current.value = '';
                        }
                      }}
                      className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition-all"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-red-300 rounded-lg cursor-pointer hover:bg-red-50 transition-all duration-200 hover:border-red-500">
                    <Upload className="w-8 h-8 text-red-400 mb-2" />
                    <span className="text-sm font-medium text-gray-700">Upload client photo</span>
                    <span className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 5MB</span>
                    <input 
                      ref={clientFileInputRef}
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={(e) => handleImageChange(e, 'client')} 
                    />
                  </label>
                )}
              </div>

              {/* Client Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Client Name *
                </label>
                <input 
                  type="text" 
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                  maxLength={100}
                />
                <div className="text-xs text-gray-400 mt-1 text-right">
                  {clientName.length}/100
                </div>
              </div>

              {/* Client Designation */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Client Designation *
                </label>
                <input 
                  type="text" 
                  value={clientDesignation}
                  onChange={(e) => setClientDesignation(e.target.value)}
                  placeholder="e.g. CEO, TechCorp"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                  maxLength={100}
                />
                <div className="text-xs text-gray-400 mt-1 text-right">
                  {clientDesignation.length}/100
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
                  placeholder="Brief description about the client or company..."
                  rows="3"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all resize-none"
                  maxLength={500}
                />
                <div className="text-xs text-gray-400 mt-1 text-right">
                  {description.length}/500
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
                  {editingId ? 'Update Client' : 'Save Client'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {isViewModalOpen && viewingClient && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => {
          setIsViewModalOpen(false);
          setViewingClient(null);
        }}>
          <div className="bg-white rounded-xl w-full max-w-lg p-6 shadow-xl border border-red-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-red-600" />
                Client Details
              </h3>
              <button 
                onClick={() => {
                  setIsViewModalOpen(false);
                  setViewingClient(null);
                }}
                className="p-2 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5">
              {/* Images Section */}
              <div className="flex items-center justify-around p-4 bg-red-50/50 rounded-xl border border-red-200/50">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-20 h-20 rounded-lg overflow-hidden border-2 border-red-200 shadow-sm bg-white">
                    <img 
                      src={viewingClient.companyImage} 
                      alt="Company" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/100x100/FF6B6B/FFFFFF?text=No+Image';
                      }}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Company</span>
                </div>
                
                <div className="w-12 h-0.5 bg-red-200" />
                
                <div className="flex flex-col items-center gap-1">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-red-200 shadow-sm bg-white">
                    <img 
                      src={viewingClient.clientImage} 
                      alt={viewingClient.clientName} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(viewingClient.clientName) + '&background=dc2626&color=fff&size=128';
                      }}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Client</span>
                </div>
              </div>

              {/* Details Grid */}
              <div className="space-y-4 bg-red-50/50 p-4 rounded-xl border border-red-200/50">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <User className="w-4 h-4 text-red-600" />
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Client Name</p>
                  </div>
                  <p className="text-base font-semibold text-gray-800">{viewingClient.clientName}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <Briefcase className="w-4 h-4 text-red-600" />
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Designation</p>
                  </div>
                  <p className="text-sm font-medium text-gray-700">{viewingClient.clientDesignation}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <Building2 className="w-4 h-4 text-red-600" />
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Description</p>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {viewingClient.description || <span className="text-gray-400 italic">No description provided</span>}
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => {
                  setIsViewModalOpen(false);
                  setViewingClient(null);
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