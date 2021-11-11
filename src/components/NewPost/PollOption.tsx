/* eslint-disable react/jsx-props-no-spreading */
import { CloseButton, Flex, FormControl, Input } from '@chakra-ui/react';
import React from 'react';
import { DragHandleIcon } from '@chakra-ui/icons';
import { FastField, FieldProps } from 'formik';
import { Draggable, DraggableProvided } from 'react-beautiful-dnd';

type Props = {
  option: { option: string; id: string };
  index: number;
  remove: (index: number) => undefined;
  showDelete: boolean;
};

const PollOption: React.FC<Props> = ({ option, index, remove, showDelete }) => {
  return (
    <Draggable draggableId={option.id} index={index}>
      {(provided: DraggableProvided) => (
        <Flex
          align="center"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <DragHandleIcon w={4} h={4} mr={4} color="gray.500" />
          <FastField name={`pollOptions.${index}.option`}>
            {({ field }: FieldProps) => (
              <FormControl mr={4} bgColor="white" id={`pollOptions.${index}.option`} isRequired>
                <Input {...field} type="text" placeholder={`Option ${index + 1}`} />
              </FormControl>
            )}
          </FastField>
          {showDelete && <CloseButton onClick={() => remove(index)} />}
        </Flex>
      )}
    </Draggable>
  );
};

export default PollOption;
