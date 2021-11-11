/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Heading, VStack } from '@chakra-ui/react';
import { FieldArray, FormikHelpers } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, Droppable, DroppableProvided, DropResult } from 'react-beautiful-dnd';
import PollOption from './PollOption';

const PollPost: React.FC<{ values: { option: string; id: string }[] }> = ({ values }) => {
  const reorderArray = (event: { oldIndex: number; newIndex: number }, originalArray: any[]) => {
    const movedItem = originalArray.find((_item: any, index: number) => index === event.oldIndex);
    const remainingItems = originalArray.filter(
      (_item: any, index: number) => index !== event.oldIndex,
    );

    const reorderedItems = [
      ...remainingItems.slice(0, event.newIndex),
      movedItem,
      ...remainingItems.slice(event.newIndex),
    ];

    return reorderedItems;
  };

  const handleDragEnd = (
    result: DropResult,
    setFieldValue: FormikHelpers<any>['setFieldValue'],
  ) => {
    setFieldValue(
      'pollOptions',
      reorderArray({ oldIndex: result.source.index, newIndex: result.destination!.index }, values),
    );
  };

  return (
    <FieldArray name="pollOptions">
      {({ remove, push, form: { setFieldValue } }) => (
        <DragDropContext onDragEnd={(result) => handleDragEnd(result, setFieldValue)}>
          <Droppable droppableId="poll">
            {(provided: DroppableProvided) => (
              <VStack
                spacing={4}
                align="stretch"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {values.length > 0 &&
                  values.map((option, index) => (
                    <PollOption
                      key={option.id}
                      index={index}
                      option={option}
                      remove={remove}
                      showDelete={values.length >= 2 || index > 0}
                    />
                  ))}
                {provided.placeholder}
                {values.length < 4 && (
                  <Heading
                    cursor="pointer"
                    as="h6"
                    size="xs"
                    onClick={() => push({ option: '', id: uuidv4() })}
                  >
                    ADD OPTION
                  </Heading>
                )}
              </VStack>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </FieldArray>
  );
};

export default PollPost;
