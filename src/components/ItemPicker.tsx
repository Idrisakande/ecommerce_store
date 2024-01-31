import useSelect from "@/hooks/useSelect";
import { IItemPicker } from "@/interfaces/ItemPicker.interfaces";
import { memo } from "react";

export default memo(function ItemPicker({
  headerTitle,
  items,
  placeholder,
  getSelected,
  contentClassName,
  triggerClassName,
}: IItemPicker) {
  const { ItemPicker, selected } = useSelect(
    items,
    placeholder,
    headerTitle,
    contentClassName,
    triggerClassName
  );
  getSelected(selected);
  return <ItemPicker />;
});
