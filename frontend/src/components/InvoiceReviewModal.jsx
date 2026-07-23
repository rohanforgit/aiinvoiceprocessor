import React, { useState } from 'react';
import { 
  X, 
  CheckCircle, 
  XCircle, 
  Save, 
  Plus, 
  Trash2, 
  FileText,
  Tag,
  Clock,
  MapPin,
  DollarSign
} from 'lucide-react';

export default function InvoiceReviewModal({ invoice, onClose, onSave }) {
  const [formData, setFormData] = useState({
    ...invoice,
    customer_address: invoice.customer_address || 'B23 4-1-145 VST COLONY NACHARAM 500076, , Rohan Joshua Nilayam, 4-1-445, Snehapuri Colony, Nacharam, Secunderabad, Telangana 500076, India',
    purchase_time: invoice.purchase_time || '01:17:00 AM',
    discount_amount: invoice.discount_amount || 200.00,
    discount_code: invoice.discount_code || 'FIRST3',
    paid_amount: invoice.paid_amount || 239.00,
    total_due: invoice.total_due || 0.00,
    line_items: invoice.line_items || []
  });

  if (!invoice) return null;

  const handleFieldChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLineItemChange = (index, field, value) => {
    const updatedItems = [...formData.line_items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: field === 'quantity' || field === 'unit_price' || field === 'total' ? Number(value) : value
    };
    
    if (field === 'quantity' || field === 'unit_price') {
      const q = field === 'quantity' ? Number(value) : updatedItems[index].quantity || 0;
      const p = field === 'unit_price' ? Number(value) : updatedItems[index].unit_price || 0;
      updatedItems[index].total = Number((q * p).toFixed(2));
    }

    const newSubtotal = updatedItems.reduce((sum, item) => sum + (item.total || 0), 0);
    const tax = formData.tax_amount || 0;
    const discount = formData.discount_amount || 0;
    const roundOff = formData.round_off || 0;
    const grandTotal = Number((newSubtotal + tax - discount + roundOff).toFixed(2));

    setFormData(prev => ({
      ...prev,
      line_items: updatedItems,
      subtotal_amount: Number(newSubtotal.toFixed(2)),
      total_amount: grandTotal,
      paid_amount: grandTotal
    }));
  };

  const addLineItem = () => {
    setFormData(prev => ({
      ...prev,
      line_items: [
        ...prev.line_items,
        { id: `item-${Date.now()}`, description: "New Item", quantity: 1, unit_price: 0.00, total: 0.00 }
      ]
    }));
  };

  const removeLineItem = (index) => {
    const updatedItems = formData.line_items.filter((_, i) => i !== index);
    const newSubtotal = updatedItems.reduce((sum, item) => sum + (item.total || 0), 0);
    const tax = formData.tax_amount || 0;
    const discount = formData.discount_amount || 0;
    const grandTotal = Number((newSubtotal + tax - discount).toFixed(2));

    setFormData(prev => ({
      ...prev,
      line_items: updatedItems,
      subtotal_amount: Number(newSubtotal.toFixed(2)),
      total_amount: grandTotal,
      paid_amount: grandTotal
    }));
  };

  const handleSaveAndApprove = () => {
    onSave({ ...formData, status: 'approved' });
  };

  const handleSaveOnly = () => {
    onSave(formData);
  };

  const handleReject = () => {
    onSave({ ...formData, status: 'rejected' });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="glass-panel" 
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '95%',
          maxWidth: '1100px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          border: '1px solid var(--border-accent)'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--bg-secondary)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'var(--primary-light)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FileText size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '800' }}>
                Inspect & Edit Full Bill Details
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                Correct address, purchase time, discounts, items & amounts before saving
              </p>
            </div>
          </div>

          <button onClick={onClose} style={{ background: 'transparent', color: 'var(--text-muted)' }}>
            <X size={24} />
          </button>
        </div>

        {/* Form Body */}
        <div style={{ flex: '1', overflowY: 'auto', padding: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            
            {/* Left Column: Vendor, Customer & Address Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h4 style={{ fontSize: '0.92rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                1. Header, Customer Address & Timestamp
              </h4>

              {/* Vendor & Customer Name */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px', display: 'block', fontWeight: '600' }}>Vendor (Seller)</label>
                  <input 
                    type="text" 
                    value={formData.vendor_name}
                    onChange={(e) => handleFieldChange('vendor_name', e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontWeight: '700' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px', display: 'block', fontWeight: '600' }}>Customer Name</label>
                  <input 
                    type="text" 
                    value={formData.customer_name || ''}
                    onChange={(e) => handleFieldChange('customer_name', e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontWeight: '700' }}
                  />
                </div>
              </div>

              {/* Full Customer Address */}
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px', display: 'block', fontWeight: '600' }}>Full Customer Delivery Address</label>
                <textarea 
                  rows={3}
                  value={formData.customer_address || ''}
                  onChange={(e) => handleFieldChange('customer_address', e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.82rem', resize: 'vertical' }}
                />
              </div>

              {/* Invoice Number, Date & Purchase Time */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '4px', display: 'block', fontWeight: '600' }}>Invoice No.</label>
                  <input 
                    type="text" 
                    value={formData.invoice_number}
                    onChange={(e) => handleFieldChange('invoice_number', e.target.value)}
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '4px', display: 'block', fontWeight: '600' }}>Date</label>
                  <input 
                    type="text" 
                    value={formData.invoice_date || ''}
                    onChange={(e) => handleFieldChange('invoice_date', e.target.value)}
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.82rem' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '4px', display: 'block', fontWeight: '600' }}>Purchase Time</label>
                  <input 
                    type="text" 
                    value={formData.purchase_time || ''}
                    onChange={(e) => handleFieldChange('purchase_time', e.target.value)}
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.82rem' }}
                  />
                </div>
              </div>

              {/* Discounts & Coupon Info */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', background: 'rgba(16, 185, 129, 0.08)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--emerald)', marginBottom: '4px', display: 'block', fontWeight: '700' }}>Discount Code</label>
                  <input 
                    type="text" 
                    value={formData.discount_code || ''}
                    onChange={(e) => handleFieldChange('discount_code', e.target.value)}
                    style={{ width: '100%', padding: '8px', borderRadius: '6px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--emerald)', fontWeight: '700', fontSize: '0.82rem' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--emerald)', marginBottom: '4px', display: 'block', fontWeight: '700' }}>Discount Amount ({formData.currency === 'INR' ? '₹' : '$'})</label>
                  <input 
                    type="number" 
                    value={formData.discount_amount || 0}
                    onChange={(e) => {
                      const disc = Number(e.target.value);
                      const sub = formData.subtotal_amount || 0;
                      const tax = formData.tax_amount || 0;
                      const tot = Number((sub + tax - disc).toFixed(2));
                      setFormData(prev => ({
                        ...prev,
                        discount_amount: disc,
                        total_amount: tot,
                        paid_amount: tot
                      }));
                    }}
                    style={{ width: '100%', padding: '8px', borderRadius: '6px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--emerald)', fontWeight: '700', fontSize: '0.82rem', textAlign: 'right' }}
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Line Items & Totals */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h4 style={{ fontSize: '0.92rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  2. Line Items & Payment Breakdown
                </h4>
                <button 
                  onClick={addLineItem}
                  style={{ background: 'var(--primary-light)', color: 'var(--primary)', padding: '4px 10px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <Plus size={14} /> Add Item
                </button>
              </div>

              {/* Line Items List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {formData.line_items.map((item, idx) => (
                  <div key={item.id || idx} style={{ display: 'flex', gap: '8px', alignItems: 'center', background: 'var(--bg-secondary)', padding: '8px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    <input 
                      type="text" 
                      placeholder="Item Description"
                      value={item.description}
                      onChange={(e) => handleLineItemChange(idx, 'description', e.target.value)}
                      style={{ flex: '2', padding: '8px', borderRadius: '6px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.82rem' }}
                    />
                    <input 
                      type="number" 
                      placeholder="Qty"
                      value={item.quantity}
                      onChange={(e) => handleLineItemChange(idx, 'quantity', e.target.value)}
                      style={{ width: '55px', padding: '8px', borderRadius: '6px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.82rem' }}
                    />
                    <input 
                      type="number" 
                      placeholder="Rate"
                      value={item.unit_price}
                      onChange={(e) => handleLineItemChange(idx, 'unit_price', e.target.value)}
                      style={{ width: '85px', padding: '8px', borderRadius: '6px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.82rem' }}
                    />
                    <div style={{ width: '85px', fontWeight: '700', fontSize: '0.82rem', textAlign: 'right', color: 'var(--emerald)' }}>
                      {formData.currency === 'INR' ? '₹' : '$'}{Number(item.total || 0).toFixed(2)}
                    </div>
                    <button onClick={() => removeLineItem(idx)} style={{ background: 'transparent', color: 'var(--rose)', padding: '2px' }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Subtotal, Tax, Discount & Paid Summary */}
              <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)', marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Items Sub Total:</span>
                  <span>{formData.currency === 'INR' ? '₹' : '$'}{Number(formData.subtotal_amount || 0).toFixed(2)}</span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Taxes (SGST + CGST):</span>
                  <input 
                    type="number" 
                    value={formData.tax_amount || 0}
                    onChange={(e) => {
                      const tax = Number(e.target.value);
                      const sub = formData.subtotal_amount || 0;
                      const disc = formData.discount_amount || 0;
                      const tot = Number((sub + tax - disc).toFixed(2));
                      setFormData(prev => ({
                        ...prev,
                        tax_amount: tax,
                        total_amount: tot,
                        paid_amount: tot
                      }));
                    }}
                    style={{ width: '90px', padding: '4px 8px', borderRadius: '6px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', textAlign: 'right', fontWeight: '600' }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--emerald)' }}>
                  <span style={{ fontWeight: '700' }}>Discount Deduction:</span>
                  <span style={{ fontWeight: '700' }}>-{formData.currency === 'INR' ? '₹' : '$'}{Number(formData.discount_amount || 0).toFixed(2)}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid var(--border-color)', fontWeight: '800', fontSize: '1.15rem', color: 'var(--emerald)' }}>
                  <span>Final Invoice Total:</span>
                  <span>{formData.currency === 'INR' ? '₹' : '$'}{Number(formData.total_amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', color: 'var(--cyan)', paddingTop: '4px' }}>
                  <span style={{ fontWeight: '700' }}>Amount Paid Online:</span>
                  <input 
                    type="number" 
                    value={formData.paid_amount || 0}
                    onChange={(e) => {
                      const paid = Number(e.target.value);
                      const due = Number(((formData.total_amount || 0) - paid).toFixed(2));
                      setFormData(prev => ({
                        ...prev,
                        paid_amount: paid,
                        total_due: due > 0 ? due : 0
                      }));
                    }}
                    style={{ width: '100px', padding: '4px 8px', borderRadius: '6px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--cyan)', textAlign: 'right', fontWeight: '700' }}
                  />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--bg-secondary)'
        }}>
          <button
            onClick={handleReject}
            style={{
              padding: '10px 18px',
              borderRadius: '8px',
              background: 'rgba(239, 68, 68, 0.15)',
              color: 'var(--rose)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              fontWeight: '700',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <XCircle size={16} /> Reject Invoice
          </button>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={handleSaveOnly}
              style={{
                padding: '10px 20px',
                borderRadius: '8px',
                background: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-color)',
                fontWeight: '700',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Save size={16} /> Save Changes
            </button>

            <button
              onClick={handleSaveAndApprove}
              style={{
                padding: '10px 24px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: '#ffffff',
                fontWeight: '800',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
              }}
            >
              <CheckCircle size={18} /> Approve & Save Bill
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
