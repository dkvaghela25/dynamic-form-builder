// const FinalForm = () => {
//   return (
//     <>
//        FinalForm
//     </>
//   );
// };

import { DndContext } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { RxDragHandleDots2 } from "react-icons/rx";

const Skills = () => {
  const [skills, setSkills] = useState(["JavaScript", "TypeScript", "Python", "Java", "C", "C++", "C#", "Go", "PHP"]);

  const itemIds = skills.map((_, i) => i.toString());

  const recordSkills = (e) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;

    setSkills((prev) => {
      const oldIndex = parseInt(active.id);
      const newIndex = parseInt(over.id);
      return arrayMove(prev, oldIndex, newIndex);
    });
  };

  return (
    <>
      <DndContext onDragEnd={recordSkills}>
        <main className="flex flex-col gap-4 items-center w-full">
          <ul className="flex flex-col gap-2 border p-4 border-dashed">
            {/* IMPORTANT: The items prop MUST match the IDs used in useSortable */}
            <SortableContext items={itemIds}>
              {skills.map((skill, index) => (
                <Skill key={skill} id={index.toString()}>{skill}</Skill>
              ))}
            </SortableContext>
          </ul>
        </main>
      </DndContext>
    </>
  );
};


export default Skills;

const Skill = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  return (
    <li
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition
      }}
      className="w-[20vw] border py-1 px-2 flex items-center gap-1"
    >
      <button
        {...attributes}
        {...listeners}
      >
        <RxDragHandleDots2 className="-ml-2 hover:cursor-grab" />
      </button>
      {children}
    </li>
  )
}
