import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import SortableItem from './SortableItem';
import { UPDATE_QUESTIONNAIRE } from '../../../api/questionnaires';

function EditForm({ questions, order, questionnaireId }) {
  console.log(questions);
  const [sortedItems, setSortedItems] = useState(order);
  const [updateQuestionnaire] = useMutation(UPDATE_QUESTIONNAIRE);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setSortedItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
    updateQuestionnaire({
      variables: {
        id: questionnaireId,
        obj: {
          questions_order: sortedItems,
        },
      },
    });
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={sortedItems} // Update to 'sortedItems'
        strategy={verticalListSortingStrategy}
      >
        {sortedItems.map((item) => ( // Update to 'sortedItems'
          <SortableItem
            handle
            key={item}
            id={item}
            question={questions.find((question) => question.id === item)}
            questionsOrder={sortedItems}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
}

export default EditForm;
