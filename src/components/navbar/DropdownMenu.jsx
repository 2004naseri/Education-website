import { Link } from "react-router-dom";

const DropdownMenu = ({ items, isOpen, onClose }) => {
  return (
    <div
      className={`absolute top-full left-0 mt-4 w-64 bg-background border-t-2 border-accent shadow-elegant rounded-b-lg overflow-hidden transition-all duration-300 origin-top
        ${
          isOpen
            ? "opacity-100 scale-y-100 visible"
            : "opacity-0 scale-y-95 invisible"
        }`}
    >
      <div className="py-2 bg-secondary-light/20">
        {items.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            onClick={onClose}
            className="group flex flex-col px-6 py-4 hover:bg-secondary-light transition-colors"
          >
            <span className="font-body text-sm font-medium text-text-primary group-hover:text-primary transition-colors">
              {item.label}
            </span>
            {item.description && (
              <span className="font-body text-[10px] text-text-muted uppercase tracking-tighter mt-1">
                {item.description}
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DropdownMenu;
