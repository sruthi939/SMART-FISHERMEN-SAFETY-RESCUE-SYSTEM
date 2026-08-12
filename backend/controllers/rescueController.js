const rescueService = require('../service/rescueService');

exports.getTeams = (req, res) => {
  res.json({ teams: rescueService.getTeams() });
};

exports.assignRescue = (req, res) => {
  const { emergencyId, teamId } = req.body;
  const result = rescueService.assignRescue(emergencyId, teamId);
  res.json({ message: 'Rescue squad dispatched successfully', result });
};

exports.getHistory = (req, res) => {
  res.json({
    history: [
      { id: '204', title: 'Operation Sea Guard #204', result: '3 Fishermen rescued in Sector 4B', date: 'Aug 08, 2026' }
    ]
  });
};
