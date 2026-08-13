const rescueReportsStore = [
  { id: 'RES-2025-052', time: '14 May 2025, 11:30 AM', boat: 'Sea Queen (TN 07 MF 4587)', location: 'Palk Bay', type: 'Man Overboard', status: 'Completed' },
  { id: 'RES-2025-051', time: '13 May 2025, 08:45 PM', boat: 'Ocean Star (TN 04 MF 1034)', location: 'Gulf of Mannar', type: 'Engine Failure', status: 'Completed' },
  { id: 'RES-2025-050', time: '12 May 2025, 02:30 PM', boat: 'Lucky One (TN 10 MF 9876)', location: 'Palk Bay', type: 'Medical Emergency', status: 'Completed' },
  { id: 'RES-2025-049', time: '11 May 2025, 07:15 AM', boat: 'Blue Whale (TN 08 MF 9900)', location: 'Palk Bay', type: 'SOS', status: 'Completed' },
  { id: 'RES-2025-048', time: '10 May 2025, 10:10 PM', boat: 'King Fisher (TN 12 MF 3488)', location: 'Gulf of Mannar', type: 'Bad Weather', status: 'Cancelled' }
];

const accidentReportsStore = [
  { id: 'ACC-2025-031', time: '14 May 2025, 09:15 AM', boat: 'Sea Queen', location: 'Palk Bay', type: 'Collision', severity: 'Minor', status: 'Under Review' },
  { id: 'ACC-2025-030', time: '13 May 2025, 07:40 PM', boat: 'Ocean Star', location: 'Palk Bay', type: 'Equipment Damage', severity: 'Minor', status: 'Under Review' },
  { id: 'ACC-2025-029', time: '12 May 2025, 11:10 AM', boat: 'Lucky One', location: 'Gulf of Mannar', type: 'Capsized (Minor)', severity: 'Major', status: 'Under Review' },
  { id: 'ACC-2025-028', time: '11 May 2025, 03:00 PM', boat: 'Blue Whale', location: 'Palk Bay', type: 'Fire on Board', severity: 'Major', status: 'Under Review' },
  { id: 'ACC-2025-027', time: '10 May 2025, 08:30 AM', boat: 'King Fisher', location: 'Gulf of Mannar', type: 'Grounding', severity: 'Minor', status: 'Under Review' }
];

exports.getReports = (req, res) => {
  res.json({ rescueReports: rescueReportsStore, accidentReports: accidentReportsStore });
};

exports.getRescueReports = (req, res) => {
  res.json({ reports: rescueReportsStore });
};

exports.getAccidentReports = (req, res) => {
  res.json({ reports: accidentReportsStore });
};

exports.generateReport = (req, res) => {
  const { type } = req.body;
  const newReport = {
    id: `ACC-2025-0${Math.floor(32 + Math.random() * 50)}`,
    time: new Date().toLocaleString(),
    boat: req.body.boat || 'Sea Queen',
    location: req.body.location || 'Palk Bay',
    type: type || 'General Incident',
    severity: req.body.severity || 'Minor',
    status: 'Under Review'
  };
  accidentReportsStore.unshift(newReport);
  res.status(201).json({ message: 'Incident Report filed successfully', report: newReport });
};
