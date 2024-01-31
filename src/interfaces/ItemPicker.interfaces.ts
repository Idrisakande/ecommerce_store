export interface IItemPicker {
    items: string[];
    placeholder: string;
    getSelected: (value: string | number) => void;
    headerTitle?: string | undefined;
    contentClassName?: string
    triggerClassName?: string
}
