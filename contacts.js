const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");
const chalk = require("chalk");

const contactsPath = path.join(__dirname, "./db/contacts.json");

const fsWorks = async (data) => {
  const contactsStr = JSON.stringify(data);
  await fs.writeFile(contactsPath, contactsStr);
};

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);

  return contacts;
}

async function getContactById(contactId) {
  if (!contactId) {
    console.log(chalk.red("The contact is not found"));
    return null;
  }
  const contacts = await listContacts();
  const result = contacts.find(
    (item) => item.id === +contactId || item.id === contactId
  );
  if (!result) {
    return null;
  }
  return result;
}

async function removeContact(contactId) {
  if (!contactId) {
    console.log(chalk.red("The contact is not found"));
    return null;
  }
  const contacts = await listContacts();
  const idx = contacts.findIndex(
    (item) => item.id === +contactId || item.id === contactId
  );
  if (idx === -1) {
    return null;
  }
  const removeContact = contacts.splice(idx, 1);
  await fsWorks(contacts);
  return removeContact;
}

async function addContact(name, email, phone) {
  if (!name && !email && !phone) {
    console.log(chalk.red("Not any informations of name, email or phone"));
    return null;
  }
  const contacts = await listContacts();
  const newContact = { id: crypto.randomUUID(), name, email, phone };
  contacts.push(newContact);
  await fsWorks(contacts);
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
