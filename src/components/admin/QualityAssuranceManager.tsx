"use client";

import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  FileText,
  Award,
  Users,
  MessageSquare,
  BarChart3,
  Calendar,
  Save,
  RefreshCw,
  Plus,
  Trash2,
  Edit2,
  Upload,
  Eye,
  Check,
  AlertCircle,
  Loader2,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Layers,
  FolderPlus,
  Files,
  X,
  Copy,
  Info,
  Clock,
  Sparkles,
  Compass,
  FileCheck,
  CheckCircle2,
  FolderOpen
} from "lucide-react";
import { FilePreviewModal } from "@/components/ui/FilePreviewModal";
import defaultQaData from "@/components/quality-assurance/quality-assurance-data.json";
import {
  QualityAssuranceData,
  AqarYearReport,
  NaacCycleReport,
  Criterion,
  Section,
  Metric,
  DocumentEntry,
  SubDocument,
  SteeringCommitteeMember,
  CriterionConvenorGroup,
  QualityMeetingDoc,
  QualityAuditDoc,
  QualityFeedbackDoc,
  QualitySurveyDoc,
  IqacYearCommitteeDoc,
  IqacYearMeetingRow,
  IqacActionPlanRow,
  IqacAnnualReportRow,
  AaaAuditRow,
  GreenAuditRow,
  QualityInitiativeRow,
  QualityEnhancementMeasureRow,
  CqiActivityRow,
  BestPracticeRow,
  InstitutionalDistinctivenessRow,
  IqacGalleryRow,
  NaacMasterDocRow,
  ExtendedProfileDocRow,
  AqarMasterReportRow
} from "@/types/quality-assurance";

// Helper to backfill Document 10 fields if missing
const ensureDocument10Fields = (loadedData: any): QualityAssuranceData => {
  const fallback = defaultQaData as unknown as QualityAssuranceData;
  return {
    ...fallback,
    ...loadedData,
    iqacCommitteeYears: loadedData?.iqacCommitteeYears?.length ? loadedData.iqacCommitteeYears : fallback.iqacCommitteeYears || [],
    iqacMeetingsTable: loadedData?.iqacMeetingsTable?.length ? loadedData.iqacMeetingsTable : fallback.iqacMeetingsTable || [],
    iqacActionPlans: loadedData?.iqacActionPlans?.length ? loadedData.iqacActionPlans : fallback.iqacActionPlans || [],
    iqacAnnualReportsTable: loadedData?.iqacAnnualReportsTable?.length ? loadedData.iqacAnnualReportsTable : fallback.iqacAnnualReportsTable || [],
    aaaAuditsTable: loadedData?.aaaAuditsTable?.length ? loadedData.aaaAuditsTable : fallback.aaaAuditsTable || [],
    greenAuditsTable: loadedData?.greenAuditsTable?.length ? loadedData.greenAuditsTable : fallback.greenAuditsTable || [],
    qualityInitiativesTable: loadedData?.qualityInitiativesTable?.length ? loadedData.qualityInitiativesTable : fallback.qualityInitiativesTable || [],
    qualityEnhancementTable: loadedData?.qualityEnhancementTable?.length ? loadedData.qualityEnhancementTable : fallback.qualityEnhancementTable || [],
    cqiActivitiesTable: loadedData?.cqiActivitiesTable?.length ? loadedData.cqiActivitiesTable : fallback.cqiActivitiesTable || [],
    bestPracticesTable: loadedData?.bestPracticesTable?.length ? loadedData.bestPracticesTable : fallback.bestPracticesTable || [],
    institutionalDistinctivenessTable: loadedData?.institutionalDistinctivenessTable?.length ? loadedData.institutionalDistinctivenessTable : fallback.institutionalDistinctivenessTable || [],
    iqacGalleryTable: loadedData?.iqacGalleryTable?.length ? loadedData.iqacGalleryTable : fallback.iqacGalleryTable || [],
    naacMasterDocs: loadedData?.naacMasterDocs?.length ? loadedData.naacMasterDocs : fallback.naacMasterDocs || [],
    extendedProfileDocs: loadedData?.extendedProfileDocs?.length ? loadedData.extendedProfileDocs : fallback.extendedProfileDocs || [],
    aqarMasterReports: loadedData?.aqarMasterReports?.length ? loadedData.aqarMasterReports : fallback.aqarMasterReports || []
  };
};

