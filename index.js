const { Command } = require("commander");
const contactOperations = require("./contacts.js");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contacts = await contactOperations.listContacts();
      console.table(contacts);
      break;

    case "get":
      const contact = await contactOperations.getContactById(id);

      if (!contact) {
        throw new Error(`Contact with id ${id} not found`);
      }
      console.log(contact);
      break;

    case "add":
      const newContact = await contactOperations.addContact(name, email, phone);
      console.log(newContact);
      break;

    case "remove":
      const removeContact = await contactOperations.removeContact(id);
      console.log(removeContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
