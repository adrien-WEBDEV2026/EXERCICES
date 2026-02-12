type TabButtonProps = {
  children: string;
  onSelect: () => void;
  isSelected: boolean;
};

export default function TabButton({ children, onSelect, isSelected }: TabButtonProps) {
  return (
    <li>
      <button className={isSelected ? 'active' : ''} onClick={onSelect}>
        {children}
      </button>
    </li>
  );
}