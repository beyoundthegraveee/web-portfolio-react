const db = require('../config/db.js');
const Klients = db.klients;

const addNewClient = async (req, res) =>{
  const { Imie, Nazwisko, Kontakt} = req.body;
  try {
    const newClient = await Klients.create({
        Imie,
        Nazwisko,
        Kontakt
    });
    return res.status(201).json({
        message: 'Client added successfully!',
        client: {
          id: newClient.ID,
          ...newClient.dataValues
        }
      });
} catch (error) {
    console.error('Error adding client:', error);
    return res.status(500).json({ message: 'Error adding client' });
}
};

const getClientById = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await Klients.findByPk(id);

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    return res.status(200).json(client);
  } catch (error) {
    console.error('Error fetching client by ID:', error);
    return res.status(500).json({ message: 'Error fetching client' });
  }
};

const updateClientById = async (req, res) => {
  const { id } = req.params;
  const { Imie, Nazwisko, Kontakt } = req.body;
  try {
    const client = await Klients.findByPk(id);

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    await client.update({
      Imie,
      Nazwisko,
      Kontakt,
    });

    return res.status(200).json({
      message: 'Client updated successfully!',
      client: client,
    });
  } catch (error) {
    console.error('Error updating client:', error);
    return res.status(500).json({ message: 'Error updating client' });
  }
};

module.exports = {
    addNewClient,
    getClientById,
    updateClientById,
}
