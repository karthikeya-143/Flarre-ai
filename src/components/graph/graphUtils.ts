import { Node, Edge, MarkerType } from '@xyflow/react';
import { 
  mockPolicyholders, 
  mockPolicies, 
  mockClauses, 
  mockClaim1Documents, 
  mockClaim1Findings, 
  mockRules 
} from '../../data/mockData';
import { GraphNodeData } from './CustomNodes';

export function buildInsuronKnowledgeGraph(): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  // 1. POLICYHOLDER
  const ph = mockPolicyholders[0];
  nodes.push({
    id: ph.id,
    type: 'custom',
    position: { x: 450, y: 40 },
    data: {
      id: ph.id,
      label: ph.name,
      sublabel: `${ph.businessType} • ${ph.address.split(',')[0]}`,
      category: 'policyholder',
      status: 'VERIFIED',
    } as unknown as Record<string, unknown>,
  });

  // 2. POLICY
  const pol = mockPolicies[0];
  nodes.push({
    id: pol.id,
    type: 'custom',
    position: { x: 450, y: 220 },
    data: {
      id: pol.id,
      label: `${pol.policyNumber} (Commercial P&C)`,
      sublabel: `Limit: $${(pol.coverageLimit / 1000000).toFixed(1)}M • Deductible: $${pol.deductible.toLocaleString()}`,
      category: 'policy',
      status: pol.underwritingStatus,
    } as unknown as Record<string, unknown>,
  });

  // Edge: Policyholder -> Policy
  edges.push({
    id: `e-${ph.id}-${pol.id}`,
    source: ph.id,
    target: pol.id,
    label: 'holds policy',
    animated: true,
    style: { stroke: '#38BDF8', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#38BDF8' },
  });

  // 3. CLAIM
  const claimId = 'CLM-2026-8941';
  nodes.push({
    id: claimId,
    type: 'custom',
    position: { x: 450, y: 400 },
    data: {
      id: claimId,
      label: 'Fire & Inventory Loss ($385,000)',
      sublabel: 'Incident: 2026-02-18 02:15 AM • Sector 9 Warehouse',
      category: 'claim',
      status: 'FLAGGED_INCONSISTENCY',
      severity: 'CRITICAL',
    } as unknown as Record<string, unknown>,
  });

  // Edge: Claim -> Policy
  edges.push({
    id: `e-${claimId}-${pol.id}`,
    source: claimId,
    target: pol.id,
    label: 'references policy',
    animated: true,
    style: { stroke: '#F59E0B', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#F59E0B' },
  });

  // 4. POLICY CLAUSES
  mockClauses.forEach((cls, idx) => {
    const xPos = 50 + idx * 280;
    nodes.push({
      id: cls.id,
      type: 'custom',
      position: { x: xPos, y: 580 },
      data: {
        id: cls.clauseCode,
        label: cls.title,
        sublabel: cls.category,
        category: 'clause',
        status: cls.isExclusion ? 'EXCLUSION_WARRANTY' : 'REQUIRED_CONDITION',
      } as unknown as Record<string, unknown>,
    });

    // Edge: Policy -> Clause
    edges.push({
      id: `e-${pol.id}-${cls.id}`,
      source: pol.id,
      target: cls.id,
      label: 'contains clause',
      style: { stroke: '#8B5CF6', strokeWidth: 1.5, strokeDasharray: '4 4' },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#8B5CF6' },
    });
  });

  // 5. SUPPORTING DOCUMENTS
  mockClaim1Documents.slice(0, 4).forEach((doc, idx) => {
    const xPos = 80 + idx * 300;
    nodes.push({
      id: doc.id,
      type: 'custom',
      position: { x: xPos, y: 770 },
      data: {
        id: doc.id,
        label: doc.title,
        sublabel: `${doc.version} • ${doc.authorAgency.split(',')[0]}`,
        category: 'document',
        status: 'VERIFIED_HASH',
      } as unknown as Record<string, unknown>,
    });

    // Edge: Claim -> Document
    edges.push({
      id: `e-${claimId}-${doc.id}`,
      source: claimId,
      target: doc.id,
      label: 'submitted document',
      style: { stroke: '#3B82F6', strokeWidth: 1.5 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#3B82F6' },
    });
  });

  // 6. EVIDENCE PASSAGES
  const keyPassages = [
    {
      id: 'PASS-FNOL-01',
      docId: 'DOC-FNOL-8941',
      label: 'Intake: $385,000 Total Loss Claimed',
      sublabel: 'Reported 02:15 AM • Zone C server racking burn',
      x: 80,
    },
    {
      id: 'PASS-DISP-01',
      docId: 'DOC-FIRE-DISPATCH',
      label: 'Dispatch: Valve Closed at 23:30 (Feb 17)',
      sublabel: 'Zero PSI pressure; padlocked 2h45m before fire',
      x: 370,
    },
    {
      id: 'PASS-EST-01',
      docId: 'DOC-CONTRACTOR-EST',
      label: 'Contractor: $295,000 Certified Restoration',
      sublabel: 'Excludes unverified server inventory stock',
      x: 670,
    },
    {
      id: 'PASS-CERT-01',
      docId: 'DOC-MAINT-CERT',
      label: 'Certificate Expired Nov 15, 2024',
      sublabel: 'Quarterly inspection overdue by 460 days',
      x: 970,
    },
  ];

  keyPassages.forEach((pass) => {
    nodes.push({
      id: pass.id,
      type: 'custom',
      position: { x: pass.x, y: 970 },
      data: {
        id: pass.id,
        label: pass.label,
        sublabel: pass.sublabel,
        category: 'evidence',
        status: 'EXTRACTED_FACT',
      } as unknown as Record<string, unknown>,
    });

    // Edge: Document -> Evidence Passage
    edges.push({
      id: `e-${pass.docId}-${pass.id}`,
      source: pass.docId,
      target: pass.id,
      label: 'extracted passage',
      animated: true,
      style: { stroke: '#00F0FF', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#00F0FF' },
    });
  });

  // 7. FINDINGS (POTENTIAL INCONSISTENCIES)
  mockClaim1Findings.forEach((find, idx) => {
    const xPos = 60 + idx * 290;
    nodes.push({
      id: find.id,
      type: 'custom',
      position: { x: xPos, y: 1180 },
      data: {
        id: find.id,
        label: find.title,
        sublabel: find.category.replace(/_/g, ' '),
        category: 'finding',
        status: find.status,
        severity: find.severity,
      } as unknown as Record<string, unknown>,
    });

    // Link Finding to related Clauses
    find.relatedClauseIds.forEach((clsId: string) => {
      edges.push({
        id: `e-${find.id}-${clsId}`,
        source: find.id,
        target: clsId,
        label: 'conflicts with clause',
        animated: true,
        style: { stroke: '#F43F5E', strokeWidth: 2, strokeDasharray: '3 3' },
        markerEnd: { type: MarkerType.ArrowClosed, color: '#F43F5E' },
      });
    });

    // Link Evidence to Findings
    find.supportingEvidenceIds.forEach((evId: string) => {
      edges.push({
        id: `e-${evId}-${find.id}`,
        source: evId,
        target: find.id,
        label: 'substantiates finding',
        style: { stroke: '#00F0FF', strokeWidth: 2 },
        markerEnd: { type: MarkerType.ArrowClosed, color: '#00F0FF' },
      });
    });

    find.conflictingEvidenceIds.forEach((evId: string) => {
      edges.push({
        id: `e-${evId}-${find.id}-conflict`,
        source: evId,
        target: find.id,
        label: 'conflicting evidence',
        style: { stroke: '#F43F5E', strokeWidth: 2, strokeDasharray: '2 2' },
        markerEnd: { type: MarkerType.ArrowClosed, color: '#F43F5E' },
      });
    });
  });

  // 8. REVIEW ACTION
  nodes.push({
    id: 'ACT-HUMAN-01',
    type: 'custom',
    position: { x: 380, y: 1400 },
    data: {
      id: 'ACTION-REV',
      label: 'Investigator Request: Preserve Security Logs',
      sublabel: 'Assigned to J. Mercer • Subpoena Telemetry',
      category: 'action',
      status: 'AUDIT_LOGGED',
      severity: 'HIGH',
    } as unknown as Record<string, unknown>,
  });

  edges.push({
    id: 'e-FIND-2026-002-ACT',
    source: 'FIND-2026-002',
    target: 'ACT-HUMAN-01',
    label: 'requires human review',
    animated: true,
    style: { stroke: '#10B981', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#10B981' },
  });

  return { nodes, edges };
}
