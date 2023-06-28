// projects ara yazılımları buraya
const projectsModel = require('./projects-model');

async function validateProjectId(req, res, next) {
    try {
        const isExistProject = await projectsModel.get(req.params.id);
        if (!isExistProject) {
            res.status(404).json({
                message: "Project not found"
            });
        } else {
            req.currentProject = isExistProject;
            next();
        }
    } catch (error) {
        next(error);
    }
}  

async function validateProjectPayload(req, res, next) {
    try {
        const { name, description } = req.body;
        if (!name || !description) {
            res.status(400).json({
                message: "Please provide name and description for the project"
            });
        } else {
            next();
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {
    validateProjectId,
    validateProjectPayload
}