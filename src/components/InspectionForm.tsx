import React, { useState } from 'react';
import { inspectionAPI, InspectionCreatePayload, Question, InspectionImage } from '../services/api';
import { FCA_25_QUESTIONS } from '../data/fcaQuestions';

const InspectionForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    inspectionReference: '',
    inspectionType: 'PSI',
    inspectionDate: new Date().toISOString().split('T')[0],
    plannedDate: '',
    inspectorName: '',
    inspectorOrganization: 'QIMA Inspections',
    overallResult: 'N/A',
    inspectorRemark: '',
    siteName: '',
    siteAddress: '',
    siteCity: '',
    siteCountry: '',
    siteRepresentative: '',
    productName: '',
    poRef: '',
    sku: '',
    orderedQuantity: 0,
    producedQuantity: 0,
    packedQuantity: 0,
    fcaTotalScore: 0,
    fcaScoreExcluded: 0,
    yesCount: 0,
    naCount: 0,
    timeline: '',
    timeCost: '',
  });

  // Initialize all 25 questions from the FCA template
  const [questions, setQuestions] = useState<Question[]>(
    FCA_25_QUESTIONS.map(q => ({
      ...q,
      answer: '',
      status: '',
      remarks: '',
      issues: '',
      images: [],
    }))
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleQuestionChange = (index: number, field: keyof Question, value: string) => {
    const updated = [...questions];
    updated[index] = { ...updated[index], [field]: value };
    setQuestions(updated);
  };

  const handleImageUpload = async (index: number, files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result as string;
      const updated = [...questions];
      
      if (!updated[index].images) {
        updated[index].images = [];
      }

      updated[index].images!.push({
        questionNumber: updated[index].questionNumber,
        imageUrl: base64String,
        imagePath: file.name,
        caption: `Image for ${updated[index].questionNumber}`,
        imageType: 'evidence',
      });

      setQuestions(updated);
    };

    reader.readAsDataURL(file);
  };

  const removeImage = (questionIndex: number, imageIndex: number) => {
    const updated = [...questions];
    updated[questionIndex].images?.splice(imageIndex, 1);
    setQuestions(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Collect all images from questions
      const allImages: InspectionImage[] = [];
      questions.forEach(q => {
        if (q.images && q.images.length > 0) {
          allImages.push(...q.images.map(img => ({
            ...img,
            questionNumber: q.questionNumber,
          })));
        }
      });

      const payload: InspectionCreatePayload = {
        inspection: {
          inspectionReference: formData.inspectionReference,
          inspectionType: formData.inspectionType,
          inspectionDate: formData.inspectionDate,
          plannedDate: formData.plannedDate || undefined,
          overallResult: formData.overallResult,
          inspectorRemark: formData.inspectorRemark,
          inspectorName: formData.inspectorName,
          inspectorOrganization: formData.inspectorOrganization,
          fcaTotalScore: parseFloat(formData.fcaTotalScore.toString()),
          fcaScoreExcluded: parseFloat(formData.fcaScoreExcluded.toString()),
          timeline: formData.timeline,
          timeCost: formData.timeCost,
          yesCount: parseInt(formData.yesCount.toString()),
          naCount: parseInt(formData.naCount.toString()),
          isSafetyFailed: false,
          productSafetyFailCount: 0,
          isReaudit: false,
          generatedBy: 'QualiGuard Frontend',
          generatedDate: new Date().toISOString(),
        },
        site: formData.siteName ? {
          name: formData.siteName,
          address: formData.siteAddress,
          city: formData.siteCity,
          country: formData.siteCountry,
          siteRepresentative: formData.siteRepresentative,
        } : undefined,
        products: formData.productName ? [{
          name: formData.productName,
          poRef: formData.poRef,
          sku: formData.sku,
          orderedQuantity: parseInt(formData.orderedQuantity.toString()),
          producedQuantity: parseInt(formData.producedQuantity.toString()),
          packedQuantity: parseInt(formData.packedQuantity.toString()),
          orderedUnit: 'Pcs',
        }] : undefined,
        questions: questions.map(q => ({
          questionNumber: q.questionNumber,
          section: q.section,
          sectionType: q.sectionType,
          maxScore: q.maxScore,
          questionText: q.questionText,
          answer: q.answer,
          status: q.status,
          remarks: q.remarks,
          issues: q.issues,
        })),
        images: allImages,
        testChecklists: [{
          checklistName: 'GAP-FCA-General',
          result: 'N/A',
          fcaForm: 'FCA - Cut & Sewn',
        }],
      };

      await inspectionAPI.create(payload);
      setSuccess(true);
      
      setTimeout(() => {
        window.location.href = '/inspections';
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create inspection');
      console.error('Error creating inspection:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Create New GAP FCA Inspection</h2>

      {success && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          ✅ Inspection created successfully! Redirecting...
        </div>
      )}

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          ❌ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Inspection Info */}
        <div className="border-b pb-4">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">📋 Inspection Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Inspection Reference *
              </label>
              <input
                type="text"
                name="inspectionReference"
                value={formData.inspectionReference}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., PSI 1333162"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Inspection Type
              </label>
              <select
                name="inspectionType"
                value={formData.inspectionType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="PSI">PSI - Pre-Shipment Inspection</option>
                <option value="GAP-FCA">GAP-FCA</option>
                <option value="IPC">IPC - In-Process Check</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Inspection Date *
              </label>
              <input
                type="date"
                name="inspectionDate"
                value={formData.inspectionDate}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Planned Date
              </label>
              <input
                type="date"
                name="plannedDate"
                value={formData.plannedDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Inspector Name *
              </label>
              <input
                type="text"
                name="inspectorName"
                value={formData.inspectorName}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Inspector Organization
              </label>
              <input
                type="text"
                name="inspectorOrganization"
                value={formData.inspectorOrganization}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Site Information */}
        <div className="border-b pb-4">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">🏭 Site Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
              <input
                type="text"
                name="siteName"
                value={formData.siteName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Site Representative</label>
              <input
                type="text"
                name="siteRepresentative"
                value={formData.siteRepresentative}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input
                type="text"
                name="siteAddress"
                value={formData.siteAddress}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input
                type="text"
                name="siteCity"
                value={formData.siteCity}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <input
                type="text"
                name="siteCountry"
                value={formData.siteCountry}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Product Information */}
        <div className="border-b pb-4">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">📦 Product Information</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">PO Reference</label>
              <input
                type="text"
                name="poRef"
                value={formData.poRef}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ordered Qty</label>
              <input
                type="number"
                name="orderedQuantity"
                value={formData.orderedQuantity}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Produced Qty</label>
              <input
                type="number"
                name="producedQuantity"
                value={formData.producedQuantity}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Packed Qty</label>
              <input
                type="number"
                name="packedQuantity"
                value={formData.packedQuantity}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* FCA Scores */}
        <div className="border-b pb-4">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">📊 FCA Scores</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">FCA Total Score (%)</label>
              <input
                type="number"
                step="0.01"
                name="fcaTotalScore"
                value={formData.fcaTotalScore}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Score Excluded (%)</label>
              <input
                type="number"
                step="0.01"
                name="fcaScoreExcluded"
                value={formData.fcaScoreExcluded}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Yes Count</label>
              <input
                type="number"
                name="yesCount"
                value={formData.yesCount}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">N/A Count</label>
              <input
                type="number"
                name="naCount"
                value={formData.naCount}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Timeline</label>
              <input
                type="text"
                name="timeline"
                value={formData.timeline}
                onChange={handleInputChange}
                placeholder="e.g., start at 10:30 am, end at 10:00 pm"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time Cost</label>
              <input
                type="text"
                name="timeCost"
                value={formData.timeCost}
                onChange={handleInputChange}
                placeholder="e.g., 11.30 hr"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* 25 Questions Section */}
        <div className="border-b pb-4">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">✅ GAP FCA 25 Questions</h3>
          <p className="text-sm text-gray-600 mb-4">Complete all 25 questions. Add status, comments, and images for each question.</p>

          <div className="space-y-6">
            {questions.map((question, index) => (
              <div key={index} className="p-4 border-2 border-gray-200 rounded-lg bg-gray-50 hover:border-blue-300 transition">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-blue-700 text-lg">{question.questionNumber}</h4>
                    <p className="text-sm text-gray-600 mt-1">{question.section} - Score: {question.maxScore}</p>
                    <p className="text-sm text-gray-800 mt-2">{question.questionText}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  {/* Answer */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Answer *
                    </label>
                    <select
                      value={question.answer}
                      onChange={(e) => handleQuestionChange(index, 'answer', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Answer...</option>
                      <option value="Yes=1">Yes=1 (Compliant)</option>
                      <option value="No=0">No=0 (Non-Compliant)</option>
                      <option value="N/A">N/A (Not Applicable)</option>
                    </select>
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <input
                      type="text"
                      value={question.status}
                      onChange={(e) => handleQuestionChange(index, 'status', e.target.value)}
                      placeholder="e.g., Meets the requirements"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Remarks */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Remarks / Observations
                    </label>
                    <textarea
                      value={question.remarks}
                      onChange={(e) => handleQuestionChange(index, 'remarks', e.target.value)}
                      placeholder="Add detailed observations..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={2}
                    />
                  </div>

                  {/* Issues */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Issues / Non-Compliance Details
                    </label>
                    <textarea
                      value={question.issues}
                      onChange={(e) => handleQuestionChange(index, 'issues', e.target.value)}
                      placeholder="Describe any issues found (if answer is No=0)..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={2}
                    />
                  </div>

                  {/* Image Upload */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      📸 Upload Evidence Images
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(index, e.target.files)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    
                    {/* Display uploaded images */}
                    {question.images && question.images.length > 0 && (
                      <div className="mt-3 grid grid-cols-4 gap-2">
                        {question.images.map((img, imgIndex) => (
                          <div key={imgIndex} className="relative">
                            <img 
                              src={img.imageUrl} 
                              alt={img.caption || 'Evidence'} 
                              className="w-full h-24 object-cover rounded border"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index, imgIndex)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                            >
                              ×
                            </button>
                            <p className="text-xs text-gray-600 mt-1 truncate">{img.imagePath}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inspector Remarks */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            💬 Overall Inspector Remarks
          </label>
          <textarea
            name="inspectorRemark"
            value={formData.inspectorRemark}
            onChange={handleInputChange}
            placeholder="Add overall inspection remarks..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4 pt-4 border-t">
          <button
            type="button"
            onClick={() => window.location.href = '/inspections'}
            className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 font-medium shadow-lg"
          >
            {loading ? '⏳ Creating Inspection...' : '✅ Create Inspection'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InspectionForm;