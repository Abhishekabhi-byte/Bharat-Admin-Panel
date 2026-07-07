'use client';

import React, { useState } from 'react';
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
  Briefcase
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
  const [companyImage, setCompanyImage] = useState(null);
  const [companyPreview, setCompanyPreview] = useState('');
  const [description, setDescription] = useState('');
  const [clientImage, setClientImage] = useState(null);
  const [clientPreview, setClientPreview] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientDesignation, setClientDesignation] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewingClient, setViewingClient] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

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
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Fixed image upload handler
  const handleImageChange = (e, type) => {
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

    const url = URL.createObjectURL(file);

    if (type === 'company') {
      if (companyPreview && !companyPreview.startsWith('http')) {
        URL.revokeObjectURL(companyPreview);
      }
      setCompanyImage(file);
      setCompanyPreview(url);
    } else {
      if (clientPreview && !clientPreview.startsWith('http')) {
        URL.revokeObjectURL(clientPreview);
      }
      setClientImage(file);
      setClientPreview(url);
    }
  };

  const handleCreateClient = (e) => {
    e.preventDefault();
    if (!companyPreview) return alert('Please select a company image.');
    if (!clientPreview) return alert('Please select a client image.');
    if (!clientName.trim()) return alert('Please enter the client name.');
    if (!clientDesignation.trim()) return alert('Please enter the client designation.');

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
    
    clearFormFields();
    setIsModalOpen(false);
  };

  const handleEdit = (client) => {
    setEditingId(client.id);
    setCompanyPreview(client.companyImage);
    setDescription(client.description);
    setClientPreview(client.clientImage);
    setClientName(client.clientName);
    setClientDesignation(client.clientDesignation);
    setIsModalOpen(true);
  };

  const handleUpdateClient = (e) => {
    e.preventDefault();
    if (!companyPreview) return alert('Please select a company image.');
    if (!clientPreview) return alert('Please select a client image.');
    if (!clientName.trim()) return alert('Please enter the client name.');
    if (!clientDesignation.trim()) return alert('Please enter the client designation.');

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
    clearFormFields();
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this client entry?')) {
      const updatedClients = clients.filter(client => client.id !== id);
      setClients(updatedClients);
      const newTotalPages = Math.ceil(updatedClients.length / itemsPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }
    }
  };

  const handleView = (client) => {
    setViewingClient(client);
    setIsViewModalOpen(true);
  };

  const clearFormFields = () => {
    setCompanyImage(null);
    setCompanyPreview('');
    setDescription('');
    setClientImage(null);
    setClientPreview('');
    setClientName('');
    setClientDesignation('');
    setEditingId(null);
  };

  const closeModal = () => {
    if (companyPreview && !companyPreview.startsWith('http')) URL.revokeObjectURL(companyPreview);
    if (clientPreview && !clientPreview.startsWith('http')) URL.revokeObjectURL(clientPreview);
    clearFormFields();
    setIsModalOpen(false);
  };

  const truncateText = (text, maxLength = 60) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '…';
  };

  return (
    <div className="space-y-5 max-w-7xl mx-auto bg-[#7d3431] py-1 px-1">
      
      {/* Top Controller Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white py-4 px-5 rounded-xl shadow-sm border border-red-200/50">
        <div>
          <h2 className="text-lg font-bold text-black">Clients Directory</h2>
          <p className="text-xs text-black/70">Manage your client testimonials and company profiles.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#7d3431] to-[#cb8c89] text-white font-medium text-sm rounded-xl hover:shadow-lg hover:shadow-[#7d3431]/20 transition-all duration-300"
        >
          <Plus className="w-4 h-4" /> Add New Client
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
              placeholder="Search clients..."
              className="w-full pl-10 pr-4 py-2 border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7d3431]/20 focus:border-[#7d3431] text-sm text-black"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="text-sm text-black/70">
            Showing {filteredClients.length} clients
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-[#7d3431]/5 to-[#cb8c89]/5 border-b border-red-200 text-black font-bold uppercase text-xs tracking-wider">
                <th className="px-6 py-3.5 w-[120px]">Company</th>
                <th className="px-6 py-3.5">Client</th>
                <th className="px-6 py-3.5">Description</th>
                <th className="px-6 py-3.5 w-[180px]">Designation</th>
                <th className="px-6 py-3.5 w-[180px] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-red-100">
              {currentClients.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-16 text-black/40">
                    <Users className="w-10 h-10 mx-auto opacity-20 mb-2" />
                    <p className="font-medium text-sm">No clients found</p>
                  </td>
                </tr>
              ) : (
                currentClients.map((client) => (
                  <tr key={client.id} className="hover:bg-[#7d3431]/5 transition-colors">
                    <td className="px-6 py-3">
                      <div className="w-16 h-16 rounded-lg bg-slate-100 overflow-hidden border border-red-200 shadow-sm">
                        <img src={client.companyImage} alt="Company" className="w-full h-full object-cover" />
                      </div>
                    </td>

                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden border border-red-200 shadow-sm flex-shrink-0">
                          <img src={client.clientImage} alt={client.clientName} className="w-full h-full object-cover" />
                        </div>
                        <span className="font-semibold text-black block max-w-xs truncate">{client.clientName}</span>
                      </div>
                    </td>

                    <td className="px-6 py-3">
                      <span className="text-black/70 block max-w-sm">
                        {truncateText(client.description, 60)}
                      </span>
                    </td>

                    <td className="px-6 py-3 text-black/70 font-medium whitespace-nowrap">
                      {client.clientDesignation}
                    </td>

                    <td className="px-6 py-3 text-right">
                      <div className="flex justify-end gap-1.5">
                        <button 
                          onClick={() => handleView(client)}
                          title="View" 
                          className="p-2 text-black/50 rounded-lg hover:text-[#7d3431] hover:bg-[#7d3431]/10 transition-all duration-200"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleEdit(client)}
                          title="Edit" 
                          className="p-2 text-black/50 rounded-lg hover:text-[#a55d5b] hover:bg-[#a55d5b]/10 transition-all duration-200"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(client.id)}
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
        {filteredClients.length > 0 && (
          <div className="px-6 py-3.5 border-t border-red-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#7d3431]/5">
            <span className="font-medium text-black/70 text-sm">
              Showing <span className="text-black font-semibold">{indexOfFirstItem + 1}</span> to{' '}
              <span className="text-black font-semibold">
                {Math.min(indexOfLastItem, filteredClients.length)}
              </span>{' '}
              of <span className="text-black font-semibold">{filteredClients.length}</span> entries
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={closeModal}>
          <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-xl border border-red-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-black">
                {editingId ? 'Edit Client' : 'Add New Client'}
              </h3>
              <button 
                onClick={closeModal} 
                className="p-2 rounded-lg text-black/40 hover:bg-[#7d3431]/10 hover:text-[#7d3431] transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={editingId ? handleUpdateClient : handleCreateClient} className="space-y-4 text-sm">
              {/* Company Image */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-black mb-1.5">
                  Company Image *
                </label>
                {companyPreview ? (
                  <div className="relative w-full h-32 rounded-lg overflow-hidden border-2 border-[#7d3431]/20">
                    <img 
                      key={companyPreview} 
                      src={companyPreview} 
                      alt="Company" 
                      className="w-full h-full object-cover" 
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (companyPreview && !companyPreview.startsWith('http')) URL.revokeObjectURL(companyPreview);
                        setCompanyPreview('');
                        setCompanyImage(null);
                      }}
                      className="absolute top-2 right-2 p-1.5 bg-gradient-to-r from-[#7d3431] to-[#cb8c89] text-white rounded-full shadow-lg hover:shadow-[#7d3431]/30 transition-all"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#7d3431]/30 rounded-lg cursor-pointer hover:bg-[#7d3431]/5 transition-all duration-200 hover:border-[#7d3431]">
                    <Upload className="w-8 h-8 text-[#7d3431]/50 mb-2" />
                    <span className="text-sm font-medium text-black">Upload company logo</span>
                    <span className="text-xs text-black/50 mt-1">PNG, JPG, GIF up to 5MB</span>
                    <input 
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
                <label className="block text-xs font-bold uppercase tracking-wider text-black mb-1.5">
                  Client Image *
                </label>
                {clientPreview ? (
                  <div className="relative w-full h-32 rounded-lg overflow-hidden border-2 border-[#7d3431]/20">
                    <img 
                      key={clientPreview} 
                      src={clientPreview} 
                      alt="Client" 
                      className="w-full h-full object-cover" 
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (clientPreview && !clientPreview.startsWith('http')) URL.revokeObjectURL(clientPreview);
                        setClientPreview('');
                        setClientImage(null);
                      }}
                      className="absolute top-2 right-2 p-1.5 bg-gradient-to-r from-[#7d3431] to-[#cb8c89] text-white rounded-full shadow-lg hover:shadow-[#7d3431]/30 transition-all"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#7d3431]/30 rounded-lg cursor-pointer hover:bg-[#7d3431]/5 transition-all duration-200 hover:border-[#7d3431]">
                    <Upload className="w-8 h-8 text-[#7d3431]/50 mb-2" />
                    <span className="text-sm font-medium text-black">Upload client photo</span>
                    <span className="text-xs text-black/50 mt-1">PNG, JPG, GIF up to 5MB</span>
                    <input 
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
                <label className="block text-xs font-bold uppercase tracking-wider text-black mb-1.5">
                  Client Name *
                </label>
                <input 
                  type="text" 
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#7d3431]/20 text-sm text-black focus:outline-none focus:border-[#7d3431] focus:ring-2 focus:ring-[#7d3431]/20 transition-all"
                />
              </div>

              {/* Client Designation */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-black mb-1.5">
                  Client Designation *
                </label>
                <input 
                  type="text" 
                  value={clientDesignation}
                  onChange={(e) => setClientDesignation(e.target.value)}
                  placeholder="e.g. CEO, TechCorp"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#7d3431]/20 text-sm text-black focus:outline-none focus:border-[#7d3431] focus:ring-2 focus:ring-[#7d3431]/20 transition-all"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-black mb-1.5">
                  Description
                </label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description about the client or company..."
                  rows="3"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#7d3431]/20 text-sm text-black focus:outline-none focus:border-[#7d3431] focus:ring-2 focus:ring-[#7d3431]/20 transition-all resize-none"
                />
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
                  {editingId ? 'Update Client' : 'Save Changes'}
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
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-black">Client Details</h3>
              <button 
                onClick={() => {
                  setIsViewModalOpen(false);
                  setViewingClient(null);
                }}
                className="p-2 rounded-lg text-black/40 hover:bg-[#7d3431]/10 hover:text-[#7d3431] transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5">
              {/* Images Section */}
              <div className="flex items-center gap-6 p-4 bg-gradient-to-r from-[#7d3431]/5 to-[#cb8c89]/5 rounded-xl border border-red-200/50">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-20 h-20 rounded-lg overflow-hidden border-2 border-[#7d3431]/20 shadow-sm">
                    <img 
                      src={viewingClient.companyImage} 
                      alt="Company" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <span className="text-[10px] font-medium text-black/50 uppercase tracking-wider">Company</span>
                </div>
                
                <div className="flex-1 text-center">
                  <div className="w-12 h-0.5 bg-gradient-to-r from-[#7d3431]/20 to-[#cb8c89]/20 mx-auto" />
                </div>
                
                <div className="flex flex-col items-center gap-1">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#7d3431]/20 shadow-sm">
                    <img 
                      src={viewingClient.clientImage} 
                      alt={viewingClient.clientName} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <span className="text-[10px] font-medium text-black/50 uppercase tracking-wider">Client</span>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <div className="flex items-center gap-2 mb-1">
                    <User className="w-3.5 h-3.5 text-[#7d3431]/60" />
                    <p className="text-[10px] font-bold uppercase tracking-wider text-black/50">Client Name</p>
                  </div>
                  <p className="text-sm font-semibold text-black bg-[#7d3431]/5 px-3 py-2 rounded-lg border border-red-200/50">
                    {viewingClient.clientName}
                  </p>
                </div>

                <div className="col-span-2">
                  <div className="flex items-center gap-2 mb-1">
                    <Briefcase className="w-3.5 h-3.5 text-[#7d3431]/60" />
                    <p className="text-[10px] font-bold uppercase tracking-wider text-black/50">Designation</p>
                  </div>
                  <p className="text-sm font-medium text-black/80 bg-[#7d3431]/5 px-3 py-2 rounded-lg border border-red-200/50">
                    {viewingClient.clientDesignation}
                  </p>
                </div>

                <div className="col-span-2">
                  <div className="flex items-center gap-2 mb-1">
                    <Building2 className="w-3.5 h-3.5 text-[#7d3431]/60" />
                    <p className="text-[10px] font-bold uppercase tracking-wider text-black/50">Description</p>
                  </div>
                  <p className="text-sm text-black/70 bg-[#7d3431]/5 px-3 py-2 rounded-lg border border-red-200/50 min-h-[60px]">
                    {viewingClient.description || <span className="text-black/40 italic">No description provided</span>}
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsViewModalOpen(false);
                  setViewingClient(null);
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