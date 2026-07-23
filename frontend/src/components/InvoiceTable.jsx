import React, { useState } from 'react';
import { 
  Search, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Trash2, 
  FileSpreadsheet
} from 'lucide-react';

export default function InvoiceTable({ 
  invoices, 
  onSelectInvoice, 
  onApproveInvoice, 
  onRejectInvoice,
  onDeleteInvoice,
  statusFilter,
  setStatusFilter 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);

  const getCurrencySymbol = (currency) => {
    if (!currency) return '₹';
    const c = currency.toUpperCase();
    if (c === 'INR' || c === 'RS' || c === 'RUPEES') return '₹';
    if (c === 'USD') return '$';
    if (c === 'EUR') return '€';
    if (c === 'GBP') return '£';
    return '₹';
  };

  // Filtering logic
  const filteredInvoices = invoices.filter(inv => {
    const matchesSearch = 
      inv.vendor_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.invoice_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (inv.file_name && inv.file_name.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === 'all' ? true : inv.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredInvoices.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredInvoices.map(inv => inv.id));
    }
  };

  const toggleSelectOne = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  // CSV Export
  const exportToCSV = () => {
    const exportData = selectedIds.length > 0 
      ? invoices.filter(inv => selectedIds.includes(inv.id))
      : filteredInvoices;

    const headers = ["Invoice Number", "Vendor (Seller)", "Customer (Buyer)", "Invoice Date", "Total Amount", "Currency", "Tax Amount", "Status"];
    const csvRows = [
      headers.join(','),
      ...exportData.map(inv => [
        `"${inv.invoice_number}"`,
        `"${inv.vendor_name.replace(/"/g, '""')}"`,
        `"${(inv.customer_name || '').replace(/"/g, '""')}"`,
        `"${inv.invoice_date}"`,
        inv.total_amount,
        `"${inv.currency || 'INR'}"`,
        inv.tax_amount || 0,
        `"${inv.status}"`
      ].join(','))
    ];

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Invoices_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="glass-panel" style={{ padding: '24px' }}>
      {/* Controls Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
        
        {/* Search */}
        <div style={{ position: 'relative', minWidth: '280px', flex: '1' }}>
          <Search size={18} color="var(--text-secondary)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            type="text" 
            placeholder="Search vendor name, invoice # or item..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 14px 10px 38px',
              borderRadius: '10px',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              fontSize: '0.88rem'
            }}
          />
        </div>

        {/* Filters & Export */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: '9px 12px',
              borderRadius: '10px',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              fontSize: '0.85rem',
              fontWeight: '600'
            }}
          >
            <option value="all">All Invoices</option>
            <option value="pending">Pending Review</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>

          <button
            onClick={exportToCSV}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '9px 14px',
              borderRadius: '10px',
              background: 'rgba(16, 185, 129, 0.15)',
              color: 'var(--emerald)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              fontSize: '0.85rem',
              fontWeight: '700'
            }}
            title="Download CSV report"
          >
            <FileSpreadsheet size={16} /> Export to Excel/CSV
          </button>
        </div>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
              <th style={{ padding: '12px', width: '40px' }}>
                <input 
                  type="checkbox" 
                  checked={selectedIds.length === filteredInvoices.length && filteredInvoices.length > 0}
                  onChange={toggleSelectAll}
                />
              </th>
              <th style={{ padding: '12px' }}>Invoice # & File</th>
              <th style={{ padding: '12px' }}>Vendor (Seller)</th>
              <th style={{ padding: '12px' }}>Invoice Date</th>
              <th style={{ padding: '12px' }}>Total Amount</th>
              <th style={{ padding: '12px' }}>Status</th>
              <th style={{ padding: '12px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ padding: '48px', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No invoices found matching your filter criteria.
                </td>
              </tr>
            ) : (
              filteredInvoices.map((inv) => {
                const isSelected = selectedIds.includes(inv.id);
                const sym = getCurrencySymbol(inv.currency);

                return (
                  <tr 
                    key={inv.id} 
                    style={{
                      borderBottom: '1px solid var(--border-color)',
                      background: isSelected ? 'var(--primary-light)' : 'transparent',
                      transition: 'background 0.2s ease'
                    }}
                  >
                    <td style={{ padding: '14px 12px' }}>
                      <input 
                        type="checkbox" 
                        checked={isSelected}
                        onChange={() => toggleSelectOne(inv.id)}
                      />
                    </td>
                    
                    {/* Invoice # */}
                    <td style={{ padding: '14px 12px' }}>
                      <div style={{ fontWeight: '800', color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>
                        #{inv.invoice_number}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        {inv.file_name || 'Receipt Document'}
                      </div>
                    </td>

                    {/* Vendor */}
                    <td style={{ padding: '14px 12px' }}>
                      <div style={{ fontWeight: '700', color: 'var(--text-primary)' }}>
                        {inv.vendor_name}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {inv.vendor_address || 'Vendor Address'}
                      </div>
                    </td>

                    {/* Date */}
                    <td style={{ padding: '14px 12px' }}>
                      <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{inv.invoice_date}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{inv.purchase_time || ''}</div>
                    </td>

                    {/* Amount */}
                    <td style={{ padding: '14px 12px' }}>
                      <div style={{ fontWeight: '800', fontSize: '1rem', color: 'var(--emerald)' }}>
                        {sym}{Number(inv.total_amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        Tax: {sym}{Number(inv.tax_amount || 0).toFixed(2)}
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td style={{ padding: '14px 12px' }}>
                      {inv.status === 'approved' && (
                        <span className="badge badge-approved"><CheckCircle size={12} /> Approved</span>
                      )}
                      {inv.status === 'pending' && (
                        <span className="badge badge-pending">Needs Review</span>
                      )}
                      {inv.status === 'rejected' && (
                        <span className="badge badge-rejected"><XCircle size={12} /> Rejected</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td style={{ padding: '14px 12px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>
                        <button
                          onClick={() => onSelectInvoice(inv)}
                          style={{
                            padding: '6px 14px',
                            borderRadius: '8px',
                            background: 'var(--primary-light)',
                            color: 'var(--primary)',
                            fontSize: '0.82rem',
                            fontWeight: '700',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <Eye size={14} /> Edit & Check
                        </button>

                        {inv.status !== 'approved' && (
                          <button
                            onClick={() => onApproveInvoice(inv.id)}
                            style={{
                              padding: '6px 8px',
                              borderRadius: '8px',
                              background: 'rgba(16, 185, 129, 0.15)',
                              color: 'var(--emerald)',
                              border: '1px solid rgba(16, 185, 129, 0.3)'
                            }}
                            title="Quick Approve"
                          >
                            <CheckCircle size={16} />
                          </button>
                        )}

                        <button
                          onClick={() => onDeleteInvoice(inv.id)}
                          style={{
                            padding: '6px 8px',
                            borderRadius: '8px',
                            background: 'rgba(239, 68, 68, 0.15)',
                            color: 'var(--rose)',
                            border: '1px solid rgba(239, 68, 68, 0.3)'
                          }}
                          title="Delete Invoice"
                        >
                          <Trash2 size={16} />
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
    </div>
  );
}
