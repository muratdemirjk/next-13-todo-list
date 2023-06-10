import { prisma } from "@/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import React from "react";

async function createTodo(data: FormData) {
  "use server";

  const title = data.get("title")?.valueOf();
  if (typeof title !== "string" || title.length === 0) {
    throw new Error("Invalid Title");
  }

  await prisma.todo.create({ data: { title, complete: false } });
  redirect("/");
}

function New() {
  return (
    <main className="flex flex-col h-screen justify-center">
      <form
        className="flex gap-2 flex-col w-full max-w-lg mx-auto"
        action={createTodo}
      >
        <label
          className="block uppercase tracking-wide text-xs font-bold mb-2"
          htmlFor="title"
        >
          Todo Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
        />
        <div className="flex gap-1 justify-end">
          <Link
            href=".."
            className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          >
            Create
          </button>
        </div>
      </form>
    </main>
  );
}

export default New;
