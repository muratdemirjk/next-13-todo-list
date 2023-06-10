import TodoItem from "@/components/TodoItem";
import { prisma } from "@/db";
import Link from "next/link";

const getTodos = () => {
  return prisma.todo.findMany();
};

async function toggleTodo(id: string, complete: boolean) {
  "use server";
  await prisma.todo.update({ where: { id }, data: { complete } });
}

async function Home() {
  const todos = await getTodos();

  return (
    <main className="flex flex-col h-screen justify-center ">
      <div className="w-full md:w-1/2 mx-auto p-5">
        <header className="flex justify-between items-center mb-4">
          <h1 className="text-2xl">Todos</h1>
          <Link
            className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
            href="/new"
          >
            Add New
          </Link>
        </header>
        <ul className="pl-4">
          {todos.map((todo) => (
            <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} />
          ))}
        </ul>
      </div>
    </main>
  );
}

export default Home;
