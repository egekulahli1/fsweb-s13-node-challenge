// eylemlerle ilgili ara katman yazılımları yazın
const actionsModel = require('./actions-model');
const projectsModel = require('../projects/projects-model');

async function validateActionId(req, res, next) {
    try {
        const isExistAction = await actionsModel.get(req.params.id);
        if (!action) {
            res.status(404).json({message: "Action not found"});
        } else {
            req.currentAction = isExistAction;
            next();
        }
    } catch (error) {
        next(error);
    }
}

async function validateActionPayload(req, res, next) {
    try {
        const { project_id, description, notes } = req.body;
        if (typeof(project_id) !== 'number' || project_id <= 0 || !description || !notes) {
            res.status(400).json({message: "Action is missing required fields"});
        } else {
            const existProject = await projectsModel.get(project_id);
            if (!existProject) {
                res.status(404).json({message: "Project not found"});
            } else {
                next();
            }
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {
    validateActionId,
    validateActionPayload
}

