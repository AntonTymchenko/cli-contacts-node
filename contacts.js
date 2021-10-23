const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);

  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === +contactId);
  if (!result) {
    return null;
  }

  return result;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === +contactId);
  if (idx === -1) {
    return null;
  }
  const removeContact = contacts.splice(idx, 1);
  const contactsStr = JSON.stringify(contacts);
  await fs.writeFile(contactsPath, contactsStr);
  return removeContact;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { id: crypto.randomUUID(), name, email, phone };
  contacts.push(newContact);
  const contactsStr = JSON.stringify(contacts);
  await fs.writeFile(contactsPath, contactsStr);
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
