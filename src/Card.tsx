import { useDrop } from 'react-dnd';
import { CardContainer } from './styles';
import { CardDragItem } from './DragItem';
import { useAppState } from './AppStateContext';
import { useItemDrag } from './useItemDrag';
import { useRef } from 'react';

interface CardProps {
  text: string;
  index: number;
  id: string;
  columnId: string;
  isPreview?: boolean;
}

export const Card = ({ text, id, index, columnId }: CardProps) => {
  const { state, dispatch } = useAppState();
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: 'CARD',
    hover(item: CardDragItem) {
      if (item.id === id) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;
      const sourceColumn = item.columnId;
      const targetColumn = columnId;

      dispatch({
        type: 'MOVE_TASK',
        payload: { dragIndex, hoverIndex, sourceColumn, targetColumn },
      });

      item.index = hoverIndex;
      item.columnId = targetColumn;
    },
  });

  const { drag } = useItemDrag({ type: 'CARD', id, index, text, columnId });

  drag(drop(ref));

  return <CardContainer ref={ref}>{text}</CardContainer>;
};
