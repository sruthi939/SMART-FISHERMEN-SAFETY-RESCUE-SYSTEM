const documentsStore = [
  { id: 'doc-1', title: 'Boat Registration', idNumber: 'TN 07 MF 4587', validTill: '31-Dec-2027', status: 'Verified' },
  { id: 'doc-2', title: 'Fishing License', idNumber: 'IND-FISH-2025-4587', validTill: '15-Aug-2026', status: 'Verified' },
  { id: 'doc-3', title: 'Insurance Certificate', idNumber: 'INS-9082-MAR', validTill: '31-Dec-2025', status: 'Verified' },
  { id: 'doc-4', title: 'Safety Equipment Certificate', idNumber: 'SEC-2025-091', validTill: '15-Nov-2025', status: 'Verified' },
  { id: 'doc-5', title: 'Pollution Certificate', idNumber: 'POL-TN-2025-88', validTill: '20-Oct-2025', status: 'Verified' }
];

exports.getDocuments = (req, res) => {
  res.json({ success: true, documents: documentsStore });
};

exports.uploadDocument = (req, res) => {
  const { title, idNumber, validTill } = req.body;
  const newDoc = {
    id: `doc-${Date.now()}`,
    title: title || 'Maritime Document',
    idNumber: idNumber || `REG-${Math.floor(1000 + Math.random() * 9000)}`,
    validTill: validTill || 'Pending Verification',
    status: 'Under Review'
  };
  documentsStore.unshift(newDoc);
  res.status(201).json({ success: true, message: 'Document uploaded successfully', document: newDoc });
};
