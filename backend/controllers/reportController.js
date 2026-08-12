exports.getReports = (req, res) => {
  res.json({
    reports: [
      { id: 'rep_101', title: 'Monthly Maritime Safety Report - July 2026', type: 'PDF', generatedAt: 'Aug 01, 2026' },
      { id: 'rep_102', title: 'District Vessel Registration Ledger', type: 'CSV', generatedAt: 'Aug 05, 2026' }
    ]
  });
};

exports.generateReport = (req, res) => {
  const { type } = req.body;
  res.status(201).json({
    message: 'Report generated successfully',
    report: { id: `rep_${Date.now()}`, title: `${type || 'Custom'} Safety Report`, generatedAt: new Date().toLocaleDateString() }
  });
};
