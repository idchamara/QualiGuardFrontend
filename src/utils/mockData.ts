import { Audit, DashboardMetrics, Section } from '../types/audit';
export const MOCK_SECTIONS: Section[] = [{
  id: 's1',
  title: 'Fabric (Raw Material)',
  score: 0,
  totalWeight: 10,
  questions: [{
    id: 'q1-1',
    text: 'Is fabric shade within tolerance?',
    weight: 2,
    result: null,
    images: []
  }, {
    id: 'q1-2',
    text: 'Are there any visible fabric defects?',
    weight: 2,
    result: null,
    images: []
  }, {
    id: 'q1-3',
    text: 'Is fabric weight (GSM) correct?',
    weight: 2,
    result: null,
    images: []
  }, {
    id: 'q1-4',
    text: 'Is shrinkage within acceptable limits?',
    weight: 2,
    result: null,
    images: []
  }, {
    id: 'q1-5',
    text: 'Are fabric rolls stored properly?',
    weight: 2,
    result: null,
    images: []
  }]
}, {
  id: 's2',
  title: 'Trims & Accessories',
  score: 0,
  totalWeight: 8,
  questions: [{
    id: 'q2-1',
    text: 'Are all trims matching the BOM?',
    weight: 2,
    result: null,
    images: []
  }, {
    id: 'q2-2',
    text: 'Is thread color matching approved swatch?',
    weight: 2,
    result: null,
    images: []
  }, {
    id: 'q2-3',
    text: 'Are buttons/zippers functional?',
    weight: 2,
    result: null,
    images: []
  }, {
    id: 'q2-4',
    text: 'Are labels correct and legible?',
    weight: 2,
    result: null,
    images: []
  }]
}, {
  id: 's3',
  title: 'Cutting',
  score: 0,
  totalWeight: 10,
  questions: [{
    id: 'q3-1',
    text: 'Is pattern grading correct?',
    weight: 2,
    result: null,
    images: []
  }, {
    id: 'q3-2',
    text: 'Are cut pieces bundled correctly?',
    weight: 2,
    result: null,
    images: []
  }, {
    id: 'q3-3',
    text: 'Is numbering/ply marking visible?',
    weight: 2,
    result: null,
    images: []
  }, {
    id: 'q3-4',
    text: 'Are notches accurate?',
    weight: 2,
    result: null,
    images: []
  }, {
    id: 'q3-5',
    text: 'Is fabric relaxation time followed?',
    weight: 2,
    result: null,
    images: []
  }]
}, {
  id: 's4',
  title: 'Sewing',
  score: 0,
  totalWeight: 15,
  questions: [{
    id: 'q4-1',
    text: 'Is SPI (Stitches Per Inch) correct?',
    weight: 3,
    result: null,
    images: []
  }, {
    id: 'q4-2',
    text: 'Are seams puckering?',
    weight: 3,
    result: null,
    images: []
  }, {
    id: 'q4-3',
    text: 'Is tension balanced?',
    weight: 3,
    result: null,
    images: []
  }, {
    id: 'q4-4',
    text: 'Are critical measurements within tolerance?',
    weight: 3,
    result: null,
    images: []
  }, {
    id: 'q4-5',
    text: 'Are there any skipped stitches?',
    weight: 3,
    result: null,
    images: []
  }]
}, {
  id: 's5',
  title: 'Finishing & Packing',
  score: 0,
  totalWeight: 10,
  questions: [{
    id: 'q5-1',
    text: 'Is ironing/pressing satisfactory?',
    weight: 2,
    result: null,
    images: []
  }, {
    id: 'q5-2',
    text: 'Are garments free of loose threads?',
    weight: 2,
    result: null,
    images: []
  }, {
    id: 'q5-3',
    text: 'Is folding method correct?',
    weight: 2,
    result: null,
    images: []
  }, {
    id: 'q5-4',
    text: 'Is polybag warning text present?',
    weight: 2,
    result: null,
    images: []
  }, {
    id: 'q5-5',
    text: 'Is carton marking correct?',
    weight: 2,
    result: null,
    images: []
  }]
}, {
  id: 's6',
  title: 'Safety',
  score: 0,
  totalWeight: 10,
  questions: [{
    id: 'q6-1',
    text: 'Needle policy enforced?',
    weight: 5,
    result: null,
    images: []
  }, {
    id: 'q6-2',
    text: 'No sharp edges/points?',
    weight: 5,
    result: null,
    images: []
  }]
}];
export const MOCK_AUDITS: Audit[] = [{
  id: 'aud-001',
  referenceNumber: 'INS-2023-001',
  type: 'PSI',
  date: '2023-10-15',
  plannedDate: '2023-10-15',
  productName: "Men's Denim Jacket",
  productCode: 'DJ-5501',
  poReference: 'PO-998877',
  sku: 'SKU-DJ-BL-M',
  orderedQuantity: 5000,
  producedQuantity: 5000,
  packedQuantity: 4800,
  factoryName: 'Sunrise Garments Ltd.',
  location: 'Dhaka, Bangladesh',
  inspectorId: 'u1',
  inspectorName: 'John Doe',
  siteRepresentative: 'Mr. Ahmed',
  status: 'Completed',
  sections: MOCK_SECTIONS,
  overallScore: 92,
  compliancePercentage: 92,
  result: 'Pass',
  createdAt: '2023-10-15T09:00:00Z',
  updatedAt: '2023-10-15T16:00:00Z'
}, {
  id: 'aud-002',
  referenceNumber: 'INS-2023-002',
  type: 'FCA',
  date: '2023-10-18',
  plannedDate: '2023-10-18',
  productName: "Women's Cotton T-Shirt",
  productCode: 'WT-202',
  poReference: 'PO-998878',
  sku: 'SKU-WT-WH-S',
  orderedQuantity: 10000,
  producedQuantity: 8000,
  packedQuantity: 0,
  factoryName: 'Elite Textiles',
  location: 'Ho Chi Minh, Vietnam',
  inspectorId: 'u1',
  inspectorName: 'John Doe',
  siteRepresentative: 'Ms. Linh',
  status: 'In Progress',
  sections: MOCK_SECTIONS,
  overallScore: 0,
  compliancePercentage: 45,
  result: 'Pending',
  createdAt: '2023-10-18T08:30:00Z',
  updatedAt: '2023-10-18T10:15:00Z'
}, {
  id: 'aud-003',
  referenceNumber: 'INS-2023-003',
  type: 'PSI',
  date: '2023-10-12',
  plannedDate: '2023-10-12',
  productName: 'Kids Fleece Hoodie',
  productCode: 'KH-101',
  poReference: 'PO-998870',
  sku: 'SKU-KH-RD-4T',
  orderedQuantity: 2000,
  producedQuantity: 2000,
  packedQuantity: 2000,
  factoryName: 'Sunrise Garments Ltd.',
  location: 'Dhaka, Bangladesh',
  inspectorId: 'u2',
  inspectorName: 'Jane Smith',
  siteRepresentative: 'Mr. Rahman',
  status: 'Report Generated',
  sections: MOCK_SECTIONS,
  overallScore: 68,
  compliancePercentage: 68,
  result: 'Fail',
  createdAt: '2023-10-12T09:00:00Z',
  updatedAt: '2023-10-12T15:30:00Z'
}];
export const MOCK_METRICS: DashboardMetrics = {
  totalAudits: 142,
  passedAudits: 115,
  failedAudits: 18,
  pendingCAPs: 24,
  complianceTrend: [{
    date: 'Oct 1',
    score: 85
  }, {
    date: 'Oct 5',
    score: 88
  }, {
    date: 'Oct 10',
    score: 82
  }, {
    date: 'Oct 15',
    score: 91
  }, {
    date: 'Oct 20',
    score: 89
  }, {
    date: 'Oct 25',
    score: 94
  }],
  sectionFailures: [{
    name: 'Sewing',
    count: 45
  }, {
    name: 'Packing',
    count: 28
  }, {
    name: 'Fabric',
    count: 22
  }, {
    name: 'Trims',
    count: 15
  }, {
    name: 'Safety',
    count: 2
  }]
};