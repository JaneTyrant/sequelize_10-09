const { Task } = require("../models");

module.exports.createTask = async (req, res, next) => {
  try {
    const { body, instanceUser } = req;
    const task = await instanceUser.createTask(body);
    res.status(201).send({ data: task });
  } catch (error) {
    next(error);
  }
};

module.exports.getTasksByUser = async (req, res, next) => {
  try {
    const { instanceUser } = req;
    const tasks = await instanceUser.getTasks();
    res.status(200).send({ data: tasks });
  } catch (error) {
    next(error);
  }
};

// написать методы удаления и обновления таски

module.exports.deleteTaskInstance = async (req, res, next) => {
  try {
    const {
      params: { taskId },
    } = req;
    const taskInstance = await Task.findByPk(taskId);
    const result = await taskInstance.destroy();
    res.status(200).send({ data: taskInstance });
  } catch (error) {
    next(error);
  }
};

module.exports.updateTaskInstance = async (req, res, next) => {
  try {
    const { body, instanceTask } = req;
    const updatedTask = await instanceTask.update(body, { returning: true });
    updatedTask.password = undefined;
    res.status(200).send({ data: updatedTask });
  } catch (error) {
    next(error);
  }
};

module.exports.updateTaskInstance = async (req, res, next) => {
  try {
    const {
      body,
      params: { taskId },
    } = req;
    const taskInstance = await Task.findByPk(taskId);
    const updatedTask = await taskInstance.update(body, { returning: true });
    updatedTask.password = undefined;
    res.status(200).send({ data: updatedTask });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteTaskInstancebyUser = async (req, res, next) => {
  try {
    const {
      params: { userId },
    } = req;
    const userTasks = await Task.findAll({
      where: {
        userId: userId,
      },
    });
    const result = await userTasks.destroy();
    if (!userTasks) {
      next(createError(404, "Tasks not found!"));
    }
    res.status(200).send({ data: userTasks });
  } catch (error) {
    next(error);
  }
};

// module.exports.deleteTaskInstance = async (req, res, next) => {
//   try {
//     const { instanceTask } = req;
//     const result = await instanceTask.destroy();
//     res.status(200).send({ data: instanceTask });
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports.createTask = async (req, res, next) => {
//   try {
//     const {
//       body,
//       params: { userId },
//     } = req;
//     const task = await Task.create({ ...body, userId }); //userId:userId
//     res.status(201).send({ data: task });
//   } catch (error) {
//     next(error);
//   }
// };
