let incompleteTasks = [];
let completedTasks = [];

export const getIncompleteTasks = () => {
    return incompleteTasks.filter(task => !task.read);
};

export const getCompletedTasks = () => {
    return completedTasks.filter(task => !task.read);
};

export const addIncompleteTask = (taskData) => {
    incompleteTasks.push({
        employeeName: taskData.employeeName,
        description: taskData.taskDescription,
        date: taskData.date,
        read: false,
    });
};

export const addCompletedTask = (taskData) => {
    completedTasks.push({
        employeeName: taskData.employeeName,
        description: taskData.taskDescription,
        date: taskData.date,
        read: false,
    });
};

export const markNotificationAsRead = (notification) => {
    if (notification.type === 'incomplete') {
        const taskIndex = incompleteTasks.findIndex(task =>
            task.employeeName === notification.name && task.description === notification.message
        );
        if (taskIndex !== -1) {
            incompleteTasks[taskIndex].read = true;
        }
    } else if (notification.type === 'completed') {
        const taskIndex = completedTasks.findIndex(task =>
            task.employeeName === notification.name && task.description === notification.message
        );
        if (taskIndex !== -1) {
            completedTasks[taskIndex].read = true;
        }
    }
};

export const deleteNotification = (notification) => {
    if (notification.type === 'incomplete') {
        incompleteTasks = incompleteTasks.filter(task =>
            !(task.employeeName === notification.name && task.description === notification.message)
        );
    } else if (notification.type === 'completed') {
        completedTasks = completedTasks.filter(task =>
            !(task.employeeName === notification.name && task.description === notification.message)
        );
    }
};

export const clearTasks = () => {
    incompleteTasks = [];
    completedTasks = [];
};