export function QualityAssuranceManager() {
  const [data, setData] = useState<QualityAssuranceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Active top-level management category: "iqac" | "naac" | "aqar"
  const [activeTab, setActiveTab] = useState<"iqac" | "naac" | "aqar">("iqac");

  // Sub-tabs per category
  const [iqacSubTab, setIqacSubTab] = useState<"about" | "meetings" | "audits" | "best-practices" | "gallery">("about");
  const [naacSubTab, setNaacSubTab] = useState<"master-docs" | "criteria">("master-docs");
  const [aqarSubTab, setAqarSubTab] = useState<"master-reports" | "criteria">("master-reports");

  // Selection states
  const [selectedAqarYear, setSelectedAqarYear] = useState<string>("2023-2024");
  const [selectedNaacCycle, setSelectedNaacCycle] = useState<string>("cycle-1");
  const [selectedCriterionId, setSelectedCriterionId] = useState<number>(1);

  // Modals for Adding / Editing Cycles & Years
  const [addYearModalOpen, setAddYearModalOpen] = useState(false);
  const [editYearModalOpen, setEditYearModalOpen] = useState(false);
  const [addCycleModalOpen, setAddCycleModalOpen] = useState(false);
  const [editCycleModalOpen, setEditCycleModalOpen] = useState(false);

  // Modals for Structural Hierarchy (Criteria, Sections, Metrics, Documents, Members)
  const [editItemModalOpen, setEditItemModalOpen] = useState(false);
  const [modalType, setModalType] = useState<string>("");
  const [modalPayload, setModalPayload] = useState<any>({});
  const [uploading, setUploading] = useState(false);

  // PDF Preview
  const [previewPdf, setPreviewPdf] = useState<{ url: string; title: string } | null>(null);

  // Expanded sections tracking
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(["1.1", "2.1", "3.1", "4.1", "5.1", "6.1", "7.1"]));

  const toggleSection = (secKey: string, secNum?: string) => {
    const next = new Set(expandedSections);
    const isOpen = next.has(secKey) || (secNum ? next.has(secNum) : false);
    if (isOpen) {
      next.delete(secKey);
      if (secNum) next.delete(secNum);
    } else {
      next.add(secKey);
    }
    setExpandedSections(next);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/quality-assurance");
      const json = await res.json();
      if (json.success && json.data) {
        const cleanData = ensureDocument10Fields(json.data);
        setData(cleanData);
        if (cleanData.aqarReports?.length) {
          setSelectedAqarYear(cleanData.aqarReports[0].year);
        }
        if (cleanData.naacCycles?.length) {
          setSelectedNaacCycle(cleanData.naacCycles[0].cycleId);
        }
      } else {
        setError(json.error || "Failed to load Quality Assurance data.");
      }
    } catch (err: any) {
      setError(err.message || "Network error loading Quality Assurance data.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!data) return;
    setSaving(true);
    setSaveSuccess(false);
    setError(null);
    try {
      const res = await fetch("/api/admin/quality-assurance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.success) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 4000);
      } else {
        setError(json.error || "Failed to save records.");
      }
    } catch (err: any) {
      setError(err.message || "Network error while saving.");
    } finally {
      setSaving(false);
    }
  };

  // Upload file helper via /api/admin/upload
  const handleFileUpload = async (file: File): Promise<string | null> => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", file.type.startsWith("image/") ? "image" : "file");

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      if (json.success && json.url) {
        return json.url;
      } else {
        alert(json.error || "Upload failed.");
        return null;
      }
    } catch (err: any) {
      alert("Error uploading file: " + err.message);
      return null;
    } finally {
      setUploading(false);
    }
  };

  // Helper to open PDF preview
  const handlePreview = (url: string, title: string) => {
    setPreviewPdf({ url, title });
  };

  // =========================================================================
  // NAAC CYCLE MANAGEMENT (Create with Cloned or Fresh Structure, Edit, Delete)
  // =========================================================================
  const currentNaacCycle = data?.naacCycles?.find((c) => c.cycleId === selectedNaacCycle) || data?.naacCycles?.[0];

  const handleAddNaacCycle = (
    cycleId: string,
    cycleName: string,
    grade: string,
    status: "Accredited" | "In Progress" | "Upcoming",
    validity: string,
    cloneFrom?: string
  ) => {
    if (!data) return;
    if (data.naacCycles.some(c => c.cycleId.toLowerCase() === cycleId.toLowerCase())) {
      alert(`A NAAC Cycle with ID '${cycleId}' already exists.`);
      return;
    }

    let criteriaToUse: Criterion[] = [];
    if (cloneFrom && cloneFrom !== "blank") {
      const src = data.naacCycles.find(c => c.cycleId === cloneFrom);
      if (src) {
        // Deep clone the criteria hierarchy, leaving document slots clean for the new cycle
        criteriaToUse = src.criteria.map(c => ({
          id: c.id,
          title: c.title,
          sections: c.sections.map(s => ({
            number: s.number,
            title: s.title,
            metrics: s.metrics.map(m => ({
              number: m.number,
              title: m.title,
              documents: []
            }))
          }))
        }));
      }
    } else {
      // Clean 7 Standard Criteria for fresh manual structure
      criteriaToUse = [
        { id: 1, title: "Criterion 1 - Curricular Aspects", sections: [] },
        { id: 2, title: "Criterion 2 - Teaching-Learning and Evaluation", sections: [] },
        { id: 3, title: "Criterion 3 - Research, Innovations and Extension", sections: [] },
        { id: 4, title: "Criterion 4 - Infrastructure and Learning Resources", sections: [] },
        { id: 5, title: "Criterion 5 - Student Support and Progression", sections: [] },
        { id: 6, title: "Criterion 6 - Governance, Leadership and Management", sections: [] },
        { id: 7, title: "Criterion 7 - Institutional Values and Best Practices", sections: [] }
      ];
    }

    const newCycle: NaacCycleReport = {
      cycleId,
      cycleName,
      grade,
      status,
      validity,
      criteria: criteriaToUse
    };

    setData({
      ...data,
      naacCycles: [...data.naacCycles, newCycle]
    });
    setSelectedNaacCycle(cycleId);
    setAddCycleModalOpen(false);
  };

  const handleEditNaacCycle = (cycleId: string, cycleName: string, grade: string, status: any, validity: string) => {
    if (!data) return;
    const updated = data.naacCycles.map(c => c.cycleId === cycleId ? { ...c, cycleName, grade, status, validity } : c);
    setData({ ...data, naacCycles: updated });
    setEditCycleModalOpen(false);
  };

  const handleDeleteNaacCycle = (cycleId: string) => {
    if (!data) return;
    if (data.naacCycles.length <= 1) {
      alert("Cannot delete the only remaining NAAC cycle.");
      return;
    }
    if (!confirm(`Are you sure you want to delete NAAC cycle '${cycleId}'? All its criteria and documents will be removed.`)) return;
    const filtered = data.naacCycles.filter(c => c.cycleId !== cycleId);
    setData({ ...data, naacCycles: filtered });
    setSelectedNaacCycle(filtered[0].cycleId);
  };

  // =========================================================================
  // AQAR YEAR MANAGEMENT (Create with Cloned or Fresh Structure, Edit, Delete)
  // =========================================================================
  const currentAqarReport = data?.aqarReports?.find((r) => r.year === selectedAqarYear) || data?.aqarReports?.[0];

  const handleAddAqarYear = (
    newYear: string,
    label: string,
    status: "Published" | "In Progress" | "Draft",
    cloneFrom?: string
  ) => {
    if (!data) return;
    if (data.aqarReports.some(r => r.year === newYear)) {
      alert(`An AQAR report for Academic Year '${newYear}' already exists.`);
      return;
    }

    let criteriaToUse: Criterion[] = [];
    if (cloneFrom && cloneFrom !== "blank") {
      const src = data.aqarReports.find(r => r.year === cloneFrom);
      if (src) {
        // Deep clone previous year's criteria and metrics structure
        criteriaToUse = src.criteria.map(c => ({
          id: c.id,
          title: c.title,
          sections: c.sections.map(s => ({
            number: s.number,
            title: s.title,
            metrics: s.metrics.map(m => ({
              number: m.number,
              title: m.title,
              documents: []
            }))
          }))
        }));
      }
    } else {
      // Clean criteria structure for new format
      criteriaToUse = [
        { id: 1, title: "Criterion 1 - Curricular Aspects", sections: [] },
        { id: 2, title: "Criterion 2 - Teaching-Learning and Evaluation", sections: [] },
        { id: 3, title: "Criterion 3 - Research, Innovations and Extension", sections: [] },
        { id: 4, title: "Criterion 4 - Infrastructure and Learning Resources", sections: [] },
        { id: 5, title: "Criterion 5 - Student Support and Progression", sections: [] },
        { id: 6, title: "Criterion 6 - Governance, Leadership and Management", sections: [] },
        { id: 7, title: "Criterion 7 - Institutional Values and Best Practices", sections: [] }
      ];
    }

    const newReport: AqarYearReport = {
      year: newYear,
      label,
      status,
      criteria: criteriaToUse
    };

    // Also add to master reports table if not present
    const updatedMaster = data.aqarMasterReports ? [...data.aqarMasterReports] : [];
    if (!updatedMaster.some(m => m.year === newYear)) {
      updatedMaster.unshift({
        year: newYear,
        aqarUrl: "/documents/DefaultFile_1.pdf",
        supportingDocsAvailable: true
      });
    }

    setData({
      ...data,
      aqarReports: [newReport, ...data.aqarReports],
      aqarMasterReports: updatedMaster
    });
    setSelectedAqarYear(newYear);
    setAddYearModalOpen(false);
  };

  const handleEditAqarYear = (year: string, label: string, status: any) => {
    if (!data) return;
    const updated = data.aqarReports.map(r => r.year === year ? { ...r, label, status } : r);
    setData({ ...data, aqarReports: updated });
    setEditYearModalOpen(false);
  };

  const handleDeleteAqarYear = (year: string) => {
    if (!data) return;
    if (data.aqarReports.length <= 1) {
      alert("Cannot delete the only remaining AQAR year report.");
      return;
    }
    if (!confirm(`Are you sure you want to delete AQAR report '${year}'?`)) return;
    const filtered = data.aqarReports.filter(r => r.year !== year);
    setData({ ...data, aqarReports: filtered });
    setSelectedAqarYear(filtered[0].year);
  };

  // =========================================================================
  // CRITERIA, SECTION & METRIC STRUCTURAL MUTATIONS (Add, Edit, Delete)
  // =========================================================================
  const getActiveCriteriaList = (): Criterion[] => {
    if (activeTab === "aqar") return currentAqarReport?.criteria || [];
    if (activeTab === "naac") return currentNaacCycle?.criteria || [];
    return [];
  };

  const updateActiveCriteriaList = (newCriteria: Criterion[]) => {
    if (!data) return;
    if (activeTab === "aqar") {
      const updatedReports = data.aqarReports.map((r) =>
        r.year === selectedAqarYear ? { ...r, criteria: newCriteria } : r
      );
      setData({ ...data, aqarReports: updatedReports });
    } else if (activeTab === "naac") {
      const updatedCycles = data.naacCycles.map((c) =>
        c.cycleId === selectedNaacCycle ? { ...c, criteria: newCriteria } : c
      );
      setData({ ...data, naacCycles: updatedCycles });
    }
  };

  // Criterion: Add, Rename, Delete
  const handleAddCriterion = (id: number, title: string) => {
    const criteria = getActiveCriteriaList();
    if (criteria.some(c => c.id === id)) {
      alert(`Criterion with ID ${id} already exists.`);
      return;
    }
    const updated = [...criteria, { id, title, sections: [] }].sort((a, b) => a.id - b.id);
    updateActiveCriteriaList(updated);
    setSelectedCriterionId(id);
    setEditItemModalOpen(false);
  };

  const handleEditCriterionTitle = (id: number) => {
    const criteria = getActiveCriteriaList();
    const current = criteria.find(c => c.id === id);
    if (!current) return;
    const newTitle = prompt("Edit Criterion Title:", current.title);
    if (!newTitle || newTitle === current.title) return;
    const updated = criteria.map(c => c.id === id ? { ...c, title: newTitle } : c);
    updateActiveCriteriaList(updated);
  };

  const handleDeleteCriterion = (id: number) => {
    if (!confirm(`Are you sure you want to delete Criterion ${id}? All sections and metrics within it will be removed.`)) return;
    const criteria = getActiveCriteriaList();
    const updated = criteria.filter(c => c.id !== id);
    updateActiveCriteriaList(updated);
    if (selectedCriterionId === id && updated.length > 0) {
      setSelectedCriterionId(updated[0].id);
    }
  };

  // Section: Add, Rename, Delete
  const handleAddSection = (critId: number, secNum: string, title: string) => {
    const criteria = getActiveCriteriaList();
    const updated = criteria.map(c => {
      if (c.id !== critId) return c;
      return {
        ...c,
        sections: [...c.sections, { number: secNum, title, metrics: [] }]
      };
    });
    updateActiveCriteriaList(updated);
    setEditItemModalOpen(false);
  };

  const handleEditSection = (critId: number, secNum: string, currentTitle: string) => {
    const newTitle = prompt("Edit Section Title:", currentTitle);
    if (!newTitle || newTitle === currentTitle) return;
    const criteria = getActiveCriteriaList();
    const updated = criteria.map(c => {
      if (c.id !== critId) return c;
      return {
        ...c,
        sections: c.sections.map(s => s.number === secNum ? { ...s, title: newTitle } : s)
      };
    });
    updateActiveCriteriaList(updated);
  };

  const handleDeleteSection = (critId: number, secNum: string) => {
    if (!confirm(`Delete section ${secNum} and all its metrics?`)) return;
    const criteria = getActiveCriteriaList();
    const updated = criteria.map(c => {
      if (c.id !== critId) return c;
      return {
        ...c,
        sections: c.sections.filter(s => s.number !== secNum)
      };
    });
    updateActiveCriteriaList(updated);
  };

  // Metric: Add, Rename, Delete
  const handleAddMetric = (critId: number, secNum: string, metricNum: string, title: string) => {
    const criteria = getActiveCriteriaList();
    const updated = criteria.map(c => {
      if (c.id !== critId) return c;
      return {
        ...c,
        sections: c.sections.map(s => {
          if (s.number !== secNum) return s;
          return {
            ...s,
            metrics: [...s.metrics, { number: metricNum, title, documents: [] }]
          };
        })
      };
    });
    updateActiveCriteriaList(updated);
    setEditItemModalOpen(false);
  };

  const handleEditMetric = (critId: number, secNum: string, metricNum: string, currentTitle: string) => {
    const newTitle = prompt("Edit Metric Title:", currentTitle);
    if (!newTitle || newTitle === currentTitle) return;
    const criteria = getActiveCriteriaList();
    const updated = criteria.map(c => {
      if (c.id !== critId) return c;
      return {
        ...c,
        sections: c.sections.map(s => {
          if (s.number !== secNum) return s;
          return {
            ...s,
            metrics: s.metrics.map(m => m.number === metricNum ? { ...m, title: newTitle } : m)
          };
        })
      };
    });
    updateActiveCriteriaList(updated);
  };

  const handleDeleteMetric = (critId: number, secNum: string, metricNum: string) => {
    if (!confirm(`Delete metric ${metricNum} and all its documents?`)) return;
    const criteria = getActiveCriteriaList();
    const updated = criteria.map(c => {
      if (c.id !== critId) return c;
      return {
        ...c,
        sections: c.sections.map(s => {
          if (s.number !== secNum) return s;
          return {
            ...s,
            metrics: s.metrics.filter(m => m.number !== metricNum)
          };
        })
      };
    });
    updateActiveCriteriaList(updated);
  };

  // Document & Sub-Document Mutations
  const handleAddDocumentToMetric = (critId: number, secNum: string, metricNum: string, label: string, docUrl: string) => {
    const criteria = getActiveCriteriaList();
    const updated = criteria.map((c) => {
      if (c.id !== critId) return c;
      return {
        ...c,
        sections: c.sections.map((s) => {
          if (s.number !== secNum) return s;
          return {
            ...s,
            metrics: s.metrics.map((m) => {
              if (m.number !== metricNum) return m;
              return {
                ...m,
                documents: [
                  ...m.documents,
                  {
                    label,
                    documentUrl: docUrl,
                    subDocuments: [],
                    _key: `doc_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`
                  }
                ]
              };
            })
          };
        })
      };
    });
    updateActiveCriteriaList(updated);
  };

  const handleDeleteDocumentFromMetric = (critId: number, secNum: string, metricNum: string, docIdx: number) => {
    if (!confirm("Are you sure you want to delete this document?")) return;
    const criteria = getActiveCriteriaList();
    const updated = criteria.map((c) => {
      if (c.id !== critId) return c;
      return {
        ...c,
        sections: c.sections.map((s) => {
          if (s.number !== secNum) return s;
          return {
            ...s,
            metrics: s.metrics.map((m) => {
              if (m.number !== metricNum) return m;
              return {
                ...m,
                documents: m.documents.filter((_, i) => i !== docIdx)
              };
            })
          };
        })
      };
    });
    updateActiveCriteriaList(updated);
  };

  const handleAddSubDocument = (critId: number, secNum: string, metricNum: string, docIdx: number, name: string, url: string, year?: string) => {
    const criteria = getActiveCriteriaList();
    const updated = criteria.map((c) => {
      if (c.id !== critId) return c;
      return {
        ...c,
        sections: c.sections.map((s) => {
          if (s.number !== secNum) return s;
          return {
            ...s,
            metrics: s.metrics.map((m) => {
              if (m.number !== metricNum) return m;
              const newDocs = [...m.documents];
              const targetDoc = newDocs[docIdx];
              const existingSubs = targetDoc.subDocuments || [];
              newDocs[docIdx] = {
                ...targetDoc,
                subDocuments: [
                  ...existingSubs,
                  {
                    name,
                    url,
                    year: year || "",
                    _key: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`
                  }
                ]
              };
              return { ...m, documents: newDocs };
            })
          };
        })
      };
    });
    updateActiveCriteriaList(updated);
  };

  // =========================================================================
  // DOCUMENT 10 ROW ADDERS & UPDATERS (Add new year rows dynamically)
  // =========================================================================
  const addCommitteeYearRow = () => {
    if (!data) return;
    const newYear = prompt("Enter Academic Year (e.g. 2027–2028):");
    if (!newYear) return;
    const newRow: IqacYearCommitteeDoc = {
      year: newYear,
      label: `IQAC Committee Composition ${newYear}`,
      pdfUrl: "/documents/DefaultFile_1.pdf"
    };
    setData({
      ...data,
      iqacCommitteeYears: [newRow, ...(data.iqacCommitteeYears || [])]
    });
  };

  const addMeetingRow = () => {
    if (!data) return;
    const newYear = prompt("Enter Academic Year (e.g. 2027–2028):");
    if (!newYear) return;
    const newRow: IqacYearMeetingRow = {
      year: newYear,
      m1Minutes: "/documents/DefaultFile_1.pdf",
      m1Atr: "/documents/DefaultFile_1.pdf",
      m2Minutes: "/documents/DefaultFile_1.pdf",
      m2Atr: "/documents/DefaultFile_1.pdf",
      m3Minutes: "/documents/DefaultFile_1.pdf",
      m3Atr: "/documents/DefaultFile_1.pdf",
      m4Minutes: "/documents/DefaultFile_1.pdf",
      m4Atr: "/documents/DefaultFile_1.pdf"
    };
    setData({
      ...data,
      iqacMeetingsTable: [newRow, ...(data.iqacMeetingsTable || [])]
    });
  };

  const addActionPlanRow = () => {
    if (!data) return;
    const newYear = prompt("Enter Academic Year (e.g. 2027–2028):");
    if (!newYear) return;
    const newRow: IqacActionPlanRow = {
      year: newYear,
      planUrl: "/documents/DefaultFile_1.pdf"
    };
    setData({
      ...data,
      iqacActionPlans: [newRow, ...(data.iqacActionPlans || [])]
    });
  };

  const addAnnualReportRow = () => {
    if (!data) return;
    const newYear = prompt("Enter Academic Year (e.g. 2026–2027):");
    if (!newYear) return;
    const newRow: IqacAnnualReportRow = {
      year: newYear,
      reportUrl: "/documents/DefaultFile_1.pdf"
    };
    setData({
      ...data,
      iqacAnnualReportsTable: [newRow, ...(data.iqacAnnualReportsTable || [])]
    });
  };

  const addAaaAuditRow = () => {
    if (!data) return;
    const newYear = prompt("Enter Academic Year (e.g. 2026–2027):");
    if (!newYear) return;
    const newRow: AaaAuditRow = {
      year: newYear,
      reportUrl: "/documents/DefaultFile_1.pdf",
      atrUrl: "/documents/DefaultFile_1.pdf"
    };
    setData({
      ...data,
      aaaAuditsTable: [newRow, ...(data.aaaAuditsTable || [])]
    });
  };

  const addGreenAuditRow = () => {
    if (!data) return;
    const newYear = prompt("Enter Academic Year (e.g. 2027–2028):");
    if (!newYear) return;
    const newRow: GreenAuditRow = {
      year: newYear,
      reportUrl: "/documents/DefaultFile_1.pdf",
      atrUrl: "/documents/DefaultFile_1.pdf"
    };
    setData({
      ...data,
      greenAuditsTable: [newRow, ...(data.greenAuditsTable || [])]
    });
  };

  const addQualityInitiativeRow = () => {
    if (!data) return;
    const newYear = prompt("Enter Academic Year (e.g. 2026–2027):");
    if (!newYear) return;
    const title = prompt("Enter Quality Initiative Focus / Theme:") || "New Quality Initiative";
    const newRow: QualityInitiativeRow = {
      year: newYear,
      title,
      docUrl: "/documents/DefaultFile_1.pdf"
    };
    setData({
      ...data,
      qualityInitiativesTable: [newRow, ...(data.qualityInitiativesTable || [])]
    });
  };

  const addQualityEnhancementRow = () => {
    if (!data) return;
    const newYear = prompt("Enter Academic Year (e.g. 2026–2027):");
    if (!newYear) return;
    const title = prompt("Enter Enhancement Focus:") || "Quality Enhancement Measure";
    const newRow: QualityEnhancementMeasureRow = {
      year: newYear,
      title,
      docUrl: "/documents/DefaultFile_1.pdf"
    };
    setData({
      ...data,
      qualityEnhancementTable: [newRow, ...(data.qualityEnhancementTable || [])]
    });
  };

  const addCqiRow = () => {
    if (!data) return;
    const newYear = prompt("Enter Academic Year (e.g. 2026–2027):");
    if (!newYear) return;
    const title = prompt("Enter CQI Outcomes Title:") || "CQI Systematic Outcomes & Review Register";
    const newRow: CqiActivityRow = {
      year: newYear,
      title,
      docUrl: "/documents/DefaultFile_1.pdf"
    };
    setData({
      ...data,
      cqiActivitiesTable: [newRow, ...(data.cqiActivitiesTable || [])]
    });
  };

  const addBestPracticeRow = () => {
    if (!data) return;
    const newYear = prompt("Enter Academic Year (e.g. 2026–2027):");
    if (!newYear) return;
    const newRow: BestPracticeRow = {
      year: newYear,
      practice1Title: "Best Practice – I",
      practice1Url: "/documents/DefaultFile_1.pdf",
      practice2Title: "Best Practice – II",
      practice2Url: "/documents/DefaultFile_1.pdf"
    };
    setData({
      ...data,
      bestPracticesTable: [newRow, ...(data.bestPracticesTable || [])]
    });
  };

  const addDistinctivenessRow = () => {
    if (!data) return;
    const newYear = prompt("Enter Academic Year (e.g. 2026–2027):");
    if (!newYear) return;
    const title = prompt("Enter Distinctiveness Thrust Area:") || "Institutional Distinctiveness";
    const newRow: InstitutionalDistinctivenessRow = {
      year: newYear,
      title,
      docUrl: "/documents/DefaultFile_1.pdf"
    };
    setData({
      ...data,
      institutionalDistinctivenessTable: [newRow, ...(data.institutionalDistinctivenessTable || [])]
    });
  };

  const addAqarMasterReportRow = () => {
    if (!data) return;
    const newYear = prompt("Enter Academic Year (e.g. 2026–2027):");
    if (!newYear) return;
    const newRow: AqarMasterReportRow = {
      year: newYear,
      aqarUrl: "/documents/DefaultFile_1.pdf",
      supportingDocsAvailable: false
    };
    setData({
      ...data,
      aqarMasterReports: [newRow, ...(data.aqarMasterReports || [])]
    });
  };

  // Updaters for existing rows
  const updateCommitteeYearDoc = (idx: number, field: "label" | "pdfUrl", val: string) => {
    if (!data?.iqacCommitteeYears) return;
    const updated = [...data.iqacCommitteeYears];
    updated[idx] = { ...updated[idx], [field]: val };
    setData({ ...data, iqacCommitteeYears: updated });
  };

  const updateMeetingField = (idx: number, field: keyof IqacYearMeetingRow, val: string) => {
    if (!data?.iqacMeetingsTable) return;
    const updated = [...data.iqacMeetingsTable];
    updated[idx] = { ...updated[idx], [field]: val };
    setData({ ...data, iqacMeetingsTable: updated });
  };

  const updateActionPlanDoc = (idx: number, val: string) => {
    if (!data?.iqacActionPlans) return;
    const updated = [...data.iqacActionPlans];
    updated[idx] = { ...updated[idx], planUrl: val };
    setData({ ...data, iqacActionPlans: updated });
  };

  const updateAnnualReportDoc = (idx: number, val: string) => {
    if (!data?.iqacAnnualReportsTable) return;
    const updated = [...data.iqacAnnualReportsTable];
    updated[idx] = { ...updated[idx], reportUrl: val };
    setData({ ...data, iqacAnnualReportsTable: updated });
  };

  const updateAaaAuditField = (idx: number, field: "reportUrl" | "atrUrl", val: string) => {
    if (!data?.aaaAuditsTable) return;
    const updated = [...data.aaaAuditsTable];
    updated[idx] = { ...updated[idx], [field]: val };
    setData({ ...data, aaaAuditsTable: updated });
  };

  const updateGreenAuditField = (idx: number, field: "reportUrl" | "atrUrl", val: string) => {
    if (!data?.greenAuditsTable) return;
    const updated = [...data.greenAuditsTable];
    updated[idx] = { ...updated[idx], [field]: val };
    setData({ ...data, greenAuditsTable: updated });
  };

  const updateQualityInitiative = (idx: number, field: "title" | "docUrl", val: string) => {
    if (!data?.qualityInitiativesTable) return;
    const updated = [...data.qualityInitiativesTable];
    updated[idx] = { ...updated[idx], [field]: val };
    setData({ ...data, qualityInitiativesTable: updated });
  };

  const updateQualityEnhancement = (idx: number, field: "title" | "docUrl", val: string) => {
    if (!data?.qualityEnhancementTable) return;
    const updated = [...data.qualityEnhancementTable];
    updated[idx] = { ...updated[idx], [field]: val };
    setData({ ...data, qualityEnhancementTable: updated });
  };

  const updateCqiActivity = (idx: number, field: "title" | "docUrl", val: string) => {
    if (!data?.cqiActivitiesTable) return;
    const updated = [...data.cqiActivitiesTable];
    updated[idx] = { ...updated[idx], [field]: val };
    setData({ ...data, cqiActivitiesTable: updated });
  };

  const updateBestPractice = (idx: number, field: keyof BestPracticeRow, val: string) => {
    if (!data?.bestPracticesTable) return;
    const updated = [...data.bestPracticesTable];
    updated[idx] = { ...updated[idx], [field]: val };
    setData({ ...data, bestPracticesTable: updated });
  };

  const updateDistinctiveness = (idx: number, field: "title" | "docUrl", val: string) => {
    if (!data?.institutionalDistinctivenessTable) return;
    const updated = [...data.institutionalDistinctivenessTable];
    updated[idx] = { ...updated[idx], [field]: val };
    setData({ ...data, institutionalDistinctivenessTable: updated });
  };

  const updateGalleryItem = (idx: number, field: "title" | "galleryUrl", val: string) => {
    if (!data?.iqacGalleryTable) return;
    const updated = [...data.iqacGalleryTable];
    updated[idx] = { ...updated[idx], [field]: val };
    setData({ ...data, iqacGalleryTable: updated });
  };

  const updateNaacMasterDoc = (idx: number, val: string) => {
    if (!data?.naacMasterDocs) return;
    const updated = [...data.naacMasterDocs];
    updated[idx] = { ...updated[idx], docUrl: val };
    setData({ ...data, naacMasterDocs: updated });
  };

  const updateExtendedProfileDoc = (idx: number, field: "title" | "docUrl", val: string) => {
    if (!data?.extendedProfileDocs) return;
    const updated = [...data.extendedProfileDocs];
    updated[idx] = { ...updated[idx], [field]: val };
    setData({ ...data, extendedProfileDocs: updated });
  };

  const updateAqarMasterReport = (idx: number, val: string) => {
    if (!data?.aqarMasterReports) return;
    const updated = [...data.aqarMasterReports];
    updated[idx] = { ...updated[idx], aqarUrl: val };
    setData({ ...data, aqarMasterReports: updated });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-16 gap-3 font-sans">
        <Loader2 className="h-8 w-8 text-[#002147] animate-spin" />
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Loading Quality Assurance Manager...
        </p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-8 bg-rose-50 border border-rose-200 rounded-3xl text-rose-800 font-sans flex flex-col gap-4 max-w-2xl mx-auto my-8">
        <div className="flex items-center gap-3">
          <AlertCircle className="h-6 w-6 text-rose-600 shrink-0" />
          <h3 className="font-outfit font-black text-lg">Unable to load Quality Assurance Portal</h3>
        </div>
        <p className="text-xs text-rose-700 leading-relaxed font-medium">
          {error || "An unexpected error occurred while communicating with the server."}
        </p>
        <button
          onClick={fetchData}
          className="self-start px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 font-sans pb-16">
      {/* Top Banner Toolbar */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-700">
            ADMIN &amp; CUSTOMIZER PORTAL
          </span>
          <h2 className="font-outfit text-2xl md:text-3xl font-black text-[#002147] tracking-tight mt-1">
            Quality Assurance &amp; Accreditation Manager
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Full governance for IQAC initiatives, 9-year committee records, meetings, audits, and dynamic creation &amp; cloning of NAAC Cycles and AQAR years.
          </p>
        </div>

        <div className="flex items-center gap-3 self-end md:self-auto shrink-0">
          <button
            onClick={fetchData}
            disabled={loading}
            className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
            title="Reload from server"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs md:text-sm transition-all shadow-md hover:shadow-lg disabled:opacity-50 active:scale-95"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {saving ? "Saving Changes..." : "Save to Database"}
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-800 text-xs font-bold flex items-center gap-2 animate-fade-in shadow-xs">
          <Check className="h-4 w-4 text-emerald-600 shrink-0" />
          All Quality Assurance changes and document updates saved successfully!
        </div>
      )}

      {/* Main Category Tabs Navigation */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200/80 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab("iqac")}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs md:text-sm font-bold transition-all shrink-0 ${
            activeTab === "iqac"
              ? "bg-[#002147] text-white shadow-sm"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
          }`}
        >
          <Users className="h-4 w-4" /> IQAC &amp; ITS INITIATIVES (6 Modules)
        </button>

        <button
          onClick={() => setActiveTab("naac")}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs md:text-sm font-bold transition-all shrink-0 ${
            activeTab === "naac"
              ? "bg-[#002147] text-white shadow-sm"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
          }`}
        >
          <ShieldCheck className="h-4 w-4" /> NAAC ACCREDITATION ({data.naacCycles?.length || 0} Cycles &bull; Dynamic Structure)
        </button>

        <button
          onClick={() => setActiveTab("aqar")}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs md:text-sm font-bold transition-all shrink-0 ${
            activeTab === "aqar"
              ? "bg-[#002147] text-white shadow-sm"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
          }`}
        >
          <FileText className="h-4 w-4" /> AQAR – ANNUAL REPORTS ({data.aqarReports?.length || 0} Years &bull; Dynamic Structure)
        </button>
      </div>

      {/* =========================================================================
          CATEGORY 1: IQAC & ITS INITIATIVES
      ========================================================================= */}
      {activeTab === "iqac" && (
        <div className="flex flex-col gap-6 animate-fade-in">
          {/* Sub-Tabs Pills */}
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar border-b border-slate-200">
            <button
              onClick={() => setIqacSubTab("about")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                iqacSubTab === "about"
                  ? "bg-[#002147] text-white shadow-xs"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              1. About IQAC &amp; Committee
            </button>
            <button
              onClick={() => setIqacSubTab("meetings")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                iqacSubTab === "meetings"
                  ? "bg-[#002147] text-white shadow-xs"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              2. Meetings &amp; Quality Planning
            </button>
            <button
              onClick={() => setIqacSubTab("audits")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                iqacSubTab === "audits"
                  ? "bg-[#002147] text-white shadow-xs"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              3. Audits &amp; Enhancement
            </button>
            <button
              onClick={() => setIqacSubTab("best-practices")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                iqacSubTab === "best-practices"
                  ? "bg-[#002147] text-white shadow-xs"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              4. Best Practices &amp; 5. Distinctiveness
            </button>
            <button
              onClick={() => setIqacSubTab("gallery")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                iqacSubTab === "gallery"
                  ? "bg-[#002147] text-white shadow-xs"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              6. IQAC Gallery
            </button>
          </div>

          {/* Sub-Tab 1: About IQAC & Committee */}
          {iqacSubTab === "about" && (
            <div className="flex flex-col gap-8">
              {/* Table: IQAC Committee Composition by Academic Year */}
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6 flex-wrap gap-3">
                  <div>
                    <h3 className="font-outfit text-xl font-black text-slate-900">
                      IQAC Committee Composition by Academic Year
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Upload official committee composition PDFs or update document links for each academic year.
                    </p>
                  </div>
                  <button
                    onClick={addCommitteeYearRow}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#002147] hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition-all shadow-4xs"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add Academic Year Row
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs md:text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold uppercase tracking-wider">
                        <th className="py-3 px-3">S.No</th>
                        <th className="py-3 px-3">Academic Year</th>
                        <th className="py-3 px-3">Document Title / Label</th>
                        <th className="py-3 px-3">PDF Document (Upload / URL)</th>
                        <th className="py-3 px-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {data.iqacCommitteeYears?.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-3 px-3 font-bold text-slate-400">{idx + 1}</td>
                          <td className="py-3 px-3 font-black text-[#002147] whitespace-nowrap">{row.year}</td>
                          <td className="py-3 px-3">
                            <input
                              type="text"
                              value={row.label || ""}
                              onChange={(e) => updateCommitteeYearDoc(idx, "label", e.target.value)}
                              className="w-full text-xs px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg"
                            />
                          </td>
                          <td className="py-3 px-3">
                            <PdfUploadCell
                              url={row.pdfUrl}
                              title={`IQAC Committee Composition ${row.year}`}
                              onUpdate={(val) => updateCommitteeYearDoc(idx, "pdfUrl", val)}
                              onPreview={handlePreview}
                              handleFileUpload={handleFileUpload}
                              uploading={uploading}
                            />
                          </td>
                          <td className="py-3 px-3 text-right">
                            <button
                              onClick={() => {
                                if (confirm(`Remove Committee Composition for ${row.year}?`)) {
                                  const updated = data.iqacCommitteeYears?.filter((_, i) => i !== idx);
                                  setData({ ...data, iqacCommitteeYears: updated });
                                }
                              }}
                              className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg"
                              title="Delete row"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Steering Committee Table */}
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-6">
                  <div>
                    <h3 className="font-outfit text-xl font-black text-slate-900">
                      IQAC Steering Committee Members
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Core executive body responsible for quality assurance monitoring and institutional benchmarks.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setModalType("add-sc-member");
                      setModalPayload({});
                      setEditItemModalOpen(true);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs transition-all self-start sm:self-auto"
                  >
                    <Plus className="h-4 w-4" /> Add Member
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs md:text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold uppercase tracking-wider">
                        <th className="py-3 px-3">Criterion / Representation</th>
                        <th className="py-3 px-3">Name of the Member</th>
                        <th className="py-3 px-3">Role</th>
                        <th className="py-3 px-3">Designation</th>
                        <th className="py-3 px-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {data.steeringCommittee?.map((m, idx) => (
                        <tr key={m.id || idx} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-3 px-3 font-semibold text-indigo-700">{m.criterion}</td>
                          <td className="py-3 px-3 font-bold">{m.name}</td>
                          <td className="py-3 px-3 font-semibold text-slate-800">{m.role}</td>
                          <td className="py-3 px-3 text-slate-500">{m.designation}</td>
                          <td className="py-3 px-3 text-right">
                            <button
                              onClick={() => {
                                if (confirm(`Remove member '${m.name}'?`)) {
                                  const updated = data.steeringCommittee.filter((_, i) => i !== idx);
                                  setData({ ...data, steeringCommittee: updated });
                                }
                              }}
                              className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Criterion-Wise Convenors & Members */}
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm">
                <h3 className="font-outfit text-xl font-black text-slate-900 border-b border-slate-100 pb-4 mb-6">
                  Criterion-wise Convenors &amp; Working Teams
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {data.criterionConvenors?.map((team) => (
                    <div key={team.criterionId} className="p-5 border border-slate-200/70 rounded-2xl bg-slate-50/50 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between border-b border-slate-200/50 pb-2 mb-3">
                          <h4 className="font-outfit font-black text-sm text-[#002147]">
                            {team.criterionTitle}
                          </h4>
                          <span className="text-[10px] uppercase font-bold text-slate-400">
                            {team.members?.length || 0} Members
                          </span>
                        </div>

                        <div className="flex flex-col gap-2">
                          {team.members?.map((m, mIdx) => (
                            <div key={mIdx} className="flex items-center justify-between text-xs py-1.5 px-2.5 bg-white rounded-xl border border-slate-100">
                              <div>
                                <span className="font-bold text-slate-800">{m.name}</span>
                                <span className="text-slate-400 text-[10px] ml-2">({m.designation})</span>
                              </div>
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                m.role === "Convenor" ? "bg-indigo-100 text-indigo-700" : "bg-slate-100 text-slate-600"
                              }`}>
                                {m.role}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Sub-Tab 2: Meetings & Quality Planning */}
          {iqacSubTab === "meetings" && (
            <div className="flex flex-col gap-8">
              {/* 1. IQAC Meetings & ATRs Table (4 meetings per year) */}
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6 flex-wrap gap-3">
                  <div>
                    <h3 className="font-outfit text-xl font-black text-slate-900">
                      IQAC Meetings &amp; Action Taken Reports (ATRs)
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Manage 4 quarterly meetings per academic year. Upload Minutes &amp; ATR PDFs or update URLs.
                    </p>
                  </div>
                  <button
                    onClick={addMeetingRow}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#002147] hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition-all shadow-4xs"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add Academic Year Row
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold uppercase tracking-wider">
                        <th className="py-3 px-3">Academic Year</th>
                        <th className="py-3 px-3">Meeting 1 (Min / ATR)</th>
                        <th className="py-3 px-3">Meeting 2 (Min / ATR)</th>
                        <th className="py-3 px-3">Meeting 3 (Min / ATR)</th>
                        <th className="py-3 px-3">Meeting 4 (Min / ATR)</th>
                        <th className="py-3 px-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {data.iqacMeetingsTable?.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-3 px-3 font-black text-[#002147] whitespace-nowrap text-sm">{row.year}</td>
                          <td className="py-3 px-3">
                            <MeetingCellPair
                              year={row.year}
                              mNum={1}
                              minUrl={row.m1Minutes}
                              atrUrl={row.m1Atr}
                              onUpdateMin={(val) => updateMeetingField(idx, "m1Minutes", val)}
                              onUpdateAtr={(val) => updateMeetingField(idx, "m1Atr", val)}
                              onPreview={handlePreview}
                              handleFileUpload={handleFileUpload}
                              uploading={uploading}
                            />
                          </td>
                          <td className="py-3 px-3">
                            <MeetingCellPair
                              year={row.year}
                              mNum={2}
                              minUrl={row.m2Minutes}
                              atrUrl={row.m2Atr}
                              onUpdateMin={(val) => updateMeetingField(idx, "m2Minutes", val)}
                              onUpdateAtr={(val) => updateMeetingField(idx, "m2Atr", val)}
                              onPreview={handlePreview}
                              handleFileUpload={handleFileUpload}
                              uploading={uploading}
                            />
                          </td>
                          <td className="py-3 px-3">
                            <MeetingCellPair
                              year={row.year}
                              mNum={3}
                              minUrl={row.m3Minutes}
                              atrUrl={row.m3Atr}
                              onUpdateMin={(val) => updateMeetingField(idx, "m3Minutes", val)}
                              onUpdateAtr={(val) => updateMeetingField(idx, "m3Atr", val)}
                              onPreview={handlePreview}
                              handleFileUpload={handleFileUpload}
                              uploading={uploading}
                            />
                          </td>
                          <td className="py-3 px-3">
                            <MeetingCellPair
                              year={row.year}
                              mNum={4}
                              minUrl={row.m4Minutes}
                              atrUrl={row.m4Atr}
                              onUpdateMin={(val) => updateMeetingField(idx, "m4Minutes", val)}
                              onUpdateAtr={(val) => updateMeetingField(idx, "m4Atr", val)}
                              onPreview={handlePreview}
                              handleFileUpload={handleFileUpload}
                              uploading={uploading}
                            />
                          </td>
                          <td className="py-3 px-3 text-right">
                            <button
                              onClick={() => {
                                if (confirm(`Remove Meetings entry for ${row.year}?`)) {
                                  const updated = data.iqacMeetingsTable?.filter((_, i) => i !== idx);
                                  setData({ ...data, iqacMeetingsTable: updated });
                                }
                              }}
                              className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg"
                              title="Delete row"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 2. Annual Action Plans Table */}
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6 flex-wrap gap-3">
                  <div>
                    <h3 className="font-outfit text-xl font-black text-slate-900">
                      IQAC Annual Action Plans
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Upload strategic action plan documents for each academic year.
                    </p>
                  </div>
                  <button
                    onClick={addActionPlanRow}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#002147] hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition-all shadow-4xs"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add Academic Year Row
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs md:text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold uppercase tracking-wider">
                        <th className="py-3 px-3">Academic Year</th>
                        <th className="py-3 px-3">Action Plan Document</th>
                        <th className="py-3 px-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {data.iqacActionPlans?.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-3 px-3 font-black text-[#002147] whitespace-nowrap">{row.year}</td>
                          <td className="py-3 px-3">
                            <PdfUploadCell
                              url={row.planUrl}
                              title={`Annual Action Plan ${row.year}`}
                              onUpdate={(val) => updateActionPlanDoc(idx, val)}
                              onPreview={handlePreview}
                              handleFileUpload={handleFileUpload}
                              uploading={uploading}
                            />
                          </td>
                          <td className="py-3 px-3 text-right">
                            <button
                              onClick={() => {
                                if (confirm(`Remove Action Plan for ${row.year}?`)) {
                                  const updated = data.iqacActionPlans?.filter((_, i) => i !== idx);
                                  setData({ ...data, iqacActionPlans: updated });
                                }
                              }}
                              className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg"
                              title="Delete row"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 3. IQAC Annual Reports Table */}
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6 flex-wrap gap-3">
                  <div>
                    <h3 className="font-outfit text-xl font-black text-slate-900">
                      IQAC Annual Reports
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Consolidated annual institutional performance evaluations.
                    </p>
                  </div>
                  <button
                    onClick={addAnnualReportRow}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#002147] hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition-all shadow-4xs"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add Academic Year Row
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs md:text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold uppercase tracking-wider">
                        <th className="py-3 px-3">Academic Year</th>
                        <th className="py-3 px-3">IQAC Annual Report Document</th>
                        <th className="py-3 px-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {data.iqacAnnualReportsTable?.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-3 px-3 font-black text-[#002147] whitespace-nowrap">{row.year}</td>
                          <td className="py-3 px-3">
                            <PdfUploadCell
                              url={row.reportUrl}
                              title={`IQAC Annual Report ${row.year}`}
                              onUpdate={(val) => updateAnnualReportDoc(idx, val)}
                              onPreview={handlePreview}
                              handleFileUpload={handleFileUpload}
                              uploading={uploading}
                            />
                          </td>
                          <td className="py-3 px-3 text-right">
                            <button
                              onClick={() => {
                                if (confirm(`Remove Annual Report for ${row.year}?`)) {
                                  const updated = data.iqacAnnualReportsTable?.filter((_, i) => i !== idx);
                                  setData({ ...data, iqacAnnualReportsTable: updated });
                                }
                              }}
                              className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg"
                              title="Delete row"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Sub-Tab 3: Audits & Quality Enhancement */}
          {iqacSubTab === "audits" && (
            <div className="flex flex-col gap-8">
              {/* AAA Audits Table */}
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6 flex-wrap gap-3">
                  <div>
                    <h3 className="font-outfit text-xl font-black text-slate-900">
                      Academic &amp; Administrative Audit (AAA)
                    </h3>
                  </div>
                  <button
                    onClick={addAaaAuditRow}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#002147] hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition-all shadow-4xs"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add Academic Year Row
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs md:text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold uppercase tracking-wider">
                        <th className="py-3 px-3">Academic Year</th>
                        <th className="py-3 px-3">AAA Audit Report</th>
                        <th className="py-3 px-3">Action Taken Report (ATR)</th>
                        <th className="py-3 px-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {data.aaaAuditsTable?.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-3 px-3 font-black text-[#002147] whitespace-nowrap">{row.year}</td>
                          <td className="py-3 px-3">
                            <PdfUploadCell
                              url={row.reportUrl}
                              title={`AAA Audit Report ${row.year}`}
                              onUpdate={(val) => updateAaaAuditField(idx, "reportUrl", val)}
                              onPreview={handlePreview}
                              handleFileUpload={handleFileUpload}
                              uploading={uploading}
                            />
                          </td>
                          <td className="py-3 px-3">
                            <PdfUploadCell
                              url={row.atrUrl}
                              title={`AAA Audit ATR ${row.year}`}
                              onUpdate={(val) => updateAaaAuditField(idx, "atrUrl", val)}
                              onPreview={handlePreview}
                              handleFileUpload={handleFileUpload}
                              uploading={uploading}
                            />
                          </td>
                          <td className="py-3 px-3 text-right">
                            <button
                              onClick={() => {
                                if (confirm(`Remove AAA Audit for ${row.year}?`)) {
                                  const updated = data.aaaAuditsTable?.filter((_, i) => i !== idx);
                                  setData({ ...data, aaaAuditsTable: updated });
                                }
                              }}
                              className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg"
                              title="Delete row"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Green & Energy Audits */}
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6 flex-wrap gap-3">
                  <div>
                    <h3 className="font-outfit text-xl font-black text-slate-900">
                      Green, Energy &amp; Environment Audits
                    </h3>
                  </div>
                  <button
                    onClick={addGreenAuditRow}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#002147] hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition-all shadow-4xs"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add Academic Year Row
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs md:text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold uppercase tracking-wider">
                        <th className="py-3 px-3">Academic Year</th>
                        <th className="py-3 px-3">Audit Report</th>
                        <th className="py-3 px-3">Action Taken Report (ATR)</th>
                        <th className="py-3 px-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {data.greenAuditsTable?.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-3 px-3 font-black text-[#002147] whitespace-nowrap">{row.year}</td>
                          <td className="py-3 px-3">
                            <PdfUploadCell
                              url={row.reportUrl}
                              title={`Green Audit Report ${row.year}`}
                              onUpdate={(val) => updateGreenAuditField(idx, "reportUrl", val)}
                              onPreview={handlePreview}
                              handleFileUpload={handleFileUpload}
                              uploading={uploading}
                            />
                          </td>
                          <td className="py-3 px-3">
                            <PdfUploadCell
                              url={row.atrUrl}
                              title={`Green Audit ATR ${row.year}`}
                              onUpdate={(val) => updateGreenAuditField(idx, "atrUrl", val)}
                              onPreview={handlePreview}
                              handleFileUpload={handleFileUpload}
                              uploading={uploading}
                            />
                          </td>
                          <td className="py-3 px-3 text-right">
                            <button
                              onClick={() => {
                                if (confirm(`Remove Green Audit for ${row.year}?`)) {
                                  const updated = data.greenAuditsTable?.filter((_, i) => i !== idx);
                                  setData({ ...data, greenAuditsTable: updated });
                                }
                              }}
                              className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg"
                              title="Delete row"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Quality Initiatives */}
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6 flex-wrap gap-3">
                  <div>
                    <h3 className="font-outfit text-xl font-black text-slate-900">
                      IQAC Quality Initiatives
                    </h3>
                  </div>
                  <button
                    onClick={addQualityInitiativeRow}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#002147] hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition-all shadow-4xs"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add Initiative Record
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs md:text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold uppercase tracking-wider">
                        <th className="py-3 px-3">Academic Year</th>
                        <th className="py-3 px-3">Initiative Theme / Focus</th>
                        <th className="py-3 px-3">Supporting File</th>
                        <th className="py-3 px-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {data.qualityInitiativesTable?.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-3 px-3 font-black text-[#002147] whitespace-nowrap">{row.year}</td>
                          <td className="py-3 px-3">
                            <input
                              type="text"
                              value={row.title || ""}
                              onChange={(e) => updateQualityInitiative(idx, "title", e.target.value)}
                              className="w-full text-xs px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg"
                            />
                          </td>
                          <td className="py-3 px-3">
                            <PdfUploadCell
                              url={row.docUrl}
                              title={`Quality Initiatives ${row.year}`}
                              onUpdate={(val) => updateQualityInitiative(idx, "docUrl", val)}
                              onPreview={handlePreview}
                              handleFileUpload={handleFileUpload}
                              uploading={uploading}
                            />
                          </td>
                          <td className="py-3 px-3 text-right">
                            <button
                              onClick={() => {
                                if (confirm(`Remove Quality Initiative for ${row.year}?`)) {
                                  const updated = data.qualityInitiativesTable?.filter((_, i) => i !== idx);
                                  setData({ ...data, qualityInitiativesTable: updated });
                                }
                              }}
                              className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg"
                              title="Delete row"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Quality Enhancement Measures */}
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6 flex-wrap gap-3">
                  <div>
                    <h3 className="font-outfit text-xl font-black text-slate-900">
                      Quality Enhancement Measures
                    </h3>
                  </div>
                  <button
                    onClick={addQualityEnhancementRow}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#002147] hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition-all shadow-4xs"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add Measure Record
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs md:text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold uppercase tracking-wider">
                        <th className="py-3 px-3">Academic Year</th>
                        <th className="py-3 px-3">Enhancement Focus</th>
                        <th className="py-3 px-3">Documentation</th>
                        <th className="py-3 px-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {data.qualityEnhancementTable?.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-3 px-3 font-black text-[#002147] whitespace-nowrap">{row.year}</td>
                          <td className="py-3 px-3">
                            <input
                              type="text"
                              value={row.title || ""}
                              onChange={(e) => updateQualityEnhancement(idx, "title", e.target.value)}
                              className="w-full text-xs px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg"
                            />
                          </td>
                          <td className="py-3 px-3">
                            <PdfUploadCell
                              url={row.docUrl}
                              title={`Quality Enhancement ${row.year}`}
                              onUpdate={(val) => updateQualityEnhancement(idx, "docUrl", val)}
                              onPreview={handlePreview}
                              handleFileUpload={handleFileUpload}
                              uploading={uploading}
                            />
                          </td>
                          <td className="py-3 px-3 text-right">
                            <button
                              onClick={() => {
                                if (confirm(`Remove Enhancement Measure for ${row.year}?`)) {
                                  const updated = data.qualityEnhancementTable?.filter((_, i) => i !== idx);
                                  setData({ ...data, qualityEnhancementTable: updated });
                                }
                              }}
                              className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg"
                              title="Delete row"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Continuous Quality Improvement (CQI) */}
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6 flex-wrap gap-3">
                  <div>
                    <h3 className="font-outfit text-xl font-black text-slate-900">
                      Continuous Quality Improvement (CQI) — Review Register
                    </h3>
                  </div>
                  <button
                    onClick={addCqiRow}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#002147] hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition-all shadow-4xs"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add CQI Record
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs md:text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold uppercase tracking-wider">
                        <th className="py-3 px-3">Academic Year</th>
                        <th className="py-3 px-3">Review &amp; Outcomes Register Title</th>
                        <th className="py-3 px-3">Documentation</th>
                        <th className="py-3 px-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {data.cqiActivitiesTable?.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-3 px-3 font-black text-[#002147] whitespace-nowrap">{row.year}</td>
                          <td className="py-3 px-3">
                            <input
                              type="text"
                              value={row.title || ""}
                              onChange={(e) => updateCqiActivity(idx, "title", e.target.value)}
                              className="w-full text-xs px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg"
                            />
                          </td>
                          <td className="py-3 px-3">
                            <PdfUploadCell
                              url={row.docUrl}
                              title={`CQI Register ${row.year}`}
                              onUpdate={(val) => updateCqiActivity(idx, "docUrl", val)}
                              onPreview={handlePreview}
                              handleFileUpload={handleFileUpload}
                              uploading={uploading}
                            />
                          </td>
                          <td className="py-3 px-3 text-right">
                            <button
                              onClick={() => {
                                if (confirm(`Remove CQI Record for ${row.year}?`)) {
                                  const updated = data.cqiActivitiesTable?.filter((_, i) => i !== idx);
                                  setData({ ...data, cqiActivitiesTable: updated });
                                }
                              }}
                              className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg"
                              title="Delete row"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Sub-Tab 4: Best Practices & Distinctiveness */}
          {iqacSubTab === "best-practices" && (
            <div className="flex flex-col gap-8">
              {/* Best Practices I & II Table */}
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6 flex-wrap gap-3">
                  <div>
                    <h3 className="font-outfit text-xl font-black text-slate-900">
                      Institutional Best Practice – I &amp; II
                    </h3>
                  </div>
                  <button
                    onClick={addBestPracticeRow}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#002147] hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition-all shadow-4xs"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add Academic Year Row
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs md:text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold uppercase tracking-wider">
                        <th className="py-3 px-3">Academic Year</th>
                        <th className="py-3 px-3">Best Practice – I</th>
                        <th className="py-3 px-3">Best Practice – II</th>
                        <th className="py-3 px-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {data.bestPracticesTable?.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-3 px-3 font-black text-[#002147] whitespace-nowrap">{row.year}</td>
                          <td className="py-3 px-3">
                            <div className="flex flex-col gap-1.5">
                              <input
                                type="text"
                                value={row.practice1Title || ""}
                                onChange={(e) => updateBestPractice(idx, "practice1Title", e.target.value)}
                                className="w-full text-xs px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg"
                                placeholder="Practice I title..."
                              />
                              <PdfUploadCell
                                url={row.practice1Url}
                                title={`${row.year} – Best Practice I`}
                                onUpdate={(val) => updateBestPractice(idx, "practice1Url", val)}
                                onPreview={handlePreview}
                                handleFileUpload={handleFileUpload}
                                uploading={uploading}
                              />
                            </div>
                          </td>
                          <td className="py-3 px-3">
                            <div className="flex flex-col gap-1.5">
                              <input
                                type="text"
                                value={row.practice2Title || ""}
                                onChange={(e) => updateBestPractice(idx, "practice2Title", e.target.value)}
                                className="w-full text-xs px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg"
                                placeholder="Practice II title..."
                              />
                              <PdfUploadCell
                                url={row.practice2Url}
                                title={`${row.year} – Best Practice II`}
                                onUpdate={(val) => updateBestPractice(idx, "practice2Url", val)}
                                onPreview={handlePreview}
                                handleFileUpload={handleFileUpload}
                                uploading={uploading}
                              />
                            </div>
                          </td>
                          <td className="py-3 px-3 text-right">
                            <button
                              onClick={() => {
                                if (confirm(`Remove Best Practice for ${row.year}?`)) {
                                  const updated = data.bestPracticesTable?.filter((_, i) => i !== idx);
                                  setData({ ...data, bestPracticesTable: updated });
                                }
                              }}
                              className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg"
                              title="Delete row"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Institutional Distinctiveness Table */}
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6 flex-wrap gap-3">
                  <div>
                    <h3 className="font-outfit text-xl font-black text-slate-900">
                      Institutional Distinctiveness Reports
                    </h3>
                  </div>
                  <button
                    onClick={addDistinctivenessRow}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#002147] hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition-all shadow-4xs"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add Academic Year Row
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs md:text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold uppercase tracking-wider">
                        <th className="py-3 px-3">Academic Year</th>
                        <th className="py-3 px-3">Distinctiveness Priority / Thrust Area</th>
                        <th className="py-3 px-3">Documentation</th>
                        <th className="py-3 px-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {data.institutionalDistinctivenessTable?.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-3 px-3 font-black text-[#002147] whitespace-nowrap">{row.year}</td>
                          <td className="py-3 px-3">
                            <input
                              type="text"
                              value={row.title || ""}
                              onChange={(e) => updateDistinctiveness(idx, "title", e.target.value)}
                              className="w-full text-xs px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg"
                            />
                          </td>
                          <td className="py-3 px-3">
                            <PdfUploadCell
                              url={row.docUrl}
                              title={`Distinctiveness ${row.year}`}
                              onUpdate={(val) => updateDistinctiveness(idx, "docUrl", val)}
                              onPreview={handlePreview}
                              handleFileUpload={handleFileUpload}
                              uploading={uploading}
                            />
                          </td>
                          <td className="py-3 px-3 text-right">
                            <button
                              onClick={() => {
                                if (confirm(`Remove Distinctiveness for ${row.year}?`)) {
                                  const updated = data.institutionalDistinctivenessTable?.filter((_, i) => i !== idx);
                                  setData({ ...data, institutionalDistinctivenessTable: updated });
                                }
                              }}
                              className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg"
                              title="Delete row"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Sub-Tab 5: IQAC Gallery */}
          {iqacSubTab === "gallery" && (
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm">
              <div className="border-b border-slate-100 pb-4 mb-6 flex items-center justify-between flex-wrap gap-3">
                <h3 className="font-outfit text-xl font-black text-slate-900">
                  Year-wise Quality Events &amp; Gallery Albums
                </h3>
                <button
                  onClick={() => {
                    const year = prompt("Enter Academic Year (e.g. 2026–2027):");
                    if (!year) return;
                    const title = prompt("Enter Event Portfolio Title:") || "Quality Events Gallery";
                    const newRow: IqacGalleryRow = {
                      year,
                      title,
                      galleryUrl: "/naac-peer-team"
                    };
                    setData({
                      ...data,
                      iqacGalleryTable: [newRow, ...(data?.iqacGalleryTable || [])]
                    });
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#002147] hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition-all shadow-4xs"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Gallery Row
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs md:text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold uppercase tracking-wider">
                      <th className="py-3 px-3">Academic Year</th>
                      <th className="py-3 px-3">Event Portfolio Title</th>
                      <th className="py-3 px-3">Gallery Link / Route</th>
                      <th className="py-3 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {data.iqacGalleryTable?.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-3 px-3 font-black text-[#002147] whitespace-nowrap">{row.year}</td>
                        <td className="py-3 px-3">
                          <input
                            type="text"
                            value={row.title || ""}
                            onChange={(e) => updateGalleryItem(idx, "title", e.target.value)}
                            className="w-full text-xs px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg"
                          />
                        </td>
                        <td className="py-3 px-3">
                          <input
                            type="text"
                            value={row.galleryUrl || ""}
                            onChange={(e) => updateGalleryItem(idx, "galleryUrl", e.target.value)}
                            className="w-full text-xs px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg"
                            placeholder="/naac-peer-team"
                          />
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={() => {
                              if (confirm(`Remove Gallery entry for ${row.year}?`)) {
                                const updated = data.iqacGalleryTable?.filter((_, i) => i !== idx);
                                setData({ ...data, iqacGalleryTable: updated });
                              }
                            }}
                            className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg"
                            title="Delete row"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          CATEGORY 2: NAAC ACCREDITATION – CYCLE MANAGEMENT & CRITERIA
      ========================================================================= */}
      {activeTab === "naac" && (
        <div className="flex flex-col gap-6 animate-fade-in">
          {/* Top Cycle Selector & Management Toolbar */}
          <div className="bg-white border border-slate-200/80 p-5 md:p-6 rounded-3xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-wrap">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-700 shadow-sm shrink-0">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Active NAAC Accreditation Cycle
                </label>
                <div className="relative mt-1">
                  <select
                    value={selectedNaacCycle}
                    onChange={(e) => setSelectedNaacCycle(e.target.value)}
                    className="appearance-none bg-slate-50 border border-slate-200 rounded-xl py-2 px-4 pr-10 text-sm font-black text-slate-800 cursor-pointer focus:outline-none focus:border-[#002147]"
                  >
                    {data.naacCycles?.map((c) => (
                      <option key={c.cycleId} value={c.cycleId}>
                        {c.cycleName} ({c.grade || c.status})
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {currentNaacCycle && (
                <div className="hidden lg:flex items-center gap-2 pl-4 border-l border-slate-200 text-xs">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                    {currentNaacCycle.grade || currentNaacCycle.status}
                  </span>
                  <span className="text-slate-400 font-medium">
                    {currentNaacCycle.validity || "Validity: Active"}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setEditCycleModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all border border-slate-200"
              >
                <Edit2 className="h-3.5 w-3.5" /> Edit Cycle Info
              </button>
              <button
                onClick={() => setAddCycleModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#002147] hover:bg-blue-900 text-white font-bold text-xs transition-all shadow-4xs"
              >
                <Plus className="h-3.5 w-3.5" /> Add New NAAC Cycle
              </button>
              {data.naacCycles.length > 1 && (
                <button
                  onClick={() => handleDeleteNaacCycle(selectedNaacCycle)}
                  className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl border border-rose-200 transition-colors"
                  title="Delete this cycle"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Sub-Tabs Pills */}
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar border-b border-slate-200">
            <button
              onClick={() => setNaacSubTab("master-docs")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                naacSubTab === "master-docs"
                  ? "bg-[#002147] text-white shadow-xs"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              📄 Master Documents &amp; Extended Profile
            </button>
            <button
              onClick={() => setNaacSubTab("criteria")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                naacSubTab === "criteria"
                  ? "bg-[#002147] text-white shadow-xs"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              🔍 Criteria, Sections &amp; Metrics Explorer ({currentNaacCycle?.criteria?.length || 0} Criteria)
            </button>
          </div>

          {/* Sub-Tab 1: Master Documents & Extended Profile */}
          {naacSubTab === "master-docs" && (
            <div className="flex flex-col gap-8">
              {/* 1. Master Documents Table (Items 1 to 9) */}
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm">
                <div className="border-b border-slate-100 pb-4 mb-6">
                  <h3 className="font-outfit text-xl font-black text-slate-900">
                    Cycle Master Documents (Items 1 to 9)
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Directly upload or edit links for official SSR, IIQA, DVV Report, Peer Team Report, and Accreditation Certificate.
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs md:text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold uppercase tracking-wider">
                        <th className="py-3 px-3">Item #</th>
                        <th className="py-3 px-3">Document Title</th>
                        <th className="py-3 px-3">Document File / Action Link</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {data.naacMasterDocs?.map((row, idx) => (
                        <tr key={row.sNo} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-3 px-3 font-bold text-slate-400">{row.sNo}</td>
                          <td className="py-3 px-3 font-bold text-slate-800">{row.title}</td>
                          <td className="py-3 px-3">
                            {row.sNo === 4 || row.sNo === 5 || row.sNo === 6 || row.sNo === 9 ? (
                              <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200">
                                {row.actionText || "Interactive Sub-Module"}
                              </span>
                            ) : (
                              <PdfUploadCell
                                url={row.docUrl}
                                title={row.title}
                                onUpdate={(val) => updateNaacMasterDoc(idx, val)}
                                onPreview={handlePreview}
                                handleFileUpload={handleFileUpload}
                                uploading={uploading}
                              />
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 2. Extended Profile Table (1.1.1 to 3.1.1) */}
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm">
                <div className="border-b border-slate-100 pb-4 mb-6">
                  <h3 className="font-outfit text-xl font-black text-slate-900">
                    Cycle Extended Profile Detailed Records
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Admission approval documents, student lists, full-time teacher rosters, and expenditure statements.
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs md:text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold uppercase tracking-wider">
                        <th className="py-3 px-3">Metric #</th>
                        <th className="py-3 px-3">Document Description</th>
                        <th className="py-3 px-3">Supporting File</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {data.extendedProfileDocs?.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-3 px-3 font-black text-indigo-700">{row.sNo}</td>
                          <td className="py-3 px-3">
                            <input
                              type="text"
                              value={row.title || ""}
                              onChange={(e) => updateExtendedProfileDoc(idx, "title", e.target.value)}
                              className="w-full text-xs px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg"
                            />
                          </td>
                          <td className="py-3 px-3">
                            <PdfUploadCell
                              url={row.docUrl}
                              title={`${row.sNo} - ${row.title}`}
                              onUpdate={(val) => updateExtendedProfileDoc(idx, "docUrl", val)}
                              onPreview={handlePreview}
                              handleFileUpload={handleFileUpload}
                              uploading={uploading}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Sub-Tab 2: Criteria & Metrics Explorer */}
          {naacSubTab === "criteria" && (
            <div className="flex flex-col gap-6">
              {/* Criterion Selection & Structural Controls */}
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
                  {currentNaacCycle?.criteria?.map((crit) => (
                    <button
                      key={crit.id}
                      onClick={() => setSelectedCriterionId(crit.id)}
                      className={`px-4 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all flex items-center gap-2 shrink-0 ${
                        selectedCriterionId === crit.id
                          ? "bg-[#002147] text-white shadow-sm"
                          : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                      }`}
                    >
                      <span className={`h-2 w-2 rounded-full ${selectedCriterionId === crit.id ? "bg-emerald-400" : "bg-slate-300"}`} />
                      <span className="truncate max-w-[200px]">{crit.title}</span>
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => {
                    setModalType("add-criterion");
                    setModalPayload({});
                    setEditItemModalOpen(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-bold transition-all shrink-0 border border-indigo-200"
                >
                  <Plus className="h-3.5 w-3.5" /> Add New Criterion
                </button>
              </div>

              {/* Sections & Metrics Editor Container */}
              {(() => {
                const crit = currentNaacCycle?.criteria?.find((c) => c.id === selectedCriterionId);
                if (!crit) return null;

                return (
                  <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col gap-6">
                    <div className="border-b border-slate-100 pb-4 flex items-center justify-between flex-wrap gap-3">
                      <div className="flex items-center gap-3">
                        <h3 className="font-outfit text-lg md:text-xl font-black text-slate-900">
                          {crit.title}
                        </h3>
                        <button
                          onClick={() => handleEditCriterionTitle(crit.id)}
                          className="p-1 text-slate-400 hover:text-slate-700 rounded"
                          title="Rename Criterion"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteCriterion(crit.id)}
                          className="p-1 text-rose-400 hover:text-rose-600 rounded"
                          title="Delete Criterion"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setModalType("add-section");
                            setModalPayload({ critId: crit.id });
                            setEditItemModalOpen(true);
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#002147] text-white text-xs font-bold hover:bg-blue-900"
                        >
                          <Plus className="h-3.5 w-3.5" /> Add Section
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4">
                      {crit.sections?.map((sec, secIdx) => {
                        const sectionKey = `naac_sec_${crit.id}_${sec.number}_${secIdx}`;
                        const isOpen = expandedSections.has(sectionKey) || expandedSections.has(sec.number);
                        return (
                          <div key={sectionKey} className="border border-slate-200/80 rounded-2xl overflow-hidden bg-slate-50/40">
                            <div className="p-4 bg-slate-50 hover:bg-slate-100/80 transition-colors flex items-center justify-between border-b border-slate-200/60">
                              <div
                                onClick={() => toggleSection(sectionKey, sec.number)}
                                className="flex items-center gap-3 cursor-pointer flex-1"
                              >
                                <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-black">
                                  {sec.number}
                                </span>
                                <h4 className="font-outfit text-sm font-bold text-slate-800">
                                  {sec.title}
                                </h4>
                              </div>

                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleEditSection(crit.id, sec.number, sec.title)}
                                  className="p-1 text-slate-400 hover:text-slate-700"
                                  title="Rename Section"
                                >
                                  <Edit2 className="h-3 w-3" />
                                </button>
                                <button
                                  onClick={() => handleDeleteSection(crit.id, sec.number)}
                                  className="p-1 text-rose-400 hover:text-rose-600"
                                  title="Delete Section"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </button>
                                <button
                                  onClick={() => {
                                    setModalType("add-metric");
                                    setModalPayload({ critId: crit.id, secNum: sec.number });
                                    setEditItemModalOpen(true);
                                  }}
                                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold hover:bg-indigo-100"
                                >
                                  <Plus className="h-3 w-3" /> Add Metric
                                </button>
                                <ChevronDown
                                  onClick={() => toggleSection(sectionKey, sec.number)}
                                  className={`h-4 w-4 text-slate-400 cursor-pointer transition-transform ${isOpen ? "rotate-180" : ""}`}
                                />
                              </div>
                            </div>

                            {isOpen && (
                              <div className="p-4 md:p-6 flex flex-col gap-6 bg-white">
                                {sec.metrics?.map((metric) => (
                                  <div key={metric.number} className="p-4 rounded-xl border border-slate-200 bg-slate-50/30 flex flex-col gap-3">
                                    <div className="flex items-center justify-between flex-wrap gap-2">
                                      <div className="flex items-center gap-2">
                                        <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 font-mono text-xs font-bold">
                                          {metric.number}
                                        </span>
                                        <h5 className="font-outfit font-bold text-sm text-slate-800">
                                          {metric.title}
                                        </h5>
                                        <button
                                          onClick={() => handleEditMetric(crit.id, sec.number, metric.number, metric.title)}
                                          className="p-1 text-slate-400 hover:text-slate-700"
                                          title="Rename Metric"
                                        >
                                          <Edit2 className="h-3 w-3" />
                                        </button>
                                        <button
                                          onClick={() => handleDeleteMetric(crit.id, sec.number, metric.number)}
                                          className="p-1 text-rose-400 hover:text-rose-600"
                                          title="Delete Metric"
                                        >
                                          <Trash2 className="h-3 w-3" />
                                        </button>
                                      </div>

                                      <button
                                        onClick={() => {
                                          setModalType("add-doc");
                                          setModalPayload({ critId: crit.id, secNum: sec.number, metricNum: metric.number });
                                          setEditItemModalOpen(true);
                                        }}
                                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold"
                                      >
                                        <Plus className="h-3 w-3" /> Add Doc
                                      </button>
                                    </div>

                                    {/* Documents */}
                                    <div className="flex flex-col gap-2 pt-1">
                                      {metric.documents?.map((doc, docIdx) => (
                                        <div key={docIdx} className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between gap-3 text-xs">
                                          <div className="flex items-center gap-2 min-w-0">
                                            {doc.subDocuments?.length ? (
                                              <FolderOpen className="h-4 w-4 text-amber-500 shrink-0" />
                                            ) : (
                                              <FileText className="h-4 w-4 text-slate-400 shrink-0" />
                                            )}
                                            <span className="font-bold text-slate-800 truncate">{doc.label}</span>
                                            {doc.subDocuments?.length ? (
                                              <span className="text-[10px] bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded font-bold border border-amber-200">
                                                {doc.subDocuments.length} files
                                              </span>
                                            ) : null}
                                          </div>

                                          <div className="flex items-center gap-2 shrink-0">
                                            {doc.documentUrl && (
                                              <button
                                                onClick={() => handlePreview(doc.documentUrl, doc.label)}
                                                className="p-1 text-slate-500 hover:text-slate-800"
                                                title="Preview"
                                              >
                                                <Eye className="h-3.5 w-3.5" />
                                              </button>
                                            )}
                                            <button
                                              onClick={() => {
                                                setModalType("add-subdoc");
                                                setModalPayload({ critId: crit.id, secNum: sec.number, metricNum: metric.number, docIdx });
                                                setEditItemModalOpen(true);
                                              }}
                                              className="p-1 text-amber-600 hover:text-amber-800"
                                              title="Add sub-document"
                                            >
                                              <FolderPlus className="h-3.5 w-3.5" />
                                            </button>
                                            <button
                                              onClick={() => handleDeleteDocumentFromMetric(crit.id, sec.number, metric.number, docIdx)}
                                              className="p-1 text-rose-500 hover:text-rose-700"
                                              title="Delete"
                                            >
                                              <Trash2 className="h-3.5 w-3.5" />
                                            </button>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          CATEGORY 3: AQAR – ANNUAL REPORTS MANAGEMENT & CRITERIA
      ========================================================================= */}
      {activeTab === "aqar" && (
        <div className="flex flex-col gap-6 animate-fade-in">
          {/* Top Selection & Year Management Toolbar */}
          <div className="bg-white border border-slate-200/80 p-5 md:p-6 rounded-3xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-wrap">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-700 shadow-sm shrink-0">
                <Calendar className="h-5 w-5" />
              </span>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Active AQAR Academic Year
                </label>
                <div className="relative mt-1">
                  <select
                    value={selectedAqarYear}
                    onChange={(e) => setSelectedAqarYear(e.target.value)}
                    className="appearance-none bg-slate-50 border border-slate-200 rounded-xl py-2 px-4 pr-10 text-sm font-black text-slate-800 cursor-pointer focus:outline-none focus:border-[#002147]"
                  >
                    {data.aqarReports?.map((r) => (
                      <option key={r.year} value={r.year}>
                        {r.label || r.year} ({r.status})
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {currentAqarReport && (
                <div className="hidden lg:flex items-center gap-2 pl-4 border-l border-slate-200 text-xs">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                    Status: {currentAqarReport.status}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setEditYearModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all border border-slate-200"
              >
                <Edit2 className="h-3.5 w-3.5" /> Edit Year Info
              </button>
              <button
                onClick={() => setAddYearModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#002147] hover:bg-blue-900 text-white font-bold text-xs transition-all shadow-4xs"
              >
                <Plus className="h-3.5 w-3.5" /> Add New Academic Year
              </button>
              {data.aqarReports.length > 1 && (
                <button
                  onClick={() => handleDeleteAqarYear(selectedAqarYear)}
                  className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl border border-rose-200 transition-colors"
                  title="Delete this year report"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Sub-Tabs Pills */}
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar border-b border-slate-200">
            <button
              onClick={() => setAqarSubTab("master-reports")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                aqarSubTab === "master-reports"
                  ? "bg-[#002147] text-white shadow-xs"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              📄 Master AQAR Reports ({data.aqarMasterReports?.length || 0} Years)
            </button>
            <button
              onClick={() => setAqarSubTab("criteria")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                aqarSubTab === "criteria"
                  ? "bg-[#002147] text-white shadow-xs"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              🔍 Criteria &amp; Supporting Documents Explorer ({currentAqarReport?.criteria?.length || 0} Criteria)
            </button>
          </div>

          {/* Sub-Tab 1: Master AQAR Reports */}
          {aqarSubTab === "master-reports" && (
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6 flex-wrap gap-3">
                <div>
                  <h3 className="font-outfit text-xl font-black text-slate-900">
                    AQAR Master Reports (2018–19 to 2025–26)
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Upload or edit PDF links for annual quality assurance reports submitted to NAAC.
                  </p>
                </div>
                <button
                  onClick={addAqarMasterReportRow}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#002147] hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition-all shadow-4xs"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Master Report Year
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs md:text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold uppercase tracking-wider">
                      <th className="py-3 px-3">S.No</th>
                      <th className="py-3 px-3">Academic Year</th>
                      <th className="py-3 px-3">AQAR Report (PDF)</th>
                      <th className="py-3 px-3">Supporting Documents</th>
                      <th className="py-3 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {data.aqarMasterReports?.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-3 px-3 font-bold text-slate-400">{idx + 1}</td>
                        <td className="py-3 px-3 font-black text-[#002147] whitespace-nowrap">{row.year}</td>
                        <td className="py-3 px-3">
                          <PdfUploadCell
                            url={row.aqarUrl}
                            title={`AQAR Report ${row.year}`}
                            onUpdate={(val) => updateAqarMasterReport(idx, val)}
                            onPreview={handlePreview}
                            handleFileUpload={handleFileUpload}
                            uploading={uploading}
                          />
                        </td>
                        <td className="py-3 px-3">
                          {row.supportingDocsAvailable ? (
                            <button
                              onClick={() => {
                                setSelectedAqarYear(row.year);
                                setAqarSubTab("criteria");
                              }}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 font-bold text-xs border border-emerald-200 hover:bg-emerald-100"
                            >
                              <FolderOpen className="h-3.5 w-3.5 text-emerald-600" />
                              Manage Criteria Documents
                            </button>
                          ) : (
                            <span className="text-slate-400 text-xs italic">
                              Single PDF submission
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={() => {
                              if (confirm(`Remove Master Report entry for ${row.year}?`)) {
                                const updated = data.aqarMasterReports?.filter((_, i) => i !== idx);
                                setData({ ...data, aqarMasterReports: updated });
                              }
                            }}
                            className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg"
                            title="Delete row"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Sub-Tab 2: Criteria & Supporting Documents Explorer */}
          {aqarSubTab === "criteria" && (
            <div className="flex flex-col gap-6">
              {/* Criterion Selection & Structural Controls */}
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
                  {currentAqarReport?.criteria?.map((crit) => (
                    <button
                      key={crit.id}
                      onClick={() => setSelectedCriterionId(crit.id)}
                      className={`px-4 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all flex items-center gap-2 shrink-0 ${
                        selectedCriterionId === crit.id
                          ? "bg-[#002147] text-white shadow-sm"
                          : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                      }`}
                    >
                      <span className={`h-2 w-2 rounded-full ${selectedCriterionId === crit.id ? "bg-emerald-400" : "bg-slate-300"}`} />
                      <span className="truncate max-w-[200px]">{crit.title}</span>
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => {
                    setModalType("add-criterion");
                    setModalPayload({});
                    setEditItemModalOpen(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-bold transition-all shrink-0 border border-indigo-200"
                >
                  <Plus className="h-3.5 w-3.5" /> Add New Criterion
                </button>
              </div>

              {/* Sections & Metrics Editor Container */}
              {(() => {
                const crit = currentAqarReport?.criteria?.find((c) => c.id === selectedCriterionId);
                if (!crit) return null;

                return (
                  <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col gap-6">
                    <div className="border-b border-slate-100 pb-4 flex items-center justify-between flex-wrap gap-3">
                      <div className="flex items-center gap-3">
                        <h3 className="font-outfit text-lg md:text-xl font-black text-slate-900">
                          {crit.title}
                        </h3>
                        <button
                          onClick={() => handleEditCriterionTitle(crit.id)}
                          className="p-1 text-slate-400 hover:text-slate-700 rounded"
                          title="Rename Criterion"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteCriterion(crit.id)}
                          className="p-1 text-rose-400 hover:text-rose-600 rounded"
                          title="Delete Criterion"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setModalType("add-section");
                            setModalPayload({ critId: crit.id });
                            setEditItemModalOpen(true);
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#002147] text-white text-xs font-bold hover:bg-blue-900"
                        >
                          <Plus className="h-3.5 w-3.5" /> Add Section
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4">
                      {crit.sections?.map((sec, secIdx) => {
                        const sectionKey = `aqar_sec_${crit.id}_${sec.number}_${secIdx}`;
                        const isOpen = expandedSections.has(sectionKey) || expandedSections.has(sec.number);
                        return (
                          <div key={sectionKey} className="border border-slate-200/80 rounded-2xl overflow-hidden bg-slate-50/40">
                            <div className="p-4 bg-slate-50 hover:bg-slate-100/80 transition-colors flex items-center justify-between border-b border-slate-200/60">
                              <div
                                onClick={() => toggleSection(sectionKey, sec.number)}
                                className="flex items-center gap-3 cursor-pointer flex-1"
                              >
                                <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-black">
                                  {sec.number}
                                </span>
                                <h4 className="font-outfit text-sm font-bold text-slate-800">
                                  {sec.title}
                                </h4>
                              </div>

                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleEditSection(crit.id, sec.number, sec.title)}
                                  className="p-1 text-slate-400 hover:text-slate-700"
                                  title="Rename Section"
                                >
                                  <Edit2 className="h-3 w-3" />
                                </button>
                                <button
                                  onClick={() => handleDeleteSection(crit.id, sec.number)}
                                  className="p-1 text-rose-400 hover:text-rose-600"
                                  title="Delete Section"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </button>
                                <button
                                  onClick={() => {
                                    setModalType("add-metric");
                                    setModalPayload({ critId: crit.id, secNum: sec.number });
                                    setEditItemModalOpen(true);
                                  }}
                                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold hover:bg-indigo-100"
                                >
                                  <Plus className="h-3 w-3" /> Add Metric
                                </button>
                                <ChevronDown
                                  onClick={() => toggleSection(sectionKey, sec.number)}
                                  className={`h-4 w-4 text-slate-400 cursor-pointer transition-transform ${isOpen ? "rotate-180" : ""}`}
                                />
                              </div>
                            </div>

                            {isOpen && (
                              <div className="p-4 md:p-6 flex flex-col gap-6 bg-white">
                                {sec.metrics?.map((metric) => (
                                  <div key={metric.number} className="p-4 rounded-xl border border-slate-200 bg-slate-50/30 flex flex-col gap-3">
                                    <div className="flex items-center justify-between flex-wrap gap-2">
                                      <div className="flex items-center gap-2">
                                        <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 font-mono text-xs font-bold">
                                          {metric.number}
                                        </span>
                                        <h5 className="font-outfit font-bold text-sm text-slate-800">
                                          {metric.title}
                                        </h5>
                                        <button
                                          onClick={() => handleEditMetric(crit.id, sec.number, metric.number, metric.title)}
                                          className="p-1 text-slate-400 hover:text-slate-700"
                                          title="Rename Metric"
                                        >
                                          <Edit2 className="h-3 w-3" />
                                        </button>
                                        <button
                                          onClick={() => handleDeleteMetric(crit.id, sec.number, metric.number)}
                                          className="p-1 text-rose-400 hover:text-rose-600"
                                          title="Delete Metric"
                                        >
                                          <Trash2 className="h-3 w-3" />
                                        </button>
                                      </div>

                                      <button
                                        onClick={() => {
                                          setModalType("add-doc");
                                          setModalPayload({ critId: crit.id, secNum: sec.number, metricNum: metric.number });
                                          setEditItemModalOpen(true);
                                        }}
                                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold"
                                      >
                                        <Plus className="h-3 w-3" /> Add Doc
                                      </button>
                                    </div>

                                    {/* Documents */}
                                    <div className="flex flex-col gap-2 pt-1">
                                      {metric.documents?.map((doc, docIdx) => (
                                        <div key={docIdx} className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between gap-3 text-xs">
                                          <div className="flex items-center gap-2 min-w-0">
                                            {doc.subDocuments?.length ? (
                                              <FolderOpen className="h-4 w-4 text-amber-500 shrink-0" />
                                            ) : (
                                              <FileText className="h-4 w-4 text-slate-400 shrink-0" />
                                            )}
                                            <span className="font-bold text-slate-800 truncate">{doc.label}</span>
                                            {doc.subDocuments?.length ? (
                                              <span className="text-[10px] bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded font-bold border border-amber-200">
                                                {doc.subDocuments.length} files
                                              </span>
                                            ) : null}
                                          </div>

                                          <div className="flex items-center gap-2 shrink-0">
                                            {doc.documentUrl && (
                                              <button
                                                onClick={() => handlePreview(doc.documentUrl, doc.label)}
                                                className="p-1 text-slate-500 hover:text-slate-800"
                                                title="Preview"
                                              >
                                                <Eye className="h-3.5 w-3.5" />
                                              </button>
                                            )}
                                            <button
                                              onClick={() => {
                                                setModalType("add-subdoc");
                                                setModalPayload({ critId: crit.id, secNum: sec.number, metricNum: metric.number, docIdx });
                                                setEditItemModalOpen(true);
                                              }}
                                              className="p-1 text-amber-600 hover:text-amber-800"
                                              title="Add sub-document"
                                            >
                                              <FolderPlus className="h-3.5 w-3.5" />
                                            </button>
                                            <button
                                              onClick={() => handleDeleteDocumentFromMetric(crit.id, sec.number, metric.number, docIdx)}
                                              className="p-1 text-rose-500 hover:text-rose-700"
                                              title="Delete"
                                            >
                                              <Trash2 className="h-3.5 w-3.5" />
                                            </button>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          MODALS: ADD / EDIT CYCLES & YEARS
      ========================================================================= */}

      {/* Modal: Add New NAAC Cycle */}
      {addCycleModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <h3 className="font-outfit font-black text-slate-900 text-lg">Add New NAAC Accreditation Cycle</h3>
              <button onClick={() => setAddCycleModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                handleAddNaacCycle(
                  fd.get("cycleId") as string,
                  fd.get("cycleName") as string,
                  fd.get("grade") as string,
                  fd.get("status") as any,
                  fd.get("validity") as string,
                  fd.get("cloneFrom") as string
                );
              }}
              className="flex flex-col gap-4 text-xs font-bold text-slate-700"
            >
              <div>
                <label className="block mb-1">Cycle ID (URL Slug, e.g. cycle-2)</label>
                <input
                  name="cycleId"
                  required
                  defaultValue={`cycle-${(data?.naacCycles?.length || 1) + 1}`}
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold"
                />
              </div>

              <div>
                <label className="block mb-1">Cycle Name</label>
                <input
                  name="cycleName"
                  required
                  defaultValue={`Cycle ${(data?.naacCycles?.length || 1) + 1} (Upcoming)`}
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold"
                />
              </div>

              <div>
                <label className="block mb-1">Grade / Accreditation Target</label>
                <input
                  name="grade"
                  defaultValue="Target: Grade 'A+' (CGPA 3.40)"
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold"
                />
              </div>

              <div>
                <label className="block mb-1">Status</label>
                <select name="status" className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold">
                  <option value="Upcoming">Upcoming</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Accredited">Accredited</option>
                </select>
              </div>

              <div>
                <label className="block mb-1">Validity (e.g. 2029 – 2034)</label>
                <input
                  name="validity"
                  defaultValue="2029 – 2034"
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold"
                />
              </div>

              <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl flex flex-col gap-1.5">
                <label className="block text-blue-900 font-black">Initial Criteria &amp; Metric Structure</label>
                <select name="cloneFrom" className="w-full p-2 bg-white rounded-lg border border-blue-200 font-medium">
                  {data?.naacCycles?.map(c => (
                    <option key={c.cycleId} value={c.cycleId}>
                      Clone structure from {c.cycleName} (Recommended)
                    </option>
                  ))}
                  <option value="blank">Start with Fresh / Blank Structure (New NAAC Manual format)</option>
                </select>
                <p className="text-[10px] text-blue-700/80 leading-tight">
                  Cloning retains all criteria, sections, and metrics ready for new document uploads. You can also customize the structure afterward.
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setAddCycleModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-500 hover:bg-slate-100 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#002147] hover:bg-blue-900 text-white font-black"
                >
                  Create NAAC Cycle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Current Cycle Metadata */}
      {editCycleModalOpen && currentNaacCycle && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <h3 className="font-outfit font-black text-slate-900 text-lg">Edit NAAC Cycle Details</h3>
              <button onClick={() => setEditCycleModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                handleEditNaacCycle(
                  currentNaacCycle.cycleId,
                  fd.get("cycleName") as string,
                  fd.get("grade") as string,
                  fd.get("status") as any,
                  fd.get("validity") as string
                );
              }}
              className="flex flex-col gap-4 text-xs font-bold text-slate-700"
            >
              <div>
                <label className="block mb-1">Cycle Name</label>
                <input
                  name="cycleName"
                  required
                  defaultValue={currentNaacCycle.cycleName}
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold"
                />
              </div>

              <div>
                <label className="block mb-1">Grade</label>
                <input
                  name="grade"
                  defaultValue={currentNaacCycle.grade || ""}
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold"
                />
              </div>

              <div>
                <label className="block mb-1">Status</label>
                <select name="status" defaultValue={currentNaacCycle.status} className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold">
                  <option value="Accredited">Accredited</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Upcoming">Upcoming</option>
                </select>
              </div>

              <div>
                <label className="block mb-1">Validity</label>
                <input
                  name="validity"
                  defaultValue={currentNaacCycle.validity || ""}
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditCycleModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-500 hover:bg-slate-100 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#002147] hover:bg-blue-900 text-white font-black"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add New AQAR Year */}
      {addYearModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <h3 className="font-outfit font-black text-slate-900 text-lg">Add New AQAR Academic Year</h3>
              <button onClick={() => setAddYearModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                handleAddAqarYear(
                  fd.get("year") as string,
                  fd.get("label") as string,
                  fd.get("status") as any,
                  fd.get("cloneFrom") as string
                );
              }}
              className="flex flex-col gap-4 text-xs font-bold text-slate-700"
            >
              <div>
                <label className="block mb-1">Academic Year (e.g. 2026-2027)</label>
                <input
                  name="year"
                  required
                  placeholder="2026-2027"
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold"
                />
              </div>

              <div>
                <label className="block mb-1">Report Label</label>
                <input
                  name="label"
                  required
                  placeholder="AQAR 2026–2027 (In Progress)"
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold"
                />
              </div>

              <div>
                <label className="block mb-1">Status</label>
                <select name="status" className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold">
                  <option value="In Progress">In Progress</option>
                  <option value="Draft">Draft</option>
                  <option value="Published">Published</option>
                </select>
              </div>

              <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl flex flex-col gap-1.5">
                <label className="block text-blue-900 font-black">Initial Criteria &amp; Metric Structure</label>
                <select name="cloneFrom" className="w-full p-2 bg-white rounded-lg border border-blue-200 font-medium">
                  {data?.aqarReports?.map(r => (
                    <option key={r.year} value={r.year}>
                      Clone structure from {r.year} (Recommended)
                    </option>
                  ))}
                  <option value="blank">Start with Fresh / Blank Structure (New AQAR manual format)</option>
                </select>
                <p className="text-[10px] text-blue-700/80 leading-tight">
                  Cloning carries forward all criteria, key indicators, and metric numbers with empty document slots ready for uploads.
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setAddYearModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-500 hover:bg-slate-100 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#002147] hover:bg-blue-900 text-white font-black"
                >
                  Create AQAR Year
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit AQAR Year Metadata */}
      {editYearModalOpen && currentAqarReport && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <h3 className="font-outfit font-black text-slate-900 text-lg">Edit AQAR Report Details</h3>
              <button onClick={() => setEditYearModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                handleEditAqarYear(
                  currentAqarReport.year,
                  fd.get("label") as string,
                  fd.get("status") as any
                );
              }}
              className="flex flex-col gap-4 text-xs font-bold text-slate-700"
            >
              <div>
                <label className="block mb-1">Report Label</label>
                <input
                  name="label"
                  required
                  defaultValue={currentAqarReport.label}
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold"
                />
              </div>

              <div>
                <label className="block mb-1">Status</label>
                <select name="status" defaultValue={currentAqarReport.status} className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold">
                  <option value="Published">Published</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditYearModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-500 hover:bg-slate-100 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#002147] hover:bg-blue-900 text-white font-black"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          GLOBAL MODALS: STRUCTURAL MUTATIONS (Criterion, Section, Metric, Doc)
      ========================================================================= */}
      {editItemModalOpen && (
        <div className="fixed inset-0 z-[200] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 flex flex-col gap-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-outfit font-black text-lg text-slate-900">
                {modalType === "add-criterion" ? "Add New Criterion" :
                 modalType === "add-section" ? "Add New Key Section" :
                 modalType === "add-metric" ? "Add New Metric" :
                 modalType === "add-doc" ? "Add Document to Metric" :
                 modalType === "add-subdoc" ? "Add Nested Sub-Document" :
                 modalType === "add-sc-member" ? "Add Steering Committee Member" : "Edit Item"}
              </h3>
              <button onClick={() => setEditItemModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body: Add Criterion */}
            {modalType === "add-criterion" && (
              <div className="flex flex-col gap-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Criterion Number (e.g. 8 or 1)</label>
                  <input
                    type="number"
                    id="critNumInput"
                    placeholder="8"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Criterion Title</label>
                  <input
                    type="text"
                    id="critTitleInput"
                    placeholder="Criterion 8 - New Institutional Parameters"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => {
                      const num = parseInt((document.getElementById("critNumInput") as HTMLInputElement)?.value);
                      const title = (document.getElementById("critTitleInput") as HTMLInputElement)?.value;
                      if (!num || !title) return alert("Please provide number and title");
                      handleAddCriterion(num, title);
                    }}
                    className="px-5 py-2 bg-[#002147] hover:bg-blue-900 text-white rounded-xl font-bold"
                  >
                    Create Criterion
                  </button>
                </div>
              </div>
            )}

            {/* Modal Body: Add Section */}
            {modalType === "add-section" && (
              <div className="flex flex-col gap-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Section Number / Key Indicator (e.g. 1.1 or 2.3)</label>
                  <input
                    type="text"
                    id="secNumInput"
                    placeholder="1.1"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Section Title</label>
                  <input
                    type="text"
                    id="secTitleInput"
                    placeholder="Key Indicator - Curricular Planning and Implementation"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => {
                      const num = (document.getElementById("secNumInput") as HTMLInputElement)?.value;
                      const title = (document.getElementById("secTitleInput") as HTMLInputElement)?.value;
                      if (!num || !title) return alert("Please provide number and title");
                      handleAddSection(modalPayload.critId, num, title);
                    }}
                    className="px-5 py-2 bg-[#002147] hover:bg-blue-900 text-white rounded-xl font-bold"
                  >
                    Create Section
                  </button>
                </div>
              </div>
            )}

            {/* Modal Body: Add Metric */}
            {modalType === "add-metric" && (
              <div className="flex flex-col gap-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Metric Number (e.g. 1.1.1 or 2.1.2)</label>
                  <input
                    type="text"
                    id="metricNumInput"
                    placeholder="1.1.1"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Metric Description / Title</label>
                  <input
                    type="text"
                    id="metricTitleInput"
                    placeholder="The Institution ensures effective curriculum planning and delivery..."
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => {
                      const num = (document.getElementById("metricNumInput") as HTMLInputElement)?.value;
                      const title = (document.getElementById("metricTitleInput") as HTMLInputElement)?.value;
                      if (!num || !title) return alert("Please provide number and title");
                      handleAddMetric(modalPayload.critId, modalPayload.secNum, num, title);
                    }}
                    className="px-5 py-2 bg-[#002147] hover:bg-blue-900 text-white rounded-xl font-bold"
                  >
                    Create Metric
                  </button>
                </div>
              </div>
            )}

            {/* Modal Body: Add Document */}
            {modalType === "add-doc" && (
              <div className="flex flex-col gap-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Document Label / Title</label>
                  <input
                    type="text"
                    id="docLabelInput"
                    placeholder="e.g. Upload relevant supporting document"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Document URL</label>
                  <input
                    type="text"
                    id="docUrlInput"
                    placeholder="https://... or upload PDF below"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
                <div className="flex items-center justify-between pt-2">
                  <label className="inline-flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer font-bold text-slate-700">
                    <Upload className="h-3.5 w-3.5" />
                    <span>Upload File</span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const url = await handleFileUpload(file);
                          if (url) {
                            const inp = document.getElementById("docUrlInput") as HTMLInputElement;
                            if (inp) inp.value = url;
                          }
                        }
                      }}
                    />
                  </label>
                  <button
                    onClick={() => {
                      const label = (document.getElementById("docLabelInput") as HTMLInputElement)?.value;
                      const url = (document.getElementById("docUrlInput") as HTMLInputElement)?.value;
                      if (!label) return alert("Please provide a label");
                      handleAddDocumentToMetric(modalPayload.critId, modalPayload.secNum, modalPayload.metricNum, label, url || "");
                      setEditItemModalOpen(false);
                    }}
                    className="px-5 py-2 bg-[#002147] hover:bg-blue-900 text-white rounded-xl font-bold"
                  >
                    Add Document
                  </button>
                </div>
              </div>
            )}

            {/* Modal Body: Add Sub-Document */}
            {modalType === "add-subdoc" && (
              <div className="flex flex-col gap-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Sub-Document Name</label>
                  <input
                    type="text"
                    id="subDocNameInput"
                    placeholder="e.g. 2023-24 Detailed Statement"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Academic Year (Optional)</label>
                  <input
                    type="text"
                    id="subDocYearInput"
                    placeholder="e.g. 2023-2024"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Document URL</label>
                  <input
                    type="text"
                    id="subDocUrlInput"
                    placeholder="https://... or upload PDF below"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
                <div className="flex items-center justify-between pt-2">
                  <label className="inline-flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer font-bold text-slate-700">
                    <Upload className="h-3.5 w-3.5" />
                    <span>Upload File</span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const url = await handleFileUpload(file);
                          if (url) {
                            const inp = document.getElementById("subDocUrlInput") as HTMLInputElement;
                            if (inp) inp.value = url;
                          }
                        }
                      }}
                    />
                  </label>
                  <button
                    onClick={() => {
                      const name = (document.getElementById("subDocNameInput") as HTMLInputElement)?.value;
                      const year = (document.getElementById("subDocYearInput") as HTMLInputElement)?.value;
                      const url = (document.getElementById("subDocUrlInput") as HTMLInputElement)?.value;
                      if (!name) return alert("Please provide a name");
                      handleAddSubDocument(modalPayload.critId, modalPayload.secNum, modalPayload.metricNum, modalPayload.docIdx, name, url || "", year);
                      setEditItemModalOpen(false);
                    }}
                    className="px-5 py-2 bg-[#002147] hover:bg-blue-900 text-white rounded-xl font-bold"
                  >
                    Add Sub-Doc
                  </button>
                </div>
              </div>
            )}

            {/* Modal Body: Add Steering Committee Member */}
            {modalType === "add-sc-member" && (
              <div className="flex flex-col gap-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Criterion / Sector</label>
                  <input
                    type="text"
                    id="scCritInput"
                    placeholder="e.g. IQAC or Criterion 1"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Name of the Member</label>
                  <input
                    type="text"
                    id="scNameInput"
                    placeholder="e.g. Dr. Jane Doe"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Role in IQAC</label>
                  <input
                    type="text"
                    id="scRoleInput"
                    placeholder="e.g. Member or Coordinator"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Designation / Department</label>
                  <input
                    type="text"
                    id="scDesigInput"
                    placeholder="e.g. Associate Professor, Dept. of Commerce"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => {
                      const crit = (document.getElementById("scCritInput") as HTMLInputElement)?.value;
                      const name = (document.getElementById("scNameInput") as HTMLInputElement)?.value;
                      const role = (document.getElementById("scRoleInput") as HTMLInputElement)?.value;
                      const designation = (document.getElementById("scDesigInput") as HTMLInputElement)?.value;
                      if (!name) return alert("Please provide member name");
                      const newMember: SteeringCommitteeMember = {
                        id: `sc_${Date.now()}`,
                        criterion: crit || "IQAC",
                        name,
                        role: role || "Member",
                        designation: designation || ""
                      };
                      setData({
                        ...data,
                        steeringCommittee: [...(data.steeringCommittee || []), newMember]
                      });
                      setEditItemModalOpen(false);
                    }}
                    className="px-5 py-2 bg-[#002147] hover:bg-blue-900 text-white rounded-xl font-bold"
                  >
                    Save Member
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* PDF / File Preview Modal */}
      {previewPdf && (
        <FilePreviewModal
          isOpen={!!previewPdf}
          fileUrl={previewPdf.url}
          title={previewPdf.title}
          onClose={() => setPreviewPdf(null)}
        />
      )}
    </div>
  );
}

// =========================================================================
// REUSABLE PDF UPLOAD & URL EDITING CELL
// =========================================================================
function PdfUploadCell({
  url,
  title,
  onUpdate,
  onPreview,
  handleFileUpload,
  uploading
}: {
  url?: string;
  title: string;
  onUpdate: (newUrl: string) => void;
  onPreview: (url: string, title: string) => void;
  handleFileUpload: (file: File) => Promise<string | null>;
  uploading: boolean;
}) {
  const [editingUrl, setEditingUrl] = useState(false);
  const [tempUrl, setTempUrl] = useState(url || "");

  useEffect(() => {
    setTempUrl(url || "");
  }, [url]);

  const hasRealDoc = url && url !== "/documents/DefaultFile_1.pdf" && url !== "";

  return (
    <div className="flex items-center gap-2">
      {editingUrl ? (
        <div className="flex items-center gap-1.5 flex-1 min-w-[200px]">
          <input
            type="text"
            value={tempUrl}
            onChange={(e) => setTempUrl(e.target.value)}
            placeholder="Paste document URL..."
            className="w-full text-xs px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-[#002147]"
          />
          <button
            onClick={() => {
              onUpdate(tempUrl);
              setEditingUrl(false);
            }}
            className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shrink-0"
          >
            Save
          </button>
          <button
            onClick={() => {
              setTempUrl(url || "");
              setEditingUrl(false);
            }}
            className="px-2 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-xs font-bold shrink-0"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`text-xs truncate max-w-[150px] sm:max-w-[200px] font-mono ${
              hasRealDoc ? "text-slate-700 font-semibold" : "text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 text-[10px]"
            }`}
            title={url || "Default File"}
          >
            {hasRealDoc ? url : "Default File"}
          </span>

          <div className="inline-flex items-center gap-1.5">
            {url && (
              <button
                type="button"
                onClick={() => onPreview(url, title)}
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                title="Preview Document"
              >
                <Eye className="h-3.5 w-3.5" />
              </button>
            )}

            <button
              type="button"
              onClick={() => setEditingUrl(true)}
              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              title="Edit URL"
            >
              <Edit2 className="h-3.5 w-3.5" />
            </button>

            <label className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold cursor-pointer transition-all border border-emerald-200">
              <Upload className="h-3 w-3" />
              <span>Upload</span>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.xlsx"
                className="hidden"
                disabled={uploading}
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const uploadedUrl = await handleFileUpload(file);
                    if (uploadedUrl) {
                      onUpdate(uploadedUrl);
                    }
                  }
                }}
              />
            </label>
          </div>
        </div>
      )}
    </div>
  );
}

// =========================================================================
// REUSABLE MEETING MINUTES & ATR CELL PAIR
// =========================================================================
function MeetingCellPair({
  year,
  mNum,
  minUrl,
  atrUrl,
  onUpdateMin,
  onUpdateAtr,
  onPreview,
  handleFileUpload,
  uploading
}: {
  year: string;
  mNum: number;
  minUrl?: string;
  atrUrl?: string;
  onUpdateMin: (url: string) => void;
  onUpdateAtr: (url: string) => void;
  onPreview: (url: string, title: string) => void;
  handleFileUpload: (file: File) => Promise<string | null>;
  uploading: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5 min-w-[130px]">
      <div className="flex items-center justify-between gap-1 text-[11px]">
        <span className="font-bold text-blue-800">M{mNum} Min:</span>
        <div className="inline-flex items-center gap-1">
          {minUrl && (
            <button
              type="button"
              onClick={() => onPreview(minUrl, `${year} – Meeting ${mNum} Minutes`)}
              className="p-1 text-slate-500 hover:text-blue-700"
              title="Preview Minutes"
            >
              <Eye className="h-3 w-3" />
            </button>
          )}
          <label className="cursor-pointer text-blue-600 hover:text-blue-800 font-bold" title="Upload Minutes PDF">
            <Upload className="h-3 w-3" />
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              disabled={uploading}
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const u = await handleFileUpload(file);
                  if (u) onUpdateMin(u);
                }
              }}
            />
          </label>
        </div>
      </div>

      <div className="flex items-center justify-between gap-1 text-[11px]">
        <span className="font-bold text-emerald-800">M{mNum} ATR:</span>
        <div className="inline-flex items-center gap-1">
          {atrUrl && (
            <button
              type="button"
              onClick={() => onPreview(atrUrl, `${year} – Meeting ${mNum} ATR`)}
              className="p-1 text-slate-500 hover:text-emerald-700"
              title="Preview ATR"
            >
              <Eye className="h-3 w-3" />
            </button>
          )}
          <label className="cursor-pointer text-emerald-600 hover:text-emerald-800 font-bold" title="Upload ATR PDF">
            <Upload className="h-3 w-3" />
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              disabled={uploading}
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const u = await handleFileUpload(file);
                  if (u) onUpdateAtr(u);
                }
              }}
            />
          </label>
        </div>
      </div>
    </div>
  );
}
