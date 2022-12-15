import { v4 as uuidv4 } from 'uuid';
import { TodosAccess } from './todosAcess'
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
// import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'

export async function createTodo(model: CreateTodoRequest, userId: string): Promise<TodoItem> {
    const newTodo = {
        todoId : uuidv4(),
        createdAt : new Date().toISOString(),
        done : false,
        userId : userId,
        name : model.name,
        dueDate : model.dueDate
    } as TodoItem;

    return await new TodosAccess().createTodo(newTodo);
}

// export async function getTodosForUser(userId: string): Promise<any> {
//     logger.info("Get to do user id", userId)

//     return await todoAccess.getTodos(userId);
// }

// export async function deleteTodo(todoId: string, userId: string) {
//     logger.info("Delete todo id")
//     logger.info(todoId)

//     await todoAccess.deleteTodo(todoId, userId)
// }

// export async function updateTodo(todoId: string, userId: string, model: UpdateTodoRequest) {
//     logger.info("Update todo id")

//     await todoAccess.updateTodo(todoId, userId, model)
// }

// export async function createAttachmentPresignedUrl(todoId: string, userId: string): Promise<string> {
//     logger.info("create attachment presigned url")
//     await todoAccess.updateImageSourceToDo(todoId, userId);
//     return await attachmentUtils.getSignedUrl(todoId);
// }