import React from 'react';
import { PieChart, Building2, CheckCircle } from 'lucide-react';

export default function AnalyticsView({ invoices }) {
  // Aggregate Vendor spend
  const vendorMap = {};
  invoices.forEach(inv => {
    if (!vendorMap[inv.vendor_name]) {
      vendorMap[inv.vendor_name] = { total: 0, count: 0 };
    }
    vendorMap[inv.vendor_name].total += Number(inv.total_amount || 0);
    vendorMap[inv.vendor_name].count += 1;
  });

  const vendorList = Object.keys(vendorMap)
    .map(name => ({
      name,
      total: vendorMap[name].total,
      count: vendorMap[name].count
    }))
    .sort((a, b) => b.total - a.total);

  const maxSpend = vendorList.length > 0 ? vendorList[0].total : 1;

  const statusCounts = {
    approved: invoices.filter(i => i.status === 'approved').length,
    pending: invoices.filter(i => i.status === 'pending').length,
    rejected: invoices.filter(i => i.status === 'rejected').length
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
      
      {/* Top Vendors */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Building2 size={20} color="var(--primary)" /> Top Suppliers / Vendors
          </h3>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
            Breakdown of total invoice payments per vendor
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {vendorList.map((v, idx) => {
            const pct = Math.round((v.total / maxSpend) * 100);
            return (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.85rem' }}>
                  <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{v.name} ({v.count} bills)</span>
                  <span style={{ fontWeight: '800', color: 'var(--emerald)' }}>
                    ${v.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div style={{ height: '8px', background: 'var(--bg-secondary)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div 
                    style={{ 
                      height: '100%', 
                      width: `${pct}%`, 
                      background: 'linear-gradient(90deg, #6366f1 0%, #10b981 100%)', 
                      borderRadius: '4px'
                    }} 
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bill Status */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <PieChart size={20} color="var(--amber)" /> Bill Approval Status
          </h3>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
            Summary of all uploaded bills
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--emerald)', fontWeight: '700' }}>APPROVED</span>
            <div style={{ fontSize: '1.8rem', fontWeight: '800', marginTop: '4px' }}>{statusCounts.approved}</div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Verified & Paid</span>
          </div>

          <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--amber)', fontWeight: '700' }}>PENDING REVIEW</span>
            <div style={{ fontSize: '1.8rem', fontWeight: '800', marginTop: '4px' }}>{statusCounts.pending}</div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Awaiting Verification</span>
          </div>
        </div>
      </div>

    </div>
  );
}
