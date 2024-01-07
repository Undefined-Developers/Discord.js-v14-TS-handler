import addRole from "./add.js";
import createRole from "./create.js";
import deleteRole from "./delete.js";
import editRole from "./edit.js";
import removeRole from "./remove.js";
export default function setupRolePermChecks(bot) {
    addRole(bot);
    createRole(bot);
    deleteRole(bot);
    editRole(bot);
    removeRole(bot);
}
