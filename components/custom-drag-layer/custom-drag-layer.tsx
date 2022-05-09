import { useDragLayer, XYCoord } from 'react-dnd';
import Application from '../application/application';
import Icon from '../icon/icon';

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
}

function getItemStyles(initialOffset: XYCoord | null, currentOffset: XYCoord | null) {
  if (!initialOffset || !currentOffset) return {display: 'none'};

  let { x, y } = currentOffset;

  const transform = `translate(${x}px, ${y}px)`;

  return {
    transform,
    WebkitTransform: transform,
  }
}
export const CustomDragLayer = () => {
    const { itemType, isDragging, item, initialOffset, currentOffset } =
        useDragLayer((monitor) => ({
          item: monitor.getItem(),
          itemType: monitor.getItemType(),
          initialOffset: monitor.getInitialSourceClientOffset(),
          currentOffset: monitor.getSourceClientOffset(),
          isDragging: monitor.isDragging(),
        }
    ));

  if (!isDragging) {
    return null
  }

  // console.log(item);
  return (
    // @ts-ignore
    <div style={layerStyles}>
      <div style={getItemStyles(initialOffset, currentOffset)}>
        {itemType === 'app' ? <Application {...item} {...item.data} top={0} left={0}>{item.children}</Application> : <Icon {...item} top={0} left={0} />}
      </div>
    </div>
  )
}
