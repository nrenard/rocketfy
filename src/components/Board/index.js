import React, { useState } from 'react';
import produce from 'immer';

import { loadLists } from '../../services/api';

import BoardContext from './context';

import List from '../List';

import { Container } from './styles';

const data = loadLists();

function Board() {
  const [lists, setLists] = useState(data);

  function move({
    draggedListIndex, targetListIndex, draggedIndex, targetIndex,
  }) {
    setLists(produce(lists, (draft) => {
      const dragged = draft[draggedListIndex].cards[draggedIndex];

      draft[draggedListIndex].cards.splice(draggedIndex, 1);
      draft[targetListIndex].cards.splice(targetIndex, 0, dragged);
    }));
  }

  return (
    <BoardContext.Provider value={{ lists, move }}>
      <Container>
        {lists.map((list, index) => (
          <List key={list.title} index={index} data={list} />
        ))}
      </Container>
    </BoardContext.Provider>
  );
}

export default Board;
