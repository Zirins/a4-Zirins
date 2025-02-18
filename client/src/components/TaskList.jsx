import api from "../api/api";

export default function TaskList({ tasks, refreshTasks }) {
    const handleDelete = async (taskId) => {
        await api.deleteTask(taskId);
        refreshTasks(); // ✅ Trigger refetch from parent
    };

    return (
        <div className="p-4 bg-white shadow-md rounded-lg mt-4">
            <h2 className="text-xl font-semibold mb-3">Your Tasks</h2>
            <ul>
                {tasks.length === 0 ? (
                    <p className="text-gray-500">No tasks found.</p>
                ) : (
                    tasks.map((task) => (
                        <li key={task._id} className="p-2 border-b flex justify-between items-center">
                            <div>
                                <span className="font-semibold">{task.content}</span>
                                <p className="text-sm text-gray-500">
                                    Priority: {task.priority} | Due: {new Date(task.dueDate).toLocaleDateString()}
                                </p>
                                <p className="text-sm font-bold">
                                    Urgency: {task.urgencyLevel}
                                </p>
                            </div>
                            <button
                                onClick={() => handleDelete(task._id)}
                                className="bg-red-500 text-white px-3 py-1 rounded-lg"
                            >
                                Delete
                            </button>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}
