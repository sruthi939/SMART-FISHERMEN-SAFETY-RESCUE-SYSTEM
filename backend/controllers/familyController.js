const { usersStore } = require('./authController');

const familyFishermanStore = [
  {
    id: 'link_101',
    family_user_id: 'FAM001',
    fisherman_user_id: 'FSH001',
    fishermanName: 'Manu',
    vessel: 'Sea Queen (TN 07 MF 4587)',
    relationship: 'Wife',
    is_primary_contact: true,
    created_at: new Date()
  }
];

exports.familyFishermanStore = familyFishermanStore;

exports.linkFisherman = (req, res) => {
  const { familyUserId, fishermanPhone, fishermanEmail, relationship } = req.body;

  // Search for fisherman user in database store
  const fisherman = usersStore.find(u => 
    u.role === 'fisherman' && 
    (u.phone === fishermanPhone || u.email === fishermanEmail)
  );

  const newLink = {
    id: `link_${Date.now()}`,
    family_user_id: familyUserId || 'FAM_CURRENT',
    fisherman_user_id: fisherman ? fisherman.id : 'FSH001',
    fishermanName: fisherman ? fisherman.name : 'Manu',
    vessel: fisherman ? (fisherman.boatName || 'Sea Queen (TN 07 MF 4587)') : 'Sea Queen (TN 07 MF 4587)',
    relationship: relationship || 'Wife',
    is_primary_contact: true,
    created_at: new Date()
  };

  familyFishermanStore.push(newLink);

  res.status(201).json({
    message: 'Family member successfully linked to Fisherman!',
    link: newLink
  });
};

exports.getLinkedFishermen = (req, res) => {
  res.json({
    success: true,
    linkedFishermen: [
      {
        id: 'FSH001',
        name: 'Manu',
        vessel: 'Sea Queen',
        boatRegNumber: 'TN 07 MF 4587',
        status: 'On Trip',
        lat: 9.2876,
        lng: 79.3129,
        speed: '12.4 km/h',
        distanceFromShore: '18.6 km',
        course: '128° SE',
        lastUpdated: '2 min ago'
      },
      {
        id: 'FSH002',
        name: 'Ramesh',
        vessel: 'Blue Wave',
        boatRegNumber: 'TN 07 MF 3312',
        status: 'Returned',
        lat: 9.2800,
        lng: 79.3000,
        speed: '0.0 km/h',
        distanceFromShore: '0.0 km',
        course: '0° N',
        lastUpdated: 'Yesterday'
      }
    ]
  });
};

exports.getFishermanDetails = (req, res) => {
  const { id } = req.params;
  res.json({
    fisherman: {
      id: id || 'FSH001',
      name: 'Manu',
      vessel: 'Sea Queen',
      boatRegNumber: 'TN 07 MF 4587',
      boatType: 'Mechanized',
      length: '32 ft',
      enginePower: '200 HP',
      insuranceValidity: '03 Dec 2025',
      phone: '+91 98765 43210',
      home: 'Rameswaram, Tamil Nadu',
      age: '34 Years',
      experience: '12 Years',
      emergencyContact: '+91 98765 12345 (Wife)',
      status: 'On Trip'
    }
  });
};
