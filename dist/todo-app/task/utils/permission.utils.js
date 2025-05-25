"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.canEdit = canEdit;
function canEdit(app, userId) {
    if (app.owner.toString() === userId)
        return true;
    const collaborator = app.collaborators.find((c) => c.userId.toString() === userId && c.role === 'editor');
    return !!collaborator;
}
//# sourceMappingURL=permission.utils.js.map