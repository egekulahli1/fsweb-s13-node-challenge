// "project" routerını buraya yazın!
const router = require('express').Router();
const projectsModel = require('./projects-model');
const mw = require('./projects-middleware');

router.get('/', async (req, res, next) => {
    try {
        const allProjects = await projectsModel.get();
        res.json(allProjects);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', mw.validateProjectId, async (req, res, next) => {
    try {
        res.json(req.currentProject);
    } catch (error) {
        next(error);
    }
});

router.post('/', mw.validateProjectPayload, async (req, res, next) => {
    try {
        const insertedProject = await projectsModel.insert({
            name: req.body.name,
            description: req.body.description,
            completed: req.body.completed
        });
        res.status(201).json(insertedProject);
    } catch (error) {
        next(error);   
    }
});

router.put('/:id', mw.validateProjectId, mw.validateProjectPayload, async (req, res, next) => {
    try {
        let model = {
            name: req.body.name,
            description: req.body.description,
            completed: req.body.completed
        }
        const updated = await projectsModel.update(req.params.id, model);
        res.json(updated);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', mw.validateProjectId, async (req, res, next) => {
    try {
        await projectsModel.remove(req.params.id);
        res.json({message: "Project deleted"});
    } catch (error) {
        next(error);
    }
});

router.get('/:id/actions', mw.validateProjectId, async (req, res, next) => {
    try {
        const projectActions = await projectsModel.getProjectActions(req.params.id);
        res.json(projectActions);
    } catch (error) {
        next(error);
    }
});

module.exports = router;