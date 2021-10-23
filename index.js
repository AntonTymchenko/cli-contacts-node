// index.js
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("./contacts");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.table(contacts);
      break;

    case "get":
      const contactId = await getContactById(id);
      console.log(chalk.blue(contactId));
      break;

    case "add":
      const newContact = await addContact(name, email, phone);
      console.log(chalk.green("Add new contact"));
      console.log(chalk.orange(newContact));

      break;

    case "remove":
      const removeContact = await removeContact(id);
      console.log(chalk.tomato(removeContact));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
