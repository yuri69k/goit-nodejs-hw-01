const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find(({ id }) => id === contactId);
  return result || null;
};

const updateContacs = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => id === contactId);
  if (index === -1) {
    return null;
  }
  const [removeContact] = contacts.splice(index, 1);
  await updateContacs(contacts);
  console.log(contacts);
  return removeContact;
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = {
    name,
    email,
    phone,
    id: v4(),
  };
  contacts.push(newContact);
  await updateContacs(contacts);
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
