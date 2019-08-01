import React, { useRef, useContext, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import BardContext from '../Board/context';

import {
  Container, Header, Label, EmptyContent,
} from './styles';

export default function Card({ data, index, listIndex }) {
  const [isTargetTop, setIsTargetTop] = useState(false);
  const [isTargetBottom, setIsTargetBottom] = useState(false);

  const ref = useRef();
  const { move } = useContext(BardContext);

  const [{ isDragging }, dragRef] = useDrag({
    item: {
      type: 'CARD',
      index,
      listIndex,
      id: data.id,
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),

    }),
  });

  const [, dropRef] = useDrop({
    accept: 'CARD',
    drop(item, monitor) {
      const draggedListIndex = item.listIndex;
      const targetListIndex = listIndex;

      const draggedIndex = item.index;
      const targetIndex = index;

      if (draggedListIndex === targetListIndex && draggedIndex === targetIndex) {
        return;
      }

      const targetSize = ref.current.getBoundingClientRect();
      const targetCenter = targetSize.height / 2;

      const draggedOffset = monitor.getClientOffset();
      const draggedTop = draggedOffset.y - targetSize.top;

      const draggedPass = !!(draggedTop > targetCenter);

      if ((draggedIndex < targetIndex && !draggedPass) || (draggedIndex > targetIndex && draggedPass)) return;

      move({
        draggedListIndex, targetListIndex, draggedIndex, targetIndex,
      });

      setIsTargetBottom(false);
      setIsTargetTop(false);

      item.index = targetIndex;
      item.listIndex = targetListIndex;
    },

    hover(item, monitor) {
      const draggedListIndex = item.listIndex;
      const targetListIndex = listIndex;

      const draggedIndex = item.index;
      const targetIndex = index;

      if (draggedListIndex === targetListIndex && draggedIndex === targetIndex) {
        return;
      }

      const targetSize = ref.current.getBoundingClientRect();
      const targetCenter = targetSize.height / 2;

      const draggedOffset = monitor.getClientOffset();
      const draggedTop = draggedOffset.y - targetSize.top;

      const draggedPass = !!(draggedTop > targetCenter);

      if ((draggedIndex < targetIndex && !draggedPass) || (draggedIndex > targetIndex && draggedPass)) return;

      if (!draggedPass && !isTargetTop) {
        setIsTargetBottom(false);
        setIsTargetTop(true);
      }

      if (draggedPass && !isTargetBottom) {
        setIsTargetTop(false);
        setIsTargetBottom(true);
      }
    },

  });

  dragRef(dropRef(ref));

  return (
    <>
      {isTargetTop && (
        <EmptyContent />
      )}

      <Container ref={ref} isDragging={isDragging}>
        <Header>
          {data.labels.map(label => (
            <Label color={label} key={label} />
          ))}
        </Header>

        <p>{data.content}</p>
        {data.user && <img src={data.user} alt="Avatar" />}
      </Container>

      {isTargetBottom && (
        <EmptyContent />
      )}
    </>
  );
}
