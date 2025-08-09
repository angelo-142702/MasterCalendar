import { useState } from 'react';
import { Button, Popover } from 'antd';
const PopoverItem = ({text, title}) => {
  const [open, setOpen] = useState(false);
  const textoRecortado = text.slice(0, 7) + '...';
  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
  return (
    <Popover
      content={text}
      title={title}
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
    >
      <Button type="primary">{textoRecortado}</Button>
    </Popover>
  );
};
export default PopoverItem;