import React from 'react';
import { DollarSign, FileText, Clock, CheckCircle, Building2 } from 'lucide-react';

export default function MetricsCards({ invoices, onFilterStatus }) {
  // Separate INR and USD spend amounts
  const inrInvoices = invoices.filter(inv => (inv.currency || 'INR') === 'INR');
  const usdInvoices = invoices.filter(inv => inv.currency === 'USD');

  const totalINR = inrInvoices.reduce((sum, inv) => sum + Number(inv.total_amount || 0), 0);
  const totalUSD = usdInvoices.reduce((sum, inv) => sum + Number(inv.total_amount || 0), 0);

  const pendingCount = invoices.filter(inv => inv.status === 'pending').length;
  const approvedCount = invoices.filter(inv => inv.status === 'approved').length;
  const uniqueVendors = new Set(invoices.map(inv => inv.vendor_name)).size;

  const displaySpend = totalINR > 0 
    ? `₹${totalINR.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    : `$${totalUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const cards = [
    {
      title: "Total Bills Amount",
      value: displaySpend,
      subtitle: `${invoices.length} invoices recorded`,
      icon: DollarSign,
      color: "var(--emerald)",
      bg: "rgba(16, 185, 129, 0.1)",
      filter: "all"
    },
    {
      title: "Pending Review",
      value: pendingCount,
      subtitle: "Requires verification",
      icon: Clock,
      color: "var(--amber)",
      bg: "rgba(245, 158, 11, 0.1)",
      badge: pendingCount > 0 ? "Pending" : "Completed",
      badgeColor: pendingCount > 0 ? "var(--amber)" : "var(--emerald)",
      filter: "pending"
    },
    {
      title: "Approved Bills",
      value: approvedCount,
      subtitle: "Verified & ready for payout",
      icon: CheckCircle,
      color: "var(--primary)",
      bg: "rgba(99, 102, 241, 0.1)",
      badge: `${approvedCount} Approved`,
      badgeColor: "var(--primary)",
      filter: "approved"
    },
    {
      title: "Active Vendors",
      value: uniqueVendors,
      subtitle: "Suppliers & Sellers",
      icon: Building2,
      color: "var(--cyan)",
      bg: "rgba(6, 182, 212, 0.1)",
      badge: "Active",
      badgeColor: "var(--cyan)",
      filter: "all"
    }
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '16px',
      marginBottom: '24px'
    }}>
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div 
            key={idx}
            className="glass-panel glass-panel-hover"
            onClick={() => onFilterStatus && onFilterStatus(card.filter)}
            style={{
              padding: '20px',
              position: 'relative',
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {card.title}
                </span>
                <h3 style={{ fontSize: '1.6rem', fontWeight: '800', marginTop: '4px', letterSpacing: '-0.5px' }}>
                  {card.value}
                </h3>
              </div>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: card.bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: card.color
              }}>
                <Icon size={22} />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {card.subtitle}
              </span>
              {card.badge && (
                <span style={{
                  fontSize: '0.7rem',
                  fontWeight: '700',
                  color: card.badgeColor,
                  background: 'rgba(255,255,255,0.05)',
                  padding: '2px 8px',
                  borderRadius: '10px'
                }}>
                  {card.badge}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
