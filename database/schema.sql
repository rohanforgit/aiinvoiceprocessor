-- ==========================================
-- Intelligent Invoice Data Extraction & Management System
-- Database Schema for Supabase / PostgreSQL
-- ==========================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create Enum Types for Status and Currency if desired
DO $$ BEGIN
    CREATE TYPE invoice_status AS ENUM ('pending', 'approved', 'rejected', 'flagged_duplicate');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Invoices Table
CREATE TABLE IF NOT EXISTS public.invoices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Extracted Core Data
    invoice_number VARCHAR(100),
    vendor_name VARCHAR(255) NOT NULL,
    vendor_address TEXT,
    vendor_tax_id VARCHAR(100),
    customer_name VARCHAR(255),
    
    -- Financial Details
    invoice_date DATE,
    due_date DATE,
    total_amount NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    subtotal_amount NUMERIC(12, 2),
    tax_amount NUMERIC(12, 2) DEFAULT 0.00,
    currency VARCHAR(10) DEFAULT 'USD',
    payment_terms VARCHAR(100),
    
    -- Line Items (Structured JSON array)
    -- Format: [{"description": "Item 1", "quantity": 2, "unit_price": 50.00, "total": 100.00}]
    line_items JSONB DEFAULT '[]'::jsonb,
    
    -- AI Extraction & Confidence Scoring
    confidence_score NUMERIC(5, 2) DEFAULT 0.00, -- Overall percentage 0-100
    confidence_breakdown JSONB DEFAULT '{}'::jsonb, -- Per-field score breakdown e.g. {"vendor": 98, "total": 95}
    raw_extraction JSONB, -- Full response payload from Claude Vision API
    
    -- Processing & Workflow Metadata
    status VARCHAR(50) NOT NULL DEFAULT 'pending', -- 'pending', 'approved', 'rejected', 'flagged_duplicate'
    is_duplicate BOOLEAN DEFAULT FALSE,
    duplicate_of_id UUID REFERENCES public.invoices(id) ON DELETE SET NULL,
    duplicate_notes TEXT,
    
    -- Document File Metadata
    file_name VARCHAR(255),
    file_type VARCHAR(50),
    file_size_bytes BIGINT,
    file_url TEXT,
    
    -- Timestamps & Audit
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    reviewed_at TIMESTAMP WITH TIME ZONE,
    reviewed_by VARCHAR(255)
);

-- Indexing for fast search and duplicate detection
CREATE INDEX IF NOT EXISTS idx_invoices_vendor ON public.invoices(vendor_name);
CREATE INDEX IF NOT EXISTS idx_invoices_date ON public.invoices(invoice_date);
CREATE INDEX IF NOT EXISTS idx_invoices_status ON public.invoices(status);
CREATE INDEX IF NOT EXISTS idx_invoices_inv_num ON public.invoices(invoice_number);
CREATE INDEX IF NOT EXISTS idx_invoices_dup_check ON public.invoices(vendor_name, invoice_number, total_amount);

-- Trigger for auto-updating `updated_at`
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_invoices_modtime ON public.invoices;
CREATE TRIGGER update_invoices_modtime
    BEFORE UPDATE ON public.invoices
    FOR EACH ROW
    EXECUTE PROCEDURE update_modified_column();

-- Enable Row Level Security (RLS)
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;

-- Default permissive policy for API access (Customize as needed for multi-tenant auth)
CREATE POLICY "Allow public read access" ON public.invoices FOR SELECT USING (true);
CREATE POLICY "Allow public insert access" ON public.invoices FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access" ON public.invoices FOR UPDATE USING (true);
CREATE POLICY "Allow public delete access" ON public.invoices FOR DELETE USING (true);

-- Useful Analytical View: Vendor Financial Summary
CREATE OR REPLACE VIEW vendor_financial_summary AS
SELECT 
    vendor_name,
    COUNT(id) AS total_invoices,
    SUM(CASE WHEN status = 'approved' THEN total_amount ELSE 0 END) AS total_approved_spend,
    SUM(CASE WHEN status = 'pending' THEN total_amount ELSE 0 END) AS pending_approval_amount,
    AVG(confidence_score) AS avg_ai_confidence,
    MAX(created_at) AS last_invoice_date
FROM public.invoices
GROUP BY vendor_name;
